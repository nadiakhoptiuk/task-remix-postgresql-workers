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
    label: 'Tags',
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

export const ORDER_SELECT_OPTIONS = [
  { value: 'max', label: 'max' },
  { value: 'min', label: 'min' },
];

export const GROUP_SELECT_OPTIONS = [
  { value: 'billable', label: 'Billable' },
  { value: 'notBillable', label: 'Not billable' },
  { value: 'absent', label: 'Absent' },
];

export const GROUP_PARAMETER_NAME = 'group';
export const ORDER_PARAMETER_NAME = 'order';
export const START_RANGE_PARAMETER_NAME = 'start';
export const TAG_FILTER_PARAMETER_NAME = 'tag';
export const SEARCH_PARAMETER_NAME = 'search';

export const ALL_TAGS = 'all';

export const PAGINATION_LIMIT = 5;
export const PAGINATION_PARAMETR_NAME = 'page';
export const MAX_PAGINATION_BUTTONS = 3;
