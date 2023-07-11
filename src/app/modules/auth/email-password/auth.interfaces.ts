import { Schema } from 'mongoose';

export type TLoginEmail = {
  email: string;
};
export type TLoginUser = TLoginEmail & {
  password: string;
};

export type TAccessToken = {
  accessToken: string;
};
export type TRefreshToken = {
  refreshToken: string;
};
export type TLoginUserResponse = TAccessToken & {
  refreshToken?: string;
};
export type TRefreshTokenResponse = TAccessToken;

export type TVerifiedLoginUser = {
  id: Schema.Types.ObjectId;
  role: 'seller' | 'buyer' | 'admin';
};

export type TResetMailData = {
  to: string[];
  subject: string;
  text: string;
  html: string;
};
export type TForgetPassResponse = {
  token: string;
};
