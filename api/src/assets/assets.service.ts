import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { Asset } from './entities/asset.entity';

@Injectable()
export class AssetsService {
  constructor(@InjectModel(Asset.name) private assetSchema: Model<Asset>) {}

  create(data: CreateAssetDto) {
    return this.assetSchema.create(data);
  }

  findAll() {
    return this.assetSchema.find();
  }

  findOne(symbol: string) {
    return this.assetSchema.findOne({ symbol });
  }

  update(symbol: string, data: UpdateAssetDto) {
    return this.assetSchema.findOneAndUpdate({ symbol }, data);
  }

  remove(symbol: string) {
    return this.assetSchema.deleteOne({ symbol });
  }
}
