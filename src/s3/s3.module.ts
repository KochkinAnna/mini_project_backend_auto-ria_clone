import { forwardRef, Module } from '@nestjs/common';

import { AdminModule } from '../admin/admin.module';
import { AdminService } from '../admin/admin.service';
import { BuyerService } from '../buyer/buyer.service';
import { PrismaModule } from '../common/orm/prisma.module';
import { PrismaService } from '../common/orm/prisma.service';
import { ManagerService } from '../manager/manager.service';
import { SellerService } from '../seller/seller.service';
import { S3Controller } from './s3.controller';
import { S3Service } from './s3.service';
import { BuyerModule } from '../buyer/buyer.module';
import { ManagerModule } from '../manager/manager.module';
import { SellerModule } from '../seller/seller.module';
import { PasswordModule } from '../password/password.module';
import { SellerPremiumModule } from '../seller-premium/seller-premium.module';
import { SellerPremiumService } from '../seller-premium/seller-premium.service';

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => AdminModule),
    forwardRef(() => BuyerModule),
    forwardRef(() => ManagerModule),
    forwardRef(() => SellerModule),
    forwardRef(() => SellerPremiumModule),
    forwardRef(() => PasswordModule),
  ],
  controllers: [S3Controller],
  providers: [
    S3Service,
    PrismaService,
    AdminService,
    BuyerService,
    ManagerService,
    SellerService,
    SellerPremiumService,
  ],
  exports: [S3Service],
})
export class S3Module {}
