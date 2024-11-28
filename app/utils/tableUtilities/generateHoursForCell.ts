import { WorkdayType } from '~/types/common.types';

export const generateHoursForCell = (
  dataObject: WorkdayType[],
  currentCellDate: Date,
) => {
  const dateHoursObj = dataObject.find(({ date }) => date === currentCellDate);
  if (!dateHoursObj) return '//';

  const { absent, billable, notBillable } = dateHoursObj;

  return `${billable}/${notBillable}/${absent}`;
};

export const splitWorkingHours = (cellData: string) => {
  return cellData
    .split('/')
    .map(hour => (!hour ? '' : Number(hour).toFixed(2)));
};
