import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';

import { configs } from '../../../../utils/configs/env.configs';
import { HandleApiError } from '../../../../utils/shared/errors/handleApiError';
import { jwtHelpers } from '../../../../utils/shared/helpers/jwtHelpers';
import { User } from '../../traders/trader.models';
import {
  TForgetPassResponse,
  TLoginEmail,
  TLoginUser,
  TLoginUserResponse,
  TRefreshTokenResponse,
} from './auth.interfaces';

const loginTrader = async (payload: TLoginUser): Promise<TLoginUserResponse> => {
  const { email, password } = payload;

  const isUserExist = await User.isUserExist(email);

  if (!isUserExist) {
    throw new HandleApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  if (isUserExist.password && !(await User.isPasswordMatched(password, isUserExist.password))) {
    throw new HandleApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  // create access token & refresh token

  const { _id: id, role } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { id, role },
    configs.jwtSecretAccess as Secret,
    configs.jwtSecretAccessExpired as string
  );

  const refreshToken = jwtHelpers.createToken(
    { id, role },
    configs.jwtSecretRefresh as Secret,
    configs.jwtSecretRefreshExpired as string
  );

  return {
    accessToken,
    refreshToken,
  };
};
const getAccessTokenByRefreshToken = async (token: string): Promise<TRefreshTokenResponse> => {
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(token, configs.jwtSecretRefresh as Secret);
  } catch (err) {
    throw new HandleApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }

  const { id } = verifiedToken;

  const isUserExist = await User.findById(id);
  if (!isUserExist) {
    throw new HandleApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  // generate new token

  const newAccessToken = jwtHelpers.createToken(
    {
      id: isUserExist._id,
      role: isUserExist.role,
    },
    configs.jwtSecretAccess as Secret,
    configs.jwtSecretAccessExpired as string
  );

  return {
    accessToken: newAccessToken,
  };
};
const resetPassword = async (payload: TLoginEmail): Promise<TForgetPassResponse> => {
  const { email } = payload;

  const user = await User.findOne({ email });

  if (!user) {
    throw new HandleApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  // generate new token
  const token = user.generateConfirmationToken();
  const date = new Date();
  const confirmationTokenExpires = date.setHours(date.getHours() + 1);
  await User.updateOne({ email }, { confirmationTokenExpires, confirmationToken: token });

  return { token };
};

export const AuthServices = { loginTrader, getAccessTokenByRefreshToken, resetPassword };
