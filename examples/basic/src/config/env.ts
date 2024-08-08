import 'dotenv/config';
import * as z from 'zod';
import { validateEnv } from '../utils/env';

// env validation schema
const EnvSchema = z.object({
  HOST: z.string().default('127.0.0.1'),
  PORT: z.coerce.number().default(3000),
  NAME: z.string().optional(), // assuming NAME can be optional
  NODE_ENV: z.enum(['dev', 'prod']).default('dev'),
  SECRET: z.string(),
  // database
  DATABASE_URL: z.string().url(),
});

// validate env
export default validateEnv<z.TypeOf<typeof EnvSchema>>(EnvSchema);
