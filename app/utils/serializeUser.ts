import { User } from '@prisma/client';
import { SerializedUserType } from '~/types/common.types';

export const serializedUser = (
  existedUserWithPassword: User,
): SerializedUserType => {
  const { id, role } = existedUserWithPassword;

  return { id, role };
};
