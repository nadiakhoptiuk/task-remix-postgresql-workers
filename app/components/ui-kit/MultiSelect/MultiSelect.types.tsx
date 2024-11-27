import { MultiValue } from 'react-select';
import { OptionType } from '~/types/common.types';

export interface MultiSelectProps {
  name: string;
  setValue: (value: MultiValue<OptionType>) => void;
  options: OptionType[];
  value?: MultiValue<OptionType>;
  defaultValue?: MultiValue<OptionType>;
  labelText?: string;
  error?: string | undefined;
  wrapperClassName?: string;
  labelClassName?: string;
}
