import prisma from '../../db/prisma';
import { SignupDto } from './auth.dto';
import { ApiRes, BadRequestError, UnauthorizedError, wrapper } from 'ex-lite';
import { compare, hash } from '../../utils/hash';
import type { Request } from 'express';

export const login = wrapper(async (req: Request<any, any, SignupDto>) => {
  const body = req.body;

  const user = await prisma.user.findUnique({ where: { email: body.email } });

  if (!user) throw new BadRequestError(`User not found with ${body.email}`);

  // compare user raw password
  const isCompare = await compare(body.password, user.password);

  // if user password not match, after throw un-auth error
  if (!isCompare) throw new UnauthorizedError('Invalid credentials');

  return ApiRes.ok(user, 'User login successfully');
});

export const register = wrapper(async (req: Request<any, any, SignupDto>) => {
  const { email, fullname, password } = req.body;

  let user = await prisma.user.findUnique({ where: { email } });

  if (user) throw new BadRequestError(`User already exists with ${email}`);

  user = await prisma.user.create({
    data: { email, fullname, password: await hash(password) } as any,
  });

  return ApiRes.ok(user, 'User registered successfully');
});
