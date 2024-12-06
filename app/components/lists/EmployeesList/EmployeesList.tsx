import { NavLink } from '@remix-run/react';

import { EditorLabel } from '~/components/ui-kit/EditorLabel';

import { ROLES, ROUTES } from '~/types/enums';
import { EditorLocationType, EmployeeTypeWithId } from '~/types/common.types';

import s from './EmployeesList.module.css';

export const EmployeesList = ({
  data,
  activeEditors,
}: {
  data: EmployeeTypeWithId[];
  activeEditors: EditorLocationType[] | [] | undefined;
}) => {
  return (
    <ul className="grid grid-cols-1 gap-y-4 min-h-[275px] md:min-h-[295px]">
      {data.map(({ id, name, role }) => {
        const editors =
          activeEditors &&
          activeEditors.length > 0 &&
          activeEditors.filter(
            ({ location }) => location === `${ROUTES.EMPLOYEES}/${id}/edit`,
          );

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
