import classNames from 'classnames';
import { IoLocationSharp } from 'react-icons/io5';

import { USERS_COLORS, USERS_TOP } from '~/constants/constants';

export const EditorLabel = ({
  userName,
  index = 0,
  className = '',
  additionalText = '',
}: {
  userName: string;
  index?: number;
  className?: string;
  additionalText?: string;
}) => {
  const name = userName.includes(' ') ? userName.split(' ') : [userName];

  const editorLabel =
    name.length > 1 ? `${name[0].slice(0, 1)}. ${name[1]}` : name;

  return (
    <span
      className={classNames(
        'absolute flex top-10 text-sm',
        USERS_COLORS[index],
        USERS_TOP[index],
        className,
      )}
    >
      <IoLocationSharp
        className={classNames('shrink-0', USERS_COLORS[index])}
      />
      <span className="text-inherit">
        {editorLabel}
        {additionalText && ` ${additionalText}`}
      </span>
    </span>
  );
};
