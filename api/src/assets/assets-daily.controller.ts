import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AssetsDailyService } from './assets-daily.service';
import { CreateAssetDailyDto } from './dto/create-asset-daily.dto';

@Controller('assets/:symbol/daily')
export class AssetsDailyController {
  constructor(private assetsDailyService: AssetsDailyService) {}

  @Get()
  findAll(@Param('symbol') symbol: string) {
    return this.assetsDailyService.findAll(symbol);
  }

  @Post()
  create(@Body() data: CreateAssetDailyDto, @Param('symbol') symbol: string) {
    return this.assetsDailyService.create({
      symbol,
      date: new Date(data.date),
      price: data.price,
    });
  }
}
