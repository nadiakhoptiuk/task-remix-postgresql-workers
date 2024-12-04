import { Prisma } from '@prisma/client';
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
} from '@remix-run/node';
import { Link, useLoaderData, useParams } from '@remix-run/react';
import invariant from 'tiny-invariant';
import { ImArrowLeft2 } from 'react-icons/im';

import { DeleteItemForm } from '~/components/forms/DeleteItemForm';
import { Container } from '~/components/ui-kit/Container/Container';

import { deleteUserById, getEmployeeById } from '~/models/employees.server';

import { ROUTES } from '~/types/enums';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.employeeId, 'Employee id not found');

  const employeeData = await getEmployeeById(Number(params.employeeId));

  if (employeeData !== null) {
    return Response.json({ employeeData });
  }

  return Response.json({
    error: 'User with such Id does not exist',
  });
};

export const action = async ({ params }: ActionFunctionArgs) => {
  try {
    await deleteUserById(Number(params.employeeId));

    return redirect(ROUTES.EMPLOYEES);
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

export default function EmployeePage() {
  const {
    employeeData: { name, email, role },
  } = useLoaderData<typeof loader>();
  const { employeeId } = useParams();

  return (
    <section className="section max-md:pt-0 md:bg-ui_lighter h-full">
      <Container>
        <Link
          to={ROUTES.EMPLOYEES}
          className="max-md:mb-8 flex gap-4 items-center md:mb-10 xl:mb-20 hocus:text-ui_accent w-fit transition-colors"
        >
          <ImArrowLeft2 />
          Back to all employees
        </Link>

        <h2 className="text-ui_accent_dark">Name: {name}</h2>

        <p className="text-center mb-8 text-lg md:text-xl xl:text-2xl">
          {email}
        </p>
        <p className="text-center mb-8 text-lg md:text-xl xl:text-2xl">
          Role: {role}
        </p>

        <div className="flex flex-col gap-y-6 w-[300px] mx-auto">
          <Link
            to={`${ROUTES.EMPLOYEES}/${employeeId}/edit`}
            className="border-[1px] rounded-md border-ui_accent_dark bg-ui_accent hocus:bg-ui_accent_dark text-white transition-all duration-150 w-full h-full flex px-4 py-3 text-dark text-lg md:text-xl xl:text-2xl justify-center "
          >
            Edit
          </Link>

          <DeleteItemForm formId="delete-user-form" />
        </div>
      </Container>
    </section>
  );
}
