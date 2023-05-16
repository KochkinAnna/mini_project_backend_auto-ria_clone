import { Injectable, NotFoundException } from '@nestjs/common';
import { PremiumSeller } from '@prisma/client';

import { Period } from '../common/enum/views-period.enum';
import { PrismaService } from '../common/orm/prisma.service';

@Injectable()
export class SellerPremiumService {
  constructor(private readonly prismaService: PrismaService) {}

  async upgradeToPremium(sellerId: string): Promise<PremiumSeller> {
    const seller = await this.prismaService.seller.findUnique({
      where: { id: parseInt(sellerId) },
      include: { premiumSeller: true },
    });
    if (!seller) {
      throw new NotFoundException('Seller not found');
    }

    let updatedPremiumSeller: PremiumSeller;

    if (!seller.premiumSeller) {
      updatedPremiumSeller = await this.prismaService.premiumSeller.upsert({
        where: { sellerId: seller.id },
        create: {
          sellerId: seller.id,
          views: 1,
        },
        update: {
          views: 1,
        },
      });

      await this.prismaService.seller.update({
        where: { id: seller.id },
        data: { premiumSellerId: updatedPremiumSeller.id },
      });
    } else {
      updatedPremiumSeller = await this.prismaService.premiumSeller.update({
        where: { id: seller.premiumSeller.id },
        data: { views: seller.premiumSeller.views + 1 },
      });
    }

    return updatedPremiumSeller;
  }

  async cancelPremium(sellerId: string): Promise<void> {
    const seller = await this.prismaService.seller.findUnique({
      where: { id: parseInt(sellerId) },
      include: { premiumSeller: true },
    });
    if (!seller) {
      throw new NotFoundException('Seller not found');
    }

    if (seller.premiumSeller) {
      await this.prismaService.premiumSeller.delete({
        where: { id: seller.premiumSeller.id },
      });
    }

    await this.prismaService.seller.update({
      where: { id: parseInt(sellerId) },
      data: { premiumSeller: undefined },
    });
  }

  async getViewsCount(sellerId: string): Promise<number> {
    const seller = await this.prismaService.seller.findUnique({
      where: { id: parseInt(sellerId) },
      include: { premiumSeller: true },
    });
    if (!seller) {
      throw new NotFoundException('Seller not found');
    }

    if (!seller.premiumSeller) {
      return 0;
    }

    return seller.premiumSeller.views;
  }

  async getViewsCountPerPeriod(
    sellerId: string,
    period: Period,
  ): Promise<number> {
    const seller = await this.prismaService.seller.findUnique({
      where: { id: parseInt(sellerId) },
      include: { premiumSeller: true },
    });
    if (!seller) {
      throw new NotFoundException('Seller not found');
    }

    if (!seller.premiumSeller) {
      return 0;
    }

    switch (period) {
      case 'day':
        return seller.premiumSeller.viewsPerDay ?? 0;
      case 'week':
        return seller.premiumSeller.viewsPerWeek ?? 0;
      case 'month':
        return seller.premiumSeller.viewsPerMonth ?? 0;
      default:
        return 0;
    }
  }

  async getAveragePriceRegion(sellerId: string): Promise<number | null> {
    const seller = await this.prismaService.seller.findUnique({
      where: { id: parseInt(sellerId) },
      include: { premiumSeller: true, cars: { include: { seller: true } } },
    });

    if (!seller) {
      throw new NotFoundException('Seller not found');
    }

    if (!seller.premiumSeller) {
      return null;
    }

    const cars = seller.cars;
    const carCount = cars.length;

    if (carCount === 0) {
      return null;
    }

    let totalPrice = 0;

    for (const car of cars) {
      totalPrice += car.price;
    }

    return totalPrice / carCount;
  }

  async getAveragePriceUkraine(sellerId: string): Promise<number | null> {
    const seller = await this.prismaService.seller.findUnique({
      where: { id: parseInt(sellerId) },
      include: { premiumSeller: true },
    });
    if (!seller) {
      throw new NotFoundException('Seller not found');
    }

    if (!seller.premiumSeller) {
      return null;
    }

    return seller.premiumSeller.averagePriceUkraine ?? null;
  }
}
