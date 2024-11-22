import { ValidatedForm } from 'remix-validated-form';

import { SubmitButton } from '~/components/ui-kit/SubmitButton';
import { Input } from '~/components/ui-kit/Input';
import { SingleSelect } from '~/components/ui-kit/SingleSelect';

import { createOrEditUserValidator } from '~/utils/validationSchemas/createOrEditEmployeeSchema';

import { ROLE_SELECT_OPTIONS } from '~/constants/constants';

export const CreateEmployeeForm = () => {
  return (
    <ValidatedForm
      validator={createOrEditUserValidator}
      id="contact-form"
      method="post"
      className="grid grid-cols-1 gap-y-8 max-w-[600px] mx-auto"
    >
      <Input
        name="name"
        type="text"
        labelText="Name:"
        placeholder="John Smith"
      />

      <SingleSelect
        name="role"
        labelText="Role:"
        options={ROLE_SELECT_OPTIONS}
      />

      <Input
        name="email"
        type="email"
        labelText="Email:"
        placeholder="example@mail"
      />

      <Input
        name="password"
        type="password"
        labelText="Password:"
        placeholder="password"
      />

      <SubmitButton>Create</SubmitButton>
    </ValidatedForm>
  );
};
