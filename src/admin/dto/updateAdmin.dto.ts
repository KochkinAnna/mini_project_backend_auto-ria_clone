import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

import { NoProfanity } from '../../common/decorator/noProfanity.decorator';
import { UserRole } from '../../common/enum/user-role.enum';
import { COMPANY_REGEX } from '../../common/regex/company.regex';
import { FIRSTNAME_REGEX } from '../../common/regex/firstName.regex';
import { LASTNAME_REGEX } from '../../common/regex/lastName.regex';
import { PASSWORD_REGEX } from '../../common/regex/password.regex';
import { POSITION_REGEX } from '../../common/regex/position.regex';

export class UpdateAdminDto {
  @ApiPropertyOptional({ example: 'admin@somecompany.com' })
  @IsOptional()
  @IsString()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ example: 'Abc12345' })
  @IsOptional()
  @IsString()
  @MinLength(8)
  @Matches(PASSWORD_REGEX, {
    message:
      'Invalid input. The password must contain at least one uppercase and lowercase letter, one digit, one special character, and its length must be at least 8 characters',
  })
  password?: string;

  @ApiPropertyOptional({ example: 'Kokos' })
  @IsOptional()
  @IsString()
  @Matches(FIRSTNAME_REGEX, {
    message:
      'Invalid input. First name must contain at least 2 characters and only letters, spaces, hyphens, apostrophes, and Cyrillic characters are allowed',
  })
  @NoProfanity()
  firstName?: string;

  @ApiPropertyOptional({ example: 'Kochkin' })
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

  @ApiPropertyOptional({ example: 'SomeCompany' })
  @IsOptional()
  @IsString()
  @Matches(COMPANY_REGEX, {
    message:
      'Invalid input. Company name should be SomeCompany or its partners',
  })
  company?: string;

  @ApiPropertyOptional({ enum: UserRole })
  @IsOptional()
  role?: UserRole;

  @ApiPropertyOptional({ example: '+380500554417' })
  @IsOptional()
  @IsString()
  @IsPhoneNumber()
  phoneNumber?: string;

  @ApiPropertyOptional({ example: 'CEO' })
  @IsOptional()
  @IsString()
  @Matches(POSITION_REGEX, {
    message:
      'Invalid input. Position must contain at least 2 characters and only letters, spaces, hyphens, apostrophes, and Cyrillic characters are allowed',
  })
  @NoProfanity()
  position?: string;
}