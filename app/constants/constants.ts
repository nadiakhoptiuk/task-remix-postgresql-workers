import { ROLES, ROUTES } from '~/types/enums';

export const SESSION_ERROR_KEY = 'auth-error';

export const NAVLINKS = [
  {
    route: ROUTES.HOME,
    label: 'Home',
    roles: [ROLES.ADMIN, ROLES.MANAGER, ROLES.USER],
    restricted: false,
  },
  {
    route: ROUTES.EMPLOYEES,
    label: 'Employees',
    roles: [ROLES.ADMIN],
    restricted: true,
  },
  {
    route: ROUTES.TAGS,
    label: 'Employees tags',
    roles: [ROLES.ADMIN, ROLES.MANAGER],
    restricted: true,
  },
  {
    route: ROUTES.REPORTS,
    label: 'Reports',
    roles: [ROLES.ADMIN],
    restricted: true,
  },
  {
    route: ROUTES.LOGIN,
    label: 'Log In',
    roles: [],
    restricted: false,
  },
  {
    route: ROUTES.LOGOUT,
    label: 'Log Out',
    roles: [ROLES.ADMIN, ROLES.MANAGER, ROLES.USER],
    restricted: true,
  },
];

export const ROLE_SELECT_OPTIONS = [
  { value: ROLES.USER, label: ROLES.USER },
  { value: ROLES.MANAGER, label: ROLES.MANAGER },
  { value: ROLES.ADMIN, label: ROLES.ADMIN },
];
