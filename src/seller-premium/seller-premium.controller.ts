import {
  Body,
  Controller,
  forwardRef,
  Get,
  HttpStatus,
  Inject,
  Param,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { diskStorage } from 'multer';

import CreateCarDto from '../car/dto/createCar.dto';
import { Period } from '../common/enum/views-period.enum';
import { buildPath } from '../common/helpers/helpers';
import { MulterFile } from '../common/interface/multer-file.interface';
import { S3Service } from '../s3/s3.service';
import { SellerPremiumService } from './seller-premium.service';

@ApiTags('Seller Premium')
@Controller('sellerPremium')
export class SellerPremiumController {
  constructor(
    private readonly sellerPremiumService: SellerPremiumService,
    @Inject(forwardRef(() => S3Service))
    private readonly s3Service: S3Service,
  ) {}

  @ApiOperation({ summary: 'Upgrade seller to premium' })
  @ApiParam({ name: 'sellerId', required: true })
  @Post('/:sellerId')
  async upgradeToPremium(@Param('sellerId') sellerId: string): Promise<void> {
    await this.sellerPremiumService.upgradeToPremium(sellerId);
  }

  @ApiOperation({ summary: 'Cancel seller premium subscription' })
  @ApiParam({ name: 'sellerId', required: true })
  @Post('/:sellerId/cancel')
  async cancelPremium(@Param('sellerId') sellerId: string): Promise<void> {
    await this.sellerPremiumService.cancelPremium(sellerId);
  }

  @ApiOperation({ summary: 'Create another car by seller premium' })
  @ApiCreatedResponse({ type: CreateCarDto })
  @Post('/another/:idSeller/car')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'image', maxCount: 8 }], {
      storage: diskStorage({
        destination: './public',
        filename: (req, file, cb) => {
          const filePath = buildPath(file.originalname, 'cars');
          cb(null, filePath);
        },
      }),
    }),
  )
  async createAnotherCar(
    @Req() req: Request,
    @Param('idSeller') idSeller: string,
    @Body() carData: CreateCarDto,
    @Res() res: any,
    @UploadedFile() files: { image?: MulterFile[] },
  ): Promise<CreateCarDto> {
    if (files?.image) {
      const uploadedFile = files.image[0];
      const filePath = buildPath(uploadedFile.originalname, 'cars');
      await this.s3Service.uploadPhoto(uploadedFile, 'cars');
      carData.image = filePath;
    }
    return res
      .status(HttpStatus.CREATED)
      .json(
        await this.sellerPremiumService.createCarBySellerPremium(
          idSeller,
          carData,
        ),
      );
  }

  @ApiOperation({ summary: 'Get views count for a seller' })
  @ApiParam({ name: 'sellerId', required: true })
  @Get('/:sellerId/views')
  async getViewsCount(@Param('sellerId') sellerId: string): Promise<number> {
    return this.sellerPremiumService.getViewsCount(sellerId);
  }

  @ApiOperation({ summary: 'Get views count per period for a seller' })
  @ApiParam({ name: 'sellerId', required: true })
  @ApiParam({ name: 'period', enum: ['day', 'week', 'month'], required: true })
  @Get('/:sellerId/views/:period')
  async getViewsCountPerPeriod(
    @Param('sellerId') sellerId: string,
    @Param('period') period: Period,
  ): Promise<number> {
    return this.sellerPremiumService.getViewsCountPerPeriod(sellerId, period);
  }

  @ApiOperation({ summary: 'Get average price in seller region' })
  @ApiParam({ name: 'sellerId', required: true })
  @Get('/:sellerId/averagePrice/region')
  async getAveragePriceRegion(
    @Param('sellerId') sellerId: string,
  ): Promise<number | null> {
    return this.sellerPremiumService.getAveragePriceRegion(sellerId);
  }

  @ApiOperation({ summary: 'Get average price in Ukraine' })
  @ApiParam({ name: 'sellerId', required: true })
  @Get('/:sellerId/averagePrice/ukraine')
  async getAveragePriceUkraine(
    @Param('sellerId') sellerId: string,
  ): Promise<number | null> {
    return this.sellerPremiumService.getAveragePriceUkraine(sellerId);
  }
}
