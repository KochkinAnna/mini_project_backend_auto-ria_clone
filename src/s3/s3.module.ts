import { HttpModule, HttpService } from '@nestjs/axios';
import { forwardRef, Module } from '@nestjs/common';

import { AdminModule } from '../admin/admin.module';
import { AdminService } from '../admin/admin.service';
import { BuyerModule } from '../buyer/buyer.module';
import { BuyerService } from '../buyer/buyer.service';
import { PrismaModule } from '../common/orm/prisma.module';
import { PrismaService } from '../common/orm/prisma.service';
import { CurrencyService } from '../currency/currency.service';
import { ManagerModule } from '../manager/manager.module';
import { ManagerService } from '../manager/manager.service';
import { PasswordModule } from '../password/password.module';
import { SellerModule } from '../seller/seller.module';
import { SellerService } from '../seller/seller.service';
import { SellerPremiumModule } from '../seller-premium/seller-premium.module';
import { SellerPremiumService } from '../seller-premium/seller-premium.service';
import { S3Controller } from './s3.controller';
import { S3Service } from './s3.service';

@Module({
  imports: [
    HttpModule,
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
    CurrencyService,
  ],
  exports: [S3Service],
})
export class S3Module {}
