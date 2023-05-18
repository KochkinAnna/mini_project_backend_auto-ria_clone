import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http-bearer';

import { configs } from '../common/config/config';
import { AuthService } from './auth.service';

@Injectable()
export class BearerStrategy extends PassportStrategy(Strategy, 'bearer') {
  constructor(
    private authService: AuthService,
    private readonly jwtService: JwtService,
  ) {
    super();
  }

  async validate(token: string): Promise<any> {
    try {
      const payload = await this.jwtService.verify(token, {
        secret: configs.SECRET,
      });
      const user = await this.authService.findUserByEmail(payload.email);

      if (!user) {
        throw new UnauthorizedException();
      }

      return user;
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
