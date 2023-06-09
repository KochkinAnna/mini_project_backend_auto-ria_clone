import { forwardRef, Module } from '@nestjs/common';

import { BuyerModule } from '../buyer/buyer.module';
import { BuyerService } from '../buyer/buyer.service';
import { PrismaModule } from '../common/orm/prisma.module';
import { PrismaService } from '../common/orm/prisma.service';
import { ManagerModule } from '../manager/manager.module';
import { ManagerService } from '../manager/manager.service';
import { PasswordModule } from '../password/password.module';
import { PasswordService } from '../password/password.service';
import { SellerModule } from '../seller/seller.module';
import { SellerService } from '../seller/seller.service';
import { SellerPremiumModule } from '../seller-premium/seller-premium.module';
import { SellerPremiumService } from '../seller-premium/seller-premium.service';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { S3Service } from '../s3/s3.service';
import { S3Module } from '../s3/s3.module';
import { CurrencyModule } from '../currency/currency.module';
import { CurrencyService } from '../currency/currency.service';
import { HttpModule, HttpService } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    PrismaModule,
    forwardRef(() => BuyerModule),
    forwardRef(() => ManagerModule),
    forwardRef(() => SellerModule),
    forwardRef(() => SellerPremiumModule),
    forwardRef(() => PasswordModule),
    forwardRef(() => S3Module),
    forwardRef(() => CurrencyModule),
  ],
  controllers: [AdminController],
  providers: [
    AdminService,
    PrismaService,
    BuyerService,
    ManagerService,
    PasswordService,
    S3Service,
    SellerService,
    SellerPremiumService,
    CurrencyService,
  ],
  exports: [AdminService],
})
export class AdminModule {}
