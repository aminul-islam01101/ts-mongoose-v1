import { z } from 'zod';

const createUserZodSchema = z.object({
  body: z.object({
    user: z.object({
      role: z.string({
        required_error: 'role is required',
      }),
      email: z
        .string()
        .refine((value) => value.includes('@'), {
          message: 'email is invalid',
        })
        .refine((value) => value.trim().length > 0, {
          message: 'email is required',
        }),
      password: z.string().optional(),
    }),
  }),
});

export const UserValidation = {
  createUserZodSchema,
};
