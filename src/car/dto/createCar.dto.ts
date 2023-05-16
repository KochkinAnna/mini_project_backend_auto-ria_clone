import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

class CreateCarDto {
  @ApiProperty({ required: true, example: 'BMW' })
  @IsNotEmpty()
  @IsString()
  brand: string;

  @ApiProperty({ required: true, example: 'X5' })
  @IsNotEmpty()
  @IsString()
  model: string;

  @ApiProperty({ required: true, example: 2022 })
  @IsInt()
  @IsNotEmpty()
  year: number;

  @ApiProperty({ required: true, example: 'Ivano-Frankivsk' })
  @IsNotEmpty()
  @IsString()
  region: string;

  @ApiProperty({ required: true, example: 10000 })
  @IsInt()
  @IsNotEmpty()
  mileage: number;

  @ApiProperty({ required: true, example: 50000 })
  @IsInt()
  @IsNotEmpty()
  price: number;

  @ApiProperty({ required: true, example: 'USD' })
  @IsNotEmpty()
  @IsString()
  @IsIn(['USD', 'EUR', 'UAH'])
  currency: string;

  @ApiProperty({ required: false, example: 'This is a car description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ required: true })
  image: string;
}

export default CreateCarDto;
