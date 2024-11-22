import { EmployeeTypeWithId } from '~/types/common.types';

import s from './EmployeesList.module.css';
import { Link } from '@remix-run/react';
import { ROUTES } from '~/types/enums';

export const EmployeesList = ({ data }: { data: EmployeeTypeWithId[] }) => {
  return (
    <ul className="grid grid-cols-1 gap-y-4">
      {data.map(({ id, email, name, role }) => {
        return (
          <li
            key={id}
            className=" border-[1px] rounded-md border-ui_grey hover:bg-ui_light transition-all duration-150 "
          >
            <Link
              to={`${ROUTES.EMPLOYEES}/${id}`}
              className="w-full h-full py-4 px-8 flex justify-between"
            >
              <div className={s.baseItemBlock}>
                <span className={s.baseItemHeading}>Name:</span>
                <span className={s.baseItemDesc}>{name}</span>
              </div>

              <div className={`${s.baseItemBlock} !hidden`}>
                <span className={s.baseItemHeading}>Email:</span>
                <span className={s.baseItemDesc}>{email}</span>
              </div>

              <div className={`${s.baseItemBlock} items-end`}>
                <span className={s.baseItemHeading}>ROLE:</span>
                <span className={`${s.baseItemDesc} text-ui_accent_dark`}>
                  {role}
                </span>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
