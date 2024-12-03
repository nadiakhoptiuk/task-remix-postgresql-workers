import { AuthorizationError } from 'remix-auth';
import { LoaderFunctionArgs } from '@remix-run/node';
import { ScrollRestoration, useLoaderData } from '@remix-run/react';
import { UTCDate } from '@date-fns/utc';

import { Container } from '~/components/ui-kit/Container/Container';
import { WeekPicker } from '~/components/ui-kit/WeekPicker';
import { PieChart } from '~/components/charts/PieChart';
import { BarChartByDays } from '~/components/charts/BarChart';
import { ReportTableEmployees } from '~/components/tables/ReportTableEmployees';

import { getAuthUserAndVerifyAccessOrRedirect } from '~/services/auth.server';
import {
  getAverageDataForDay,
  getTopOrAntitopEmployees,
  getTotalDataByGroups,
} from '~/models/employeesReports.server';

import { NAVLINKS } from '~/constants/constants';
import {
  GroupType,
  OrderType,
  ReportPageLoaderType,
  Role,
} from '~/types/common.types';
import { ROUTES } from '~/types/enums';

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
  const orderParam = url.searchParams.get('order') as OrderType;
  const groupParam = url.searchParams.get('group') as GroupType;

  if (
    startParam === null &&
    endParam === null &&
    orderParam === null &&
    groupParam === null
  ) {
    return Response.json({});
  }

  try {
    if (
      startParam !== null &&
      endParam !== null &&
      (orderParam === null || groupParam === null)
    ) {
      const totalByGroups = await getTotalDataByGroups(
        new UTCDate(startParam),
        new UTCDate(endParam),
      );

      const barAvgDataForEveryDay = await getAverageDataForDay(
        new UTCDate(startParam),
        new UTCDate(endParam),
      );

      return Response.json({
        totalByGroups,
        barAvgDataForEveryDay,
        topOrAntitopEmployees: [],
      });
    }

    if (
      startParam !== null &&
      endParam !== null &&
      orderParam !== null &&
      groupParam !== null
    ) {
      const totalByGroups = await getTotalDataByGroups(
        new UTCDate(startParam),
        new UTCDate(endParam),
      );

      const barAvgDataForEveryDay = await getAverageDataForDay(
        new UTCDate(startParam),
        new UTCDate(endParam),
      );

      const topOrAntitopEmployees = await getTopOrAntitopEmployees({
        start: new UTCDate(startParam),
        end: new UTCDate(endParam),
        order: orderParam,
        group: groupParam,
      });

      return Response.json({
        totalByGroups,
        barAvgDataForEveryDay,
        topOrAntitopEmployees,
      });
    }
  } catch (error) {
    if (error instanceof Response) return error;
    if (error instanceof AuthorizationError) {
      return Response.json({ error: error.message });
    }
    return error;
  }
};

export default function ReportsPage() {
  const data = useLoaderData<ReportPageLoaderType>();

  return (
    <div className="md:flex">
      <section className="section flex-1 flex-grow border-r-[2px] border-ui_grey ">
        <Container>
          <WeekPicker />

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-10 gap-y-16">
            {data?.totalByGroups && <PieChart data={data?.totalByGroups} />}
            {data?.barAvgDataForEveryDay && (
              <BarChartByDays data={data?.barAvgDataForEveryDay} />
            )}
            {data?.topOrAntitopEmployees && (
              <ReportTableEmployees data={data?.topOrAntitopEmployees} />
            )}
          </div>
        </Container>
      </section>

      <ScrollRestoration />
    </div>
  );
}
