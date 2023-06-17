/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import httpStatus from 'http-status';

import { TCow, TCowFilters } from './cow.interfaces';
import { Cow } from './cow.models';

import { HandleApiError } from '../../../utils/shared/errors/handleApiError';
import { searchFilterCalculator } from '../../../utils/shared/helpers/searchAndFilter';
import {
  calculatePagination,
  sortConditionSetter,
} from '../../../utils/shared/paginations/pagination.calculator';
import { TPaginationOptions } from '../../../utils/shared/types/paginationTypes';
import { TGenericResponse } from '../../../utils/shared/types/responseTypes';
import { TUser } from '../users/user.interfaces';
import { User } from '../users/user.models';
import { cowSearchableFields } from './cow.constant';

//# create a user
const createCow = async (cow: TCow): Promise<TCow | null> => {
  const isExist = (await User.findById(cow.seller)) as TUser;

  if (!isExist) {
    throw new HandleApiError(httpStatus.NOT_FOUND, 'Seller not found !');
  }
  if (isExist.role !== 'seller') {
    throw new HandleApiError(
      httpStatus.BAD_REQUEST,
      'Its not a seller ! Must be a seller id to create cow !'
    );
  }

  const createdCow = await Cow.create(cow);

  if (!createdCow) {
    throw new HandleApiError(400, 'Failed to create user');
  }

  return createdCow;
};
// //# get all cows
const getAllCows = async (
  filters: TCowFilters,
  paginationOptions: Partial<TPaginationOptions>
): Promise<TGenericResponse<TCow[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } = calculatePagination(paginationOptions);

  const whereConditions = searchFilterCalculator(searchTerm, cowSearchableFields, filtersData);
  const sortConditions = sortConditionSetter(sortBy, sortOrder);

  const result = await Cow.find(whereConditions).sort(sortConditions).skip(skip).limit(limit);

  const total = await Cow.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
// //# get a user
// const getSingleUser = async (id: string): Promise<TCow | null> => {
//   const SingleUser = await User.findById(id);

//   return SingleUser;
// };

// //# update a user
// const updateUser = async (id: string, payload: Partial<TCow>): Promise<TCow | null> => {
//   const isExist = await User.findOne({ id });

//   if (!isExist) {
//     throw new HandleApiError(httpStatus.NOT_FOUND, 'User not found !');
//   }

//   const { name, ...userData } = payload;

//   const updatedUserData: Partial<TCow> = { ...userData };

//   if (updatedUserData.phoneNumber !== undefined) {
//     const isPhoneExist = await User.findOne({ phoneNumber: updatedUserData.phoneNumber });
//     if (isPhoneExist) {
//       throw new HandleApiError(httpStatus.BAD_REQUEST, 'This phone number is already exist !');
//     }
//   }

//   // dynamically handling

//   if (name && Object.keys(name).length > 0) {
//     Object.keys(name).forEach((key) => {
//       const nameKey = `name.${key}` as keyof Partial<TCow>;
//       (updatedUserData as any)[nameKey] = name[key as keyof typeof name];
//     });
//   }

//   const result = await User.findOneAndUpdate({ id }, updatedUserData, {
//     new: true,
//   });
//   return result;
// };
// //# delete a user
// const deleteUser = async (id: string): Promise<TCow | null> => {
//   const SingleUser = await User.findByIdAndDelete(id);

//   return SingleUser;
// };

export const CowServices = {
  createCow,
  getAllCows,
  // getAllUsers,
  // getSingleUser,
  // updateUser,
  // deleteUser,
};
