import { Router } from 'express';
import { validate } from 'ex-lite';
import * as controller from './auth.controller';
import { SigninDto, SignupDto } from './auth.dto';

export const authRoutes = (): Router => {
  // Router
  const router = Router();

  // Initialize
  router.route('/login').post(validate.body(SigninDto), controller.login);
  router.route('/register').post(validate.body(SignupDto), controller.register);

  return router;
};
