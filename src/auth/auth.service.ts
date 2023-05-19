import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async compareHash(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }

  async singIn(userId: string) {
    return this.jwtService.sign({ id: userId });
  }

  async validateUserByToken(token: string) {
    const decodedToken: any = this.jwtService.verify(token);
    const userEmail = decodedToken.email;
    return this.userService.findUserByEmail(userEmail);
  }
}