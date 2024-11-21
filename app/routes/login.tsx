import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { useActionData, useLoaderData } from '@remix-run/react';
import { useEffect } from 'react';

import { LoginForm } from '~/components/forms/LogInForm';
import { Container } from '~/components/ui-kit/Container/Container';

import { authenticator } from '~/services/auth.server';
import { commitSession, getSession } from '~/services/session.server';

import { LoginActionData } from '~/types/common.types';
import { ROUTES } from '~/types/enums';
import { notify } from '~/utils/notification';

export async function loader({ request }: LoaderFunctionArgs) {
  await authenticator.isAuthenticated(request, {
    successRedirect: ROUTES.HOME,
  });

  const session = await getSession(request.headers.get('cookie'));
  const error = session.get(authenticator.sessionErrorKey);

  return Response.json(
    { error },
    {
      headers: {
        'Set-Cookie': await commitSession(session), // You must commit the session whenever you read a flash
      },
    },
  );
}

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    return await authenticator.authenticate('user-verify', request, {
      successRedirect: ROUTES.HOME,
      failureRedirect: ROUTES.LOGIN,
    });
  } catch (error) {
    if (error instanceof Response) return error;
    return error;
  }
};

export default function LoginPage() {
  const actionData = useActionData<LoginActionData>();
  const { error } = useLoaderData<typeof loader>();

  useEffect(() => {
    if (!error) return;

    error && notify.error(error.message);
  }, [error]);

  return (
    <section className="h-screen section">
      <Container>
        <h1>Please enter your credentials to log in</h1>

        <LoginForm actionDataErrors={actionData?.errors} />
      </Container>
    </section>
  );
}
