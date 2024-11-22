export interface InputProps {
  name: string;
  type: 'text' | 'email' | 'password';
  labelText: string;
  placeholder: string;
  error?: string | undefined;
  wrapperClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
}
