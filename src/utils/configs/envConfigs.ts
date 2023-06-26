import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export const configs = {
  port: process.env.PORT,
  env: process.env.NODE_ENV,
  databaseUrl: process.env.DATABASE_URL,
  jwtSecretAccess: process.env.JWT_SECRET_ACCESS_TOKEN,
  jwtSecretRefresh: process.env.JWT_SECRET_REFRESH_TOKEN,
  jwtSecretAccessExpired: process.env.JWT_SECRET_ACCESS_TOKEN_EXPIRED,
  jwtSecretRefreshExpired: process.env.JWT_SECRET_REFRESH_TOKEN_EXPIRED,
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  googleLoginCallback: process.env.GOOGLE_LOGIN_CALLBACK,
};
