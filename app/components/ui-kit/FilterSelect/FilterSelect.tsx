import { useSearchParams } from '@remix-run/react';
import Select from 'react-select';

import { FilterSelectType } from './FilterSelect.types';

export const FilterSelect: React.FC<FilterSelectType> = ({
  paramsName,
  value,
  options,
  id,
  classNamePrefix,
  heading,
}) => {
  const [_, setSearchParams] = useSearchParams();

  return (
    <div>
      {heading && <p className="text-center mb-4">{heading}</p>}

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
        className="min-w-[120px] w-max text-center"
      />
    </div>
  );
};
