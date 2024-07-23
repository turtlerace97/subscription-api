import { IntersectionType } from '@nestjs/swagger';
import {
  CursorBasedQuery,
  OrderQuery,
  PaginationQuery,
  SearchQuery,
} from './common.query';

export class SubscriptionsQuery extends IntersectionType(
  PaginationQuery,
  OrderQuery,
  SearchQuery,
) {}

export class SubscriptionLongTermUsersQuery extends CursorBasedQuery {}
