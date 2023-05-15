import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

import CreateCarDto from '../../car/dto/createCar.dto';
import { UserRole } from '../../common/enum/user-role.enum';

class CreateSellerDto {
  @ApiProperty({ required: true, example: 'John' })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ required: false, example: 'Doe' })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({ required: true, example: 'john@example.com' })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({ required: true, example: 'password123' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ required: true, example: '+1234567890' })
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @ApiProperty({ required: false })
  avatar?: string;

  @ApiProperty({ enum: UserRole })
  @IsNotEmpty()
  role: UserRole;

  @ApiProperty({ required: false, type: CreateCarDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateCarDto)
  car?: CreateCarDto;

  @ApiProperty({ required: false, example: 1 })
  @IsOptional()
  @IsInt()
  userId?: number;

  @ApiProperty({ required: false, example: 1 })
  @IsOptional()
  @IsInt()
  premiumSellerId?: number;
}

export default CreateSellerDto;
