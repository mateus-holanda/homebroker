import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AssetPresenter } from './asset.presenter';
import { AssetsService } from './assets.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';

@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Post()
  async create(@Body() data: CreateAssetDto) {
    const asset = await this.assetsService.create(data);
    return new AssetPresenter(asset);
  }

  @Get()
  async findAll() {
    const assets = await this.assetsService.findAll();
    return assets.map((asset) => new AssetPresenter(asset));
  }

  @Get(':symbol')
  async findOne(@Param('symbol') symbol: string) {
    const asset = await this.assetsService.findOne(symbol);
    return new AssetPresenter(asset!);
  }

  @Patch(':symbol')
  async update(@Param('symbol') symbol: string, @Body() data: UpdateAssetDto) {
    const asset = await this.assetsService.update(symbol, data);
    return new AssetPresenter(asset!);
  }

  @Delete(':symbol')
  remove(@Param('symbol') symbol: string) {
    return this.assetsService.remove(symbol);
  }
}
