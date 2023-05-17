import { forwardRef, Module } from '@nestjs/common';

import { PrismaModule } from '../common/orm/prisma.module';
import { PrismaService } from '../common/orm/prisma.service';
import { SellerController } from './seller.controller';
import { SellerService } from './seller.service';
import { AdminModule } from '../admin/admin.module';

@Module({
  imports: [forwardRef(() => AdminModule), PrismaModule],
  controllers: [SellerController],
  providers: [SellerService, PrismaService],
  exports: [SellerService],
})
export class SellerModule {}
