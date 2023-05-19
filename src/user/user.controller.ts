import { Body, Controller, Post } from '@nestjs/common';

import { UserService } from './user.service';
import { User } from '.prisma/client';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(@Body() body: UserRequestBody): Promise<User> {
    const { firstName, email, password, role, phoneNumber } = body;
    return await this.userService.createUser(role, {
      firstName: firstName || 'User',
      email,
      password,
      phoneNumber,
    });
  }
}

interface UserRequestBody {
  firstName?: string;
  email: string;
  password: string;
  role: string;
  phoneNumber: string;
}
