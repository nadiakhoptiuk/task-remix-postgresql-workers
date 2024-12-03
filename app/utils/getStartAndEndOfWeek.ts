import { UTCDate } from '@date-fns/utc';
import { endOfWeek, format, startOfWeek } from 'date-fns';

export const getStartAndEndOfWeek = (
  date: Date | string | undefined | null,
) => {
  const dateValue = date ? new Date(date) : new Date();

  const startOfWeekDate = startOfWeek(new UTCDate(dateValue), {
    weekStartsOn: 1,
  });
  const endOfWeekDate = endOfWeek(new UTCDate(dateValue), { weekStartsOn: 1 });

  return {
    start: format(new UTCDate(startOfWeekDate), 'yyyy-LL-dd'),
    end: format(new UTCDate(endOfWeekDate), 'yyyy-LL-dd'),
  };
};
