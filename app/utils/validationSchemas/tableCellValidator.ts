import { withZod } from '@rvf/zod';
import { z } from 'zod';
import { zfd } from 'zod-form-data';

const editWorkHoursSchema = zfd.formData({
  userId: zfd.numeric(
    z.number().nonnegative().int().min(1, {
      message: 'UserId must be at least 1 characters long',
    }),
  ),
  date: zfd.text(
    z
      .string()
      .trim()
      .regex(new RegExp(/^[0-9]+$/), {
        message: 'Field may contains of: 0-9',
      })
      .min(10, {
        message: 'Date must be 10 characters long',
      }),
  ),
  workdayBill: zfd.text(
    z
      .string()
      .trim()
      .regex(new RegExp(/^[0-9.]?$/), {
        message: 'Field may contains of: 0-9 and .',
      })
      .max(5, {
        message: 'Name of tag must be 5 or fewer characters long',
      })
      .optional(),
  ),
  workdayNotBill: zfd.text(
    z
      .string()
      .trim()
      .regex(new RegExp(/^[0-9.]?$/), {
        message: 'Field may contains of: 0-9 and .',
      })
      .max(5, {
        message: 'Name of tag must be 5 or fewer characters long',
      })
      .optional(),
  ),
  workdayAbsent: zfd.text(
    z
      .string()
      .trim()
      .regex(new RegExp(/^[0-9.]?$/), {
        message: 'Field may contains of: 0-9 and .',
      })
      .max(5, {
        message: 'Name of tag must be 5 or fewer characters long',
      })
      .optional(),
  ),
});

export const tableCellValidator = withZod(editWorkHoursSchema);
