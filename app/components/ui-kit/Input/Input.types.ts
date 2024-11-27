export interface InputProps {
  name: string;
  value: string;
  setValue: (value: string) => void;
  type: 'text' | 'email' | 'password';
  labelText: string;
  placeholder: string;
  defaultValue?: string;
  error?: string | undefined;
  wrapperClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
}
