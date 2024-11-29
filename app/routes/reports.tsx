import { AuthorizationError } from 'remix-auth';
import { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { Container } from '~/components/ui-kit/Container/Container';
import { WeekPicker } from '~/components/ui-kit/WeekPicker';
import { PieChart } from '~/components/charts/PieChart';

import { getAuthUserAndVerifyAccessOrRedirect } from '~/services/auth.server';
import {
  getAverageDataForDay,
  getTotalDataByGroups,
} from '~/models/employeesReports.server';

import { NAVLINKS } from '~/constants/constants';
import { ReportPageLoaderType, Role } from '~/types/common.types';
import { ROUTES } from '~/types/enums';
import { BarChart } from '~/components/charts/BarChart/BarChart';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const pageAllowedRoles: Role[] =
    NAVLINKS.find(({ route }) => route === ROUTES.REPORTS)?.roles ?? [];

  await getAuthUserAndVerifyAccessOrRedirect(
    request,
    ROUTES.HOME,
    pageAllowedRoles,
  );

  const url = new URL(request.url);
  const startParam = url.searchParams.get('start');
  const endParam = url.searchParams.get('end');

  const start = Number(startParam);
  const end = Number(endParam);

  try {
    const totalByGroups = await getTotalDataByGroups(
      new Date(start),
      new Date(end),
    );

    const barAvgDataForEveryDay = await getAverageDataForDay(
      new Date(start),
      new Date(end),
    );

    return Response.json({ totalByGroups, barAvgDataForEveryDay });
  } catch (error) {
    if (error instanceof Response) return error;
    if (error instanceof AuthorizationError) {
      return Response.json({ error: error.message });
    }
    return error;
  }
};

export default function ReportsPage() {
  const { totalByGroups, barAvgDataForEveryDay } =
    useLoaderData<ReportPageLoaderType>();

  return (
    <div className="md:flex">
      <section className="section flex-1 flex-grow border-r-[2px] border-ui_grey ">
        <Container>
          <h1 className="mb-8">
            {NAVLINKS.find(({ route }) => route === ROUTES.REPORTS)?.label}
          </h1>

          <WeekPicker />

          <div className="grid grid-cols-1 gap-x-10 gap-y-16">
            <PieChart data={totalByGroups} />
            <BarChart data={barAvgDataForEveryDay} />
          </div>
        </Container>
      </section>
    </div>
  );
}
