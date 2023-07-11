import express from 'express';

import zodValidator from '../../../utils/middlewares/zodValidator';
import { AdminControllers } from './admin.controllers';
import { AdminValidations } from './admin.validations';
import { AuthValidations } from '../auth/email-password/auth.validations';

const router = express.Router();

router.post(
  '/create-admin',
  zodValidator(AdminValidations.createAdminZodSchema),
  AdminControllers.createAdmin
);
router.post('/login', zodValidator(AuthValidations.loginZodSchema), AdminControllers.loginAdmin);
router.post(
  '/refresh-token',
  zodValidator(AuthValidations.refreshTokenZodSchema),
  AdminControllers.getAccessTokenByRefreshToken
);

export const AdminRoutes = router;
