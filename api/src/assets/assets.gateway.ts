import { Logger } from '@nestjs/common';
import {
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AssetPresenter } from './asset.presenter';
import { AssetsService } from './assets.service';

@WebSocketGateway({ cors: true })
export class AssetsGateway implements OnGatewayInit {
  constructor(private assetsService: AssetsService) {}

  logger = new Logger(AssetsGateway.name);

  afterInit(server: Server) {
    this.assetsService.subscribeNewPriceChangeEvents().subscribe((asset) => {
      server
        .to(asset.symbol)
        .emit('assets/price-change', new AssetPresenter(asset).toJSON());
    });
  }

  @SubscribeMessage('joinAssets')
  async handleJoinAssets(client: Socket, payload: { symbols: string[] }) {
    if (!payload.symbols?.length) {
      return;
    }

    await Promise.all(payload.symbols.map((symbol) => client.join(symbol)));
    this.logger.log(
      `Client ${client.id} joined assets ${payload.symbols.join(', ')}`,
    );
  }

  @SubscribeMessage('joinAsset')
  async handleJoinAsset(client: Socket, payload: { symbol: string }) {
    await client.join(payload.symbol);
    this.logger.log(`Client ${client.id} joined asset ${payload.symbol}`);
  }

  @SubscribeMessage('leaveAssets')
  async handleLeaveAssets(client: Socket, payload: { symbols: string[] }) {
    if (!payload.symbols?.length) {
      return;
    }

    await Promise.all(payload.symbols.map((symbol) => client.leave(symbol)));
    this.logger.log(
      `Client ${client.id} left assets ${payload.symbols.join(', ')}`,
    );
  }

  @SubscribeMessage('leaveAsset')
  async handleLeaveAsset(client: Socket, payload: { symbol: string }) {
    await client.leave(payload.symbol);
    this.logger.log(`Client ${client.id} left asset ${payload.symbol}`);
  }
}
