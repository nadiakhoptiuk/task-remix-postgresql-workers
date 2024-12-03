import { Prisma, User } from '@prisma/client';
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
} from '@remix-run/node';
import { Link, useLoaderData, useParams } from '@remix-run/react';
import { ImArrowLeft2 } from 'react-icons/im';
import invariant from 'tiny-invariant';

import { CreateOrUpdateEmployeeForm } from '~/components/forms/CreateOrEditEmployeeForm';
import { Container } from '~/components/ui-kit/Container/Container';

import { getEmployeeById, updateUserById } from '~/models/employees.server';

import { ROLE_SELECT_OPTIONS } from '~/constants/constants';
import { ROLES, ROUTES } from '~/types/enums';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.employeeId, 'Employee id not found');
  const employeeData = await getEmployeeById(Number(params.employeeId));

  if (employeeData !== null) {
    const { name, email, role } = employeeData;

    return Response.json({
      formDefaults: {
        name: name,
        email: email,
        role: ROLE_SELECT_OPTIONS.find(({ value }) => value === role),
        password: '',
      },
    });
  }
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
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

  try {
    await updateUserById(Number(params.employeeId), {
      name,
      email,
      role,
      password,
    });

    return redirect(`${ROUTES.EMPLOYEES}/${params.employeeId}`);
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2025'
    ) {
      return Response.json(
        {
          error: 'User with such Id does not exist',
        },
        { status: 404 },
      );
    }

    return Response.json(
      {
        error: 'An unexpected error occurred',
      },
      { status: 400 },
    );
  }
};

export default function EditEmployeePage() {
  const data = useLoaderData<typeof loader>();
  const { employeeId } = useParams();

  return (
    <section className="section bg-ui_lighter h-full overflow-y-auto">
      <Container>
        <Link
          to={`${ROUTES.EMPLOYEES}/${employeeId}`}
          className="flex gap-4 items-center mb-10"
        >
          <ImArrowLeft2 />
          Back
        </Link>

        <h2 className="text-ui_accent_dark">Edit {data.name}</h2>

        <CreateOrUpdateEmployeeForm
          formType="update"
          defaultValues={data.formDefaults}
        />
      </Container>
    </section>
  );
}
