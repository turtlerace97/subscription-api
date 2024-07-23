import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import {
  CreateSubscriptionPayload,
  DeleteSubscriptionPayload,
} from './payload/subscription.payload';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SubscriptionMapper } from './mapper/subscription.mapper';
import { CommonResponse } from './response/common.response';
import {
  SubscriptionLongTermUsersQuery,
  SubscriptionsQuery,
} from './payload/subscription.query';

@Controller('/api/subscriptions')
@ApiTags('Subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post()
  @ApiOperation({ summary: '구독 생성' })
  @ApiCreatedResponse({ type: CommonResponse<null> })
  async create(
    @Body() payload: CreateSubscriptionPayload,
  ): Promise<CommonResponse<null>> {
    await this.subscriptionService.create(payload);
    return new CommonResponse<null>(null);
  }

  @Delete()
  @ApiOperation({ summary: '구독 삭제' })
  @ApiCreatedResponse({ type: CommonResponse<null> })
  async remove(
    @Body() payload: DeleteSubscriptionPayload,
  ): Promise<CommonResponse<null>> {
    await this.subscriptionService.remove(payload);
    return new CommonResponse<null>(null);
  }

  @Get()
  @ApiOperation({ summary: '구독 목록' })
  @ApiCreatedResponse({ type: [SubscriptionMapper] })
  async get(@Query() query: SubscriptionsQuery) {
    return this.subscriptionService.findAll(query);
  }

  @Get('/long-term-users')
  @ApiOperation({ summary: '장기 구독 유저' })
  @ApiCreatedResponse({ type: [SubscriptionMapper] })
  async getLongTermSubscribedUsers(
    @Query() query: SubscriptionLongTermUsersQuery,
  ): Promise<CommonResponse<SubscriptionMapper[]>> {
    const result =
      await this.subscriptionService.getLongTermSubscribedUsers(query);
    return new CommonResponse<SubscriptionMapper[]>(result);
  }
}
