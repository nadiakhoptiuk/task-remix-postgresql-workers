export interface InputProps {
  name: string;
  type: 'text' | 'email' | 'password';
  labelText: string;
  placeholder: string;
  error?: string | undefined;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
}
