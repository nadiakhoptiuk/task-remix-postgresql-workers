import { ReactNode } from 'react';
import { ROLES, ROUTES } from './enums';
import { User } from '@prisma/client';

export type WithChildren = {
  children: ReactNode;
};

export type WithClassName = {
  className?: string;
};

export interface EmployeeLoaderData {
  employeesList: EmployeeTypeWithId[];
}

export interface SingleEmployeeLoaderData {
  employeeData: EmployeeTypeWithId;
}

export interface TagsLoaderData {
  tagsList: BaseItemType[];
}

export type Role = (typeof ROLES)[keyof typeof ROLES];

export interface SerializedUserType {
  id: number;
  role: User['role'];
}

export interface WorkdayType {
  date: Date;
  billable: number;
  notBillable: number;
  absent: number;
}

export interface EmployeeWithWorkdaysData {
  id: number;
  name: string;
  role: string;
  workdays: WorkdayType[];
  tags: { tag: { name?: string } }[] | [];
}

export interface HomePageLoaderData {
  user: SerializedUserType;
  allEmployees: EmployeeWithWorkdaysData[];
}

export type TotalDataChartType = {
  billable: number;
  notBillable: number;
  absent: number;
};

export type barAvgDataType = {
  billable: number | null;
  notBillable: number | null;
  date: Date;
};

export interface ReportPageLoaderType {
  totalByGroups: TotalDataChartType;
  barAvgDataForEveryDay: barAvgDataType[];
}

export type GetCurrentUserOptions = {
  failureRedirect?: (typeof ROUTES)[keyof typeof ROUTES];
  successRedirect?: (typeof ROUTES)[keyof typeof ROUTES];
};

export type BaseItemType = {
  id: number;
  name: string;
};

export type FormType = {
  formType: 'create' | 'update';
};

export type TagFormType = {
  defaultValues?: {
    name: string;
    connectedUsers?: {
      user: {
        name: string;
        id: number;
      };
    }[];
  };
  users: OptionType[];
};

export type TagType = {
  tagData: {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    users: { user: { id: number; name: string; role: User['role'] } }[];
  };
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

export type WithId = {
  id: number;
};

export type EmployeeTypeWithId = EmployeeType & WithId;

export type NewTagType = {
  tagName: string;
  users: string[] | [];
};

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
