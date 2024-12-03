import { AuthorizationError } from 'remix-auth';
import { LoaderFunctionArgs } from '@remix-run/node';
import { ScrollRestoration, useLoaderData } from '@remix-run/react';

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

import {
  GROUP_SELECT_OPTIONS,
  NAVLINKS,
  ORDER_SELECT_OPTIONS,
} from '~/constants/constants';
import {
  GroupType,
  ReportPageLoaderType,
  Role,
  WorkHoursOrderType,
} from '~/types/common.types';
import { ROUTES } from '~/types/enums';

import { getStartAndEndOfWeek } from '~/utils/getStartAndEndOfWeek';

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
  const { start, end } = getStartAndEndOfWeek(startParam);

  const workHoursOrderParam =
    url.searchParams.get('order') || ORDER_SELECT_OPTIONS[0].value;
  const groupParam =
    url.searchParams.get('group') || GROUP_SELECT_OPTIONS[0].value;

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
      <section className="section flex-1 flex-grow border-r-[2px] border-ui_grey ">
        <Container>
          <WeekPicker start={start} end={end} />

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-10 gap-y-16">
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
        </Container>
      </section>

      <ScrollRestoration />
    </div>
  );
}
