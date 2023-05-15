import { Module } from '@nestjs/common';

import { PrismaModule } from '../common/orm/prisma.module';
import { PrismaService } from '../common/orm/prisma.service';
import { BuyerController } from './buyer.controller';
import { BuyerService } from './buyer.service';

@Module({
  imports: [PrismaModule],
  controllers: [BuyerController],
  providers: [BuyerService, PrismaService],
})
export class BuyerModule {}
