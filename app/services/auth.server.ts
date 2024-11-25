import { Authenticator, AuthorizationError } from 'remix-auth';
import { FormStrategy } from 'remix-auth-form';
import invariant from 'tiny-invariant';

import { destroySession, getSession, sessionStorage } from './session.server';
import {
  findUserByEmail,
  findUserByIdAndSerialize,
  verifyPassword,
} from '~/services/userAuthService';

import {
  GetCurrentUserOptions,
  Role,
  SerializedUserType,
} from '~/types/common.types';
import { SESSION_ERROR_KEY } from '~/constants/constants';
import { ROUTES } from '~/types/enums';
import { redirect } from '@remix-run/react';
import { isResponse } from '@remix-run/react/dist/data';

export const authenticator = new Authenticator<SerializedUserType | Response>(
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

    const sessionUser: SerializedUserType | null = await verifyPassword(
      existedUser,
      password as string,
    );

    if (!sessionUser) {
      throw new AuthorizationError('invalid username or password', {
        name: 'invalidCredentials',
        message: 'invalid username or password',
      });
    }

    return sessionUser;
  }),
  'user-verify',
);

export const getAuthUser = async (
  request: Request,
  options?: GetCurrentUserOptions,
): Promise<SerializedUserType> => {
  const { failureRedirect, successRedirect } = options || {};

  const sessionUser = await authenticator.isAuthenticated(request);

  if (!sessionUser) {
    if (failureRedirect) {
      // authenticator.logout has 2 required parameters, but here we have optional redirects (to avoid cycles of redirects at Home Page)
      const session = await getSession(request.headers.get('Cookie'));
      throw redirect(failureRedirect, {
        headers: {
          'Set-Cookie': await destroySession(session),
        },
      });
    }
  }

  const existedUser =
    !isResponse(sessionUser) &&
    typeof sessionUser?.id === 'number' &&
    (await findUserByIdAndSerialize(sessionUser?.id));

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

  return existedUser;
};

export const getAuthUserOrRedirect = async (
  request: Request,
  failureRedirect: (typeof ROUTES)[keyof typeof ROUTES],
): Promise<SerializedUserType> => {
  return await getAuthUser(request, { failureRedirect: failureRedirect });
};

export const verifyUserAccess = (userRole: Role, alowedRoles: Role[]) => {
  return alowedRoles.includes(userRole);
};

export const getAuthUserAndVerifyAccessOrRedirect = async (
  request: Request,
  failureRedirect: (typeof ROUTES)[keyof typeof ROUTES],
  allowedRoles: Role[],
): Promise<SerializedUserType> => {
  const sessionUser = await getAuthUser(request, {
    failureRedirect: failureRedirect,
  });
  verifyUserAccess(sessionUser.role, allowedRoles);

  if (!verifyUserAccess) {
    throw redirect(failureRedirect);
  }

  return sessionUser;
};
