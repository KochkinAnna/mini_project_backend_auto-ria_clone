import {
  Body,
  Controller,
  Delete,
  forwardRef,
  Get,
  HttpStatus,
  Inject,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Admin, Buyer, Car, Manager, Seller } from '@prisma/client';
import { diskStorage } from 'multer';
import { BuyerService } from 'src/buyer/buyer.service';

import { CreateBuyerDto } from '../buyer/dto/createBuyer.dto';
import { UpdateBuyerDto } from '../buyer/dto/updateBuyer.dto';
import CreateCarDto from '../car/dto/createCar.dto';
import UpdateCarDto from '../car/dto/updateCar.dto';
import { Period } from '../common/enum/views-period.enum';
import {
  editFileName,
  imageFileFilter,
} from '../common/file-upload/file.upload';
import { CreateManagerDto } from '../manager/dto/createManager.dto';
import { UpdateManagerDto } from '../manager/dto/updateManager.dto';
import { ManagerService } from '../manager/manager.service';
import CreateSellerDto from '../seller/dto/createSeller.dto';
import UpdateSellerDto from '../seller/dto/updateSeller.dto';
import { SellerService } from '../seller/seller.service';
import { SellerPremiumService } from '../seller-premium/seller-premium.service';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/createAdmin.dto';
import { UpdateAdminDto } from './dto/updateAdmin.dto';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    @Inject(forwardRef(() => BuyerService))
    private readonly buyerService: BuyerService,
    @Inject(forwardRef(() => ManagerService))
    private readonly managerService: ManagerService,
    @Inject(forwardRef(() => SellerService))
    private readonly sellerService: SellerService,
    @Inject(forwardRef(() => SellerPremiumService))
    private readonly sellerPremiumService: SellerPremiumService,
  ) {}

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

  @ApiOperation({ summary: 'Update an admin' })
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

  @ApiOperation({ summary: 'Get an admin by ID' })
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

  @ApiOperation({ summary: 'Get an admin by first name' })
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

  @ApiOperation({ summary: 'Get a list of admins' })
  @ApiResponse({ status: HttpStatus.OK })
  @Get()
  async getAdminsList(@Req() reg: any, @Res() res: any): Promise<Admin[]> {
    return res
      .status(HttpStatus.OK)
      .json(await this.adminService.getAdminList());
  }

  @ApiOperation({ summary: 'Delete an admin' })
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
  @ApiOperation({ summary: 'Create a new buyer by Admin' })
  @ApiOkResponse({ type: CreateBuyerDto })
  @Post('/buyer')
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

  @ApiOperation({ summary: 'Update a buyer by Admin' })
  @ApiParam({ name: 'idBuyer', required: true })
  @Patch('/buyer/:idBuyer')
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

  @ApiOperation({ summary: 'Get a list of buyers by Admin' })
  @ApiResponse({ status: HttpStatus.OK })
  @Get('/buyer/list')
  async getBuyerList(@Req() reg: any, @Res() res: any): Promise<Buyer[]> {
    return res
      .status(HttpStatus.OK)
      .json(await this.buyerService.getBuyerList());
  }

  @ApiOperation({ summary: 'Get a buyer by ID by Admin' })
  @ApiParam({ name: 'idBuyer', type: 'string', description: 'Buyer ID' })
  @Get('/buyer/:idBuyer')
  async getBuyerById(
    @Req() req: any,
    @Res() res: any,
    @Param('idBuyer') idBuyer: string,
  ): Promise<Buyer> {
    return res
      .status(HttpStatus.OK)
      .json(await this.buyerService.getBuyerById(idBuyer));
  }

  @ApiOperation({ summary: 'Get a buyer by first name by Admin' })
  @ApiParam({ name: 'firstName', required: true })
  @Get('/buyer/name/:firstName')
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

  @ApiOperation({ summary: 'Delete a buyer by Admin' })
  @ApiParam({ name: 'idBuyer', required: true })
  @Delete('/buyer/:idBuyer')
  async deleteBuyer(
    @Param('idBuyer') idBuyer: string,
    @Res() res: any,
  ): Promise<void> {
    await this.buyerService.deleteBuyer(idBuyer);
    res.sendStatus(HttpStatus.OK);
  }

  //Manager
  @ApiOperation({ summary: 'Create a new manager by Admin' })
  @ApiOkResponse({ type: CreateManagerDto })
  @Post('/manager')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async createManager(
    @Req() req: any,
    @Body() managerData: CreateManagerDto,
    @Res() res: any,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<CreateManagerDto> {
    if (file) {
      managerData.avatar = `public/${file.filename}`;
    }
    return res
      .status(HttpStatus.CREATED)
      .json(await this.managerService.createManager(managerData));
  }

  @ApiOperation({ summary: 'Update a manager by Admin' })
  @ApiParam({ name: 'idManager', required: true })
  @Patch('/manager/:idManager')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async updateManager(
    @Param('idManager') idManager: string,
    @Body() managerData: UpdateManagerDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Manager> {
    if (file) {
      managerData.avatar = `public/${file.filename}`;
    }
    return this.managerService.updateManager(idManager, managerData);
  }

  @ApiOperation({ summary: 'Get a manager by ID by Admin' })
  @ApiParam({ name: 'idmManager', type: 'string', description: 'Manager ID' })
  @Get('/manager/:idManager')
  async getManagerById(
    @Req() req: any,
    @Res() res: any,
    @Param('idManager') idManager: string,
  ): Promise<Manager> {
    return res
      .status(HttpStatus.OK)
      .json(await this.managerService.getManagerById(idManager));
  }

  @ApiOperation({ summary: 'Get a manager by first name by Admin' })
  @ApiParam({ name: 'firstName', required: true })
  @Get('/manager/name/:firstName')
  async getManagerByFirstName(
    @Req() req: any,
    @Res() res: any,
    @Param('firstName') firstName: string,
  ): Promise<Manager> {
    try {
      const buyer = await this.managerService.getManagerByFirstName(firstName);
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

  @ApiOperation({ summary: 'Get a list of managers by Admin' })
  @ApiResponse({ status: HttpStatus.OK })
  @Get('/managers/list')
  async getManagerList(@Req() reg: any, @Res() res: any): Promise<Manager[]> {
    return res
      .status(HttpStatus.OK)
      .json(await this.managerService.getManagerList());
  }

  @ApiOperation({ summary: 'Delete a manager by Admin' })
  @ApiParam({ name: 'idManager', required: true })
  @Delete('/manager/:idManager')
  async deleteManager(
    @Param('idManager') idManager: string,
    @Res() res: any,
  ): Promise<void> {
    await this.managerService.deleteManager(idManager);
    res.sendStatus(HttpStatus.OK);
  }

  //Seller
  @ApiOperation({ summary: 'Create a new seller by Admin' })
  @ApiOkResponse({ type: CreateSellerDto })
  @Post('seller')
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

  @ApiOperation({ summary: 'Update a seller by Admin' })
  @ApiParam({ name: 'idSeller', required: true })
  @Patch('/seller/:idSeller')
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

  @ApiOperation({ summary: 'Get a seller by ID by Admin' })
  @ApiParam({ name: 'idSeller', type: 'string', description: 'Seller ID' })
  @Get('/seller/:idSeller')
  async getSellerById(
    @Req() req: any,
    @Res() res: any,
    @Param('idSeller') idSeller: string,
  ): Promise<Seller> {
    return res
      .status(HttpStatus.OK)
      .json(await this.sellerService.getSellerById(idSeller));
  }

  @ApiOperation({ summary: 'Get a manager by first name by Admin' })
  @ApiParam({ name: 'firstName', required: true })
  @Get('/seller/name/:firstName')
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

  @ApiOperation({ summary: 'Get a list of sallers by Admin' })
  @ApiResponse({ status: HttpStatus.OK })
  @Get('/sellers/list')
  async getSellerList(@Req() reg: any, @Res() res: any): Promise<Seller[]> {
    return res
      .status(HttpStatus.OK)
      .json(await this.sellerService.getSellerList());
  }

  @ApiOperation({ summary: 'Delete a seller by Admin' })
  @ApiParam({ name: 'idSeller', required: true })
  @Delete('/seller/:idSeller')
  async deleteSeller(
    @Param('idSeller') idSeller: string,
    @Res() res: any,
  ): Promise<void> {
    await this.sellerService.deleteSeller(idSeller);
    res.sendStatus(HttpStatus.OK);
  }

  //SellerPremium
  @ApiOperation({ summary: 'Upgrade seller to premium by Admin' })
  @ApiParam({ name: 'sellerId', required: true })
  @Post('/sellerPremium/:sellerId')
  async upgradeToPremium(@Param('sellerId') sellerId: string): Promise<void> {
    await this.sellerPremiumService.upgradeToPremium(sellerId);
  }

  @ApiOperation({ summary: 'Cancel seller premium subscription by Admin' })
  @ApiParam({ name: 'sellerId', required: true })
  @Post('/sellerPremium/:sellerId/cancel')
  async cancelPremium(@Param('sellerId') sellerId: string): Promise<void> {
    await this.sellerPremiumService.cancelPremium(sellerId);
  }

  @ApiOperation({ summary: 'Get views count for a seller by Admin' })
  @ApiParam({ name: 'sellerId', required: true })
  @Get('/sellerPremium/:sellerId/views')
  async getViewsCount(@Param('sellerId') sellerId: string): Promise<number> {
    return this.sellerPremiumService.getViewsCount(sellerId);
  }

  @ApiOperation({ summary: 'Get views count per period for a seller by Admin' })
  @ApiParam({ name: 'sellerId', required: true })
  @ApiParam({ name: 'period', enum: ['day', 'week', 'month'], required: true })
  @Get('/sellerPremium/:sellerId/views/:period')
  async getViewsCountPerPeriod(
    @Param('sellerId') sellerId: string,
    @Param('period') period: Period,
  ): Promise<number> {
    return this.sellerPremiumService.getViewsCountPerPeriod(sellerId, period);
  }

  @ApiOperation({ summary: 'Get average price in seller region by Admin' })
  @ApiParam({ name: 'sellerId', required: true })
  @Get('/sellerPremium/:sellerId/averagePrice/region')
  async getAveragePriceRegion(
    @Param('sellerId') sellerId: string,
  ): Promise<number | null> {
    return this.sellerPremiumService.getAveragePriceRegion(sellerId);
  }

  @ApiOperation({ summary: 'Get average price in Ukraine by Admin' })
  @ApiParam({ name: 'sellerId', required: true })
  @Get('/sellerPremium/:sellerId/averagePrice/ukraine')
  async getAveragePriceUkraine(
    @Param('sellerId') sellerId: string,
  ): Promise<number | null> {
    return this.sellerPremiumService.getAveragePriceUkraine(sellerId);
  }

  //Car
  @ApiOperation({ summary: 'Create a new car by Admin' })
  @ApiCreatedResponse({ type: CreateCarDto })
  @Post('/new/:idSeller/car')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'image', maxCount: 8 }], {
      storage: diskStorage({
        destination: './public/cars',
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
    @UploadedFile() files: { image?: Express.Multer.File[] },
  ): Promise<CreateCarDto> {
    if (files?.image) {
      carData.image = `/public/cars/${files.image[0].filename}`;
    }
    return res
      .status(HttpStatus.CREATED)
      .json(await this.sellerService.createCar(idSeller, carData));
  }

  @ApiOperation({ summary: 'Update a car by Admin' })
  @ApiParam({ name: 'idSeller', type: 'string', description: 'Seller ID' })
  @Patch('/update/seller/:idSeller/car/:idCar')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'image', maxCount: 8 }], {
      storage: diskStorage({
        destination: './public/cars',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async updateCar(
    @Param('idSeller') idSeller: string,
    @Param('idCar') idCar: string,
    @Body() carData: UpdateCarDto,
    @UploadedFile() files: { image?: Express.Multer.File[] },
  ): Promise<CreateCarDto> {
    if (files?.image) {
      carData.image = `/public/cars/${files.image[0].filename}`;
    }
    return this.sellerService.updateCar(idSeller, idCar, carData);
  }

  @ApiOperation({ summary: 'Get all cars by Admin' })
  @ApiParam({ name: 'idSeller', type: 'string', description: 'Seller ID' })
  @Get('/cars/all')
  async getAllCars(@Req() req: any, @Res() res: any): Promise<Car[]> {
    return res.status(HttpStatus.OK).json(await this.adminService.getCars());
  }

  @ApiOperation({ summary: 'Get all seller cars by Admin' })
  @ApiParam({ name: 'idSeller', type: 'string', description: 'Seller ID' })
  @Get('/seller/:idSeller/car')
  async getCars(
    @Req() req: any,
    @Res() res: any,
    @Param('idSeller') idSeller: string,
  ): Promise<Car[]> {
    return res
      .status(HttpStatus.OK)
      .json(await this.sellerService.getCars(idSeller));
  }

  @ApiOperation({ summary: 'Get a car by Admin' })
  @ApiParam({ name: 'idSeller', type: 'string', description: 'Seller ID' })
  @Get('/seller/:idSeller/car/:idCar')
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

  @ApiOperation({ summary: 'Delete a car by Admin' })
  @ApiParam({ name: 'idSeller', type: 'string', description: 'Seller ID' })
  @ApiParam({ name: 'idCar', type: 'string', description: 'Car ID' })
  @Delete('/seller/:idSeller/car/:idCar')
  async deleteCar(
    @Param('idSeller') idSeller: string,
    @Param('idCar') idCar: string,
    @Res() res: any,
  ): Promise<void> {
    await this.sellerService.deleteCar(idSeller, idCar);
    res.sendStatus(HttpStatus.OK);
  }

  //Cardealership
  @ApiOperation({ summary: 'Create a new car dealership by Admin' })
  @Post('/cardealership')
  async createCardealership() {}

  @ApiOperation({ summary: 'Update a car dealership by Admin' })
  @Patch('/cardealership/:idCardealership')
  async updateCardealership() {}

  @ApiOperation({ summary: 'Get a list of car dealerships by Admin' })
  @Get('/cardealership')
  async getCardealershipList() {}

  @ApiOperation({ summary: 'Get a car dealership by ID by Admin' })
  @Get('/cardealership/:idCardealership')
  async getCardealership() {}

  @ApiOperation({ summary: 'Delete a car dealership by Admin' })
  @Delete('/cardealership/:idCardealership')
  async deleteCardealership() {}

  //CardealershipAdmin
  @ApiOperation({ summary: 'Create a new car dealership admin by Admin' })
  @Post('/cardealershipAdmin')
  async createCardealershipAdmin() {}

  @ApiOperation({ summary: 'Update a car dealership admin by Admin' })
  @Patch('/cardealershipAdmin/:idCardealershipAdmin')
  async updateCardealershipAdmin() {}

  @ApiOperation({ summary: 'Get a list of car dealership admins by Admin' })
  @Get('/cardealershipAdmin')
  async getCardealershipAdminList() {}

  @ApiOperation({ summary: 'Get a car dealership admin by ID by Admin' })
  @Get('/cardealershipAdmin/:idCardealershipAdmin')
  async getCardealershipAdmin() {}

  @ApiOperation({ summary: 'Delete a car dealership admin by Admin' })
  @Delete('/cardealershipAdmin/:idCardealershipAdmin')
  async deleteCardealershipAdmin() {}

  //CardealershipManager
  @ApiOperation({ summary: 'Create a new car dealership manager by Admin' })
  @Post('/cardealershipManager')
  async createCardealershipManager() {}

  @ApiOperation({ summary: 'Update a car dealership manager by Admin' })
  @Patch('/cardealershipManager/:idCardealershipManager')
  async updateCardealershipManager() {}

  @ApiOperation({ summary: 'Get a list of car dealership managers by Admin' })
  @Get('/cardealershipManager')
  async getCardealershipManagerList() {}

  @ApiOperation({ summary: 'Get a car dealership manager by ID by Admin' })
  @Get('/cardealershipManager/:idCardealershipManager')
  async getCardealershipManager() {}

  @ApiOperation({ summary: 'Delete a car dealership manager by Admin' })
  @Delete('/cardealershipManager/:idCardealershipManager')
  async deleteCardealershipManager() {}

  //CardealershipMechanic
  @ApiOperation({ summary: 'Create a new car dealership mechanic by Admin' })
  @Post('/cardealershipMechanic')
  async createCardealershipMechanic() {}

  @ApiOperation({ summary: 'Update a car dealership mechanic by Admin' })
  @Patch('/cardealershipMechanic/:idCardealershipMechanic')
  async updateCardealershipMechanic() {}

  @ApiOperation({ summary: 'Get a list of car dealership mechanics by Admin' })
  @Get('/cardealershipMechanic')
  async getCardealershipMechanicList() {}

  @ApiOperation({ summary: 'Get a car dealership mechanic by ID by Admin' })
  @Get('/cardealershipMechanic/:idCardealershipMechanic')
  async getCardealershipMechanic() {}

  @ApiOperation({ summary: 'Delete a car dealership mechanic by Admin' })
  @Delete('/cardealershipMechanic/:idCardealershipMechanic')
  async deleteCardealershipMechanic() {}

  //CardealershipSales
  @ApiOperation({ summary: 'Create a new car dealership salesperson by Admin' })
  @Post('/cardealershipSales')
  async createCardealershipSales() {}

  @ApiOperation({ summary: 'Update a car dealership salesperson by Admin' })
  @Patch('/cardealershipSales/:idCardealershipSales')
  async updateCardealershipSales() {}

  @ApiOperation({
    summary: 'Get a list of car dealership salespersons by Admin',
  })
  @Get('/cardealershipSales')
  async getCardealershipSalesList() {}

  @ApiOperation({ summary: 'Get a car dealership salesperson by ID by Admin' })
  @Get('/cardealershipSales/:idCardealershipSales')
  async getCardealershipSales() {}

  @ApiOperation({ summary: 'Delete a car dealership salesperson by Admin' })
  @Delete('/cardealershipSales/:idCardealershipSales')
  async deleteCardealershipSales() {}

  //CardealershipServiceManager
  @ApiOperation({
    summary: 'Create a new car dealership service manager by Admin',
  })
  @Post('/cardealershipServiceManager')
  async createCardealershipServiceManager() {}

  @ApiOperation({ summary: 'Update a car dealership service manager by Admin' })
  @Patch('/cardealershipServiceManager/:idCardealershipServiceManager')
  async updateCardealershipServiceManager() {}

  @ApiOperation({
    summary: 'Get a list of car dealership service managers by Admin',
  })
  @Get('/cardealershipServiceManager')
  async getCardealershipServiceManagerList() {}

  @ApiOperation({
    summary: 'Get a car dealership service manager by ID by Admin',
  })
  @Get('/cardealershipServiceManager/:idCardealershipServiceManager')
  async getCardealershipServiceManager() {}

  @ApiOperation({ summary: 'Delete a car dealership service manager by Admin' })
  @Delete('/cardealershipServiceManager/:idCardealershipServiceManager')
  async deleteCardealershipServiceManager() {}
}
