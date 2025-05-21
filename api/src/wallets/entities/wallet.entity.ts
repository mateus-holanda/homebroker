import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { randomUUID } from 'crypto';
import { HydratedDocument } from 'mongoose';

export type WalletDocument = HydratedDocument<Wallet>;

@Schema({ timestamps: true })
export class Wallet {
  @Prop({ default: () => randomUUID() })
  _id: string;

  createdAt!: Date;

  updatedAt!: Date;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
