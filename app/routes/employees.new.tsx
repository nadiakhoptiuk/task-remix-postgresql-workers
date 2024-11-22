import { User } from '@prisma/client';
import { ActionFunctionArgs, redirect } from '@remix-run/node';

import { CreateEmployeeForm } from '~/components/forms/CreateEmployeeForm';
import { Container } from '~/components/ui-kit/Container/Container';

import { createNewUser } from '~/models/employees.server';
import { ROLES, ROUTES } from '~/types/enums';

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const name = formData.get('name');
  const email = formData.get('email');
  const role = formData.get('role') as User['role'];
  const password = formData.get('password');

  if (
    !role ||
    typeof name !== 'string' ||
    typeof email !== 'string' ||
    typeof password !== 'string'
  ) {
    return Response.json({
      error: 'Name or email or password are not strings',
    });
  }

  if (!Object.values(ROLES).includes(role)) {
    return new Error('Invalid role');
  }

  await createNewUser({ name, email, role, password });

  return redirect(ROUTES.EMPLOYEES);
};

export default function NewEmployeePage() {
  return (
    <section className="section bg-ui_lighter h-full">
      <Container>
        <h2 className="text-ui_accent_dark">Create new employee</h2>

        <CreateEmployeeForm />
      </Container>
    </section>
  );
}
