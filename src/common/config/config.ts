import { config } from 'dotenv';
config();

export const configs = {
  PORT: process.env.PORT || 3000,

  DATABASE_URL:
    process.env.DATABASE_URL ||
    'mysql://user:password@localhost:3306/dbname?schema=public',

  SECRET: process.env.SECRET || 'Secret',
};
