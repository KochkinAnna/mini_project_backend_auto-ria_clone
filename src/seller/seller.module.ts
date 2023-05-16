import { Module } from '@nestjs/common';

import { PrismaModule } from '../common/orm/prisma.module';
import { PrismaService } from '../common/orm/prisma.service';
import { SellerController } from './seller.controller';
import { SellerService } from './seller.service';

@Module({
  imports: [PrismaModule],
  controllers: [SellerController],
  providers: [SellerService, PrismaService],
})
export class SellerModule {}
