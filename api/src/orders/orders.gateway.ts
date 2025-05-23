import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';

@WebSocketGateway({ cors: true })
export class OrdersGateway {
  constructor(private ordersService: OrdersService) {}

  @SubscribeMessage('orders/create')
  async handleMessage(client: any, payload: CreateOrderDto) {
    return await this.ordersService.create({
      assetId: payload.assetId,
      walletId: payload.walletId,
      type: payload.type,
      shares: payload.shares,
      price: payload.price,
    });
  }
}
