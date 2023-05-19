import { forwardRef, Module } from '@nestjs/common';

import { AdminModule } from '../admin/admin.module';
import { PrismaModule } from '../common/orm/prisma.module';
import { PrismaService } from '../common/orm/prisma.service';
import { S3Module } from '../s3/s3.module';
import { SellerPremiumController } from './seller-premium.controller';
import { SellerPremiumService } from './seller-premium.service';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => S3Module),
    PrismaModule,
  ],
  controllers: [SellerPremiumController],
  providers: [SellerPremiumService, PrismaService],
  exports: [SellerPremiumService],
})
export class SellerPremiumModule {}
