import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Observable } from 'rxjs';
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

  subscribeNewPriceChangeEvents(): Observable<Asset> {
    return new Observable((observer) => {
      this.assetSchema
        .watch(
          [
            {
              $match: {
                $or: [
                  { operationType: 'update' },
                  { operationType: 'replace' },
                ],
              },
            },
          ],
          {
            fullDocument: 'updateLookup',
            fullDocumentBeforeChange: 'whenAvailable',
          },
        )
        .on('change', async (data) => {
          if (data.fullDocument.price !== data.fullDocumentBeforeChange.price) {
            const asset = await this.assetSchema.findById(
              data.fullDocument._id,
            );
            observer.next(asset!);
          }
        });
    });
  }
}
