import prisma from 'prisma/prismaClient';

import { NewEmployeeType } from '~/types/common.types';

export async function getEmployeesList() {
  return await prisma.user.findMany({
    select: { id: true, email: true, name: true, role: true, createdAt: true },
    orderBy: [{ role: 'asc' }, { name: 'asc' }],
  });
}

export async function createNewUser(userData: NewEmployeeType) {
  return await prisma.user.create({ data: userData });
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
