import { NavLink } from '@remix-run/react';
import { EditorLabel } from '~/components/ui-kit/EditorLabel';

import { ROUTES } from '~/types/enums';
import { BaseItemType, EditorLocationType } from '~/types/common.types';

import s from './BaseNavList.module.css';

export const BaseNavList = ({
  data,
  baseRoute,
  activeEditors,
}: {
  data: BaseItemType[];
  baseRoute: (typeof ROUTES)[keyof typeof ROUTES];
  activeEditors?: EditorLocationType[] | [] | undefined;
}) => {
  return (
    <ul className="grid grid-cols-1 gap-y-4 min-h-[275px] md:min-h-[295px]">
      {data.map(({ id, name }) => {
        const editors =
          activeEditors &&
          activeEditors.length > 0 &&
          activeEditors.filter(
            ({ location }) => location === `${ROUTES.TAGS}/${id}/edit`,
          );

        return (
          <li key={id} className="h-max relative">
            <NavLink
              to={`${baseRoute}/${id}`}
              className={({ isActive }) =>
                isActive
                  ? `${s.baseLink} text-white cursor-default pointer-events-none bg-ui_accent bg-opacity-50`
                  : `${s.baseLink} text-ui_dark cursor-pointer`
              }
            >
              <span className={s.baseItemDesc}>{name}</span>

              {editors &&
                editors?.length > 0 &&
                editors.map(({ userName }, index) => {
                  return (
                    <EditorLabel
                      key={userName}
                      userName={userName}
                      index={index}
                      className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 !text-inherit"
                      additionalText="is editing now"
                    />
                  );
                })}
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
};
