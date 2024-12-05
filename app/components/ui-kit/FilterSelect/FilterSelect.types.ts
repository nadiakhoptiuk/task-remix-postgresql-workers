import { OptionType } from '~/types/common.types';

export type FilterSelectType = {
  paramsName: string;
  value: string;
  options: OptionType[];
  id: string;
  classNamePrefix?: string;
  className?: string;
  heading?: string;
};
