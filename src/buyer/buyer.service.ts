import { Injectable, NotFoundException } from '@nestjs/common';
import { Buyer } from '@prisma/client';

import { PrismaService } from '../common/orm/prisma.service';
import { CreateBuyerDto } from './dto/createBuyer.dto';
import { UpdateBuyerDto } from './dto/updateBuyer.dto';

@Injectable()
export class BuyerService {
  constructor(private readonly prismaService: PrismaService) {}

  async createBuyer(buyerData: CreateBuyerDto): Promise<Buyer> {
    return this.prismaService.buyer.create({
      data: {
        user: {
          create: {
            email: buyerData.email,
            password: buyerData.password,
            firstName: buyerData.firstName,
            lastName: buyerData.lastName,
            avatar: buyerData.avatar,
            role: buyerData.role,
            phoneNumber: buyerData.phoneNumber,
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

  async updateBuyer(
    idBuyer: string,
    buyerData: UpdateBuyerDto,
  ): Promise<Buyer> {
    const buyerId = parseInt(idBuyer);
    if (isNaN(buyerId)) {
      throw new Error(`Invalid ID: ${idBuyer}`);
    }
    return this.prismaService.buyer.update({
      where: {
        id: buyerId,
      },
      data: {
        user: {
          update: {
            email: buyerData.email,
            firstName: buyerData.firstName,
            lastName: buyerData.lastName,
            avatar: buyerData.avatar,
            phoneNumber: buyerData.phoneNumber,
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

  async getBuyerList(): Promise<Buyer[]> {
    return this.prismaService.buyer.findMany({
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

  async getBuyerById(idBuyer: string): Promise<Buyer> {
    const buyerId = parseInt(idBuyer);
    if (isNaN(buyerId)) {
      throw new Error(`Invalid ID: ${idBuyer}`);
    }
    return this.prismaService.buyer.findFirst({
      where: {
        id: buyerId,
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
          },
        },
        buyerId: true,
      },
    });
  }

  async getBuyerByFirstName(firstName: string): Promise<Buyer> {
    const buyer = await this.prismaService.buyer.findFirst({
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

    if (!buyer) {
      throw new NotFoundException(
        `Buyer with first name ${firstName} not found`,
      );
    }

    return buyer;
  }

  async deleteBuyer(idBuyer: string): Promise<Buyer> {
    const buyerId = parseInt(idBuyer);
    if (isNaN(buyerId)) {
      throw new Error(`Invalid ID: ${idBuyer}`);
    }
    return this.prismaService.buyer.delete({
      where: {
        id: buyerId,
      },
    });
  }

  async findBuyerByEmail(buyerEmail: string, include: any) {
    return this.prismaService.buyer.findFirst({
      where: {
        user: {
          email: buyerEmail,
        },
      },
      include,
    });
  }
}
