import { useField } from 'remix-validated-form';
import classNames from 'classnames';

import { InputProps } from './Input.types';

import s from './Input.module.css';

export const Input: React.FC<InputProps> = ({
  name,
  value,
  setValue,
  type,
  defaultValue,
  labelText,
  placeholder = '',
  readOnly = false,
  wrapperClassName,
  labelClassName,
  inputClassName,
  errorTextClassName,
}) => {
  const { error, getInputProps } = useField(name);

  return (
    <div className={classNames(s.baseInputWrapper, wrapperClassName)}>
      {labelText && (
        <label
          htmlFor={name}
          className={classNames(s.baseLabel, labelClassName)}
        >
          {labelText}
        </label>
      )}

      <input
        readOnly={readOnly}
        name={name}
        value={value}
        type={type}
        placeholder={placeholder}
        className={classNames(s.baseInput, inputClassName)}
        {...getInputProps({
          id: name,
          value,
          onChange: e => {
            setValue(e.target.value);
          },
        })}
        defaultValue={defaultValue}
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
