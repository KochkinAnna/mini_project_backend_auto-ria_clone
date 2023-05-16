import { Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

import { Period } from '../common/enum/views-period.enum';
import { SellerPremiumService } from './seller-premium.service';

@ApiTags('Seller Premium')
@Controller('sellerPremium')
export class SellerPremiumController {
  constructor(private readonly sellerPremiumService: SellerPremiumService) {}

  @ApiOperation({ summary: 'Upgrade seller to premium' })
  @ApiParam({ name: 'sellerId', required: true })
  @Post(':sellerId')
  async upgradeToPremium(@Param('sellerId') sellerId: string): Promise<void> {
    await this.sellerPremiumService.upgradeToPremium(sellerId);
  }

  @ApiOperation({ summary: 'Cancel seller premium subscription' })
  @ApiParam({ name: 'sellerId', required: true })
  @Post(':sellerId/cancel')
  async cancelPremium(@Param('sellerId') sellerId: string): Promise<void> {
    await this.sellerPremiumService.cancelPremium(sellerId);
  }

  @ApiOperation({ summary: 'Get views count for a seller' })
  @ApiParam({ name: 'sellerId', required: true })
  @Get(':sellerId/views')
  async getViewsCount(@Param('sellerId') sellerId: string): Promise<number> {
    return this.sellerPremiumService.getViewsCount(sellerId);
  }

  @ApiOperation({ summary: 'Get views count per period for a seller' })
  @ApiParam({ name: 'sellerId', required: true })
  @ApiParam({ name: 'period', enum: ['day', 'week', 'month'], required: true })
  @Get(':sellerId/views/:period')
  async getViewsCountPerPeriod(
    @Param('sellerId') sellerId: string,
    @Param('period') period: Period,
  ): Promise<number> {
    return this.sellerPremiumService.getViewsCountPerPeriod(sellerId, period);
  }

  @ApiOperation({ summary: 'Get average price in seller region' })
  @ApiParam({ name: 'sellerId', required: true })
  @Get(':sellerId/averagePrice/region')
  async getAveragePriceRegion(
    @Param('sellerId') sellerId: string,
  ): Promise<number | null> {
    return this.sellerPremiumService.getAveragePriceRegion(sellerId);
  }

  @ApiOperation({ summary: 'Get average price in Ukraine' })
  @ApiParam({ name: 'sellerId', required: true })
  @Get(':sellerId/averagePrice/ukraine')
  async getAveragePriceUkraine(
    @Param('sellerId') sellerId: string,
  ): Promise<number | null> {
    return this.sellerPremiumService.getAveragePriceUkraine(sellerId);
  }
}
