import express from 'express';

import zodValidator from '../../../utils/middlewares/zodValidator';

import { UserControllers } from './user.controllers';
import { UserValidation } from './user.validation';

const router = express.Router();

router.post(
  '/auth/signup',
  zodValidator(UserValidation.createUserZodSchema),
  UserControllers.createUser
);
router
  .route('/:id')
  .get(UserControllers.getSingleUser)
  // .patch(productController.updateProductById)
  .delete(UserControllers.deleteSingleUser);
router.get('/', UserControllers.getAllUsers);

//% formate
// router.route('/create-user',).post(

//   zodValidator(UserValidation.createUserZodSchema),
//   UserControllers.createUser
// router.route('/bulk-update').patch(productController.bulkUpdateProduct);
// router.route('/bulk-delete').delete(productController.bulkDeleteProduct);

// router.route('/').get(productController.getProducts).post(productController.createProduct);

export const UserRoutes = router;
