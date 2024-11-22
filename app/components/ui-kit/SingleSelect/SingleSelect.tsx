import { FC } from 'react';
import classNames from 'classnames';
import Select from 'react-select';
import { useControlField, useField } from 'remix-validated-form';

import { SingleSelectProps } from './SingleSelect.types';
import { OptionType } from '~/types/common.types';

import s from './SingleSelect.module.css';

export const SingleSelect: FC<SingleSelectProps> = ({
  name,
  labelText,
  options,
  wrapperClassName,
  labelClassName,
}) => {
  const { error, validate } = useField(name);
  const [value, setValue] = useControlField<OptionType | null>(name);

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
        defaultValue={options[0]}
        onChange={newSelection => {
          setValue(newSelection);
          validate();
        }}
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
