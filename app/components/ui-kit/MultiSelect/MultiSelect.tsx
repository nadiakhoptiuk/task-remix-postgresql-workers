import classNames from 'classnames';
import Select from 'react-select';
import { useField } from 'remix-validated-form';

import { MultiSelectProps } from './MultiSelect.types';

import s from './MultiSelect.module.css';

export const MultiSelect: React.FC<MultiSelectProps> = ({
  name,
  value,
  setValue,
  labelText = 'Users',
  options,
  wrapperClassName,
  labelClassName,
}) => {
  const { error, validate, getInputProps } = useField(name);

  return (
    <div className={classNames(s.baseInputWrapper, wrapperClassName)}>
      <label htmlFor={name} className={classNames(s.baseLabel, labelClassName)}>
        {labelText}
      </label>

      <Select
        closeMenuOnSelect={false}
        isMulti
        instanceId="react-multi-select"
        name={name}
        value={value}
        options={options}
        defaultValue={value || null}
        onChange={newSelection => {
          setValue(newSelection);
          validate();
        }}
        {...getInputProps()}
        classNamePrefix="react-multi-select"
      />

      {error && (
        <span className="text-ui_red text-sm absolute bottom-[-24px] left-0">
          {error}
        </span>
      )}
    </div>
  );
};
