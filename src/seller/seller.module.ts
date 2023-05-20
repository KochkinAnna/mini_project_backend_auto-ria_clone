import { forwardRef, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { AdminModule } from '../admin/admin.module';
import { AuthModule } from '../auth/auth.module';
import { PrismaModule } from '../common/orm/prisma.module';
import { PrismaService } from '../common/orm/prisma.service';
import { CurrencyModule } from '../currency/currency.module';
import { CurrencyService } from '../currency/currency.service';
import { PasswordModule } from '../password/password.module';
import { PasswordService } from '../password/password.service';
import { S3Module } from '../s3/s3.module';
import { S3Service } from '../s3/s3.service';
import { SellerController } from './seller.controller';
import { SellerService } from './seller.service';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => AuthModule),
    forwardRef(() => PasswordModule),
    forwardRef(() => S3Module),
    forwardRef(() => CurrencyModule),
    PrismaModule,
    HttpModule,
  ],
  controllers: [SellerController],
  providers: [
    SellerService,
    PrismaService,
    PasswordService,
    S3Service,
    CurrencyService,
  ],
  exports: [SellerService],
})
export class SellerModule {}