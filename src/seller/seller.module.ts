import { forwardRef, Module } from '@nestjs/common';

import { AdminModule } from '../admin/admin.module';
import { AuthModule } from '../auth/auth.module';
import { PrismaModule } from '../common/orm/prisma.module';
import { PrismaService } from '../common/orm/prisma.service';
import { SellerController } from './seller.controller';
import { SellerService } from './seller.service';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => AuthModule),
    PrismaModule,
  ],
  controllers: [SellerController],
  providers: [SellerService, PrismaService],
  exports: [SellerService],
})
export class SellerModule {}
