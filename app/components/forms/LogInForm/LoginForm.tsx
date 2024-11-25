import { useControlField, ValidatedForm } from 'remix-validated-form';

import { SubmitButton } from '~/components/ui-kit/SubmitButton';
import { Input } from '~/components/ui-kit/Input';

import { authUserCredentialsValidator } from '~/utils/validationSchemas/authSchema';

export const LoginForm = () => {
  const [emailValue, setEmailValue] = useControlField<string>(
    'user-auth-form',
    'email',
  );
  const [passwordValue, setPasswordValue] = useControlField<string>(
    'user-auth-form',
    'password',
  );

  return (
    <ValidatedForm
      validator={authUserCredentialsValidator}
      id="user-auth-form"
      method="post"
      className="grid grid-cols-1 gap-y-8 max-w-[600px] mx-auto"
    >
      <Input
        name="email"
        type="email"
        value={emailValue}
        setValue={setEmailValue}
        labelText="Email:"
        placeholder="example@mail"
      />

      <Input
        name="password"
        value={passwordValue}
        setValue={setPasswordValue}
        type="password"
        labelText="Password:"
        placeholder="password"
      />

      <SubmitButton>Log in</SubmitButton>
    </ValidatedForm>
  );
};
