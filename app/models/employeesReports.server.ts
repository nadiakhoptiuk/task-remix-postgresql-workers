import { eachDayOfInterval } from 'date-fns';
import prisma from 'prisma/prismaClient';

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
