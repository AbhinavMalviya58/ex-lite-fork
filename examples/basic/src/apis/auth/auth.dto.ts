import * as z from 'zod';

export const SigninDto = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const SignupDto = z.object({
  email: z.string().email(),
  fullname: z.string(),
  password: z.string(),
});

// types
export type SigninDto = z.infer<typeof SigninDto>;
export type SignupDto = z.infer<typeof SignupDto>;
