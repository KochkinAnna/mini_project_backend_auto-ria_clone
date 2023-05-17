import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { MailTemplate } from '../common/mail/mail.interface';
import { MailService } from '../common/mail/mail.service';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private mailService: MailService,
  ) {}

  @Post('login')
  async login(@Res() res: any, @Body() body: LoginDto) {
    if (!body.email || !body.password) {
      return res
        .status(HttpStatus.FORBIDDEN)
        .json({ message: 'Error.Check_request_params' });
    }

    const user = await this.authService.login(body.email, body.password);

    if (!user) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'Email or password is incorrect' });
    }

    const token = await this.authService.signIn(user);
    return res.status(HttpStatus.OK).json({ token });
  }

  @Post('register')
  async registerUser(@Res() res: any, @Body() body: RegisterDto) {
    let existingUser;

    try {
      existingUser = await this.authService.findUserByEmail(body.email.trim());
    } catch (err) {
      console.log(err);
    }

    if (existingUser) {
      return res
        .status(HttpStatus.FORBIDDEN)
        .json({ message: 'User with this email already exists' });
    }

    const user = await this.authService.register(body);

    if (!user) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Error.Register_user_failed' });
    }

    const subject = 'Welcome on board!';
    this.mailService.send(user.email, subject, MailTemplate.WELCOME, {
      userName: user.firstName,
    });

    const token = await this.authService.signIn(user.id.toString());
    return res.status(HttpStatus.OK).json({ token });
  }
}
