import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { Form, redirect } from '@remix-run/react';

import { Button } from '~/components/ui-kit/Button';
import { Container } from '~/components/ui-kit/Container/Container';
import { getAuthUserOrRedirect } from '~/services/auth.server';

import { destroySession, getSession } from '~/services/session.server';
import { ROUTES } from '~/types/enums';

export async function loader({ request }: LoaderFunctionArgs) {
  return await getAuthUserOrRedirect(request);
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const session = await getSession(request.headers.get('Cookie'));

  return redirect(ROUTES.LOGIN, {
    headers: {
      'Set-Cookie': await destroySession(session),
    },
  });
};

export default function LogoutRoute() {
  return (
    <section className="section">
      <Container>
        <h1>Are you sure you want to log out?</h1>

        <Form method="post">
          <Button type="submit" className="max-w-[200px]" centered>
            Logout
          </Button>
        </Form>
      </Container>
    </section>
  );
}
