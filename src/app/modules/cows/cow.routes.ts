import express from 'express';

import roleVerifier from '../../../utils/middlewares/roleVerifier';
import zodValidator from '../../../utils/middlewares/zodValidator';
import { EnumUserRole } from '../../../utils/shared/enum';
import { CowControllers } from './cow.controllers';
import { CowValidations } from './cow.validations';

const router = express.Router();
const { createCow, updateCow, deleteCow, getSingleCow, getAllCows } = CowControllers;
const { createCowZodSchema, updateCowZodSchema } = CowValidations;
const { SELLER, BUYER, ADMIN } = EnumUserRole;

router.post('/', zodValidator(createCowZodSchema), roleVerifier(SELLER), createCow);
router
  .route('/:id')
  .get(roleVerifier(SELLER, BUYER, ADMIN), getSingleCow)
  .patch(zodValidator(updateCowZodSchema), roleVerifier(SELLER), updateCow)
  .delete(roleVerifier(SELLER), deleteCow);

router.get('/', roleVerifier(SELLER, BUYER, ADMIN), getAllCows);

export const CowRoutes = router;
