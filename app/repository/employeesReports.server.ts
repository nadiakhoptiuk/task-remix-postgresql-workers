import { UTCDate } from '@date-fns/utc';
import { eachDayOfInterval } from 'date-fns';
import prisma from 'prisma/prismaClient';

import { GroupType, WorkHoursOrderType } from '~/types/common.types';

export async function getTotalDataByGroups(start: string, end: string) {
  const sumData = await prisma.workday.aggregate({
    _sum: {
      billable: true,
      notBillable: true,
      absent: true,
    },
    where: {
      date: { gte: new UTCDate(start), lte: new UTCDate(end) },
    },
  });

  return sumData._sum;
}

export async function getAverageDataForDay(start: string, end: string) {
  const arrayOfDates = eachDayOfInterval({
    start: new UTCDate(start),
    end: new UTCDate(end),
  });

  const results = [];
  for (const day of arrayOfDates) {
    const dayAvgData = await prisma.workday.aggregate({
      _avg: {
        billable: true,
        notBillable: true,
        absent: true,
      },
      where: {
        date: { equals: new UTCDate(day) },
      },
    });

    results.push({ ...dayAvgData._avg, date: day });
  }

  return results;
}

export async function getTopOrAntitopEmployees({
  order,
  group,
  start,
  end,
}: {
  order: WorkHoursOrderType;
  group: GroupType;
  start: string;
  end: string;
}) {
  return await prisma.workday.findMany({
    where: {
      date: { gte: new UTCDate(start), lte: new UTCDate(end) },
    },
    orderBy: { [group]: order === 'max' ? 'desc' : 'asc' },
    take: 5,
    select: { [group]: true, date: true, user: { select: { name: true } } },
  });
}
