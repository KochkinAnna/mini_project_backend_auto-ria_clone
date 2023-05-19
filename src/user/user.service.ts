import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../common/orm/prisma.service';
import { User } from '.prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findUserByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async createUser(role: string, data: Prisma.UserCreateInput): Promise<User> {
    const userData: Prisma.UserCreateInput = {
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      avatar: data.avatar,
      role: data.role,
      phoneNumber: data.phoneNumber,
    };

    switch (role) {
      case 'BUYER':
        userData.buyer = { create: {} };
        break;
      case 'SELLER':
        userData.seller = { create: {} };
        break;
      case 'ADMIN':
        userData.admin = {
          create: { company: 'Company', position: 'Position' },
        };
        break;
      case 'MANAGER':
        userData.manager = { create: {} };
        break;
      default:
        throw new Error(`Invalid role: ${role}`);
    }

    return this.prisma.user.create({ data: userData });
  }
}
