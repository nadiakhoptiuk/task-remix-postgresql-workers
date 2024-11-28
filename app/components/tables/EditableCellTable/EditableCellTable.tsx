import React from 'react';
import { useControlField, ValidatedForm } from 'remix-validated-form';

import { Input } from '~/components/ui-kit/Input';
import { SubmitButton } from '~/components/ui-kit/SubmitButton';

import { tableCellValidator } from '~/utils/validationSchemas/tableCellValidator';
import { splitWorkingHours } from '~/utils/tableUtilities/generateHoursForCell';

import { EditableCellTableType } from './EditableCellTable.types';

export const EditableCellTable: React.FC<EditableCellTableType> = ({
  initialValue,
  userId,
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
      defaultValues={{
        userId,
        date,
        workdayBill: arrayOfWorkingHours[0],
        workdayNotBill: arrayOfWorkingHours[1],
        workdayAbsent: arrayOfWorkingHours[2],
      }}
      validator={tableCellValidator}
      className=""
    >
      <div className="grid grid-cols-2 gap-x-10 mb-8">
        <input
          name="userId"
          type="text"
          value={Number(userId)}
          readOnly={true}
        />

        <input name="date" type="number" value={date} readOnly={true} />
      </div>

      <div className="grid grid-cols-3 gap-x-8 mb-10">
        <Input
          name="workdayBill"
          type="text"
          labelText="Billable hours:"
          value={billableValue}
          setValue={setBillableValue}
        />
        <Input
          name="workdayNotBill"
          type="text"
          labelText="Not billable hours:"
          value={notBillableValue}
          setValue={setNotBillableValue}
        />
        <Input
          name="workdayAbsent"
          type="text"
          labelText="Employee was absent:"
          value={absentValue}
          setValue={setAbsentValue}
        />
      </div>
      <SubmitButton>Update</SubmitButton>
    </ValidatedForm>
  );
};
