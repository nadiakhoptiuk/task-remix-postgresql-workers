import React, { useEffect } from 'react';
import { format } from 'date-fns';
import { useFetcher } from '@remix-run/react';
import { ValidatedForm, useIsSubmitting } from 'remix-validated-form';

import { SubmitButton } from '~/components/ui-kit/SubmitButton';
import { SimpleInput } from '~/components/ui-kit/SimpleInput';

import { tableCellValidator } from '~/utils/validationSchemas/tableCellValidator';
import { splitWorkingHours } from '~/utils/tableUtilities/generateHoursForCell';
import { getSubmitBtnLabel } from '~/utils/uxUtilities/getSubmitBtnLabel';

import {
  DispatchEditableCellFormType,
  EditableCellFormType,
} from './EditableCellForm.types';

export const EditableCellForm: React.FC<
  EditableCellFormType & DispatchEditableCellFormType
> = ({ initialValue, userId, userName, date, setEditFormValues, editorId }) => {
  const arrayOfWorkingHours = splitWorkingHours(initialValue);
  const fetcher = useFetcher();
  const isSubmitting = useIsSubmitting('workhours-form');

  useEffect(() => {
    if (editorId) {
      fetcher.submit(
        { rowIndex: userId, columnId: date, editorId },
        { method: 'POST', action: '/handleUserLocationSend' },
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ValidatedForm
      method="post"
      id="workhours-form"
      validator={tableCellValidator}
      className="w-full mx-auto"
      defaultValues={{
        workdayBill: arrayOfWorkingHours[0],
        workdayNotBill: arrayOfWorkingHours[1],
        workdayAbsent: arrayOfWorkingHours[2],
      }}
      onSubmit={() => {
        setEditFormValues(null);
      }}
    >
      <div className="grid grid-cols-1 gap-y-4 gap-x-24 mb-10">
        <label
          htmlFor="userId"
          className="text-xl xl:text-2xl text-center font-semibold"
        >
          {userName}
        </label>
        <input
          name="userId"
          type="text"
          value={Number(userId)}
          readOnly={true}
          className="visually-hidden"
        />

        <label
          htmlFor="date"
          className="text-xl xl:text-2xl text-center font-semibold"
        >
          {format(new Date(date), 'EEEE, dd.LL.y')}
        </label>
        <input
          name="date"
          type="string"
          value={date}
          readOnly={true}
          className="visually-hidden"
        />
      </div>

      <div className="w-fit mx-auto grid grid-cols-1 gap-x-8 gap-y-4 mb-8">
        <SimpleInput name="workdayBill" label="Billable hours:" />
        <SimpleInput name="workdayNotBill" label="Not billable hours:" />
        <SimpleInput name="workdayAbsent" label="Was absent:" />
      </div>

      <SubmitButton
        isSubmitting={isSubmitting}
        className="max-w-[300px] mx-auto block"
      >
        {getSubmitBtnLabel(isSubmitting, 'update')}
      </SubmitButton>
    </ValidatedForm>
  );
};
