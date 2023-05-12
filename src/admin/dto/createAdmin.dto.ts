import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({ required: true, example: 'Evgeniy Kochkin' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ required: false, example: '33' })
  @IsOptional()
  @IsNumber()
  age: number;

  @ApiProperty({ required: true, example: 'SomeCompany' })
  @IsNotEmpty()
  @IsString()
  company: string;

  @ApiProperty({ required: true, example: 'CEO' })
  @IsNotEmpty()
  @IsString()
  position: string;

  @ApiProperty({ required: false, example: 'admin@somecompany.com' })
  @IsOptional()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ required: false, example: '+380500554471' })
  @IsOptional()
  @IsString()
  phone: string;

  @ApiProperty({ required: false, example: true })
  @IsOptional()
  @IsBoolean()
  status: boolean;
}

//name, age, company, position, email, phone, status
