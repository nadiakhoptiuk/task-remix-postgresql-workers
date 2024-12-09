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

import { ResponsiveContainer } from '~/components/ui-kit/ResponsiveContainer';
import { MainEmployeesTable } from '~/components/tables/MainEmployeesTable';
import { WeekPicker } from '~/components/ui-kit/WeekPicker';
import { FilterSelect } from '~/components/ui-kit/FilterSelect';

import { getAuthUser } from '~/services/auth.server';
import { getEmployeesWithDaysList } from '~/models/employees.server';
import { updateUserWorkHours } from '~/models/employeesWorkhours.server';
import { getStartAndEndOfWeek } from '~/utils/getStartAndEndOfWeek';
import { getAllTagsList } from '~/models/tags.server';

import { HomePageLoaderData } from '~/types/common.types';
import { ROLES } from '~/types/enums';
import {
  ALL_TAGS,
  START_RANGE_PARAMETER_NAME,
  TAG_FILTER_PARAMETER_NAME,
} from '~/constants/constants';
import { getAllActiveEditorsLocation } from '~/models/userLocation';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const loggedUser = await getAuthUser(request);

    const activeEditors =
      loggedUser !== null && loggedUser.role !== ROLES.USER
        ? await getAllActiveEditorsLocation(loggedUser.id)
        : [];

    const url = new URL(request.url);
    const startParam = url.searchParams.get(START_RANGE_PARAMETER_NAME);
    const tagFIlterParam =
      url.searchParams.get(TAG_FILTER_PARAMETER_NAME) || ALL_TAGS;

    const { start, end } = getStartAndEndOfWeek(startParam);

    const allEmployees = await getEmployeesWithDaysList(
      start,
      end,
      tagFIlterParam,
    );

    const allTags = await getAllTagsList();

    const allTagsForSelect = allTags
      ? allTags.map(({ name }) => {
          return { value: name.toLowerCase().replace(' ', '_'), label: name };
        })
      : [];

    return Response.json({
      user: loggedUser ? loggedUser : null,
      activeEditors,
      allEmployees,
      start,
      end,
      tagFIlterParam,
      allTags: [{ value: 'all', label: 'All' }, ...allTagsForSelect],
    });
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
      date: date,
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
  const data = useLoaderData<HomePageLoaderData>();

  return (
    <section className="section flex justify-center">
      <ResponsiveContainer>
        <h1 className="mb-4">Employees Table</h1>
        <div className="flex max-md:flex-col items-center justify-center gap-y-4 gap-x-8 mx-auto w-fit mb-10">
          <WeekPicker start={data.start} end={data.end} />

          <FilterSelect
            paramsName={TAG_FILTER_PARAMETER_NAME}
            value={data.tagFIlterParam}
            options={data.allTags}
            id="tag-filter-select"
            heading="Filter by tag:"
            className="w-auto"
            classNamePrefix="tag-filter-select"
          />
        </div>

        {data.allEmployees !== null && (
          <MainEmployeesTable
            data={data.allEmployees}
            activeEditors={data.activeEditors}
            isEditable={data?.user !== null && data?.user?.role !== ROLES.USER}
            start={data.start}
            end={data.end}
            editorId={data.user.id || null}
          />
        )}
      </ResponsiveContainer>
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
