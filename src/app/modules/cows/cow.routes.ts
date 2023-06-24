import express from 'express';

import zodValidator from '../../../utils/middlewares/zodValidator';
import { CowControllers } from './cow.controllers';
import { CowValidations } from './cow.validations';

const router = express.Router();

// router
//   .route('/:id')
//   .get(UserControllers.getSingleUser)
//   .patch(zodValidator(UserValidations.updateUserZodSchema), UserControllers.updateUser)
//   .delete(UserControllers.deleteUser);

router.post('/', zodValidator(CowValidations.createCowZodSchema), CowControllers.createCow);
router
  .route('/:id')
  .get(CowControllers.getSingleCow)
  .patch(zodValidator(CowValidations.updateCowZodSchema), CowControllers.updateCow)
  .delete(CowControllers.deleteCow);

router.get('/', CowControllers.getAllCows);
// router
//   .route('/:id')
//   .get(UserControllers.getSingleUser)
//   .patch(zodValidator(UserValidation.updateUserZodSchema), UserControllers.updateUser)
//   .delete(UserControllers.deleteUser);
// router.get('/', UserControllers.getAllUsers);

//% formate
// router.route('/create-user',).post(

//   zodValidator(UserValidation.createUserZodSchema),
//   UserControllers.createUser
// router.route('/bulk-update').patch(productController.bulkUpdateProduct);
// router.route('/bulk-delete').delete(productController.bulkDeleteProduct);

// router.route('/').get(productController.getProducts).post(productController.createProduct);

export const CowRoutes = router;
