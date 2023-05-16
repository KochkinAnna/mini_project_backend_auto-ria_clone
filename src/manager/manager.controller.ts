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
import { Manager } from '@prisma/client';
import { diskStorage } from 'multer';

import {
  editFileName,
  imageFileFilter,
} from '../common/file-upload/file.upload';
import { CreateManagerDto } from './dto/createManager.dto';
import { UpdateManagerDto } from './dto/updateManager.dto';
import { ManagerService } from './manager.service';

@ApiTags('Manager')
@Controller('manager')
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  @ApiOperation({ summary: 'Create a new manager' })
  @ApiOkResponse({ type: CreateManagerDto })
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

  @ApiParam({ name: 'idManager', required: true })
  @Patch('/:idManager')
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

  @ApiParam({ name: 'idmManager', type: 'string', description: 'Manager ID' })
  @Get('/:idManager')
  async getManagerById(
    @Req() req: any,
    @Res() res: any,
    @Param('idManager') idManager: string,
  ): Promise<Manager> {
    return res
      .status(HttpStatus.OK)
      .json(await this.managerService.getManagerById(idManager));
  }

  @ApiParam({ name: 'firstName', required: true })
  @Get('/:firstName')
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

  @ApiResponse({ status: HttpStatus.OK })
  @Get()
  async getManagerList(@Req() reg: any, @Res() res: any): Promise<Manager[]> {
    return res
      .status(HttpStatus.OK)
      .json(await this.managerService.getManagerList());
  }

  @ApiParam({ name: 'idManager', required: true })
  @Delete('/:idManager')
  async deleteManager(
    @Param('idManager') idManager: string,
    @Res() res: any,
  ): Promise<void> {
    await this.managerService.deleteManager(idManager);
    res.sendStatus(HttpStatus.OK);
  }
}
