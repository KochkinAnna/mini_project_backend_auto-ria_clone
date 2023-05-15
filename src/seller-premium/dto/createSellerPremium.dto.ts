import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Min,
  ValidateNested,
} from 'class-validator';

import CreateCarDto from '../../car/dto/createCar.dto';

export class CreateSellerPremiumDto {
  @ApiProperty({ required: true, example: 1 })
  @IsNotEmpty()
  @IsInt()
  sellerId: number;

  @ApiProperty({ required: false, example: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  views?: number;

  @ApiProperty({ required: false, example: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  viewsPerDay?: number;

  @ApiProperty({ required: false, example: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  viewsPerWeek?: number;

  @ApiProperty({ required: false, example: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  viewsPerMonth?: number;

  @ApiProperty({ required: false, example: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  averagePriceRegion?: number;

  @ApiProperty({ required: false, example: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  averagePriceUkraine?: number;

  @ApiProperty({ required: false, type: () => [CreateCarDto] })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateCarDto)
  cars?: CreateCarDto[];
}
