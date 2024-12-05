import { useSearchParams } from '@remix-run/react';
import Select from 'react-select';

import { FilterSelectType } from './FilterSelect.types';

export const FilterSelect: React.FC<FilterSelectType> = ({
  paramsName,
  value,
  options,
  id,
  classNamePrefix,
  className = '',
  heading,
}) => {
  const [_, setSearchParams] = useSearchParams();

  return (
    <div className={className}>
      {heading && <p className="text-center mb-4">{heading}</p>}

      <Select
        instanceId={id}
        value={options.find(({ value: optionValue }) => value === optionValue)}
        options={options}
        onChange={value => {
          setSearchParams(
            prev => {
              prev.set(paramsName, value?.value || '');
              return prev;
            },
            {
              preventScrollReset: true,
            },
          );
        }}
        classNamePrefix={classNamePrefix}
        className="min-w-[200px] text-center w-max bg-ui_light"
      />
    </div>
  );
};
