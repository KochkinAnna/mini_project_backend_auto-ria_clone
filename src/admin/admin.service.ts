import { Injectable } from '@nestjs/common';

import { CreateAdminDto } from './dto/createAdmin.dto';

@Injectable()
export class AdminService {
  private admins: any = [];

  async getAdminList() {}

  async getAdmin() {}

  async createAdmin(adminData: CreateAdminDto) {
    this.admins.push(adminData);
    return this.admins;
  }

  async updateAdmin() {}

  async deleteAdmin() {}
}
