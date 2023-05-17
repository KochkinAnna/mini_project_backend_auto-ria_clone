import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AdminModule } from '../admin/admin.module';
import { AdminService } from '../admin/admin.service';
import { AuthModule } from './auth.module';
import { BearerStrategy } from './bearer.strategy';

@Global()
@Module({
  imports: [
    AdminModule,
    AuthModule,
    PassportModule.register({ defaultStrategy: 'bearer' }),
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: 'Secret',
        signOptions: {
          expiresIn: '24h',
        },
      }),
    }),
  ],
  providers: [BearerStrategy, AdminService],
  exports: [PassportModule],
})
export class PassportWrapperModule {}
