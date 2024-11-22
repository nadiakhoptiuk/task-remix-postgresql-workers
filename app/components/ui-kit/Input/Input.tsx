import classNames from 'classnames';
import { useField } from 'remix-validated-form';

import { InputProps } from './Input.types';

import s from './Input.module.css';

export const Input: React.FC<InputProps> = ({
  name,
  type,
  labelText,
  placeholder,
  wrapperClassName,
  labelClassName,
  inputClassName,
}) => {
  const { error, getInputProps } = useField(name);

  return (
    <div className={classNames(s.baseInputWrapper, wrapperClassName)}>
      <label htmlFor={name} className={classNames(s.baseLabel, labelClassName)}>
        {labelText}
      </label>

      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className={classNames(s.baseInput, inputClassName)}
        {...getInputProps({ id: name })}
      />
      {error && (
        <span className="text-ui_red text-sm absolute bottom-[-24px] left-0">
          {error}
        </span>
      )}
    </div>
  );
};
