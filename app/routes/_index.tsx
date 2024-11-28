import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from '@remix-run/node';
import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from '@remix-run/react';
import { AuthorizationError } from 'remix-auth';
import { Prisma } from '@prisma/client';

import { Container } from '~/components/ui-kit/Container/Container';
import { MainEmployeesTable } from '~/components/tables/MainEmployeesTable';
import { WeekPicker } from '~/components/ui-kit/WeekPicker';

import { getAuthUser } from '~/services/auth.server';
import { getEmployeesWithDaysList } from '~/models/employees.server';
import { updateUserWorkHours } from '~/models/employeesWorkhours.server';

import { HomePageLoaderData } from '~/types/common.types';
import { ROLES } from '~/types/enums';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const loggedUser = await getAuthUser(request);

    const url = new URL(request.url);
    const startParam = url.searchParams.get('start');
    const endParam = url.searchParams.get('end');

    const start = Number(startParam);
    const end = Number(endParam);

    const allEmployees = await getEmployeesWithDaysList(
      new Date(start),
      new Date(end),
    );

    return Response.json({ user: loggedUser, allEmployees });
  } catch (error) {
    if (error instanceof Response) return error;
    if (error instanceof AuthorizationError) {
      return Response.json({ error: error.message });
    }
    return error;
  }
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const userId = formData.get('userId');
  const date = formData.get('date');
  const billable = formData.get('workdayBill');
  const notBillable = formData.get('workdayNotBill');
  const absent = formData.get('workdayAbsent');

  if (
    typeof userId !== 'string' ||
    typeof date !== 'string' ||
    typeof billable !== 'string' ||
    typeof notBillable !== 'string' ||
    typeof absent !== 'string'
  ) {
    return Response.json({
      error: 'Some field is not string',
    });
  }

  try {
    await updateUserWorkHours({
      userId: Number(userId),
      date,
      billable,
      notBillable,
      absent,
    });

    return Response.json({ ok: true });
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
}

export default function Index() {
  const {
    user: { role: userRole },
    allEmployees,
  } = useLoaderData<HomePageLoaderData>();

  return (
    <section className="section flex justify-center">
      <Container className="flex flex-col items-center gap-16">
        <h1>{userRole ? `Hello, ${userRole}` : 'Home Page'}</h1>

        <WeekPicker />
        <MainEmployeesTable
          data={allEmployees}
          isEditable={userRole !== ROLES.USER}
        />
      </Container>
    </section>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>Error {error.status}</h1>
        <p>{error.data}</p>
      </div>
    );
  }

  if (error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  }

  return (
    <div>
      <h1>Something went wrong</h1>
      <p>Unfortunately, an unexpected error occurred</p>
    </div>
  );
}
