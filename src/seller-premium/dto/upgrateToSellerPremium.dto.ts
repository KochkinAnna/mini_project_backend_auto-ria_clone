import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class UpgradeSellerPremiumDto {
  @ApiProperty()
  @IsBoolean()
  premiumSeller: boolean;
}
