import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDate,
  IsEnum,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { SubscriptionInterval } from './subscription.payload';

export enum OrderEnum {
  CREATED_DATE = 'created_date',
  CANCELED_DATE = 'canceled_date',
}

export enum SortEnum {
  DESC = 'desc',
  ASC = 'ASC',
}

export class PaginationQuery {
  @ApiPropertyOptional({ type: Number, description: '가져올 갯수' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  limit?: number = 10;

  @ApiPropertyOptional({ type: Number, description: '페이지 넘버(0 이상)' })
  @IsNumber()
  @Min(0)
  offset?: number = 0;
}

export class CursorBasedQuery {
  @ApiPropertyOptional({
    type: String,
    description:
      '몽고 id(null 일 경우 처음부터, 리스트로 응답받은 마지막데이터의 몽고 id를 넣으면 됩니다.)',
  })
  @IsOptional()
  @IsMongoId()
  _id?: string;

  @ApiPropertyOptional({ type: Number, description: '가져올 갯수' })
  @IsOptional()
  @IsNumber()
  count?: number = 10;
}

export class OrderQuery {
  @ApiPropertyOptional({ enum: OrderEnum, description: '정렬 기준' })
  @IsOptional()
  @IsEnum(OrderEnum)
  order?: OrderEnum = OrderEnum.CREATED_DATE;

  @ApiPropertyOptional({ enum: SortEnum, description: '정렬 방향' })
  @IsOptional()
  @IsEnum(SortEnum)
  sort?: SortEnum = SortEnum.DESC;
}

export class SearchQuery {
  @ApiPropertyOptional({
    type: String,
    description: '검색하고자 하는 고객 id',
  })
  @IsOptional()
  @IsString()
  customerId?: string;

  @ApiPropertyOptional({
    type: String,
    description: '구독 시작한 날짜 범위 검색 시작(UTC)',
  })
  @IsOptional()
  @IsDate()
  startDate?: Date;

  @ApiPropertyOptional({
    type: String,
    description: '구독 시작한 날짜 범위 검색 끝(UTC)',
  })
  @IsOptional()
  @IsDate()
  endDate?: Date;

  @ApiPropertyOptional({
    enum: SubscriptionInterval,
    description: '구독 인터벌 검색',
  })
  @IsOptional()
  @IsEnum(SubscriptionInterval)
  subscriptionInterval?: SubscriptionInterval;
}
