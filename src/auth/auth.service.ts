import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { AdminService } from '../admin/admin.service';

@Injectable()
export class AuthService {
  constructor(
    private adminService: AdminService,
    private jwtService: JwtService,
  ) {}

  async compareHash(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }

  async singIn(userId: string) {
    return this.jwtService.sign({ id: userId });
  }
}
