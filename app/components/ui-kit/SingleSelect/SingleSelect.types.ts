import { OptionType } from '~/types/common.types';

export interface SingleSelectProps {
  name: string;
  labelText: string;
  options: OptionType[];
  error?: string | undefined;
  wrapperClassName?: string;
  labelClassName?: string;
}
