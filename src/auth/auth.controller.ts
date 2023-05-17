import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AdminService } from '../admin/admin.service';
import { CreateAdminDto } from '../admin/dto/createAdmin.dto';
import { UserRole } from '../common/enum/user-role.enum';
import { MailTemplate } from '../common/mail/mail.interface';
import { MailService } from '../common/mail/mail.service';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private adminService: AdminService,
    private mailService: MailService,
  ) {}

  @Post('login')
  async login(@Res() res: any, @Body() body: LoginDto) {
    if (!body.email || !body.password) {
      return res
        .status(HttpStatus.FORBIDDEN)
        .json({ message: 'Error.Check_request_params' });
    }

    const findAdmin = await this.adminService.findAdminByEmail(body.email, {
      include: true,
    });

    if (!findAdmin || !findAdmin.user) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'Email or password is incorrect' });
    }

    const user = findAdmin.user;
    if (await this.authService.compareHash(body.password, user.password)) {
      const token = await this.authService.singIn(user.id.toString());
      return res.status(HttpStatus.OK).json({ token });
    }

    return res
      .status(HttpStatus.UNAUTHORIZED)
      .json({ message: 'Email or password is incorrect' });
  }

  @Post('register')
  async registerUser(@Res() res: any, @Body() body: CreateAdminDto) {
    let findUser;
    try {
      findUser = await this.adminService.findAdminByEmail(body.email.trim(), {
        include: { user: true },
      });
    } catch (err) {
      console.log(err);
    }

    if (findUser && findUser.user) {
      return res
        .status(HttpStatus.FORBIDDEN)
        .json({ message: 'User with this email already exists' });
    }

    const user = await this.adminService.createAdmin({
      email: body.email,
      password: body.password,
      firstName: body.firstName,
      lastName: body.lastName || '',
      avatar: body.avatar || '',
      role: UserRole.ADMIN,
      phoneNumber: body.phoneNumber,
      company: ' ',
      position: ' ',
    });

    if (!user) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Error.Register_user_failed' });
    }

    const admin = await this.adminService.createAdmin({
      email: body.email,
      password: body.password,
      firstName: body.firstName,
      lastName: body.lastName || '',
      avatar: body.avatar || '',
      role: UserRole.ADMIN,
      phoneNumber: body.phoneNumber,
      company: ' ',
      position: ' ',
    });

    if (admin) {
      const subject = 'Welcome on board!';
      this.mailService.send(user.email, subject, MailTemplate.WELCOME, {
        adminName: user.firstName,
      });

      const token = await this.authService.singIn(user.id.toString());
      return res.status(HttpStatus.OK).json({ token });
    }

    return res
      .status(HttpStatus.BAD_REQUEST)
      .json({ message: 'Error.Register_user_failed' });
  }
}
