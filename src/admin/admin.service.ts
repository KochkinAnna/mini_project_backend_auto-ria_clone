import { Injectable, NotFoundException } from '@nestjs/common';
import { Admin } from '@prisma/client';

import { PrismaService } from '../common/orm/prisma.service';
import { CreateAdminDto } from './dto/createAdmin.dto';
import { UpdateAdminDto } from './dto/updateAdmin.dto';

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
        user: {
          select: {
            email: true,
            firstName: true,
            lastName: true,
            avatar: true,
            phoneNumber: true,
          },
        },
      },
    });
  }

  async getAdminById(idAdmin: string): Promise<Admin> {
    const adminId = parseInt(idAdmin);
    if (isNaN(adminId)) {
      throw new Error(`Invalid ID: ${idAdmin}`);
    }
    return this.prismaService.admin.findFirst({
      where: {
        id: adminId,
      },
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

  async getAdminByFirstName(firstName: string): Promise<Admin> {
    const admin = await this.prismaService.admin.findFirst({
      where: {
        user: {
          firstName: firstName,
        },
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            avatar: true,
            role: true,
            phoneNumber: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });

    if (!admin) {
      throw new NotFoundException(
        `Admin with first name ${firstName} not found`,
      );
    }

    return admin;
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

  async updateAdmin(
    idAdmin: string,
    adminData: UpdateAdminDto,
  ): Promise<Admin> {
    const adminId = parseInt(idAdmin);
    if (isNaN(adminId)) {
      throw new Error(`Invalid ID: ${idAdmin}`);
    }
    return this.prismaService.admin.update({
      where: {
        id: adminId,
      },
      data: {
        user: {
          update: {
            email: adminData.email,
            firstName: adminData.firstName,
            lastName: adminData.lastName,
            avatar: adminData.avatar,
            phoneNumber: adminData.phoneNumber,
          },
        },
        company: adminData.company,
        position: adminData.position,
      },
      include: {
        user: {
          select: {
            email: true,
            firstName: true,
            lastName: true,
            avatar: true,
            phoneNumber: true,
          },
        },
      },
    });
  }

  async deleteAdmin(idAdmin: string): Promise<Admin> {
    const adminId = parseInt(idAdmin);
    if (isNaN(adminId)) {
      throw new Error(`Invalid ID: ${idAdmin}`);
    }
    return this.prismaService.admin.delete({
      where: {
        id: adminId,
      },
    });
  }
}
