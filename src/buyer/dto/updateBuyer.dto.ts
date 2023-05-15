import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

import { NoProfanity } from '../../common/decorator/noProfanity.decorator';
import { UserRole } from '../../common/enum/user-role.enum';
import { FIRSTNAME_REGEX } from '../../common/regex/firstName.regex';
import { LASTNAME_REGEX } from '../../common/regex/lastName.regex';
import { PASSWORD_REGEX } from '../../common/regex/password.regex';

export class UpdateBuyerDto {
  @ApiPropertyOptional({ example: 'buyer@gmail.com' })
  @IsOptional()
  @IsString()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ example: 'MyPassw0rd!_' })
  @IsOptional()
  @IsString()
  @MinLength(8)
  @Matches(PASSWORD_REGEX, {
    message:
      'Invalid input. The password must contain at least one uppercase and lowercase letter, one digit, one special character, and its length must be at least 8 characters',
  })
  password?: string;

  @ApiPropertyOptional({ example: 'Jack' })
  @IsOptional()
  @IsString()
  @Matches(FIRSTNAME_REGEX, {
    message:
      'Invalid input. First name must contain at least 2 characters and only letters, spaces, hyphens, apostrophes, and Cyrillic characters are allowed',
  })
  @NoProfanity()
  firstName?: string;

  @ApiPropertyOptional({ example: 'Daniels' })
  @IsOptional()
  @IsString()
  @Matches(LASTNAME_REGEX, {
    message:
      'Invalid input. Last name must contain at least 2 characters and only letters, spaces, hyphens, apostrophes, and Cyrillic characters are allowed',
  })
  @NoProfanity()
  lastName?: string;

  @ApiPropertyOptional()
  avatar?: string;

  @ApiPropertyOptional({ enum: UserRole })
  @IsOptional()
  role?: UserRole;

  @ApiPropertyOptional({ example: '+380500554417' })
  @IsOptional()
  @IsString()
  @IsPhoneNumber()
  phoneNumber?: string;
}
