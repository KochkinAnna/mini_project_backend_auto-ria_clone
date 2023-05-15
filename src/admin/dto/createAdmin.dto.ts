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
import { COMPANY_REGEX } from '../../common/regex/company.regex';
import { FIRSTNAME_REGEX } from '../../common/regex/firstName.regex';
import { LASTNAME_REGEX } from '../../common/regex/lastName.regex';
import { PASSWORD_REGEX } from '../../common/regex/password.regex';
import { POSITION_REGEX } from '../../common/regex/position.regex';

export class CreateAdminDto {
  @ApiProperty({ required: true, example: 'admin@somecompany.com' })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ required: true, example: 'MyPassw0rd!_' })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @Matches(PASSWORD_REGEX, {
    message:
      'Invalid input. The password must contain at least one uppercase and lowercase letter, one digit, one special character, and its length must be at least 8 characters',
  })
  password: string;

  @ApiProperty({ required: true, example: 'Kokos' })
  @IsNotEmpty()
  @IsString()
  @Matches(FIRSTNAME_REGEX, {
    message:
      'Invalid input. First name must contain at least 2 characters and only letters, spaces, hyphens, apostrophes, and Cyrillic characters are allowed',
  })
  @NoProfanity()
  firstName: string;

  @ApiProperty({ required: false, example: 'Kochkin' })
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

  @ApiProperty({ required: true, example: 'SomeCompany' })
  @IsNotEmpty()
  @IsString()
  @Matches(COMPANY_REGEX, {
    message:
      'Invalid input. Company name should be SomeCompany or its partners',
  })
  company: string;

  @ApiProperty({ enum: UserRole })
  @IsNotEmpty()
  role: UserRole;

  @ApiProperty({ required: false, example: '+380500554417' })
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber()
  phoneNumber: string;

  @ApiProperty({ required: true, example: 'CEO' })
  @IsNotEmpty()
  @IsString()
  @Matches(POSITION_REGEX, {
    message:
      'Invalid input. Position must contain at least 2 characters and only letters, spaces, hyphens, apostrophes, and Cyrillic characters are allowed',
  })
  @NoProfanity()
  position: string;
}
