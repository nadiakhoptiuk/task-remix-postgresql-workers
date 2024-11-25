import { existedUser, SerializedUserType } from '~/types/common.types';

export const serializedUser = (
  existedUserWithPassword: existedUser,
): SerializedUserType => {
  const { id, role } = existedUserWithPassword;

  return { id, role };
};
