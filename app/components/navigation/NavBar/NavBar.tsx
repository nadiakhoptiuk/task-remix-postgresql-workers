import { NavLink } from '@remix-run/react';

import { NAVLINKS as navlinks } from '~/constants/constants';
import { ROLES } from '~/types/enums';
import s from './NavBar.module.css';

export const NavBar = ({
  userRole,
}: {
  userRole: (typeof ROLES)[keyof typeof ROLES];
}) => {
  return (
    <nav>
      <ul className="flex gap-x-8 flex-wrap items-center justify-center">
        {navlinks.map(({ route, label, restricted, roles }, index) => {
          const isShown =
            roles.includes(userRole) || (!restricted && !userRole);

          if (!isShown) return null;

          return (
            <li key={index} className="h-full">
              <NavLink
                to={route}
                className={({ isActive }) =>
                  isActive
                    ? `${s.baseLink} text-ui_accent cursor-default pointer-events-none`
                    : `${s.baseLink} text-ui_dark cursor-pointer`
                }
              >
                {label}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
