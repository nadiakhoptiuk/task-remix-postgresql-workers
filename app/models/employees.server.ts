import { UTCDate } from '@date-fns/utc';
import { User } from '@prisma/client';
import prisma from 'prisma/prismaClient';

import { passwordHash } from '~/utils/passwordUtils';

import { ALL_TAGS, PAGINATION_LIMIT } from '~/constants/constants';
import { NewEmployeeType } from '~/types/common.types';

export async function getAllEmployeesList() {
  return await prisma.user.findMany({
    select: { id: true, name: true, role: true },
    orderBy: [{ role: 'asc' }, { name: 'asc' }],
  });
}

export async function getEmployeesList(
  page: number,
  query?: string | undefined | null,
) {
  if (!query) {
    const totalCount = await prisma.user.count();
    const pagesCount = Math.ceil(totalCount / PAGINATION_LIMIT);

    const actualPage = page > pagesCount ? pagesCount : page;

    const users = await prisma.user.findMany({
      skip: (actualPage - 1) * PAGINATION_LIMIT,
      take: PAGINATION_LIMIT,
      select: { id: true, name: true, role: true },
      orderBy: [{ role: 'asc' }, { name: 'asc' }],
    });

    return { users, actualPage, pagesCount };
  }

  const totalCount = await prisma.user.count({
    where: {
      name: {
        contains: query,
        mode: 'insensitive',
      },
    },
  });
  const pagesCount = Math.ceil(totalCount / PAGINATION_LIMIT);
  const actualPage = page > pagesCount ? pagesCount : page;

  const users = await prisma.user.findMany({
    where: {
      name: {
        contains: query,
        mode: 'insensitive',
      },
    },
    skip: (actualPage - 1) * PAGINATION_LIMIT,
    take: PAGINATION_LIMIT,
    select: { id: true, name: true, role: true },
    orderBy: [{ role: 'asc' }, { name: 'asc' }],
  });

  return { users, actualPage, pagesCount };
}

export async function getEmployeesWithDaysList(
  start: string,
  end: string,
  tagFIlterParam: string,
) {
  if (tagFIlterParam === ALL_TAGS) {
    return await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        role: true,
        workdays: {
          where: {
            OR: [
              { date: { gte: new UTCDate(start), lte: new UTCDate(end) } },
              { date: undefined },
            ],
          },
          select: {
            date: true,
            absent: true,
            billable: true,
            notBillable: true,
          },
        },
        tags: { select: { tag: { select: { name: true } } } },
      },
      orderBy: [{ role: 'asc' }, { name: 'asc' }],
    });
  }

  return await prisma.user.findMany({
    where: {
      tags: {
        some: {
          tag: {
            name: {
              equals: tagFIlterParam.replace('_', ' '),
              mode: 'insensitive',
            },
          },
        },
      },
    },
    select: {
      id: true,
      name: true,
      role: true,
      workdays: {
        where: {
          OR: [
            { date: { gte: new UTCDate(start), lte: new UTCDate(end) } },
            { date: undefined },
          ],
        },
        select: {
          date: true,
          absent: true,
          billable: true,
          notBillable: true,
        },
      },
      tags: { select: { tag: { select: { name: true } } } },
    },
    orderBy: [{ role: 'asc' }, { name: 'asc' }],
  });
}

export async function createNewUser(userData: NewEmployeeType) {
  const { password, ...userDataWithOutPassword } = userData;

  const existedUser = await prisma.user.findUnique({
    where: {
      email: userData.email,
    },
  });

  if (existedUser) {
    throw new Error('User with such email is already exist in database');
  }

  const hashedPassword = await passwordHash(password);

  return await prisma.user.create({
    data: { ...userDataWithOutPassword, password: hashedPassword },
  });
}

export async function updateUserById(
  userId: User['id'],
  userData: NewEmployeeType,
) {
  const { password, ...userDataWithOutPassword } = userData;

  const hashedPassword = await passwordHash(password);

  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: { ...userDataWithOutPassword, password: hashedPassword },
  });

  return updatedUser;
}

export async function deleteUserById(userId: User['id']) {
  await prisma.user.delete({
    where: {
      id: userId,
    },
  });
}

export async function getEmployeeById(id: number) {
  return await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
    },
  });
}
