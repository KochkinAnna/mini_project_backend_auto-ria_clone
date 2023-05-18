import { forwardRef, Module } from '@nestjs/common';

import { AdminModule } from '../admin/admin.module';
import { AuthModule } from '../auth/auth.module';
import { PrismaModule } from '../common/orm/prisma.module';
import { PrismaService } from '../common/orm/prisma.service';
import { PasswordModule } from '../password/password.module';
import { PasswordService } from '../password/password.service';
import { SellerController } from './seller.controller';
import { SellerService } from './seller.service';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => AuthModule),
    forwardRef(() => PasswordModule),
    PrismaModule,
  ],
  controllers: [SellerController],
  providers: [SellerService, PrismaService, PasswordService],
  exports: [SellerService],
})
export class SellerModule {}
