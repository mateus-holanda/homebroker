import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order, OrderStatus } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private orderSchema: Model<Order>) {}

  create(data: CreateOrderDto) {
    return this.orderSchema.create({
      wallet: data.walletId,
      asset: data.assetId,
      shares: data.shares,
      partial: data.shares,
      type: data.type,
      status: OrderStatus.PENDING,
    });
  }

  findAll(filter: { walletId: string }) {
    return this.orderSchema.find({ wallet: filter.walletId });
  }

  findOne(id: string) {
    return this.orderSchema.findById(id);
  }
}
