import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Patch,
  Post,
  Req,
  Res,
} from '@nestjs/common';

import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/createAdmin.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  async getAdminsList() {}

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

  @Get('/:idAdmin')
  async getAdmin() {}

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

  @Post()
  async createAdmin(
    @Req() req: any,
    @Body() body: CreateAdminDto,
    @Res() res: any,
  ) {
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

  @Patch('/:idAdmin')
  async updateAdmin() {}

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

  @Delete('/:idAdmin')
  async deleteAdmin() {}

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
