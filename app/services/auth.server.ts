import { Authenticator, AuthorizationError } from 'remix-auth';
import { FormStrategy } from 'remix-auth-form';
import invariant from 'tiny-invariant';

import { sessionStorage } from './session.server';
import {
  findUserByEmail,
  findUserById,
  verifyPassword,
} from '~/services/userService';

import { GetCurrentUserOptions } from '~/types/common.types';
import { SESSION_ERROR_KEY } from '~/constants/constants';
import { ROUTES } from '~/types/enums';
import { redirect } from '@remix-run/react';

export const authenticator = new Authenticator<number | Response>(
  sessionStorage,
  {
    sessionErrorKey: SESSION_ERROR_KEY,
  },
);

authenticator.use(
  new FormStrategy(async ({ form }) => {
    const email = form.get('email');
    const password = form.get('password');

    invariant(
      typeof email === 'string' && email?.length > 0,
      'email must not be empty',
    );
    invariant(
      typeof password === 'string' && password?.length > 0,
      'password must not be empty',
    );

    const existedUser = await findUserByEmail(
      email as string,
      password as string,
    );
    if (!existedUser) {
      throw new Error('User with such email not found', {
        cause: 'invalidCredentials',
      });
    }

    const sessionUserId: number | null = await verifyPassword(
      existedUser,
      password as string,
    );

    if (!sessionUserId) {
      throw new AuthorizationError('invalid username or password', {
        name: 'invalidCredentials',
        message: 'invalid username or password',
      });
    }

    return sessionUserId;
  }),
  'user-verify',
);

export const getAuthUser = async (
  request: Request,
  options?: GetCurrentUserOptions,
): Promise<number> => {
  const { failureRedirect, successRedirect } = options || {};

  const sessionUserId = await authenticator.isAuthenticated(request);

  if (sessionUserId === null) {
    throw await authenticator.logout(request, {
      redirectTo: ROUTES.HOME,
    });
  }

  const existedUser =
    typeof sessionUserId === 'number' && (await findUserById(sessionUserId));

  if (!existedUser) {
    if (failureRedirect) {
      throw redirect(failureRedirect);
    }
    throw new Error('User with such id not found', {
      cause: 'invalidCredentials',
    });
  }

  if (successRedirect) {
    throw redirect(successRedirect);
  }

  return existedUser.id;
};

export const getAuthUserOrRedirect = async (
  request: Request,
): Promise<number> => {
  return await getAuthUser(request, { failureRedirect: ROUTES.LOGIN });
};
