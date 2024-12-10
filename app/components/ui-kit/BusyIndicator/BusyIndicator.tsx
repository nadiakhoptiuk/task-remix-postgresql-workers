import classNames from 'classnames';
import { ImSpinner2 } from 'react-icons/im';

import s from './BusyIndicator.module.css';

export const BusyIndicator = ({
  isLoading,
  className = '',
}: {
  isLoading: boolean;
  className?: string;
}) => {
  return (
    <ImSpinner2
      aria-hidden
      className={classNames(
        'absolute top-0 left-2 ',
        className,
        !isLoading ? 'hidden' : s.iconLoading,
      )}
    />
  );
};
