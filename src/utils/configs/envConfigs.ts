import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export const configs = {
  port: process.env.PORT,
  env: process.env.NODE_ENV,
  databaseUrl: process.env.DATABASE_URL,
  default_user_pass: process.env.DEFAULT_USER_PASS,
};
