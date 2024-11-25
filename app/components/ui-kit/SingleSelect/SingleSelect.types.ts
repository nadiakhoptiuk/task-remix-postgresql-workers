import { SingleValue } from 'react-select';
import { OptionType } from '~/types/common.types';

export interface SingleSelectProps {
  name: string;
  value: SingleValue<OptionType>;
  setValue: (value: SingleValue<OptionType>) => void;
  labelText: string;
  options: OptionType[];
  error?: string | undefined;
  wrapperClassName?: string;
  labelClassName?: string;
}
