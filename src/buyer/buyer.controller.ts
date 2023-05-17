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
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Buyer } from '@prisma/client';
import { diskStorage } from 'multer';

import {
  editFileName,
  imageFileFilter,
} from '../common/file-upload/file.upload';
import { BuyerService } from './buyer.service';
import { CreateBuyerDto } from './dto/createBuyer.dto';
import { UpdateBuyerDto } from './dto/updateBuyer.dto';

@ApiTags('Buyer')
@Controller('buyer')
export class BuyerController {
  constructor(private readonly buyerService: BuyerService) {}

  @ApiOperation({ summary: 'Create a new buyer' })
  @ApiOkResponse({ type: CreateBuyerDto })
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
  async createBuyer(
    @Req() req: any,
    @Body() buyerData: CreateBuyerDto,
    @Res() res: any,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<CreateBuyerDto> {
    if (file) {
      buyerData.avatar = `public/${file.filename}`;
    }
    return res
      .status(HttpStatus.CREATED)
      .json(await this.buyerService.createBuyer(buyerData));
  }

  @ApiOperation({ summary: 'Update a buyer' })
  @ApiParam({ name: 'idBuyer', required: true })
  @Patch('/:idBuyer')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async updateBuyer(
    @Param('idBuyer') idBuyer: string,
    @Body() buyerData: UpdateBuyerDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Buyer> {
    if (file) {
      buyerData.avatar = `public/${file.filename}`;
    }
    return this.buyerService.updateBuyer(idBuyer, buyerData);
  }

  @ApiOperation({ summary: 'Get a buyer by ID' })
  @ApiParam({ name: 'idBuyer', type: 'string', description: 'Buyer ID' })
  @Get('/:idBuyer')
  async getBuyerById(
    @Req() req: any,
    @Res() res: any,
    @Param('idBuyer') idBuyer: string,
  ): Promise<Buyer> {
    return res
      .status(HttpStatus.OK)
      .json(await this.buyerService.getBuyerById(idBuyer));
  }

  @ApiOperation({ summary: 'Get a buyer by first name' })
  @ApiParam({ name: 'firstName', required: true })
  @Get('/:firstName')
  async getBuyerByFirstName(
    @Req() req: any,
    @Res() res: any,
    @Param('firstName') firstName: string,
  ): Promise<Buyer> {
    try {
      const buyer = await this.buyerService.getBuyerByFirstName(firstName);
      return res.status(HttpStatus.OK).json(buyer);
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

  @ApiOperation({ summary: 'Get a list of buyers' })
  @ApiResponse({ status: HttpStatus.OK })
  @Get()
  async getBuyerList(@Req() reg: any, @Res() res: any): Promise<Buyer[]> {
    return res
      .status(HttpStatus.OK)
      .json(await this.buyerService.getBuyerList());
  }

  @ApiOperation({ summary: 'Delete a buyer' })
  @ApiParam({ name: 'idBuyer', required: true })
  @Delete('/:idBuyer')
  async deleteBuyer(
    @Param('idBuyer') idBuyer: string,
    @Res() res: any,
  ): Promise<void> {
    await this.buyerService.deleteBuyer(idBuyer);
    res.sendStatus(HttpStatus.OK);
  }
}
