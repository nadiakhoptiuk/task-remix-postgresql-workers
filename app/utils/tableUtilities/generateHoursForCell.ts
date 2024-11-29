import { getUnixTime } from 'date-fns';
import { WorkdayType } from '~/types/common.types';

export const generateHoursForCell = (
  dataObject: WorkdayType[],
  currentCellDate: Date,
) => {
  const dateHoursObj = dataObject.find(
    ({ date }) => getUnixTime(new Date(date)) === getUnixTime(currentCellDate),
  );
  if (!dateHoursObj) return '//';

  const { absent, billable, notBillable } = dateHoursObj;

  return `${billable}/${notBillable}/${absent}`;
};

export const splitWorkingHours = (cellData: string) => {
  return cellData
    .split('/')
    .map(hour => (!hour ? '0' : Number(hour).toFixed(2)));
};
