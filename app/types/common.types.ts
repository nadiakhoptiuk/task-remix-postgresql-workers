import { ReactNode } from 'react';
import { ROUTES } from './enums';

export type WithChildren = {
  children: ReactNode;
};

export type WithClassName = {
  className?: string;
};

export interface LoginActionData {
  errors: {
    email?: string;
    password?: string;
  };
}

export type ROLES = 'ADMIN' | 'MANAGER' | 'USER';

export interface SerializedUserType {
  id: number;
  role: ROLES;
}

export type GetCurrentUserOptions = {
  failureRedirect?: (typeof ROUTES)[keyof typeof ROUTES];
  successRedirect?: (typeof ROUTES)[keyof typeof ROUTES];
};
