import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AdminModule } from '../admin/admin.module';
import { configs } from '../common/config/config';
import { AuthModule } from './auth.module';
import { AuthService } from './auth.service';
import { BearerStrategy } from './bearer.strategy';

@Global()
@Module({
  imports: [
    AdminModule,
    AuthModule,
    PassportModule.register({ defaultStrategy: 'bearer' }),
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: configs.SECRET,
        signOptions: {
          expiresIn: '24h',
        },
      }),
    }),
  ],
  providers: [BearerStrategy, AuthService],
  exports: [PassportModule],
})
export class PassportWrapperModule {}
