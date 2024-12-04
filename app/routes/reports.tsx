import { AuthorizationError } from 'remix-auth';
import { LoaderFunctionArgs } from '@remix-run/node';
import { ScrollRestoration, useLoaderData } from '@remix-run/react';

import { ResponsiveContainer } from '~/components/ui-kit/ResponsiveContainer';
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
import { getStartAndEndOfWeek } from '~/utils/getStartAndEndOfWeek';

import {
  GROUP_PARAMETER_NAME,
  GROUP_SELECT_OPTIONS,
  NAVLINKS,
  ORDER_PARAMETER_NAME,
  ORDER_SELECT_OPTIONS,
  START_RANGE_PARAMETER_NAME,
} from '~/constants/constants';
import {
  GroupType,
  ReportPageLoaderType,
  Role,
  WorkHoursOrderType,
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
  const startParam = url.searchParams.get(START_RANGE_PARAMETER_NAME);
  const { start, end } = getStartAndEndOfWeek(startParam);

  const workHoursOrderParam =
    url.searchParams.get(ORDER_PARAMETER_NAME) || ORDER_SELECT_OPTIONS[0].value;
  const groupParam =
    url.searchParams.get(GROUP_PARAMETER_NAME) || GROUP_SELECT_OPTIONS[0].value;

  try {
    const totalByGroups = await getTotalDataByGroups(start, end);

    const barAvgDataForEveryDay = await getAverageDataForDay(start, end);

    const topOrAntitopEmployees = await getTopOrAntitopEmployees({
      start,
      end,
      order: workHoursOrderParam as WorkHoursOrderType,
      group: groupParam as GroupType,
    });

    return Response.json({
      totalByGroups,
      barAvgDataForEveryDay,
      topOrAntitopEmployees,
      start,
      end,
      order: workHoursOrderParam,
      group: groupParam,
    });
  } catch (error) {
    if (error instanceof Response) return error;
    if (error instanceof AuthorizationError) {
      return Response.json({ error: error.message });
    }
    return error;
  }
};

export default function ReportsPage() {
  const {
    start,
    end,
    order,
    group,
    totalByGroups,
    barAvgDataForEveryDay,
    topOrAntitopEmployees,
  } = useLoaderData<ReportPageLoaderType>();

  return (
    <div className="md:flex">
      <section className="section flex-1 flex-grow">
        <ResponsiveContainer>
          <h1 className="md:visually-hidden">Reports</h1>

          <WeekPicker start={start} end={end} className="mb-8 w-fit mx-auto" />

          <div className="max-xl:w-full max-xl:flex max-xl:flex-col max-xl:gap-y-8 xl:grid xl:grid-cols-[570px_570px] gap-x-10 gap-y-16 !mx-auto">
            {totalByGroups && <PieChart data={totalByGroups} />}

            {barAvgDataForEveryDay && (
              <BarChartByDays data={barAvgDataForEveryDay} />
            )}

            {topOrAntitopEmployees && (
              <ReportTableEmployees
                data={topOrAntitopEmployees}
                order={order}
                group={group}
              />
            )}
          </div>
        </ResponsiveContainer>
      </section>

      <ScrollRestoration />
    </div>
  );
}
