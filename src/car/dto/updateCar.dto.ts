import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString } from 'class-validator';

class UpdateCarDto {
  @ApiProperty({ required: false, example: 'BMW' })
  @IsOptional()
  @IsString()
  brand?: string;

  @ApiProperty({ required: false, example: 'X5' })
  @IsOptional()
  @IsString()
  model?: string;

  @ApiProperty({ required: false, example: '2022' })
  @IsOptional()
  @IsString()
  year?: string;

  @ApiProperty({ required: true, example: 'Ivano-Frankivsk' })
  @IsOptional()
  @IsString()
  region?: string;

  @ApiProperty({ required: false, example: '10000' })
  @IsOptional()
  @IsString()
  mileage?: string;

  @ApiProperty({ required: false, example: '50000' })
  @IsOptional()
  @IsString()
  price?: string;

  @ApiProperty({ required: false, example: 'USD' })
  @IsOptional()
  @IsString()
  @IsIn(['USD', 'EUR', 'UAH'])
  currency?: string;

  @ApiProperty({
    required: false,
    example: 'This is an updated car description',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ required: false })
  image?: string;
}

export default UpdateCarDto;
