import type { User } from '@prisma/client';
import prisma from 'prisma/prismaClient';

import { checkPassword } from '~/utils/passwordUtils';
import { serializedUser } from '~/utils/serializeUser';

import { existedUser, SerializedUserType } from '~/types/common.types';

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
  user: existedUser,
  enteredPassword: string,
): Promise<SerializedUserType | null> => {
  const isPasswordValid = await checkPassword(enteredPassword, user.password);

  if (!isPasswordValid) {
    return null;
  }

  return { id: user.id, role: user.role };
};

export const findUserByIdAndSerialize = async (
  id: User['id'],
): Promise<SerializedUserType | null> => {
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

  return serializedUser(existedUser);
};
