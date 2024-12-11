import { SingleValue } from 'react-select';
import {
  useControlField,
  useIsSubmitting,
  ValidatedForm,
} from 'remix-validated-form';

import { SubmitButton } from '~/components/ui-kit/SubmitButton';
import { SingleSelect } from '~/components/ui-kit/SingleSelect';
import { SimpleInput } from '~/components/ui-kit/SimpleInput';

import { createOrEditUserValidator } from '~/utils/validationSchemas/createOrEditEmployeeSchema';
import { getSubmitBtnLabel } from '~/utils/uxUtilities/getSubmitBtnLabel';

import { ROLE_SELECT_OPTIONS } from '~/constants/constants';
import { OptionType } from '~/types/common.types';
import { EmployeeFormProps } from './CreateOrUpdateEmployeeForm.types';

export const CreateOrUpdateEmployeeForm: React.FC<EmployeeFormProps> = ({
  formType,
  defaultValues,
}) => {
  const [roleValue, setRoleValue] = useControlField<SingleValue<OptionType>>(
    'user-form',
    'role',
  );

  const isSubmitting = useIsSubmitting('user-form');

  return (
    <ValidatedForm
      validator={createOrEditUserValidator}
      id="user-form"
      defaultValues={{ name: defaultValues?.name, email: defaultValues?.email }}
      method="post"
      className="grid grid-cols-1 gap-y-8 max-w-[600px] mx-auto"
    >
      <SimpleInput name="name" label="Name:" placeholder="John Smith" />

      <SingleSelect
        name="role"
        defaultValue={defaultValues?.role}
        value={roleValue}
        setValue={setRoleValue}
        labelText="Role:"
        options={ROLE_SELECT_OPTIONS}
      />

      <SimpleInput name="email" label="Email:" placeholder="example@mail" />

      <SimpleInput
        name="password"
        isPasswordInput
        label="Password:"
        placeholder="password"
      />

      <SubmitButton isSubmitting={isSubmitting}>
        {getSubmitBtnLabel(isSubmitting, formType)}
      </SubmitButton>
    </ValidatedForm>
  );
};
