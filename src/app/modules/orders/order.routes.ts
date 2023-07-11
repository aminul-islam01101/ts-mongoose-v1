import express from 'express';

import roleVerifier from '../../../utils/middlewares/roleVerifier';
import zodValidator from '../../../utils/middlewares/zodValidator';
import { EnumUserRole } from '../../../utils/shared/enum';
import { OrderControllers } from './order.controllers';
import { orderValidations } from './order.validations';

const router = express.Router();
const { BUYER, ADMIN, SELLER } = EnumUserRole;

router
  .route('/')
  .post(
    zodValidator(orderValidations.createOrderZodSchema),
    roleVerifier(BUYER),
    OrderControllers.createOrder
  )
  .get(roleVerifier(ADMIN, BUYER, SELLER), OrderControllers.getAllOrders);
router.get('/:id', roleVerifier(ADMIN, BUYER, SELLER), OrderControllers.getSingleOrder);

export const OrderRoutes = router;
