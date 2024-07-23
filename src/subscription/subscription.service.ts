import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, SortOrder, Types } from 'mongoose';
import {
  CreateSubscriptionPayload,
  DeleteSubscriptionPayload,
} from './payload/subscription.payload';
import { Subscription } from './schemas/subscription.schema';
import { SubscriptionMapper } from './mapper/subscription.mapper';
import {
  SubscriptionLongTermUsersQuery,
  SubscriptionsQuery,
} from './payload/subscription.query';
import { OrderEnum, SortEnum } from './payload/common.query';

const mongoose = require('mongoose');
mongoose.set('debug', true);

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectModel(Subscription.name)
    private subscriptionModel: Model<Subscription>,
  ) {}

  async create(payload: CreateSubscriptionPayload): Promise<void> {
    const isExist = await this.findBy(
      {
        customer_id: payload.customerId,
        canceled_date: null,
        was_subscription_paid: true,
      },
      { created_date: -1 },
    );

    if (isExist.length > 0) {
      throw new BadRequestException('already exist');
    }

    const subscription = await this.subscriptionModel.create({
      customer_id: payload.customerId,
      subscription_cost: payload.subscriptionCost,
      subscription_interval: payload.subscriptionInterval,
      canceled_date: null,
    });

    try {
      this.processPayment();
    } catch (err) {
      subscription.was_subscription_paid = false;
      throw err;
    } finally {
      subscription.save();
    }
  }

  async findAll(query: SubscriptionsQuery): Promise<SubscriptionMapper[]> {
    const filterQuery: FilterQuery<Subscription> = {};

    if (query.startDate && query.endDate) {
      filterQuery.created_date = {
        $gte: new Date(query.startDate),
        $lte: new Date(query.endDate),
      };
    }

    if (query.customerId) {
      filterQuery.customer_id = query.customerId;
    }

    if (query.subscriptionInterval) {
      filterQuery.subscription_interval = query.subscriptionInterval;
    }

    const orderField = query.order || OrderEnum.CREATED_DATE;
    const sortOrder = query.sort === SortEnum.DESC ? -1 : 1;

    const result = await this.findBy(
      filterQuery,
      { [orderField]: sortOrder },
      query.limit,
      query.offset,
    );

    return result.map(SubscriptionMapper.of);
  }

  async getLongTermSubscribedUsers(
    query: SubscriptionLongTermUsersQuery,
  ): Promise<SubscriptionMapper[]> {
    const currentDate = new Date();

    const matchStage: any = {
      canceled_date: null,
      was_subscription_paid: true,
    };

    // query._id가 존재하면 추가
    if (query._id) {
      matchStage._id = { $gt: new Types.ObjectId(query._id) };
    }

    const result = await this.subscriptionModel
      .aggregate([
        {
          $match: matchStage,
        },
        {
          $addFields: {
            dateDifference: {
              $abs: {
                $subtract: [currentDate, '$created_date'],
              },
            },
          },
        },
        {
          $sort: { dateDifference: -1 },
        },
        {
          $limit: query.count ?? 10,
        },
        {
          $project: {
            dateDifference: 0,
          },
        },
      ])
      .exec();

    return result.map(SubscriptionMapper.of);
  }

  async remove(payload: DeleteSubscriptionPayload) {
    const isExist = await this.findBy(
      {
        customer_id: payload.customerId,
        canceled_date: null,
        was_subscription_paid: true,
      },
      { created_date: -1 },
    );

    if (isExist.length == 0) {
      throw new BadRequestException('no data to remove');
    }

    if (isExist.length > 1) {
      // unexpected error
      throw new InternalServerErrorException('internal server error');
    }

    await this.subscriptionModel.updateOne(
      { _id: isExist[0]._id },
      {
        canceled_date: Date.now(),
      },
    );
  }

  private async findBy(
    filter?: FilterQuery<Subscription>,
    order?:
      | string
      | { [key: string]: SortOrder | { $meta: any } }
      | [string, SortOrder][]
      | undefined
      | null,
    limit = 10,
    offset = 0,
  ) {
    return await this.subscriptionModel
      .find(filter)
      .sort(order)
      .limit(limit)
      .skip(offset * limit)
      .exec();
  }

  private processPayment() {
    // do payment
    console.log('do payment....');
  }
}
