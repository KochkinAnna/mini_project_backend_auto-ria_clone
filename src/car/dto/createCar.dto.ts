import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';

class CreateCarDto {
  @ApiProperty({ required: true, example: 'BMW' })
  @IsNotEmpty()
  @IsString()
  brand: string;

  @ApiProperty({ required: true, example: 'X5' })
  @IsNotEmpty()
  @IsString()
  model: string;

  @ApiProperty({ required: true, example: '2022' })
  @IsNotEmpty()
  @IsString()
  year: string;

  @ApiProperty({ required: true, example: 'Ivano-Frankivsk' })
  @IsNotEmpty()
  @IsString()
  region: string;

  @ApiProperty({ required: true, example: '10000' })
  @IsNotEmpty()
  @IsString()
  mileage: string;

  @ApiProperty({ required: true, example: '50000' })
  @IsNotEmpty()
  @IsString()
  price: string;

  @ApiProperty({ required: true, example: 'USD' })
  @IsNotEmpty()
  @IsString()
  @IsIn(['USD', 'EUR', 'UAH'])
  currency: string;

  @ApiProperty({ required: true, example: 'This is a car description' })
  @IsString()
  description?: string;

  @ApiProperty({ required: true })
  image: string;
}

export default CreateCarDto;
