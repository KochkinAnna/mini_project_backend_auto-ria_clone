import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';

@Controller('admin')
export class AdminController {
  @Get()
  async getAdminsList() {}

  @Get()
  async getSellersList() {}

  @Get()
  async getBuyersList() {}

  @Get()
  async getCarsList() {}

  @Get()
  async getCardealershipsList() {}

  @Get()
  async getCardealershipAdminsList() {}

  @Get()
  async getCardealershipManagersList() {}

  @Get()
  async getCardealershipMechanicsList() {}

  @Get()
  async getCardealershipSalesList() {}

  @Get()
  async getCardealershipServiceManagersList() {}

  @Get()
  async getCardealershipManagers() {}

  @Get()
  async getCardealershipSellersList() {}

  @Get()
  async getCardealershipSellersPremiumList() {}

  @Post()
  async createAdmin() {}

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

  @Post('/cardealership-admin')
  async createCardealershipAdmin() {}

  @Post('/cardealership-manager')
  async createCardealershipManager() {}

  @Post('/cardealership-mechanic')
  async createCardealershipMechanic() {}

  @Post('/cardealership-sales')
  async createCardealershipSales() {}

  @Post('/cardealership-service-manager')
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
