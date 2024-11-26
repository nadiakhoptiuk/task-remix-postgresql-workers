import { withZod } from '@rvf/zod';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { ROLES } from '~/types/enums';

const createOrEditEmployeeSchema = zfd.formData({
  name: zfd.text(
    z
      .string()
      .trim()
      .regex(new RegExp(/^[a-zA-Z-' ]+$/), {
        message: "Must contains of: a-z, A-Z, - and '",
      })
      .min(5, { message: 'Name must be 5 or more characters long' })
      .max(120, { message: 'Name must be 120 or fewer characters long' }),
  ),
  role: zfd.text(z.enum([ROLES.ADMIN, ROLES.MANAGER, ROLES.USER])),
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
      .regex(new RegExp(/^[a-zA-Z0-9_]+$/), {
        message: 'Must contains of: a-z, A-Z, 0-9 or _',
      })
      .min(8, { message: 'Password must be 8 or more characters long' })
      .max(14, { message: 'Password must be 14 or fewer characters long' }),
  ),
});

export const createOrEditUserValidator = withZod(createOrEditEmployeeSchema);
