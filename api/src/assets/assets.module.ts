import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AssetsDailyController } from './assets-daily.controller';
import { AssetsDailyService } from './assets-daily.service';
import { AssetsController } from './assets.controller';
import { AssetsGateway } from './assets.gateway';
import { AssetsService } from './assets.service';
import { AssetDaily, AssetDailySchema } from './entities/asset-daily.entity';
import { Asset, AssetSchema } from './entities/asset.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Asset.name, schema: AssetSchema },
      { name: AssetDaily.name, schema: AssetDailySchema },
    ]),
  ],
  controllers: [AssetsController, AssetsDailyController],
  providers: [AssetsService, AssetsDailyService, AssetsGateway],
  exports: [AssetsService],
})
export class AssetsModule {}
