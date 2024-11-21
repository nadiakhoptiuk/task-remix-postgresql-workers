import { User } from '@prisma/client';

export const serializedUser = (existedUserWithPassword: User) => {
  const { password: _, ...serializedUser } = existedUserWithPassword;

  return serializedUser;
};
