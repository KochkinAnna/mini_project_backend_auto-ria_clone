import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
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

  @ApiResponse({ status: HttpStatus.OK })
  @Get()
  async getAdminsList(@Req() reg: any, @Res() res: any): Promise<Admin[]> {
    return res
      .status(HttpStatus.OK)
      .json(await this.adminService.getAdminList());
  }

  @Get('/buyer')
  async getBuyerList() {}

  @Get('/car')
  async getCarList() {}

  @Get('/cardealership')
  async getCardealershipList() {}

  @Get('/cardealershipAdmin')
  async getCardealershipAdminList() {}

  @Get('/cardealershipManager')
  async getCardealershipManagerList() {}

  @Get('/cardealershipMechanic')
  async getCardealershipMechanicList() {}

  @Get('/cardealershipSales')
  async getCardealershipSalesList() {}

  @Get('/cardealershipServiceManager')
  async getCardealershipServiceManagerList() {}

  @Get('/manager')
  async getManagerList() {}

  @Get('/seller')
  async getSellerList() {}

  @Get('/sellerPremium')
  async getSellerPremiumList() {}

  @Get('/buyer/:idBuyer')
  async getBuyer() {}

  @Get('/car/:idCar')
  async getCar() {}

  @Get('/carSeller/:idCarSeller')
  async getCarSeller() {}

  @Get('/carSellerPremium/:idCarSellerPremium')
  async getCarSellerPremium() {}

  @Get('/carCardealershipAdmin/:idCarCardealershipAdmin')
  async getCarCardealershipAdmin() {}

  @Get('/carCardealershipManager/:idCarCardealershipManager')
  async getCarCardealershipManager() {}

  @Get('/carCardealershipSales/:idCarCardealershipSales')
  async getCarCardealershipSales() {}

  @Get('/cardealership/:idCardealership')
  async getCardealership() {}

  @Get('/cardealershipAdmin/:idCardealershipAdmin')
  async getCardealershipAdmin() {}

  @Get('/cardealershipManager/:idCardealershipManager')
  async getCardealershipManager() {}

  @Get('/cardealershipMechanic/:idCardealershipMechanic')
  async getCardealershipMechanic() {}

  @Get('/cardealershipSales/:idCardealershipSales')
  async getCardealershipSales() {}

  @Get('/cardealershipServiceManager/:idCardealershipServiceManager')
  async getCardealershipServiceManager() {}

  @Get('/manager/:idManager')
  async getManager() {}

  @Get('/seller/:idSeller')
  async getSeller() {}

  @Get('/sellerPremium/:idSellerPremium')
  async getSellerPremium() {}

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
    @Body() body: CreateAdminDto,
    @Res() res: any,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Admin> {
    if (file) {
      body.avatar = `public/${file.filename}`;
    }
    return res
      .status(HttpStatus.CREATED)
      .json(await this.adminService.createAdmin(body));
  }

  @Post('/buyer')
  async createBuyer() {}

  @Post('/car')
  async createCar() {}

  @Post('/CarSeller/:idSeller')
  async createCarSeller() {}

  @Post('/CarSellerPremium/:idSellerPremium')
  async createCarSellerPremium() {}

  @Post('/carCardealershipAdmin/:idCardealershipAdmin')
  async createCarCardealershipAdmin() {}

  @Post('/carCardealershipManager/:idCardealershipManager')
  async createCarCardealershipManager() {}

  @Post('/carCardealershipSales/:idCardealershipSales')
  async createCarCardealershipSales() {}

  @Post('/cardealership')
  async createCardealership() {}

  @Post('/cardealershipAdmin')
  async createCardealershipAdmin() {}

  @Post('/cardealershipManager')
  async createCardealershipManager() {}

  @Post('/cardealershipMechanic')
  async createCardealershipMechanic() {}

  @Post('/cardealershipSales')
  async createCardealershipSales() {}

  @Post('/cardealershipServiceManager')
  async createCardealershipServiceManager() {}

  @Post('/manager')
  async createManager() {}

  @Post('/seller')
  async createSeller() {}

  @Post('/seller-premium')
  async createSellerPremium() {}

  @ApiParam({ name: 'idAdmin', required: true })
  @Patch('/:idAdmin')
  async updateAdmin(
    @Param('idAdmin') idAdmin: string,
    @Body() adminData: UpdateAdminDto,
  ): Promise<Admin> {
    return this.adminService.updateAdmin(idAdmin, adminData);
  }

  @Patch('/buyer/:idBuyer')
  async updateBuyer() {}

  @Patch('/car')
  async updateCar() {}

  @Patch('/carSeller/:idSeller')
  async updateCarSeller() {}

  @Patch('/carSellerPremium/:idSellerPremium')
  async updateCarSellerPremium() {}

  @Patch('/carCardealershipAdmin/:idCardealershipAdmin')
  async updateCarCardealershipAdmin() {}

  @Patch('/carCardealershipManager/:idCardealershipManager')
  async updateCarCardealershipManager() {}

  @Patch('/carCardealershipSales/:idCardealershipSales')
  async updateCarCardealershipSales() {}

  @Patch('/cardealership/:idCardealership')
  async updateCardealership() {}

  @Patch('/cardealershipAdmin/:idCardealershipAdmin')
  async updateCardealershipAdmin() {}

  @Patch('/cardealershipManager/:idCardealershipManager')
  async updateCardealershipManager() {}

  @Patch('/cardealershipMechanic/:idCardealershipMechanic')
  async updateCardealershipMechanic() {}

  @Patch('/cardealershipSales/:idCardealershipSales')
  async updateCardealershipSales() {}

  @Patch('/cardealershipServiceManager/:idCardealershipServiceManager')
  async updateCardealershipServiceManager() {}

  @Patch('/manager/:idManager')
  async updateManager() {}

  @Patch('/seller/:idSeller')
  async updateSeller() {}

  @Patch('/sellerPremium/:idSellerPremium')
  async updateSellerPremium() {}

  @ApiParam({ name: 'idAdmin', required: true })
  @Delete('/:idAdmin')
  async deleteAdmin(
    @Param('idAdmin') idAdmin: string,
    @Res() res: any,
  ): Promise<void> {
    await this.adminService.deleteAdmin(idAdmin);
    res.sendStatus(HttpStatus.OK);
  }

  @Delete('/buyer/:idBuyer')
  async deleteBuyer() {}

  @Delete('/car')
  async deleteCar() {}

  @Delete('/carSeller/:idSeller')
  async deleteCarSeller() {}

  @Delete('/carSellerPremium/:idSellerPremium')
  async deleteCarSellerPremium() {}

  @Delete('/carCardealershipAdmin/:idCardealershipAdmin')
  async deleteCarCardealershipAdmin() {}

  @Delete('/carCardealershipManager/:idCardealershipManager')
  async deleteCarCardealershipManager() {}

  @Delete('/carCardealershipSales/:idCardealershipSales')
  async deleteCarCardealershipSales() {}

  @Delete('/cardealership/:idCardealership')
  async deleteCardealership() {}

  @Delete('/cardealershipAdmin/:idCardealershipAdmin')
  async deleteCardealershipAdmin() {}

  @Delete('/cardealershipManager/:idCardealershipManager')
  async deleteCardealershipManager() {}

  @Delete('/cardealershipMechanic/:idCardealershipMechanic')
  async deleteCardealershipMechanic() {}

  @Delete('/cardealershipSales/:idCardealershipSales')
  async deleteCardealershipSales() {}

  @Delete('/cardealershipServiceManager/:idCardealershipServiceManager')
  async deleteCardealershipServiceManager() {}

  @Delete('/manager/:idManager')
  async deleteManager() {}

  @Delete('/seller/:idSeller')
  async deleteSeller() {}

  @Delete('/sellerPremium/:idSellerPremium')
  async deleteSellerPremium() {}
}
