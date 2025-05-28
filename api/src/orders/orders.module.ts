import * as kafkaLib from '@confluentinc/kafka-javascript';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  AssetDaily,
  AssetDailySchema,
} from '../assets/entities/asset-daily.entity';
import { Asset, AssetSchema } from '../assets/entities/asset.entity';
import {
  WalletAsset,
  WalletAssetSchema,
} from '../wallets/entities/wallet-asset.entity';
import { Wallet, WalletSchema } from '../wallets/entities/wallet.entity';
import { Order, OrderSchema } from './entities/order.entity';
import { Trade, TradeSchema } from './entities/trade.entity';
import { OrdersConsumer } from './orders.consumer';
import { OrdersController } from './orders.controller';
import { OrdersGateway } from './orders.gateway';
import { OrdersService } from './orders.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: Trade.name, schema: TradeSchema },
      { name: Asset.name, schema: AssetSchema },
      { name: Wallet.name, schema: WalletSchema },
      { name: AssetDaily.name, schema: AssetDailySchema },
      { name: WalletAsset.name, schema: WalletAssetSchema },
    ]),
  ],
  controllers: [OrdersController, OrdersConsumer],
  providers: [
    OrdersService,
    OrdersGateway,
    {
      provide: kafkaLib.KafkaJS.Kafka,
      useFactory() {
        return new kafkaLib.KafkaJS.Kafka({
          'bootstrap.servers': 'localhost: 9094',
        });
      },
    },
  ],
  exports: [OrdersService],
})
export class OrdersModule {}
