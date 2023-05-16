import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

class UpdateCarDto {
  @ApiProperty({ required: false, example: 'BMW' })
  @IsOptional()
  @IsString()
  brand?: string;

  @ApiProperty({ required: false, example: 'X5' })
  @IsOptional()
  @IsString()
  model?: string;

  @ApiProperty({ required: false, example: 2022 })
  @IsOptional()
  @IsInt()
  year?: number;

  @ApiProperty({ required: false, example: 'Ivano-Frankivsk' })
  @IsOptional()
  @IsString()
  region?: string;

  @ApiProperty({ required: false, example: 10000 })
  @IsOptional()
  @IsInt()
  mileage?: number;

  @ApiProperty({ required: false, example: 50000 })
  @IsOptional()
  @IsInt()
  price?: number;

  @ApiProperty({ required: false, example: 'USD' })
  @IsOptional()
  @IsString()
  @IsIn(['USD', 'EUR', 'UAH'])
  currency?: string;

  @ApiProperty({ required: false, example: 'This is a car description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  image?: string;
}

export default UpdateCarDto;
