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
import { Admin } from '@prisma/client';
import { diskStorage } from 'multer';

import {
  editFileName,
  imageFileFilter,
} from '../common/file-upload/file.upload';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/createAdmin.dto';
import { UpdateAdminDto } from './dto/updateAdmin.dto';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  //Admin
  @ApiOperation({ summary: 'Create a new admin' })
  @ApiOkResponse({ type: CreateAdminDto })
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
  async createAdmin(
    @Req() req: any,
    @Body() adminData: CreateAdminDto,
    @Res() res: any,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Admin> {
    if (file) {
      adminData.avatar = `public/${file.filename}`;
    }
    return res
      .status(HttpStatus.CREATED)
      .json(await this.adminService.createAdmin(adminData));
  }

  @ApiParam({ name: 'idAdmin', required: true })
  @Patch('/:idAdmin')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async updateAdmin(
    @Param('idAdmin') idAdmin: string,
    @Body() adminData: UpdateAdminDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Admin> {
    if (file) {
      adminData.avatar = `public/${file.filename}`;
    }
    return this.adminService.updateAdmin(idAdmin, adminData);
  }

  @ApiParam({ name: 'idAdmin', type: 'string', description: 'Admin ID' })
  @Get('/:idAdmin')
  async getAdminById(
    @Req() req: any,
    @Res() res: any,
    @Param('idAdmin') idAdmin: string,
  ): Promise<Admin> {
    return res
      .status(HttpStatus.OK)
      .json(await this.adminService.getAdminById(idAdmin));
  }

  @ApiParam({ name: 'firstName', required: true })
  @Get('/:firstName')
  async getAdminByFirstName(
    @Req() req: any,
    @Res() res: any,
    @Param('firstName') firstName: string,
  ): Promise<Admin> {
    try {
      const admin = await this.adminService.getAdminByFirstName(firstName);
      return res.status(HttpStatus.OK).json(admin);
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

  @ApiResponse({ status: HttpStatus.OK })
  @Get()
  async getAdminsList(@Req() reg: any, @Res() res: any): Promise<Admin[]> {
    return res
      .status(HttpStatus.OK)
      .json(await this.adminService.getAdminList());
  }

  @ApiParam({ name: 'idAdmin', required: true })
  @Delete('/:idAdmin')
  async deleteAdmin(
    @Param('idAdmin') idAdmin: string,
    @Res() res: any,
  ): Promise<void> {
    await this.adminService.deleteAdmin(idAdmin);
    res.sendStatus(HttpStatus.OK);
  }

  //Buyer
  @Post('/buyer')
  async createBuyer() {}

  @Patch('/buyer/:idBuyer')
  async updateBuyer() {}

  @Get('/buyer')
  async getBuyerList() {}

  @Get('/buyer/:idBuyer')
  async getBuyer() {}

  @Delete('/buyer/:idBuyer')
  async deleteBuyer() {}

  //Manager
  @Post('/manager')
  async createManager() {}

  @Patch('/manager/:idManager')
  async updateManager() {}

  @Get('/manager')
  async getManagerList() {}

  @Get('/manager/:idManager')
  async getManager() {}

  @Delete('/manager/:idManager')
  async deleteManager() {}

  //Seller
  @Post('/seller')
  async createSeller() {}

  @Patch('/seller/:idSeller')
  async updateSeller() {}

  @Get('/seller')
  async getSellerList() {}

  @Get('/seller/:idSeller')
  async getSeller() {}

  @Delete('/seller/:idSeller')
  async deleteSeller() {}

  //SellerPremium
  @Post('/seller-premium')
  async createSellerPremium() {}

  @Patch('/sellerPremium/:idSellerPremium')
  async updateSellerPremium() {}

  @Get('/sellerPremium')
  async getSellerPremiumList() {}

  @Get('/sellerPremium/:idSellerPremium')
  async getSellerPremium() {}

  @Delete('/sellerPremium/:idSellerPremium')
  async deleteSellerPremium() {}

  //Car

  @Post('/car')
  async createCar() {}

  @Patch('/car')
  async updateCar() {}

  @Get('/car')
  async getCarList() {}

  @Get('/car/:idCar')
  async getCar() {}

  @Delete('/car')
  async deleteCar() {}

  //додати отримання карів по параметру - хто створив кар

  //Cardealership
  @Post('/cardealership')
  async createCardealership() {}

  @Patch('/cardealership/:idCardealership')
  async updateCardealership() {}

  @Get('/cardealership')
  async getCardealershipList() {}

  @Get('/cardealership/:idCardealership')
  async getCardealership() {}

  @Delete('/cardealership/:idCardealership')
  async deleteCardealership() {}

  //CardealershipAdmin
  @Post('/cardealershipAdmin')
  async createCardealershipAdmin() {}

  @Patch('/cardealershipAdmin/:idCardealershipAdmin')
  async updateCardealershipAdmin() {}

  @Get('/cardealershipAdmin')
  async getCardealershipAdminList() {}

  @Get('/cardealershipAdmin/:idCardealershipAdmin')
  async getCardealershipAdmin() {}

  @Delete('/cardealershipAdmin/:idCardealershipAdmin')
  async deleteCardealershipAdmin() {}

  //CardealershipManager
  @Post('/cardealershipManager')
  async createCardealershipManager() {}

  @Patch('/cardealershipManager/:idCardealershipManager')
  async updateCardealershipManager() {}

  @Get('/cardealershipManager')
  async getCardealershipManagerList() {}

  @Get('/cardealershipManager/:idCardealershipManager')
  async getCardealershipManager() {}

  @Delete('/cardealershipManager/:idCardealershipManager')
  async deleteCardealershipManager() {}

  //CardealershipMechanic
  @Post('/cardealershipMechanic')
  async createCardealershipMechanic() {}

  @Patch('/cardealershipMechanic/:idCardealershipMechanic')
  async updateCardealershipMechanic() {}

  @Get('/cardealershipMechanic')
  async getCardealershipMechanicList() {}

  @Get('/cardealershipMechanic/:idCardealershipMechanic')
  async getCardealershipMechanic() {}

  @Delete('/cardealershipMechanic/:idCardealershipMechanic')
  async deleteCardealershipMechanic() {}

  //CardealershipSales
  @Post('/cardealershipSales')
  async createCardealershipSales() {}

  @Patch('/cardealershipSales/:idCardealershipSales')
  async updateCardealershipSales() {}

  @Get('/cardealershipSales')
  async getCardealershipSalesList() {}

  @Get('/cardealershipSales/:idCardealershipSales')
  async getCardealershipSales() {}

  @Delete('/cardealershipSales/:idCardealershipSales')
  async deleteCardealershipSales() {}

  //CardealershipServiceManager
  @Post('/cardealershipServiceManager')
  async createCardealershipServiceManager() {}

  @Patch('/cardealershipServiceManager/:idCardealershipServiceManager')
  async updateCardealershipServiceManager() {}

  @Get('/cardealershipServiceManager')
  async getCardealershipServiceManagerList() {}

  @Get('/cardealershipServiceManager/:idCardealershipServiceManager')
  async getCardealershipServiceManager() {}

  @Delete('/cardealershipServiceManager/:idCardealershipServiceManager')
  async deleteCardealershipServiceManager() {}
}
