import { withZod } from '@rvf/zod';
import { z } from 'zod';
import { zfd } from 'zod-form-data';

const authUserSchema = zfd.formData({
  email: zfd.text(
    z
      .string()
      .trim()
      .email({ message: 'Invalid email address' })
      .min(5, { message: 'Email must be 5 or more characters long' })
      .max(80, { message: 'Email must be 80 or fewer characters long' }),
  ),
  password: zfd.text(
    z
      .string()
      .trim()
      .regex(new RegExp(/^[a-zA-Z0-9]+$/))
      .min(8, { message: 'Password must be 8 or more characters long' })
      .max(14, { message: 'Password must be 14 or fewer characters long' }),
  ),
});

export const authUserCredentialsValidator = withZod(authUserSchema);
