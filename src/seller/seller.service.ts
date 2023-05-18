import { Injectable, NotFoundException } from '@nestjs/common';
import { Car, Seller } from '@prisma/client';

import CreateCarDto from '../car/dto/createCar.dto';
import UpdateCarDto from '../car/dto/updateCar.dto';
import { PrismaService } from '../common/orm/prisma.service';
import { Currency } from '../common/type/currancy.type';
import { PasswordService } from '../password/password.service';
import CreateSellerDto from './dto/createSeller.dto';
import UpdateSellerDto from './dto/updateSeller.dto';

@Injectable()
export class SellerService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly passwordService: PasswordService,
  ) {}

  async createSeller(sellerData: CreateSellerDto): Promise<Seller> {
    const passwordHash = await this.passwordService.hashPass(sellerData.password);
    return this.prismaService.seller.create({
      data: {
        user: {
          create: {
            email: sellerData.email,
            password: passwordHash,
            firstName: sellerData.firstName,
            lastName: sellerData.lastName,
            avatar: sellerData.avatar,
            role: sellerData.role,
            phoneNumber: sellerData.phoneNumber,
          },
        },
      },
      include: {
        user: true,
      },
    });
  }

  async updateSeller(
    idSeller: string,
    sellerData: UpdateSellerDto,
  ): Promise<Seller> {
    const sellerId = parseInt(idSeller);
    if (isNaN(sellerId)) {
      throw new Error(`Invalid ID: ${idSeller}`);
    }
    return this.prismaService.seller.update({
      where: {
        id: sellerId,
      },
      data: {
        user: {
          update: {
            email: sellerData.email,
            firstName: sellerData.firstName,
            lastName: sellerData.lastName,
            avatar: sellerData.avatar,
            phoneNumber: sellerData.phoneNumber,
          },
        },
      },
      include: {
        user: true,
      },
    });
  }

  async getSellerById(idSeller: string): Promise<Seller> {
    const sellerId = parseInt(idSeller);
    if (isNaN(sellerId)) {
      throw new Error(`Invalid ID: ${idSeller}`);
    }
    const seller = await this.prismaService.seller.findFirst({
      where: {
        id: sellerId,
      },
      include: {
        user: true,
      },
    });

    if (!seller) {
      throw new NotFoundException(`Seller with ID ${idSeller} not found`);
    }

    return seller;
  }

  async getSellerByFirstName(firstName: string): Promise<Seller> {
    const seller = await this.prismaService.seller.findFirst({
      where: {
        user: {
          firstName: firstName,
        },
      },
      include: {
        user: true,
      },
    });

    if (!seller) {
      throw new NotFoundException(
        `Seller with first name ${firstName} not found`,
      );
    }

    return seller;
  }

  async getSellerList(): Promise<Seller[]> {
    return this.prismaService.seller.findMany({
      orderBy: {
        user: {
          firstName: 'asc',
        },
      },
      include: {
        user: true,
        premiumSeller: true,
      },
    });
  }

  async deleteSeller(idSeller: string): Promise<Seller> {
    const sellerId = parseInt(idSeller);
    if (isNaN(sellerId)) {
      throw new Error(`Invalid ID: ${idSeller}`);
    }
    return this.prismaService.seller.delete({
      where: {
        id: sellerId,
      },
    });
  }

  async createCar(idSeller: string, carData: CreateCarDto): Promise<Car> {
    const sellerId = parseInt(idSeller);
    if (isNaN(sellerId)) {
      throw new Error(`Invalid Seller ID: ${idSeller}`);
    }

    const seller = await this.prismaService.seller.findUnique({
      where: {
        userId: sellerId,
      },
    });

    if (!seller) {
      throw new NotFoundException(`Seller with ID ${idSeller} not found`);
    }

    if (seller.carCount >= 1 && !seller.premiumSellerId) {
      throw new Error('An ordinary seller can have only one car');
    }

    const car = await this.prismaService.car.create({
      data: {
        brand: carData.brand,
        model: carData.model,
        year: carData.year,
        region: carData.region,
        mileage: carData.mileage,
        price: carData.price,
        currency: carData.currency as Currency,
        description: carData.description,
        image: carData.image,
        seller: {
          connect: {
            id: seller.id,
          },
        },
        owner: {
          connect: {
            id: seller.id,
          },
        },
      },
    });

    await this.prismaService.seller.update({
      where: { id: seller.id },
      data: { carCount: seller.carCount + 1 },
    });

    return car;
  }

  async updateCar(
    idSeller: string,
    idCar: string,
    carData: UpdateCarDto,
  ): Promise<Car> {
    const sellerId = parseInt(idSeller);
    const carId = parseInt(idCar);

    if (isNaN(sellerId)) {
      throw new Error(`Invalid Seller ID: ${idSeller}`);
    }

    if (isNaN(carId)) {
      throw new Error(`Invalid Car ID: ${idCar}`);
    }

    const seller = await this.prismaService.seller.findUnique({
      where: {
        id: sellerId,
      },
    });

    if (!seller) {
      throw new NotFoundException(`Seller with ID ${idSeller} not found`);
    }

    return this.prismaService.car.update({
      where: {
        id: carId,
      },
      data: {
        brand: carData.brand,
        model: carData.model,
        year: carData.year,
        region: carData.region,
        mileage: carData.mileage,
        price: carData.price,
        currency: carData.currency as Currency,
        description: carData.description,
        image: carData.image,
        seller: {
          connect: {
            id: sellerId,
          },
        },
        owner: {
          connect: {
            id: seller.id,
          },
        },
      },
    });
  }

  async getCars(idSeller: string): Promise<Car[]> {
    const sellerId = parseInt(idSeller);
    if (isNaN(sellerId)) {
      throw new Error(`Invalid Seller ID: ${idSeller}`);
    }

    const seller = await this.prismaService.seller.findUnique({
      where: {
        id: sellerId,
      },
    });

    if (!seller) {
      throw new NotFoundException(`Seller with ID ${idSeller} not found`);
    }

    return this.prismaService.car.findMany({
      where: {
        sellerId: sellerId,
      },
    });
  }

  async getCar(idSeller: string, idCar: string): Promise<Car> {
    const sellerId = parseInt(idSeller);
    const carId = parseInt(idCar);

    if (isNaN(sellerId)) {
      throw new Error(`Invalid Seller ID: ${idSeller}`);
    }

    if (isNaN(carId)) {
      throw new Error(`Invalid Car ID: ${idCar}`);
    }

    const seller = await this.prismaService.seller.findUnique({
      where: {
        id: sellerId,
      },
    });

    if (!seller) {
      throw new NotFoundException(`Seller with ID ${idSeller} not found`);
    }

    return this.prismaService.car.findFirst({
      where: {
        id: carId,
        sellerId: sellerId,
      },
    });
  }

  async deleteCar(idSeller: string, idCar: string): Promise<void> {
    const sellerId = parseInt(idSeller);
    const carId = parseInt(idCar);

    if (isNaN(sellerId)) {
      throw new Error(`Invalid Seller ID: ${idSeller}`);
    }

    if (isNaN(carId)) {
      throw new Error(`Invalid Car ID: ${idCar}`);
    }

    const seller = await this.prismaService.seller.findUnique({
      where: {
        id: sellerId,
      },
    });

    if (!seller) {
      throw new NotFoundException(`Seller with ID ${idSeller} not found`);
    }

    await this.prismaService.car.delete({
      where: {
        id: carId,
      },
    });
  }

  async findSellerByEmail(sellerEmail: string, include: any) {
    return this.prismaService.seller.findFirst({
      where: {
        user: {
          email: sellerEmail,
        },
      },
      include,
    });
  }
}
