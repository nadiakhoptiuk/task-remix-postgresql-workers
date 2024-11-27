import { withZod } from '@rvf/zod';
import { z } from 'zod';
import { zfd } from 'zod-form-data';

const createOrEditTagSchema = zfd.formData({
  tagName: zfd.text(
    z
      .string()
      .trim()
      .regex(new RegExp(/^[a-zA-Z-' ]+$/), {
        message: "Must contains of: a-z, A-Z, - and '",
      })
      .min(3, { message: 'Name of tag must be 3 or more characters long' })
      .max(120, {
        message: 'Name of tag must be 120 or fewer characters long',
      }),
  ),
  users: zfd.repeatable(z.array(zfd.text()).optional()),
});

export const tagValidator = withZod(createOrEditTagSchema);
