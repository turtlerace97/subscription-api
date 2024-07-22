import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SubscriptionService } from './subscription.service';

@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post()
  create() {
    // todo : impl
  }

  @Get()
  findAll() {
    // todo : impl
  }

  @Get(':id')
  findOne() {
    // todo : impl
  }

  @Patch(':id')
  update() {
    // todo : impl
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // todo : impl
  }
}
