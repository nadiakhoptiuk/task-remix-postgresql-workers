import { User } from '@prisma/client';
import { ActionFunctionArgs, redirect } from '@remix-run/node';
import { setFormDefaults } from 'remix-validated-form';

import { CreateOrUpdateEmployeeForm } from '~/components/forms/CreateOrEditEmployeeForm';
import { Container } from '~/components/ui-kit/Container/Container';
import { ROLE_SELECT_OPTIONS } from '~/constants/constants';

import { createNewUser } from '~/models/employees.server';
import { ROLES, ROUTES } from '~/types/enums';

export const loader = () => {
  return Response.json(
    setFormDefaults('user-form', {
      name: null,
      email: null,
      role: ROLE_SELECT_OPTIONS.find(({ value }) => value === 'USER'),
      password: null,
    }),
  );
};

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
    return Response.json({ error: 'Invalid role' }, { status: 400 });
  }

  await createNewUser({ name, email, role, password });

  return redirect(ROUTES.EMPLOYEES);
};

export default function NewEmployeePage() {
  return (
    <section className="section bg-ui_lighter h-full">
      <Container>
        <h2 className="text-ui_accent_dark">Create new employee</h2>

        <CreateOrUpdateEmployeeForm formType="create" />
      </Container>
    </section>
  );
}
