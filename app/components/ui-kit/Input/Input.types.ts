export interface InputProps {
  name: string;
  value: string;
  type: 'text' | 'email' | 'password' | 'number';
  setValue: (value: string) => void;
  readOnly?: boolean;
  labelText?: string;
  placeholder?: string;
  defaultValue?: string;
  error?: string | undefined;
  wrapperClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  errorTextClassName?: string;
}
