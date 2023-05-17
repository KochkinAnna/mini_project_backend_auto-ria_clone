import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Seller } from '@prisma/client';
import { Car } from '@prisma/client';
import { diskStorage } from 'multer';

import CreateCarDto from '../car/dto/createCar.dto';
import UpdateCarDto from '../car/dto/updateCar.dto';
import {
  editFileName,
  imageFileFilter,
} from '../common/file-upload/file.upload';
import CreateSellerDto from './dto/createSeller.dto';
import UpdateSellerDto from './dto/updateSeller.dto';
import { SellerService } from './seller.service';

@ApiTags('Seller')
@Controller('seller')
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  @ApiOperation({ summary: 'Create a new seller' })
  @ApiOkResponse({ type: CreateSellerDto })
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async createSeller(
    @Req() req: any,
    @Body() sellerData: CreateSellerDto,
    @Res() res: any,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<CreateSellerDto> {
    if (file) {
      sellerData.avatar = `public/${file.filename}`;
    }
    return res
      .status(HttpStatus.CREATED)
      .json(await this.sellerService.createSeller(sellerData));
  }

  @ApiOperation({ summary: 'Update a seller' })
  @ApiParam({ name: 'idSeller', required: true })
  @Patch('/:idSeller')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async updateSeller(
    @Param('idSeller') idSeller: string,
    @Body() sellerData: UpdateSellerDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Seller> {
    if (file) {
      sellerData.avatar = `public/${file.filename}`;
    }
    return this.sellerService.updateSeller(idSeller, sellerData);
  }

  @ApiOperation({ summary: 'Get a seller by ID' })
  @ApiParam({ name: 'idSeller', type: 'string', description: 'Seller ID' })
  @Get('/:idSeller')
  async getSellerById(
    @Req() req: any,
    @Res() res: any,
    @Param('idSeller') idSeller: string,
  ): Promise<Seller> {
    return res
      .status(HttpStatus.OK)
      .json(await this.sellerService.getSellerById(idSeller));
  }

  @ApiOperation({ summary: 'Get a manager by first name' })
  @ApiParam({ name: 'firstName', required: true })
  @Get('/:firstName')
  async getSellerByFirstName(
    @Req() req: any,
    @Res() res: any,
    @Param('firstName') firstName: string,
  ): Promise<Seller> {
    try {
      const seller = await this.sellerService.getSellerByFirstName(firstName);
      return res.status(HttpStatus.OK).json(seller);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: error.message });
      }
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  @ApiOperation({ summary: 'Get a list of sallers' })
  @ApiResponse({ status: HttpStatus.OK })
  @Get()
  async getSellerList(@Req() reg: any, @Res() res: any): Promise<Seller[]> {
    return res
      .status(HttpStatus.OK)
      .json(await this.sellerService.getSellerList());
  }

  @ApiOperation({ summary: 'Delete a seller' })
  @ApiParam({ name: 'idSeller', required: true })
  @Delete('/:idSeller')
  async deleteSeller(
    @Param('idSeller') idSeller: string,
    @Res() res: any,
  ): Promise<void> {
    await this.sellerService.deleteSeller(idSeller);
    res.sendStatus(HttpStatus.OK);
  }

  @ApiOperation({ summary: 'Create a new car by seller' })
  @ApiCreatedResponse({ type: CreateCarDto })
  @Post('/:idSeller/car')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async createCar(
    @Req() req: any,
    @Param('idSeller') idSeller: string,
    @Body() carData: CreateCarDto,
    @Res() res: any,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<CreateCarDto> {
    if (file) {
      carData.image = `public/${file.filename}`;
    }
    return res
      .status(HttpStatus.CREATED)
      .json(await this.sellerService.createCar(idSeller, carData));
  }

  @ApiOperation({ summary: 'Update a car by seller' })
  @ApiParam({ name: 'idSeller', type: 'string', description: 'Seller ID' })
  @Patch('/:idSeller/car/:idCar')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async updateCar(
    @Param('idSeller') idSeller: string,
    @Param('idCar') idCar: string,
    @Body() carData: UpdateCarDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Car> {
    if (file) {
      carData.image = `public/${file.filename}`;
    }
    return this.sellerService.updateCar(idSeller, idCar, carData);
  }

  @ApiOperation({ summary: 'Get all car by seller' })
  @ApiParam({ name: 'idSeller', type: 'string', description: 'Seller ID' })
  @Get('/:idSeller/car')
  async getCars(
    @Req() req: any,
    @Res() res: any,
    @Param('idSeller') idSeller: string,
  ): Promise<Car[]> {
    return res
      .status(HttpStatus.OK)
      .json(await this.sellerService.getCars(idSeller));
  }

  @ApiOperation({ summary: 'Get a car by seller' })
  @ApiParam({ name: 'idSeller', type: 'string', description: 'Seller ID' })
  @Get('/:idSeller/car/:idCar')
  async getCar(
    @Req() req: any,
    @Res() res: any,
    @Param('idSeller') idSeller: string,
    @Param('idCar') idCar: string,
  ): Promise<Car> {
    return res
      .status(HttpStatus.OK)
      .json(await this.sellerService.getCar(idSeller, idCar));
  }

  @ApiOperation({ summary: 'Delete a car by seller' })
  @ApiParam({ name: 'idSeller', type: 'string', description: 'Seller ID' })
  @ApiParam({ name: 'idCar', type: 'string', description: 'Car ID' })
  @Delete('/:idSeller/car/:idCar')
  async deleteCar(
    @Param('idSeller') idSeller: string,
    @Param('idCar') idCar: string,
    @Res() res: any,
  ): Promise<void> {
    await this.sellerService.deleteCar(idSeller, idCar);
    res.sendStatus(HttpStatus.OK);
  }
}
