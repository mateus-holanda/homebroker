import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
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
  findOne(@Param('id') id: string) {
    return this.walletsService.findOne(id);
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
