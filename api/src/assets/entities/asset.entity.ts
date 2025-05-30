import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { randomUUID } from 'crypto';
import { HydratedDocument } from 'mongoose';

export type AssetDocument = HydratedDocument<Asset>;

@Schema({
  timestamps: true,
  optimisticConcurrency: true,
  collectionOptions: {
    changeStreamPreAndPostImages: {
      enabled: true,
    },
  },
})
export class Asset {
  @Prop({ default: () => randomUUID() })
  _id: string;

  @Prop({ unique: true, index: true })
  name: string;

  @Prop({ unique: true, index: true })
  symbol: string;

  @Prop()
  image: string;

  @Prop()
  price: number;

  createdAt!: Date;

  updatedAt!: Date;
}

export const AssetSchema = SchemaFactory.createForClass(Asset);
