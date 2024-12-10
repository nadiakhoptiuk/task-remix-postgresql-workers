import { NavLink } from '@remix-run/react';

import { ROLES, ROUTES } from '~/types/enums';
import { EmployeeTypeWithId } from '~/types/common.types';

import s from './EmployeesList.module.css';

export const EmployeesList = ({ data }: { data: EmployeeTypeWithId[] }) => {
  return (
    <ul className="grid grid-cols-1 gap-y-4 min-h-[275px] md:min-h-[295px]">
      {data.map(({ id, name, role }) => {
        return (
          <li key={id} className="h-max">
            <NavLink
              to={`${ROUTES.EMPLOYEES}/${id}`}
              className={({ isActive }) =>
                isActive
                  ? `${s.baseLink} text-white cursor-default pointer-events-none bg-ui_accent bg-opacity-50 relative`
                  : `${s.baseLink} text-ui_dark cursor-pointer relative`
              }
            >
              <div className={s.baseItemBlock}>
                <span className={s.baseItemDesc}>{name}</span>
              </div>

              {role !== ROLES.USER && (
                <div className={`${s.baseItemBlock} items-end`}>
                  <span className={`${s.baseItemDesc} text-ui_accent_dark`}>
                    {role}
                  </span>
                </div>
              )}
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
};
