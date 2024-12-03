import { UTCDate } from '@date-fns/utc';
import { getUnixTime } from 'date-fns';
import { WorkdayType } from '~/types/common.types';

export const generateHoursForCell = (
  dataObject: WorkdayType[],
  currentCellDate: Date,
) => {
  const dateHoursObj = dataObject.find(
    ({ date }) =>
      getUnixTime(new UTCDate(date)) === getUnixTime(currentCellDate),
  );
  if (!dateHoursObj) return '(not filled)';

  const { absent, billable, notBillable } = dateHoursObj;

  return `${billable}/${notBillable}/${absent}`;
};

export const splitWorkingHours = (cellData: string) => {
  if (!cellData.includes('/')) {
    return ['0', '0', '0'];
  }

  return cellData
    .split('/')
    .map(hour => (!hour ? '0' : Number(hour).toFixed(2)));
};
