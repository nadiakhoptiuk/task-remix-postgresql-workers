import { EmployeeTypeWithId } from '~/types/common.types';
import { NavLink } from '@remix-run/react';

import { ROUTES } from '~/types/enums';

import s from './EmployeesList.module.css';

export const EmployeesList = ({ data }: { data: EmployeeTypeWithId[] }) => {
  return (
    <ul className="grid grid-cols-1 gap-y-4">
      {data.map(({ id, email, name, role }) => {
        return (
          <li key={id}>
            <NavLink
              to={`${ROUTES.EMPLOYEES}/${id}`}
              className={({ isActive }) =>
                isActive
                  ? `${s.baseLink} text-white cursor-default pointer-events-none bg-ui_accent bg-opacity-50`
                  : `${s.baseLink} text-ui_dark cursor-pointer`
              }
            >
              {/* <div className={s.baseItemBlock}> */}
              <span className={s.baseItemHeading}>Name:</span>
              <span className={s.baseItemDesc}>{name}</span>
              {/* </div> */}

              <div className={`${s.baseItemBlock} !hidden`}>
                <span className={s.baseItemHeading}>Email:</span>
                <span className={s.baseItemDesc}>{email}</span>
              </div>

              <div className={`${s.baseItemBlock} items-end !hidden`}>
                <span className={s.baseItemHeading}>ROLE:</span>
                <span className={`${s.baseItemDesc} text-ui_accent_dark`}>
                  {role}
                </span>
              </div>
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
};
