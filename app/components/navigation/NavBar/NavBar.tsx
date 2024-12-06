import { NavLink, useRouteLoaderData } from '@remix-run/react';
import classNames from 'classnames';

import { EditorLabel } from '~/components/ui-kit/EditorLabel';

import { ROLES } from '~/types/enums';
import { NAVLINKS as navlinks } from '~/constants/constants';
import { EditorLocationType, RootLoaderData } from '~/types/common.types';
import s from './NavBar.module.css';

export const NavBar = ({
  userRole,
  className = '',
  isMenu = false,
  closeMenu,
}: {
  userRole: (typeof ROLES)[keyof typeof ROLES];
  activeEditors?: EditorLocationType[] | undefined;
  className?: string;
  isMenu?: boolean;
  closeMenu?: () => void | undefined;
}) => {
  const data = useRouteLoaderData<RootLoaderData>('root');

  return (
    <nav className={className}>
      <ul
        className={classNames(
          isMenu
            ? 'grid grid-cols-1'
            : 'flex gap-x-8 flex-wrap items-center justify-center',
        )}
      >
        {navlinks.map(({ route, label, restricted, roles }, index) => {
          const isShown =
            roles.includes(userRole) || (!restricted && !userRole);

          if (!isShown) return null;
          const editorsAtCurrentRoute = data?.activeEditors?.filter(
            ({ location }) => location === route,
          );

          return (
            <li key={index} className="h-full relative">
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

              {editorsAtCurrentRoute &&
                editorsAtCurrentRoute.map(({ userName }, index) => {
                  return (
                    <EditorLabel
                      key={userName}
                      userName={userName}
                      index={index}
                    />
                  );
                })}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
