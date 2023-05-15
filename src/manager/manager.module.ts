import { Module } from '@nestjs/common';

import { PrismaModule } from '../common/orm/prisma.module';
import { PrismaService } from '../common/orm/prisma.service';
import { ManagerController } from './manager.controller';
import { ManagerService } from './manager.service';

@Module({
  imports: [PrismaModule],
  controllers: [ManagerController],
  providers: [ManagerService, PrismaService],
})
export class ManagerModule {}
