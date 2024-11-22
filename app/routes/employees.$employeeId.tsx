import { User } from '@prisma/client';
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
} from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import invariant from 'tiny-invariant';

import { CreateEmployeeForm } from '~/components/forms/CreateEmployeeForm';
import { Container } from '~/components/ui-kit/Container/Container';

import { createNewUser, getEmployeeById } from '~/models/employees.server';

import { SingleEmployeeLoaderData } from '~/types/common.types';
import { ROLES, ROUTES } from '~/types/enums';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.employeeId, 'Employee id not found');
  const employeeData = await getEmployeeById(Number(params.employeeId));
  return Response.json({ employeeData });
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
    return new Error('Invalid role');
  }

  await createNewUser({ name, email, role, password });

  return redirect(ROUTES.EMPLOYEES);
};

export default function NewEmployeePage() {
  const data = useLoaderData<SingleEmployeeLoaderData>();

  return (
    <section className="section bg-ui_lighter h-full">
      <Container>
        <h2 className="text-ui_accent_dark">Edit {data.employeeData.name}</h2>

        <CreateEmployeeForm />
      </Container>
    </section>
  );
}
