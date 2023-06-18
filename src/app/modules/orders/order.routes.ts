import express from 'express';

import zodValidator from '../../../utils/middlewares/zodValidator';
import { OrderControllers } from './order.controllers';
import { orderValidations } from './order.validations';

const router = express.Router();

router
  .route('/')
  .post(zodValidator(orderValidations.createOrderZodSchema), OrderControllers.createOrder)
  .get(OrderControllers.getAllOrders);

export const OrderRoutes = router;
