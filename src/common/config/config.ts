import { config } from 'dotenv';
config();

export const configs = {
  PORT: process.env.PORT || 3000,

  DATABASE_URL:
    process.env.DATABASE_URL ||
    'mysql://user:password@localhost:3306/dbname?schema=public',

  SECRET: process.env.SECRET || 'Secret',

  AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
  AWS_SECRET_KEY: process.env.AWS_SECRET_KEY,

  AWS_S3_NAME: process.env.AWS_S3_NAME,
  AWS_S3_REGION: process.env.AWS_S3_REGION,
  AWS_S3_URL: process.env.AWS_S3_URL,
  AWS_S3_ACL: process.env.AWS_S3_ACL,
};
