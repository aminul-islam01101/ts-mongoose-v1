import { z } from 'zod';

const createOrderZodSchema = z.object({
  body: z.object({
    buyer: z.string({ required_error: 'Buyer is required' }),
    cow: z.string({ required_error: 'cow is required' }),
  }),
});

export const orderValidations = {
  createOrderZodSchema,
};
