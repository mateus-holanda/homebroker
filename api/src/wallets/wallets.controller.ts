import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { WalletPresenter } from './wallet.presenter';
import { WalletsService } from './wallets.service';

@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Post()
  create(@Body() data: CreateWalletDto) {
    return this.walletsService.create(data);
  }

  @Get()
  findAll() {
    return this.walletsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const wallet = await this.walletsService.findOne(id);

    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }

    return new WalletPresenter(wallet);
  }

  @Post(':id/assets')
  createWalletAsset(
    @Param('id') id: string,
    @Body() data: { assetId: string; shares: number },
  ) {
    return this.walletsService.createWalletAsset({
      walletId: id,
      assetId: data.assetId,
      shares: data.shares,
    });
  }
}
