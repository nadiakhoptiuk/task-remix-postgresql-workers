import { ValidatedForm } from 'remix-validated-form';

import { SubmitButton } from '~/components/ui-kit/SubmitButton';
import { Input } from '~/components/ui-kit/Input';

import { authUserCredentialsValidator } from '~/utils/validationSchemas/authSchema';

export const LoginForm = () => {
  return (
    <ValidatedForm
      validator={authUserCredentialsValidator}
      id="contact-form"
      method="post"
      className="grid grid-cols-1 gap-y-8 max-w-[600px] mx-auto"
    >
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

      <SubmitButton>Log in</SubmitButton>
    </ValidatedForm>
  );
};
