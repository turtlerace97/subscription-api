// /src/user/schema/user.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { SubscriptionInterval } from '../payload/subscription.payload';

export type SubscriptionDocument = Subscription & Document;

@Schema()
export class Subscription {
  @Prop({ required: true, type: mongoose.Schema.Types.String })
  customer_id: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.Date,
    default: Date.now(),
  })
  created_date: Date;

  @Prop({ type: mongoose.Schema.Types.Date })
  canceled_date?: Date;

  @Prop({ required: true, type: mongoose.Schema.Types.Number })
  subscription_cost: number;

  @Prop({ required: true, type: mongoose.Schema.Types.String })
  subscription_interval: SubscriptionInterval;

  @Prop({ required: true, default: true, type: mongoose.Schema.Types.Boolean })
  was_subscription_paid: boolean;

  static of(this) {}
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
