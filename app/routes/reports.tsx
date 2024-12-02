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

import { UTCDate } from '@date-fns/utc';

import { BarChartByDays } from '~/components/charts/BarChart';

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

  if (startParam === null || endParam === null) {
    return Response.json({});
  }

  try {
    const totalByGroups = await getTotalDataByGroups(
      new UTCDate(startParam),
      new UTCDate(endParam),
    );

    const barAvgDataForEveryDay = await getAverageDataForDay(
      new UTCDate(startParam),
      new UTCDate(endParam),
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
          <WeekPicker />

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-10 gap-y-16">
            {totalByGroups && <PieChart data={totalByGroups} />}
            {barAvgDataForEveryDay && (
              <BarChartByDays data={barAvgDataForEveryDay} />
            )}
          </div>
        </Container>
      </section>
    </div>
  );
}
