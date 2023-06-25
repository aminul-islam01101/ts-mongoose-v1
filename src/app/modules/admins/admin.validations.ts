import { z } from 'zod';

const createAdminZodSchema = z.object({
  body: z.object({
    password: z
      .string({ required_error: 'password is required' })
      .min(6, 'Password must be at least 6 characters long'),
    role: z.enum(['admin'], {
      required_error: 'Role is required',
    }),
    name: z.object({
      firstName: z.string({
        required_error: 'First name is required',
      }),
      lastName: z.string({
        required_error: 'Last name is required',
      }),
    }),
    phoneNumber: z
      .string({
        required_error: 'Phone number is required',
      })
      .min(11, 'Phone number must be 11 digits.')
      .max(11, 'Phone number must be 11 digits.'),

    address: z.string({
      required_error: 'address is required',
    }),
  }),
});

const loginZodSchema = z.object({
  body: z.object({
    phoneNumber: z.string({
      required_error: 'phoneNumber is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});

const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh Token is required',
    }),
  }),
});

export const AdminValidations = { createAdminZodSchema, loginZodSchema, refreshTokenZodSchema };
