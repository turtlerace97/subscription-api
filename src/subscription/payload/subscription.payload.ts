import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export enum SubscriptionInterval {
  MONTH = 'month',
  YEAR = 'year',
}

export class CreateSubscriptionPayload {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: '고객 id(숫자로 이루어진 문자열)',
    type: String,
    example: '1321321312',
  })
  customerId: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: '구독 비용',
    type: Number,
    example: 39,
  })
  subscriptionCost: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '구독 interval',
    enum: SubscriptionInterval,
    example: SubscriptionInterval.MONTH,
  })
  subscriptionInterval: SubscriptionInterval.MONTH;
}

export class DeleteSubscriptionPayload {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: '고객 id(숫자로 이루어진 문자열)',
    type: String,
    example: '1321321312',
  })
  customerId: string;
}
