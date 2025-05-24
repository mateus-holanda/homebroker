import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Observable } from 'rxjs';
import { CreateAssetDailyDto } from './dto/create-asset-daily.dto';
import { AssetDaily } from './entities/asset-daily.entity';
import { Asset } from './entities/asset.entity';

export class AssetsDailyService {
  constructor(
    @InjectModel(AssetDaily.name) private assetDailySchema: Model<AssetDaily>,
    @InjectModel(Asset.name) private assetSchema: Model<Asset>,
  ) {}

  async findAll(symbol: string) {
    const asset = await this.assetSchema.findOne({ symbol });
    return this.assetDailySchema.find({ asset: asset!.id }).sort({ date: 1 });
  }

  async create(data: { symbol: string } & CreateAssetDailyDto) {
    const asset = await this.assetSchema.findOne({ symbol: data.symbol });
    return this.assetDailySchema.create({
      asset: asset!._id,
      date: data.date,
      price: data.price,
    });
  }

  subscribeCreateEvents(): Observable<AssetDaily & { asset: Asset }> {
    return new Observable((observer) => {
      this.assetDailySchema
        .watch(
          [
            {
              $match: {
                operationType: 'insert',
              },
            },
          ],
          { fullDocument: 'updateLookup' },
        )
        .on('change', async (data) => {
          const assetDaily = await this.assetDailySchema
            .findById(data.fullDocument._id)
            .populate('asset');
          observer.next(assetDaily! as AssetDaily & { asset: Asset });
        });
    });
  }
}
