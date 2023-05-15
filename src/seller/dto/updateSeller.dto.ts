import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';

import UpdateCarDto from '../../car/dto/updateCar.dto';
import { UserRole } from '../../common/enum/user-role.enum';

class UpdateSellerDto {
  @ApiProperty({ required: false, example: 'John' })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty({ required: false, example: 'Doe' })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({ required: false, example: 'john@example.com' })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({ required: false, example: 'password123' })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiProperty({ required: false, example: '+1234567890' })
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @ApiProperty({ required: false})
  avatar?: string;

  @ApiProperty({ enum: UserRole })
  @IsOptional()
  role?: UserRole;

  @ApiProperty({ required: false, type: UpdateCarDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateCarDto)
  car?: UpdateCarDto;
}

export default UpdateSellerDto;
