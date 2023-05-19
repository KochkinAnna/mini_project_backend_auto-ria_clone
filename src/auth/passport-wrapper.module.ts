import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AdminModule } from '../admin/admin.module';
import { configs } from '../common/config/config';
import { UserService } from '../user/user.service';
import { AuthModule } from './auth.module';
import { AuthService } from './auth.service';
import { BearerStrategy } from './bearer.strategy';

@Global()
@Module({
  imports: [
    AdminModule,
    AuthModule,
    PassportModule.register({ defaultStrategy: 'bearer' }),
    JwtModule.register({
      secret: configs.SECRET,
      signOptions: {
        expiresIn: '24h',
      },
    }),
  ],
  providers: [BearerStrategy, AuthService, UserService],
  exports: [PassportModule],
})
export class PassportWrapperModule {}
