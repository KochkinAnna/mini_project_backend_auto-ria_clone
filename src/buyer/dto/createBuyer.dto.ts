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

export class CreateBuyerDto {
  @ApiProperty({ required: true, example: 'buyer@gmail.com' })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ required: true, example: 'Abc12345' })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @Matches(PASSWORD_REGEX, {
    message:
      'Invalid input. The password must contain at least one uppercase and lowercase letter, one digit, one special character, and its length must be at least 8 characters',
  })
  password: string;

  @ApiProperty({ required: true, example: 'Jack' })
  @IsNotEmpty()
  @IsString()
  @Matches(FIRSTNAME_REGEX, {
    message:
      'Invalid input. First name must contain at least 2 characters and only letters, spaces, hyphens, apostrophes, and Cyrillic characters are allowed',
  })
  @NoProfanity()
  firstName: string;

  @ApiProperty({ required: false, example: 'Daniels' })
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

  @ApiProperty({ enum: UserRole })
  @IsNotEmpty()
  role: UserRole;

  @ApiProperty({ required: false, example: '+380500554417' })
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber()
  phoneNumber: string;
}
