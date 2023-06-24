import express from 'express';

import zodValidator from '../../../utils/middlewares/zodValidator';

import { UserControllers } from './user.controllers';
import { UserValidations } from './user.validations';

const router = express.Router();

router.post(
  '/auth/signup',
  zodValidator(UserValidations.createUserZodSchema),
  UserControllers.createUser
);
router
  .route('/:id')
  .get(UserControllers.getSingleUser)
  .patch(zodValidator(UserValidations.updateUserZodSchema), UserControllers.updateUser)
  .delete(UserControllers.deleteUser);
router.get('/', UserControllers.getAllUsers);

//% formate
// router.route('/create-user',).post(

//   zodValidator(UserValidation.createUserZodSchema),
//   UserControllers.createUser
// router.route('/bulk-update').patch(productController.bulkUpdateProduct);
// router.route('/bulk-delete').delete(productController.bulkDeleteProduct);

// router.route('/').get(productController.getProducts).post(productController.createProduct);

export const UserRoutes = router;
