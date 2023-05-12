import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

import { UserRole } from '../../enum/user-role.enum';

export class CreateAdminDto {
  @ApiProperty({ required: false, example: 'admin@somecompany.com' })
  @IsOptional()
  @IsString()
  @IsEmail()
  email?: string;

  @ApiProperty({ required: false, example: 'MyPassw0rd!_' })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, {
    message:
      'The password must contain at least one uppercase and lowercase letter, one digit, one special character, and its length must be at least 8 characters',
  })
  password: string;

  @ApiProperty({ required: true, example: 'Evgeniy' })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ required: false, example: 'Kochkin' })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({ required: true, example: 'SomeCompany' })
  @IsNotEmpty()
  @IsString()
  company: string;

  @ApiProperty({ enum: UserRole })
  role: UserRole;

  @ApiProperty({ required: false, example: '+380500554471' })
  @IsOptional()
  @IsString()
  phone: string;

  @ApiProperty({ required: true, example: 'CEO' })
  @IsNotEmpty()
  @IsString()
  position: string;
}
