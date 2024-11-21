import type { User } from '@prisma/client';
import prisma from 'prisma/prismaClient';

import { checkPassword } from '~/utils/passwordUtils';

export type { User } from '@prisma/client';

export const findUserByEmail = async (
  email: User['email'],
  password: User['password'],
) => {
  if (!email || !password) return null;

  const existedUser = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      email: true,
      password: true,
      name: true,
      role: true,
      createdAt: true,
    },
  });

  if (!existedUser || !existedUser.password) {
    return null;
  }

  return existedUser;
};

export const verifyPassword = async (
  user: User,
  enteredPassword: string,
): Promise<number | null> => {
  const isPasswordValid = await checkPassword(enteredPassword, user.password);

  if (!isPasswordValid) {
    return null;
  }

  return user.id;
};

export const findUserById = async (id: User['id']) => {
  if (!id) return null;

  const existedUser = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      password: true,
      name: true,
      role: true,
      createdAt: true,
    },
  });

  if (!existedUser || !existedUser.password) {
    return null;
  }

  return existedUser;
};
