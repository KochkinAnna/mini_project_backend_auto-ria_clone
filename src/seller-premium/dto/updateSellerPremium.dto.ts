import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsInt,
  IsNumber,
  IsOptional,
  Min,
  ValidateNested,
} from 'class-validator';
import UpdateCarDto from '../../car/dto/updateCar.dto';


export class UpdateSellerPremiumDto {
  @ApiProperty({ required: false, example: 1 })
  @IsOptional()
  @IsInt()
  sellerId?: number;

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

  @ApiProperty({ required: false, type: () => [UpdateCarDto] })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdateCarDto)
  cars?: UpdateCarDto[];
}
