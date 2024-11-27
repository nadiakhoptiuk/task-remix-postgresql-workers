import { Role } from '~/types/common.types';
import { ROLES } from '~/types/enums';

export const SimpleUsersList = ({
  data,
}: {
  data: { user: { id: number; name: string; role: Role } }[];
}) => {
  return (
    <>
      {data.length > 0 && (
        <ul className="flex flex-col gap-y-4 mb-16">
          {data.map(({ user: { id, name, role } }) => {
            return (
              <li
                key={id}
                className="flex justify-between border-b-[1px] border-ui_grey"
              >
                <p className="text-start text-lg md:text-xl xl:text-2xl">
                  {name}
                </p>

                {role === ROLES.ADMIN && (
                  <p className="text-start text-ui_accent_dark text-lg md:text-xl xl:text-2xl">
                    {role}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};
