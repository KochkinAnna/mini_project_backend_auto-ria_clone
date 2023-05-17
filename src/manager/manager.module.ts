import { forwardRef, Module } from '@nestjs/common';

import { AdminModule } from '../admin/admin.module';
import { AuthModule } from '../auth/auth.module';
import { PrismaModule } from '../common/orm/prisma.module';
import { PrismaService } from '../common/orm/prisma.service';
import { ManagerController } from './manager.controller';
import { ManagerService } from './manager.service';

@Module({
  imports: [
    forwardRef(() => AdminModule),
    forwardRef(() => AuthModule),
    PrismaModule,
  ],
  controllers: [ManagerController],
  providers: [ManagerService, PrismaService],
  exports: [ManagerService],
})
export class ManagerModule {}
