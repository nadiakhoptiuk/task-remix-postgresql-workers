import { MultiValue } from 'react-select';
import { OptionType } from '~/types/common.types';

export interface MultiSelectProps {
  name: string;
  value: MultiValue<OptionType>;
  setValue: (value: MultiValue<OptionType>) => void;
  options: OptionType[];
  labelText?: string;
  error?: string | undefined;
  wrapperClassName?: string;
  labelClassName?: string;
}
