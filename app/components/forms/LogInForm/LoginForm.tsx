import { Form } from '@remix-run/react';

import { Button } from '~/components/ui-kit/Button';
import { Input } from '~/components/ui-kit/Input';

import { LoginFormProps } from './LoginForm.types';

export const LoginForm: React.FC<LoginFormProps> = ({ actionDataErrors }) => {
  return (
    <Form
      id="contact-form"
      method="post"
      className="grid grid-cols-1 gap-y-8 max-w-[600px] mx-auto"
    >
      <Input
        name="email"
        type="email"
        labelText="Email:"
        placeholder="example@mail"
        required
        error={actionDataErrors?.email}
      />

      <Input
        name="password"
        type="password"
        labelText="Password:"
        placeholder="password"
        required
        minLength={8}
        maxLength={12}
        error={actionDataErrors?.password}
      />

      <Button type="submit">Log in</Button>
    </Form>
  );
};
