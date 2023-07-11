import express from 'express';
import zodValidator from '../../../../utils/middlewares/zodValidator';
import { UserControllers } from '../../traders/trader.controllers';
import { UserValidations } from '../../traders/trader.validations';
import { AuthControllers } from './email-pass.auth.controllers';
import { AuthValidations } from './auth.validations';

const router = express.Router();

const { createUser } = UserControllers;
const { createUserZodSchema } = UserValidations;
const { loginZodSchema, forgetPassZodSchema } = AuthValidations;

router.post('/signup', zodValidator(createUserZodSchema), createUser);
router.post('/login', zodValidator(loginZodSchema), AuthControllers.loginTrader);
router.post('/forget-pass', zodValidator(forgetPassZodSchema), AuthControllers.resetPassword);
router.post(
  '/refresh-token',
  zodValidator(AuthValidations.refreshTokenZodSchema),
  AuthControllers.getAccessTokenByRefreshToken
);

export const EmailPassAuthRoutes = router;
