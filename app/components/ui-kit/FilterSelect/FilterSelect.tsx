import { useSearchParams } from '@remix-run/react';
import Select from 'react-select';

import { FilterSelectType } from './FilterSelect.types';

export const FilterSelect: React.FC<FilterSelectType> = ({
  paramsName,
  value,
  options,
  id,
  classNamePrefix,
}) => {
  const [_, setSearchParams] = useSearchParams();

  return (
    <Select
      instanceId={id}
      value={options.find(({ value: optionValue }) => value === optionValue)}
      options={options}
      onChange={value => {
        setSearchParams(prev => {
          prev.set(paramsName, value?.value || '');
          return prev;
        });
      }}
      classNamePrefix={classNamePrefix}
    />
  );
};
