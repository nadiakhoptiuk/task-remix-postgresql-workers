import { eachDayOfInterval } from 'date-fns';
import prisma from 'prisma/prismaClient';

import { GroupType, OrderType } from '~/types/common.types';

export async function getTotalDataByGroups(start: Date, end: Date) {
  const sumData = await prisma.workday.aggregate({
    _sum: {
      billable: true,
      notBillable: true,
      absent: true,
    },
    where: {
      date: { gte: new Date(start), lte: new Date(end) },
    },
  });

  return sumData._sum;
}

export async function getAverageDataForDay(start: Date, end: Date) {
  const arrayOfDates = eachDayOfInterval({
    start: new Date(start),
    end: new Date(end),
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
        date: { equals: new Date(day) },
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
  order: OrderType;
  group: GroupType;
  start: Date;
  end: Date;
}) {
  return await prisma.workday.findMany({
    where: {
      date: { gte: new Date(start), lte: new Date(end) },
    },
    orderBy: { [group]: order === 'max' ? 'desc' : 'asc' },
    take: 5,
    select: { [group]: true, date: true, user: { select: { name: true } } },
  });
}
