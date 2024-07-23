import { IsString } from 'class-validator';
import { SubscriptionInterval } from '../payload/subscription.payload';
import { ApiProperty } from '@nestjs/swagger';
import { Subscription } from '../schemas/subscription.schema';

export class SubscriptionMapper {
  @IsString()
  @ApiProperty({ description: '고객 id', type: String })
  customerId: string;

  @IsString()
  @ApiProperty({ description: '구독 금액', type: Number })
  subscriptionCost: number;

  @IsString()
  @ApiProperty({ description: '구독 인터벌', enum: SubscriptionInterval })
  subscriptionInterval: SubscriptionInterval;

  @IsString()
  @ApiProperty({ description: '구독 생성 날짜(UTC)', type: Date })
  createdDateInUTC: Date;

  @IsString()
  @ApiProperty({ description: '구독 취소 날짜(UTC)', type: Date })
  canceledDateInUTC: Date;

  static of(data: Subscription): SubscriptionMapper {
    return {
      customerId: data.customer_id,
      subscriptionCost: data.subscription_cost,
      subscriptionInterval: data.subscription_interval,
      createdDateInUTC: data.created_date,
      canceledDateInUTC: data.canceled_date,
    };
  }
}
