export type TLoginUser = {
  phoneNumber: string;
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
  userId: string;
  role: 'admin';
};
