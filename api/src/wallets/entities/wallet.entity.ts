import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { randomUUID } from 'crypto';
import mongoose, { HydratedDocument } from 'mongoose';
import { WalletAsset, WalletAssetDocument } from './wallet-asset.entity';

export type WalletDocument = HydratedDocument<Wallet>;

@Schema({ timestamps: true })
export class Wallet {
  @Prop({ default: () => randomUUID() })
  _id: string;

  @Prop({
    type: [mongoose.Schema.Types.String],
    set: (v: Iterable<unknown>) => [...new Set(v)],
    ref: WalletAsset.name,
  })
  assets: WalletAssetDocument[] | string[];

  createdAt!: Date;

  updatedAt!: Date;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
