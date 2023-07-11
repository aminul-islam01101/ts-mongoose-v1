import express from 'express';

import zodValidator from '../../../utils/middlewares/zodValidator';

import roleVerifier from '../../../utils/middlewares/roleVerifier';
import { EnumUserRole } from '../../../utils/shared/enum';
import { UserControllers } from './trader.controllers';
import { UserValidations } from './trader.validations';

const { getAllUsers, getSingleUser, updateUser, deleteUser, getMyProfile, updateMyProfile } =
  UserControllers;
const { updateUserZodSchema, updateMyProfileZodSchema } = UserValidations;
const { ADMIN, BUYER, SELLER } = EnumUserRole;

const router = express.Router();

router
  .route('/my-profile')
  .get(roleVerifier(BUYER, SELLER), getMyProfile)
  .patch(zodValidator(updateMyProfileZodSchema), roleVerifier(BUYER, SELLER), updateMyProfile);
router
  .route('/:id')
  .get(roleVerifier(ADMIN), getSingleUser)
  .patch(zodValidator(updateUserZodSchema), roleVerifier(ADMIN), updateUser)
  .delete(roleVerifier(ADMIN), deleteUser);
router.get('/', roleVerifier(ADMIN), getAllUsers);

export const UserRoutes = router;
