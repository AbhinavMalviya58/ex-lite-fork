import { AnyZodObject, ZodError } from 'zod';

export function validateEnv<T extends object>(schema: AnyZodObject) {
  try {
    return schema.readonly().parse(process.env) as Readonly<T>;
  } catch (err) {
    // Handle validation errors
    if (err instanceof ZodError)
      console.log(
        '❌ Invalid environment variables',
        err.formErrors.fieldErrors,
      );
    else console.error('❌', err);
    // Exit the process if validation fails
    process.exit(1);
  }
}
