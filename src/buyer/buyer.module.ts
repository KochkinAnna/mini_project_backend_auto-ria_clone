import { forwardRef, Module } from '@nestjs/common';

import { AdminModule } from '../admin/admin.module';
import { AuthModule } from '../auth/auth.module';
import { PrismaModule } from '../common/orm/prisma.module';
import { PrismaService } from '../common/orm/prisma.service';
import { BuyerController } from './buyer.controller';
import { BuyerService } from './buyer.service';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => AuthModule),
    PrismaModule,
  ],
  controllers: [BuyerController],
  providers: [BuyerService, PrismaService],
  exports: [BuyerService],
})
export class BuyerModule {}
