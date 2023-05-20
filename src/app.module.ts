import { HttpModule, HttpService } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AdminController } from './admin/admin.controller';
import { AdminModule } from './admin/admin.module';
import { AdminService } from './admin/admin.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { PassportWrapperModule } from './auth/passport-wrapper.module';
import { BuyerController } from './buyer/buyer.controller';
import { BuyerModule } from './buyer/buyer.module';
import { BuyerService } from './buyer/buyer.service';
import { CardealershipController } from './cardealership/cardealership.controller';
import { CardealershipModule } from './cardealership/cardealership.module';
import { CardealershipService } from './cardealership/cardealership.service';
import { CardealershipAdminController } from './cardealership-admin/cardealership-admin.controller';
import { CardealershipAdminModule } from './cardealership-admin/cardealership-admin.module';
import { CardealershipAdminService } from './cardealership-admin/cardealership-admin.service';
import { CardealershipManagerController } from './cardealership-manager/cardealership-manager.controller';
import { CardealershipManagerModule } from './cardealership-manager/cardealership-manager.module';
import { CardealershipManagerService } from './cardealership-manager/cardealership-manager.service';
import { CardealershipMechanicController } from './cardealership-mechanic/cardealership-mechanic.controller';
import { CardealershipMechanicModule } from './cardealership-mechanic/cardealership-mechanic.module';
import { CardealershipMechanicService } from './cardealership-mechanic/cardealership-mechanic.service';
import { CardealershipSalesController } from './cardealership-sales/cardealership-sales.controller';
import { CardealershipSalesModule } from './cardealership-sales/cardealership-sales.module';
import { CardealershipSalesService } from './cardealership-sales/cardealership-sales.service';
import { CardealershipServiceManagerController } from './cardealership-service-manager/cardealership-service-manager.controller';
import { CardealershipServiceManagerModule } from './cardealership-service-manager/cardealership-service-manager.module';
import { MailModule } from './common/mail/mail.module';
import { MailService } from './common/mail/mail.service';
import { PrismaModule } from './common/orm/prisma.module';
import { PrismaService } from './common/orm/prisma.service';
import { CurrencyModule } from './currency/currency.module';
import { CurrencyService } from './currency/currency.service';
import { ManagerController } from './manager/manager.controller';
import { ManagerModule } from './manager/manager.module';
import { ManagerService } from './manager/manager.service';
import { PasswordController } from './password/password.controller';
import { PasswordModule } from './password/password.module';
import { PasswordService } from './password/password.service';
import { S3Controller } from './s3/s3.controller';
import { S3Module } from './s3/s3.module';
import { S3Service } from './s3/s3.service';
import { SellerController } from './seller/seller.controller';
import { SellerModule } from './seller/seller.module';
import { SellerService } from './seller/seller.service';
import { SellerPremiumController } from './seller-premium/seller-premium.controller';
import { SellerPremiumModule } from './seller-premium/seller-premium.module';
import { SellerPremiumService } from './seller-premium/seller-premium.service';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';

@Module({
  imports: [
    AdminModule,
    AuthModule,
    BuyerModule,
    CardealershipModule,
    CardealershipAdminModule,
    CardealershipManagerModule,
    CardealershipMechanicModule,
    CardealershipSalesModule,
    CardealershipServiceManagerModule,
    CurrencyModule,
    HttpModule,
    MailModule,
    ManagerModule,
    PasswordModule,
    PassportWrapperModule,
    PrismaModule,
    S3Module,
    SellerModule,
    SellerPremiumModule,
    UserModule,
  ],
  controllers: [
    AppController,
    AdminController,
    AuthController,
    BuyerController,
    CardealershipController,
    CardealershipAdminController,
    CardealershipManagerController,
    CardealershipSalesController,
    CardealershipMechanicController,
    CardealershipServiceManagerController,
    ManagerController,
    PasswordController,
    S3Controller,
    SellerController,
    SellerPremiumController,
  ],
  providers: [
    AppService,
    AdminService,
    AuthService,
    BuyerService,
    JwtService,
    CardealershipService,
    CardealershipAdminService,
    CardealershipManagerService,
    CardealershipMechanicService,
    CardealershipSalesService,
    CurrencyService,
    MailService,
    ManagerService,
    PasswordService,
    PrismaService,
    SellerService,
    SellerPremiumService,
    S3Service,
    UserService,
  ],
})
export class AppModule {}
