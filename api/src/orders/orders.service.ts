import * as kafkaLib from '@confluentinc/kafka-javascript';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { AssetDaily } from '../assets/entities/asset-daily.entity';
import { Asset, AssetDocument } from '../assets/entities/asset.entity';
import { WalletAsset } from '../wallets/entities/wallet-asset.entity';
import { Wallet, WalletDocument } from '../wallets/entities/wallet.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { CreateTradeDto } from './dto/create-trade.dto';
import {
  Order,
  OrderDocument,
  OrderStatus,
  OrderType,
} from './entities/order.entity';
import { Trade } from './entities/trade.entity';

@Injectable()
export class OrdersService implements OnModuleInit {
  private kafkaProducer: kafkaLib.KafkaJS.Producer;

  constructor(
    @InjectConnection() private connection: mongoose.Connection,
    @InjectModel(Asset.name) private assetSchema: Model<Asset>,
    @InjectModel(Wallet.name) private walletSchema: Model<Wallet>,
    @InjectModel(Order.name) private orderSchema: Model<Order>,
    @InjectModel(Trade.name) private tradeSchema: Model<Trade>,
    @InjectModel(AssetDaily.name) private assetDailySchema: Model<AssetDaily>,
    @InjectModel(WalletAsset.name)
    private walletAssetSchema: Model<WalletAsset>,
    private kafkaInst: kafkaLib.KafkaJS.Kafka,
  ) {}

  async onModuleInit() {
    this.kafkaProducer = this.kafkaInst.producer();
    await this.kafkaProducer.connect();
  }

  async create(data: CreateOrderDto) {
    const order = await this.orderSchema.create({
      wallet: data.walletId,
      asset: data.assetId,
      shares: data.shares,
      partial: data.shares,
      price: data.price,
      type: data.type,
      status: OrderStatus.PENDING,
    });

    await this.kafkaProducer.send({
      topic: 'input',
      messages: [
        {
          key: order._id,
          value: JSON.stringify({
            order_id: order._id,
            investor_id: order.wallet,
            asset_id: order.asset,
            shares: order.shares,
            price: order.price,
            order_type: order.type,
          }),
        },
      ],
    });

    return order;
  }

  findAll(filter: { walletId: string }) {
    return this.orderSchema
      .find({ wallet: filter.walletId })
      .populate('asset') as Promise<(Order & { asset: Asset })[]>;
  }

  findOne(id: string) {
    return this.orderSchema.findById(id);
  }

  async createTrade(data: CreateTradeDto) {
    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      const order = (await this.orderSchema
        .findById(data.orderId)
        .session(session)) as OrderDocument & { trades: string[] };

      if (!order) {
        throw new Error('Order not found');
      }

      const tradeDocs = await this.tradeSchema.create(
        [
          {
            broker_trade_id: data.brokerTradeId,
            related_investor_id: data.relatedInvestorId,
            shares: data.shares,
            price: data.price,
            order: order._id,
          },
        ],
        { session },
      );

      const trade = tradeDocs[0];

      order.partial -= data.shares;
      order.status = data.status;
      order.trades.push(trade._id);
      await order.save({ session });

      if (data.status === OrderStatus.CLOSED && order.type === OrderType.BUY) {
        const asset = (await this.assetSchema
          .findById(order.asset)
          .session(session)) as AssetDocument;

        if (asset.updatedAt < data.date) {
          asset.price = data.price;
          await asset.save({ session });
        }

        const assetDaily = await this.assetDailySchema
          .findOne({
            asset: order.asset,
            date: data.date,
          })
          .session(session);

        if (!assetDaily) {
          await this.assetDailySchema.create(
            [
              {
                asset: order.asset,
                date: data.date,
                price: data.price,
              },
            ],
            { session },
          );
        }
      }

      if (data.status === OrderStatus.CLOSED) {
        const walletAsset = await this.walletAssetSchema
          .findOne({
            wallet: order.wallet,
            asset: order.asset,
          })
          .session(session);

        if (!walletAsset && order.type === OrderType.SELL) {
          throw new Error('Asset not found in wallet');
        }

        if (walletAsset) {
          walletAsset.shares +=
            order.type === OrderType.BUY ? data.shares : -data.shares;
          await walletAsset.save({ session });
        } else {
          const walletAssetDocs = await this.walletAssetSchema.create(
            [
              {
                wallet: order.wallet,
                asset: order.asset,
                shares: data.shares,
              },
            ],
            { session },
          );

          const walletAsset = walletAssetDocs[0];
          const wallet = (await this.walletSchema.findById(
            order.wallet,
          )) as WalletDocument & { assets: string[] };
          wallet.assets.push(walletAsset._id);
          await wallet.save({ session });
        }
      }

      await session.commitTransaction();

      return order;
    } catch (e) {
      await session.abortTransaction();
      throw e;
    } finally {
      await session.endSession();
    }
  }
}
