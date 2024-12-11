import { useIsSubmitting, ValidatedForm } from 'remix-validated-form';

import { SubmitButton } from '~/components/ui-kit/SubmitButton';

import { authUserCredentialsValidator } from '~/utils/validationSchemas/authSchema';
import { SimpleInput } from '~/components/ui-kit/SimpleInput';

export const LoginForm = () => {
  const isSubmitting = useIsSubmitting('user-auth-form');

  return (
    <ValidatedForm
      validator={authUserCredentialsValidator}
      id="user-auth-form"
      method="post"
      className="grid grid-cols-1 gap-y-8 max-w-[400px] mx-auto"
    >
      <SimpleInput name="email" label="Email:" placeholder="example@mail" />

      <SimpleInput
        name="password"
        isPasswordInput
        label="Password:"
        placeholder="password"
      />

      <SubmitButton isSubmitting={isSubmitting}>
        {isSubmitting ? 'Verifying...' : 'Log in'}
      </SubmitButton>
    </ValidatedForm>
  );
};
