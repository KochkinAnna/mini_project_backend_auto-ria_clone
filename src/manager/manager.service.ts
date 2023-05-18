import { Injectable, NotFoundException } from '@nestjs/common';
import { Manager } from '@prisma/client';

import { UserRole } from '../common/enum/user-role.enum';
import { PrismaService } from '../common/orm/prisma.service';
import { PasswordService } from '../password/password.service';
import { CreateManagerDto } from './dto/createManager.dto';
import { UpdateManagerDto } from './dto/updateManager.dto';

@Injectable()
export class ManagerService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly passwordService: PasswordService,
  ) {}

  async createManager(managerData: CreateManagerDto): Promise<Manager> {
    const passwordHash = await this.passwordService.hashPass(managerData.password);
    return this.prismaService.manager.create({
      data: {
        user: {
          create: {
            email: managerData.email,
            password: passwordHash,
            firstName: managerData.firstName,
            lastName: managerData.lastName,
            avatar: managerData.avatar,
            role: UserRole.MANAGER,
            phoneNumber: managerData.phoneNumber,
          },
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

  async updateManager(
    idManager: string,
    managerData: UpdateManagerDto,
  ): Promise<Manager> {
    const managerId = parseInt(idManager);
    if (isNaN(managerId)) {
      throw new Error(`Invalid ID: ${idManager}`);
    }
    return this.prismaService.manager.update({
      where: {
        id: managerId,
      },
      data: {
        user: {
          update: {
            email: managerData.email,
            firstName: managerData.firstName,
            lastName: managerData.lastName,
            avatar: managerData.avatar,
            phoneNumber: managerData.phoneNumber,
          },
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

  async getManagerList(): Promise<Manager[]> {
    return this.prismaService.manager.findMany({
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

  async getManagerById(idManager: string): Promise<Manager> {
    const managerId = parseInt(idManager);
    if (isNaN(managerId)) {
      throw new Error(`Invalid ID: ${idManager}`);
    }
    return this.prismaService.manager.findFirst({
      where: {
        id: managerId,
      },
      select: {
        id: true,
        user: {
          select: {
            email: true,
            firstName: true,
            lastName: true,
            avatar: true,
            phoneNumber: true,
            updatedAt: true,
          },
        },
        managerId: true,
      },
    });
  }

  async getManagerByFirstName(firstName: string): Promise<Manager> {
    const manager = await this.prismaService.manager.findFirst({
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

    if (!manager) {
      throw new NotFoundException(
        `Manager with first name ${firstName} not found`,
      );
    }

    return manager;
  }

  async deleteManager(idManager: string): Promise<Manager> {
    const managerId = parseInt(idManager);
    if (isNaN(managerId)) {
      throw new Error(`Invalid ID: ${idManager}`);
    }
    return this.prismaService.manager.delete({
      where: {
        id: managerId,
      },
    });
  }

  async findManagerByEmail(managerEmail: string, include: any) {
    return this.prismaService.manager.findFirst({
      where: {
        user: {
          email: managerEmail,
        },
      },
      include,
    });
  }
}
