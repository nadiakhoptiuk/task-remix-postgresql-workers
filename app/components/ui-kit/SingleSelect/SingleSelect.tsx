import { FC } from 'react';
import classNames from 'classnames';
import Select from 'react-select';
import { useField } from 'remix-validated-form';

import { SingleSelectProps } from './SingleSelect.types';

import s from './SingleSelect.module.css';

export const SingleSelect: FC<SingleSelectProps> = ({
  name,
  value,
  setValue,
  labelText,
  options,
  wrapperClassName,
  labelClassName,
  defaultValue,
}) => {
  const { error, validate, getInputProps } = useField(name);

  return (
    <div className={classNames(s.baseInputWrapper, wrapperClassName)}>
      <label htmlFor={name} className={classNames(s.baseLabel, labelClassName)}>
        {labelText}
      </label>

      <Select
        instanceId="react-select"
        name={name}
        options={options}
        value={value}
        defaultValue={defaultValue}
        onChange={newSelection => {
          setValue(newSelection);
          validate();
        }}
        {...getInputProps()}
        classNamePrefix="single-select"
      />

      {error && (
        <span className="text-ui_red text-sm absolute bottom-[-24px] left-0">
          {error}
        </span>
      )}
    </div>
  );
};
