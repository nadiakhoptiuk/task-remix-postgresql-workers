import { User } from '@prisma/client';
import prisma from 'prisma/prismaClient';

export async function updateUserWorkHours({
  userId,
  date,
  billable,
  notBillable,
  absent,
}: {
  userId: User['id'];
  date: string;
  billable: string;
  notBillable: string;
  absent: string;
}) {
  const existedUser = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      workdays: true,
    },
  });

  if (!existedUser) {
    throw new Error('User with such ID is not exist in database');
  }

  const neededWorkday = await prisma.workday.findFirst({
    where: {
      date: new Date(date),
      userId,
    },
    select: {
      id: true,
    },
  });

  if (neededWorkday) {
    await prisma.workday.update({
      where: {
        id: neededWorkday.id,
      },
      data: {
        billable: parseFloat(billable),
        notBillable: parseFloat(notBillable),
        absent: parseFloat(absent),
      },
    });
  } else {
    await prisma.workday.create({
      data: {
        billable: parseFloat(billable),
        notBillable: parseFloat(notBillable),
        absent: parseFloat(absent),
        date: new Date(date),
        userId: userId,
      },
    });
  }

  console.log(neededWorkday);
}
