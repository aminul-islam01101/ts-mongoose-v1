import { z } from 'zod';
import { breed, category, label, location } from './cow.constant';

const createCowZodSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    age: z.number({ required_error: 'Age is required' }),
    price: z.number({ required_error: 'Price is required' }),
    location: z.enum([...location] as [string, ...string[]], {
      required_error: 'location is required',
    }),
    breed: z.enum([...breed] as [string, ...string[]], {
      required_error: 'breed is required',
    }),
    weight: z.number({ required_error: 'Weight is required' }),
    label: z
      .enum([...label] as [string, ...string[]], {
        required_error: 'label is required',
      })
      .default('for sale'),
    category: z.enum([...category] as [string, ...string[]], {
      required_error: 'category is required',
    }),
    seller: z.string({ required_error: 'Seller is required' }),
  }),
});

const updateCowZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    age: z.number().optional(),
    price: z.number().optional(),
    location: z.enum([...location] as [string, ...string[]]).optional(),
    breed: z.enum([...breed] as [string, ...string[]]).optional(),
    weight: z.number().optional(),
    label: z
      .enum([...label] as [string, ...string[]])
      .default('for sale')
      .optional(),
    category: z.enum([...category] as [string, ...string[]]).optional(),
    seller: z.string().optional(),
  }),
});

export const CowValidations = {
  createCowZodSchema,
  updateCowZodSchema,
};
