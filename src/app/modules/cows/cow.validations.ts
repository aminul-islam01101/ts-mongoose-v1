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

// const updateUserZodSchema = z
//   .object({
//     body: z
//       .object({
//         password: z.string().min(6, 'Password must be at least 6 characters long').optional(),
//         role: z.enum(['seller', 'buyer'], {
//           required_error: 'Role is required',
//         }),
//         name: z
//           .object({
//             firstName: z.string().optional(),
//             lastName: z.string().optional(),
//           })
//           .optional(),
//         phoneNumber: z
//           .string()
//           .min(11, 'Phone number must be 11 digits.')
//           .max(11, 'Phone number must be 11 digits.')
//           .optional(),
//         address: z.string().optional(),
//         budget: z.number().optional(),
//         income: z
//           .number()
//           .refine((value) => value === 0, 'Invalid income value')
//           .optional(),
//       })
//       .optional(),
//   })
//   .refine(
//     (data) =>
//       (data.body?.role === 'buyer' && data.body?.budget !== undefined && data.body.budget > 0) ||
//       (data.body?.role === 'seller' && (data.body?.budget === undefined || data.body.budget === 0)),
//     {
//       message: 'Invalid budget value',
//     }
//   );

export const CowValidations = {
  createCowZodSchema,
  // updateUserZodSchema,
};
