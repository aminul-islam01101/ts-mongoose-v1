/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import { configs } from '../../../utils/configs/envConfigs';
import { HandleApiError } from '../../../utils/shared/errors/handleApiError';
import { jwtHelpers } from '../../../utils/shared/helpers/jwtHelpers';
import { TLoginUser, TLoginUserResponse, TRefreshTokenResponse } from '../auth/auth.interfaces';
import { TUserShared } from '../traders/trader.interfaces';
import { Admin } from './admin.models';

//# create a user
const createAdmin = async (user: TUserShared): Promise<TUserShared | null> => {
  const createdAdmin = await Admin.create(user);

  if (!createdAdmin) {
    throw new HandleApiError(400, 'Failed to create user');
  }

  return createdAdmin;
};
const loginAdmin = async (payload: TLoginUser): Promise<TLoginUserResponse> => {
  const { phoneNumber, password } = payload;

  const isAdminExist = await Admin.isAdminExist(phoneNumber);

  if (!isAdminExist) {
    throw new HandleApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  if (isAdminExist.password && !(await Admin.isPasswordMatched(password, isAdminExist.password))) {
    throw new HandleApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  // create access token & refresh token

  const { _id: id, role } = isAdminExist;
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

  // tumi delete hye gso  kintu tumar refresh token ase
  // checking deleted user's refresh token

  const isAdminExist = await Admin.findById(id);
  if (!isAdminExist) {
    throw new HandleApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  // generate new token

  const newAccessToken = jwtHelpers.createToken(
    {
      id: isAdminExist._id,
      role: isAdminExist.role,
    },
    configs.jwtSecretAccess as Secret,
    configs.jwtSecretAccessExpired as string
  );

  return {
    accessToken: newAccessToken,
  };
};

export const AdminServices = { createAdmin, loginAdmin, getAccessTokenByRefreshToken };
