import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AssetsService } from './assets.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';

@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Post()
  create(@Body() createAssetDto: CreateAssetDto) {
    return this.assetsService.create(createAssetDto);
  }

  @Get()
  findAll() {
    return this.assetsService.findAll();
  }

  @Get(':symbol')
  findOne(@Param('symbol') symbol: string) {
    return this.assetsService.findOne(symbol);
  }

  @Patch(':symbol')
  update(
    @Param('symbol') symbol: string,
    @Body() updateAssetDto: UpdateAssetDto,
  ) {
    return this.assetsService.update(symbol, updateAssetDto);
  }

  @Delete(':symbol')
  remove(@Param('symbol') symbol: string) {
    return this.assetsService.remove(symbol);
  }
}
