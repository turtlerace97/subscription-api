// /src/user/schema/user.schema.ts

import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = SubscriptionModel & Document;

@Schema()
class SubscriptionModel {}

export const UserSchema = SchemaFactory.createForClass(SubscriptionModel);
