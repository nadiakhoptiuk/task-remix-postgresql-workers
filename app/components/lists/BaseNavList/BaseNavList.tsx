import { NavLink } from '@remix-run/react';
import { BaseItemType } from '~/types/common.types';

import { ROUTES } from '~/types/enums';

import s from './BaseNavList.module.css';

export const BaseNavList = ({
  data,
  baseRoute,
}: {
  data: BaseItemType[];
  baseRoute: (typeof ROUTES)[keyof typeof ROUTES];
}) => {
  return (
    <ul className="grid grid-cols-1 gap-y-4">
      {data.map(({ id, name }) => {
        return (
          <li key={id}>
            <NavLink
              to={`${baseRoute}/${id}`}
              className={({ isActive }) =>
                isActive
                  ? `${s.baseLink} text-white cursor-default pointer-events-none bg-ui_accent bg-opacity-50`
                  : `${s.baseLink} text-ui_dark cursor-pointer`
              }
            >
              <span className={s.baseItemDesc}>{name}</span>
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
};
