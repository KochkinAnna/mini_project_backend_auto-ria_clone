import { Module } from '@nestjs/common';

import { AdminController } from './admin/admin.controller';
import { AdminModule } from './admin/admin.module';
import { AdminService } from './admin/admin.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { BuyerController } from './buyer/buyer.controller';
import { BuyerModule } from './buyer/buyer.module';
import { BuyerService } from './buyer/buyer.service';
import { CarController } from './car/car.controller';
import { CarModule } from './car/car.module';
import { CarService } from './car/car.service';
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
import { PrismaModule } from './common/orm/prisma.module';
import { PrismaService } from './common/orm/prisma.service';
import { ManagerController } from './manager/manager.controller';
import { ManagerModule } from './manager/manager.module';
import { ManagerService } from './manager/manager.service';
import { SellerController } from './seller/seller.controller';
import { SellerModule } from './seller/seller.module';
import { SellerService } from './seller/seller.service';
import { SellerPremiumController } from './seller-premium/seller-premium.controller';
import { SellerPremiumModule } from './seller-premium/seller-premium.module';
import { SellerPremiumService } from './seller-premium/seller-premium.service';

@Module({
  imports: [
    AdminModule,
    AuthModule,
    BuyerModule,
    CarModule,
    CardealershipModule,
    CardealershipAdminModule,
    CardealershipManagerModule,
    CardealershipMechanicModule,
    CardealershipSalesModule,
    CardealershipServiceManagerModule,
    ManagerModule,
    PrismaModule,
    SellerModule,
    SellerPremiumModule,
  ],
  controllers: [
    AppController,
    AdminController,
    AuthController,
    BuyerController,
    CarController,
    CardealershipController,
    CardealershipAdminController,
    CardealershipManagerController,
    CardealershipSalesController,
    CardealershipMechanicController,
    CardealershipServiceManagerController,
    ManagerController,
    SellerController,
    SellerPremiumController,
  ],
  providers: [
    AppService,
    AdminService,
    AuthService,
    BuyerService,
    CarService,
    CardealershipService,
    CardealershipAdminService,
    CardealershipManagerService,
    CardealershipMechanicService,
    CardealershipSalesService,
    ManagerService,
    PrismaService,
    SellerService,
    SellerPremiumService,
  ],
})
export class AppModule {}
