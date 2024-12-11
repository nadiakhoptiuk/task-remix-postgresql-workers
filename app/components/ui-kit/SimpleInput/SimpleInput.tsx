import { useField } from 'remix-validated-form';
import classNames from 'classnames';

import { SimpleInputProps } from './SimpleInput.types';

import s from './SimpleInput.module.css';

export const SimpleInput = ({
  name,
  label,
  isPasswordInput,
  placeholder = '',
  wrapperClassName = '',
  labelClassName = '',
  inputClassName = '',
  errorTextClassName = '',
}: SimpleInputProps) => {
  const { error, getInputProps } = useField(name);

  return (
    <div className={classNames(s.baseInputWrapper, wrapperClassName)}>
      <label htmlFor={name} className={classNames(s.baseLabel, labelClassName)}>
        {label}
      </label>

      <input
        {...getInputProps({
          id: name,
          ...(isPasswordInput ? { type: 'password' } : {}),
        })}
        className={classNames(s.baseInput, inputClassName)}
        placeholder={placeholder}
      />

      {error && (
        <span
          className={classNames(
            'text-ui_red text-sm absolute bottom-[-24px] left-0',
            errorTextClassName,
          )}
        >
          {error}
        </span>
      )}
    </div>
  );
};
