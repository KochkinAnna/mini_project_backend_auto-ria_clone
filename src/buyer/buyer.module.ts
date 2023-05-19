import { forwardRef, Module } from '@nestjs/common';

import { AdminModule } from '../admin/admin.module';
import { AuthModule } from '../auth/auth.module';
import { PrismaModule } from '../common/orm/prisma.module';
import { PrismaService } from '../common/orm/prisma.service';
import { PasswordModule } from '../password/password.module';
import { PasswordService } from '../password/password.service';
import { BuyerController } from './buyer.controller';
import { BuyerService } from './buyer.service';
import { S3Module } from '../s3/s3.module';
import { S3Service } from '../s3/s3.service';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => AuthModule),
    forwardRef(() => PasswordModule),
    forwardRef(() => S3Module),
    PrismaModule,
  ],
  controllers: [BuyerController],
  providers: [BuyerService, PrismaService, PasswordService, S3Service],
  exports: [BuyerService],
})
export class BuyerModule {}
