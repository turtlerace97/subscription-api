import { IntersectionType } from '@nestjs/swagger';
import { CursorBasedQuery, OrderQuery, PaginationQuery } from './common.query';

export class SubscriptionsQuery extends IntersectionType(
  PaginationQuery,
  OrderQuery,
) {}

export class SubscriptionLongTermUsersQuery extends CursorBasedQuery {}
