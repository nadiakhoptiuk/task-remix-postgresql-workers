import { MouseEventHandler } from 'react';
import { NavLink } from '@remix-run/react';
import classNames from 'classnames';

import { ROLES } from '~/types/enums';
import { NAVLINKS as navlinks } from '~/constants/constants';
import { EditorLocationType } from '~/types/common.types';
import s from './NavBar.module.css';

export const NavBar = ({
  userRole,
  className = '',
  isMenu = false,
  closeMenu,
  activeEditors,
}: {
  userRole: (typeof ROLES)[keyof typeof ROLES];
  activeEditors?: EditorLocationType[] | undefined;
  className?: string;
  isMenu?: boolean;
  closeMenu?: MouseEventHandler<HTMLAnchorElement> | undefined;
}) => {
  return (
    <nav className={className}>
      <ul
        className={classNames(
          isMenu
            ? 'grid grid-cols-1'
            : 'flex gap-x-8 flex-wrap items-center justify-center',
        )}
      >
        {!activeEditors &&
          navlinks.map(({ route, label, restricted, roles }, index) => {
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
                  onClick={closeMenu}
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
