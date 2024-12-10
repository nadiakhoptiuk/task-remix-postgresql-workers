import { useNavigation } from '@remix-run/react';
import { SingleValue } from 'react-select';
import { useControlField, ValidatedForm } from 'remix-validated-form';

import { SubmitButton } from '~/components/ui-kit/SubmitButton';
import { Input } from '~/components/ui-kit/Input';
import { SingleSelect } from '~/components/ui-kit/SingleSelect';

import { createOrEditUserValidator } from '~/utils/validationSchemas/createOrEditEmployeeSchema';
import { getSubmitBtnLabel } from '~/utils/uxUtilities/getSubmitBtnLabel';

import { ROLE_SELECT_OPTIONS } from '~/constants/constants';
import { OptionType } from '~/types/common.types';
import { EmployeeFormProps } from './CreateOrUpdateEmployeeForm.types';

export const CreateOrUpdateEmployeeForm: React.FC<EmployeeFormProps> = ({
  formType,
  defaultValues,
}) => {
  const [nameValue, setNameValue] = useControlField<string>(
    'user-form',
    'name',
  );
  const [emailValue, setEmailValue] = useControlField<string>(
    'user-form',
    'email',
  );
  const [roleValue, setRoleValue] = useControlField<SingleValue<OptionType>>(
    'user-form',
    'role',
  );
  const [passwordValue, setPasswordValue] = useControlField<string>(
    'user-form',
    'password',
  );
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <ValidatedForm
      validator={createOrEditUserValidator}
      id="user-form"
      method="post"
      className="grid grid-cols-1 gap-y-8 max-w-[600px] mx-auto"
    >
      <Input
        name="name"
        defaultValue={defaultValues?.name}
        value={nameValue}
        setValue={setNameValue}
        type="text"
        labelText="Name:"
        placeholder="John Smith"
      />

      <SingleSelect
        name="role"
        defaultValue={defaultValues?.role}
        value={roleValue}
        setValue={setRoleValue}
        labelText="Role:"
        options={ROLE_SELECT_OPTIONS}
      />

      <Input
        name="email"
        defaultValue={defaultValues?.email}
        value={emailValue}
        setValue={setEmailValue}
        type="email"
        labelText="Email:"
        placeholder="example@mail"
      />

      <Input
        name="password"
        defaultValue={defaultValues?.password}
        value={passwordValue}
        setValue={setPasswordValue}
        type="password"
        labelText="Password:"
        placeholder="password"
      />

      <SubmitButton isSubmitting={isSubmitting}>
        {getSubmitBtnLabel(isSubmitting, formType)}
      </SubmitButton>
    </ValidatedForm>
  );
};
