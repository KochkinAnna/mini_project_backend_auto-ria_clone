import { Injectable } from '@nestjs/common';
import { Admin } from '@prisma/client';

import { PrismaService } from '../common/orm/prisma.service';
import { CreateAdminDto } from './dto/createAdmin.dto';

@Injectable()
export class AdminService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAdminList(): Promise<Admin[]> {
    return this.prismaService.admin.findMany({
      orderBy: {
        user: {
          firstName: 'asc',
        },
      },
      include: {
        user: true,
      },
    });
  }

  async getAdminById(idAdmin: string): Promise<Admin> {
    return this.prismaService.admin.findFirst({
      where: { id: Number(idAdmin) },
      select: {
        id: true,
        company: true,
        position: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            email: true,
            firstName: true,
            lastName: true,
            avatar: true,
            phoneNumber: true,
          },
        },
        adminId: true,
      },
    });
  }

  async createAdmin(adminData: CreateAdminDto): Promise<Admin> {
    return this.prismaService.admin.create({
      data: {
        user: {
          create: {
            email: adminData.email,
            password: adminData.password,
            firstName: adminData.firstName,
            lastName: adminData.lastName,
            avatar: adminData.avatar,
            role: adminData.role,
            phoneNumber: adminData.phoneNumber,
          },
        },
        company: adminData.company,
        position: adminData.position,
      },
    });
  }

  async updateAdmin() {}

  async deleteAdmin(idAdmin: string) {}
}
