import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AdminModule } from '../admin/admin.module';
import { AdminService } from '../admin/admin.service';
import { BuyerModule } from '../buyer/buyer.module';
import { CommonModule } from '../common/common.module';
import { MailService } from '../common/mail/mail.service';
import { AuthService } from './auth.service';
import { BearerStrategy } from './bearer.strategy';
import { SellerModule } from '../seller/seller.module';

@Module({
  imports: [
    CommonModule,
    PassportModule.register({ defaultStrategy: 'bearer' }),
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: 'Secret', // винести в енв
        signOptions: {
          expiresIn: '24h',
        },
      }),
    }),
    forwardRef(() => AdminModule),
    forwardRef(() => BuyerModule),
    forwardRef(() => SellerModule),
  ],
  providers: [AuthService, BearerStrategy, AdminService, MailService],
  exports: [AuthService],
})
export class AuthModule {}