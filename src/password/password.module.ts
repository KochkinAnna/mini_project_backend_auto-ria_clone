import { forwardRef, Module } from '@nestjs/common';

import { AdminModule } from '../admin/admin.module';
import { BuyerModule } from '../buyer/buyer.module';
import { PrismaModule } from '../common/orm/prisma.module';
import { PrismaService } from '../common/orm/prisma.service';
import { ManagerModule } from '../manager/manager.module';
import { SellerModule } from '../seller/seller.module';
import { PasswordController } from './password.controller';
import { PasswordService } from './password.service';

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => BuyerModule),
    forwardRef(() => ManagerModule),
    forwardRef(() => SellerModule),
    forwardRef(() => AdminModule),
  ],
  controllers: [PasswordController],
  providers: [PrismaService, PasswordService],
  exports: [PasswordService],
})
export class PasswordModule {}
