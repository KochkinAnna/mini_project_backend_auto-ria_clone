import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Admin } from '@prisma/client';
import { Strategy } from 'passport-http-bearer';

import { AdminService } from '../admin/admin.service';
import { AuthService } from './auth.service';

@Injectable()
export class BearerStrategy extends PassportStrategy(Strategy, 'bearer') {
  constructor(
    private authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly adminService: AdminService,
  ) {
    super();
  }

  async validate(token: string): Promise<any> {
    let admin: Admin;
    try {
      const payload = await this.jwtService.verify(token);
      admin = await this.adminService.getAdminById(payload.id);
      // if (!user) {
      //   throw new UnauthorizedException();
      // }
    } catch (err) {
      console.log(new Date().toISOString(), token);
      throw new UnauthorizedException();
    }
    return admin;
  }
}
