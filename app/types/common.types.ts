import { ReactNode } from 'react';
import { ROLES, ROUTES } from './enums';
import { User } from '@prisma/client';

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

export interface EmployeeLoaderData {
  employeesList: EmployeeTypeWithId[];
}

export interface SingleEmployeeLoaderData {
  employeeData: EmployeeTypeWithId;
}

export type Role = (typeof ROLES)[keyof typeof ROLES];

export interface SerializedUserType {
  id: number;
  role: User['role'];
}

export type GetCurrentUserOptions = {
  failureRedirect?: (typeof ROUTES)[keyof typeof ROUTES];
  successRedirect?: (typeof ROUTES)[keyof typeof ROUTES];
};

export type NewEmployeeType = {
  email: string;
  name: string;
  role: User['role'];
  password: string;
};

export type EmployeeType = {
  email: string;
  name: string;
  role: Role;
  createdAt: Date;
};

export type WithEmployeeId = {
  id: number;
};

export type EmployeeTypeWithId = EmployeeType & WithEmployeeId;

export type OptionType = {
  value: string;
  label: string;
};

export type existedUser = {
  id: number;
  email: string;
  password: string;
  name: string;
  role: User['role'];
  createdAt: Date;
};
