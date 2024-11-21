import { NavLink } from '@remix-run/react';

import { createNavLinksData } from '~/utils/createNavLinksData';

import { NAVLINKS, ROUTES } from '~/types/enums';

import s from './NavBar.module.css';

export const NavBar = () => {
  const navlinks = createNavLinksData(ROUTES, NAVLINKS);

  return (
    <nav>
      <ul className="flex gap-x-8 flex-wrap items-center justify-center">
        {navlinks.map(({ route, label }, index) => {
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
