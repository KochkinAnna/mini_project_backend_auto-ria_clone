import { Admin, Buyer, Manager, Seller, User } from '@prisma/client';

export interface UserWithUserProperty extends Admin, Manager, Buyer, Seller {
  user: User & { id: number };
}
