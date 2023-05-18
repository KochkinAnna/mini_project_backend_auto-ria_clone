import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Admin, Buyer, Manager, Seller, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { AdminService } from '../admin/admin.service';
import { BuyerService } from '../buyer/buyer.service';
import { UserRole } from '../common/enum/user-role.enum';
import { ManagerService } from '../manager/manager.service';
import { SellerService } from '../seller/seller.service';
import { RegisterDto } from './dto/auth.dto';

interface UserWithUserProperty extends Admin, Manager, Buyer, Seller {
  user: User & { id: number };
}

@Injectable()
export class AuthService {
  constructor(
    private adminService: AdminService,
    private managerService: ManagerService,
    private buyerService: BuyerService,
    private sellerService: SellerService,
    private jwtService: JwtService,
  ) {}

  async compareHash(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }

  async login(email: string, password: string) {
    let user: UserWithUserProperty | undefined;

    const adminUser = await this.adminService.findAdminByEmail(email, {
      include: { user: true },
    });
    if (adminUser && adminUser.user) {
      user = adminUser as unknown as UserWithUserProperty;
    }

    if (!user || !user.user) {
      const managerUser = await this.managerService.findManagerByEmail(email, {
        include: { user: true },
      });
      if (managerUser && managerUser.user) {
        user = managerUser as unknown as UserWithUserProperty;
      }

      if (!user || !user.user) {
        const buyerUser = await this.buyerService.findBuyerByEmail(email, {
          include: { user: true },
        });
        if (buyerUser && buyerUser.user) {
          user = buyerUser as unknown as UserWithUserProperty;
        }

        if (!user || !user.user) {
          const sellerUser = await this.sellerService.findSellerByEmail(email, {
            include: { user: true },
          });
          if (sellerUser && sellerUser.user) {
            user = sellerUser as unknown as UserWithUserProperty;
          }

          if (!user || !user.user) {
            return null;
          }

          const isPasswordValid = await this.compareHash(
            password,
            user.user.password,
          );

          if (!isPasswordValid) {
            return null;
          }

          return this.generateToken(user.user.id);
        }

        return this.generateToken(user.user.id);
      }
    }
  }

  async register(dto: RegisterDto) {
    let user;
    if (dto.role === UserRole.ADMIN) {
      user = await this.adminService.createAdmin({
        email: dto.email,
        password: dto.password,
        firstName: dto.firstName,
        lastName: dto.lastName || '',
        avatar: dto.avatar || '',
        role: dto.role,
        phoneNumber: dto.phoneNumber,
        company: '',
        position: '',
      });
    } else if (dto.role === UserRole.MANAGER) {
      user = await this.managerService.createManager({
        email: dto.email,
        password: dto.password,
        firstName: dto.firstName,
        lastName: dto.lastName || '',
        avatar: dto.avatar || '',
        role: dto.role,
        phoneNumber: dto.phoneNumber,
      });
    } else if (dto.role === UserRole.BUYER) {
      user = await this.buyerService.createBuyer({
        email: dto.email,
        password: dto.password,
        firstName: dto.firstName,
        lastName: dto.lastName || '',
        avatar: dto.avatar || '',
        role: dto.role,
        phoneNumber: dto.phoneNumber,
      });
    } else if (dto.role === UserRole.SELLER) {
      user = await this.sellerService.createSeller({
        email: dto.email,
        password: dto.password,
        firstName: dto.firstName,
        lastName: dto.lastName || '',
        avatar: dto.avatar || '',
        role: dto.role,
        phoneNumber: dto.phoneNumber,
      });
    }

    return user;
  }

  async findUserByEmail(
    email: string,
  ): Promise<UserWithUserProperty | undefined> {
    let user: UserWithUserProperty | undefined;

    const adminUser = await this.adminService.findAdminByEmail(email, {
      include: { user: true },
    });
    if (adminUser && adminUser.user) {
      user = adminUser as unknown as UserWithUserProperty;
    }

    if (!user || !user.user) {
      const managerUser = await this.managerService.findManagerByEmail(email, {
        include: { user: true },
      });
      if (managerUser && managerUser.user) {
        user = managerUser as unknown as UserWithUserProperty;
      }
    }

    if (!user || !user.user) {
      const buyerUser = await this.buyerService.findBuyerByEmail(email, {
        include: { user: true },
      });
      if (buyerUser && buyerUser.user) {
        user = buyerUser as unknown as UserWithUserProperty;
      }
    }

    if (!user || !user.user) {
      const sellerUser = await this.sellerService.findSellerByEmail(email, {
        include: { user: true },
      });
      if (sellerUser && sellerUser.user) {
        user = sellerUser as unknown as UserWithUserProperty;
      }
    }

    return user;
  }

  async generateToken(userId: number) {
    return this.jwtService.sign({ id: userId });
  }

  async signIn(userId: any): Promise<any> {
    return this.generateToken(userId);
  }
}
