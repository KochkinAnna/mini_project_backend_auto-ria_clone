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

  @Post('/buyer/:id')
  async createBuyer() {}

  @Post('/cardealership-car/:id')
  async createCar() {}

  @Post('/cardealership/:id')
  async createCardealership() {}

  @Post('/cardealership-admin/:id')
  async createCardealershipAdmin() {}

  @Post('/cardealership-manager/:id')
  async createCardealershipManager() {}

  @Post('/cardealership-mechanic/:id')
  async createCardealershipMechanic() {}

  @Post('/cardealership-sales/:id')
  async createCardealershipSales() {}

  @Post('/cardealership-service-manager/:id')
  async createCardealershipServiceManager() {}

  @Post('/manager/:id')
  async createManager() {}

  @Post('/seller/:id')
  async createSaller() {}

  @Post('/seller-premium/:id')
  async createSallerPremium() {}

  @Patch('/:id')
  async updateAdmin() {}

  @Patch('/:id')
  async updateBuyer() {}

  @Patch('/:id')
  async updateCar() {}

  @Patch('/:id')
  async updateCardealership() {}

  @Patch('/:id')
  async updateCardealershipAdmin() {}

  @Patch('/:id')
  async updateCardealershipManager() {}

  @Patch('/:id')
  async updateCardealershipMechanic() {}

  @Patch('/:id')
  async updateCardealershipSales() {}

  @Patch('/:id')
  async updateCardealershipServiceManager() {}

  @Patch('/:id')
  async updateManager() {}

  @Patch('/:id')
  async updateSaller() {}

  @Patch('/:id')
  async updateSallerPremium() {}

  @Delete('/:id')
  async deleteAdmin() {}

  @Delete('/:id')
  async deleteBuyer() {}

  @Delete('/:id')
  async deleteCar() {}

  @Delete('/:id')
  async deleteCardealership() {}

  @Delete('/:id')
  async deleteCardealershipAdmin() {}

  @Delete('/:id')
  async deleteCardealershipManager() {}

  @Delete('/:id')
  async deleteCardealershipMechanic() {}

  @Delete('/:id')
  async deleteCardealershipSales() {}

  @Delete('/:id')
  async deleteCardealershipServiceManager() {}

  @Delete('/:id')
  async deleteManager() {}

  @Delete('/:id')
  async deleteSaller() {}

  @Delete('/:id')
  async deleteSallerPremium() {}
}
