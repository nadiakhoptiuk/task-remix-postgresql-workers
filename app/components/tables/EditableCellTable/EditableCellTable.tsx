import React from 'react';
import { format } from 'date-fns';
import { useControlField, ValidatedForm } from 'remix-validated-form';

import { Input } from '~/components/ui-kit/Input';
import { SubmitButton } from '~/components/ui-kit/SubmitButton';

import { tableCellValidator } from '~/utils/validationSchemas/tableCellValidator';
import { splitWorkingHours } from '~/utils/tableUtilities/generateHoursForCell';

import { EditableCellTableType } from './EditableCellTable.types';

export const EditableCellTable: React.FC<EditableCellTableType> = ({
  initialValue,
  userId,
  userName,
  date,
}) => {
  const arrayOfWorkingHours = splitWorkingHours(initialValue);

  const [billableValue, setBillableValue] = useControlField<string>(
    'workhours-form',
    'workdayBill',
  );
  const [notBillableValue, setNotBillableValue] = useControlField<string>(
    'workhours-form',
    'workdayNotBill',
  );
  const [absentValue, setAbsentValue] = useControlField<string>(
    'workhours-form',
    'workdayAbsent',
  );

  return (
    <ValidatedForm
      method="post"
      id="workhours-form"
      validator={tableCellValidator}
    >
      <div className="grid grid-cols-2 gap-x-24 mb-20">
        <label htmlFor="userId" className="text-2xl text-center font-semibold">
          {userName}
        </label>
        <input
          name="userId"
          type="text"
          value={Number(userId)}
          readOnly={true}
          className="visually-hidden"
        />

        <label htmlFor="date" className="text-2xl text-left font-semibold">
          {format(new Date(Number(date)), 'EEEE, dd.LL.y')}
        </label>
        <input
          name="date"
          type="number"
          value={date}
          readOnly={true}
          className="visually-hidden"
        />
      </div>

      <div className="grid grid-cols-3 gap-x-8 mb-20">
        <Input
          name="workdayBill"
          type="text"
          labelText="Billable hours:"
          value={billableValue}
          setValue={setBillableValue}
          defaultValue={arrayOfWorkingHours[0]}
        />
        <Input
          name="workdayNotBill"
          type="text"
          labelText="Not billable hours:"
          value={notBillableValue}
          setValue={setNotBillableValue}
          defaultValue={arrayOfWorkingHours[1]}
        />
        <Input
          name="workdayAbsent"
          type="text"
          labelText="Employee was absent:"
          value={absentValue}
          setValue={setAbsentValue}
          defaultValue={arrayOfWorkingHours[2]}
        />
      </div>

      <SubmitButton className="max-w-[300px] mx-auto block">
        Update
      </SubmitButton>
    </ValidatedForm>
  );
};
