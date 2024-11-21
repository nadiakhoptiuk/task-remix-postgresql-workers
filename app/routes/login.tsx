import { ActionFunctionArgs, redirect } from '@remix-run/node';
import { useActionData } from '@remix-run/react';

import { LoginForm } from '~/components/forms/LogInForm';
import { Container } from '~/components/ui-kit/Container/Container';

import { findUserByEmail, verifyPassword } from '~/models/user.server';

import { ROUTES } from '~/types/enums';

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const email = formData.get('email');
  const password = formData.get('password');

  const existedUser = await findUserByEmail(
    email as string,
    password as string,
  );
  if (!existedUser) {
    return Response.json(
      {
        errors: { email: "User with such email doesn't exist", password: null },
      },
      { status: 400 },
    );
  }

  const loggedUser = await verifyPassword(existedUser, password as string);

  if (!loggedUser) {
    return Response.json(
      { errors: { email: null, password: 'Invalid credentials' } },
      { status: 400 },
    );
  }

  return redirect(ROUTES.HOME);
};

export default function LoginPage() {
  const actionData = useActionData<{
    success?: boolean;
    errors?: {
      email?: string;
      password?: string;
    };
  }>();

  return (
    <section className="h-screen section">
      <Container>
        <h1>Please enter your credentials to login</h1>

        <LoginForm actionDataErrors={actionData?.errors} />
      </Container>
    </section>
  );
}
