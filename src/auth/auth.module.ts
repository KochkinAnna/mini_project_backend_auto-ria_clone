import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AdminModule } from '../admin/admin.module';
import { BuyerModule } from '../buyer/buyer.module';
import { CommonModule } from '../common/common.module';
import { configs } from '../common/config/config';
import { MailService } from '../common/mail/mail.service';
import { ManagerModule } from '../manager/manager.module';
import { SellerModule } from '../seller/seller.module';
import { AuthService } from './auth.service';
import { BearerStrategy } from './bearer.strategy';

@Module({
  imports: [
    CommonModule,
    PassportModule.register({ defaultStrategy: 'bearer' }),
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: configs.SECRET,
        signOptions: {
          expiresIn: '24h',
        },
      }),
    }),
    forwardRef(() => AdminModule),
    forwardRef(() => BuyerModule),
    forwardRef(() => SellerModule),
    forwardRef(() => ManagerModule),
  ],
  providers: [AuthService, BearerStrategy, MailService],
  exports: [AuthService],
})
export class AuthModule {}
