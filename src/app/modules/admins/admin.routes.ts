import express from 'express';

import zodValidator from '../../../utils/middlewares/zodValidator';
import { AdminControllers } from './admin.controllers';
import { AdminValidations } from './admin.validations';

const router = express.Router();

router.post(
  '/create-admin',
  zodValidator(AdminValidations.createAdminZodSchema),
  AdminControllers.createAdmin
);
router.post('/login', zodValidator(AdminValidations.loginZodSchema), AdminControllers.loginAdmin);
router.post(
  '/refresh-token',
  zodValidator(AdminValidations.refreshTokenZodSchema),
  AdminControllers.getAccessTokenByRefreshToken
);

//% formate
// router.route('/create-user',).post(

//   zodValidator(UserValidation.createUserZodSchema),
//   UserControllers.createUser
// router.route('/bulk-update').patch(productController.bulkUpdateProduct);
// router.route('/bulk-delete').delete(productController.bulkDeleteProduct);

// router.route('/').get(productController.getProducts).post(productController.createProduct);

export const AdminRoutes = router;
