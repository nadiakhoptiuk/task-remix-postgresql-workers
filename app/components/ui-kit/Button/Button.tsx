import classNames from 'classnames';

import { WithChildren, WithClassName } from '~/types/common.types';
import { ButtonProps } from './Button.types';

import s from './Button.module.css';

export const Button: React.FC<ButtonProps & WithChildren & WithClassName> = ({
  children,
  type = 'button',
  isDisabled = false,
  className,
  centered = false,
}) => {
  return (
    <button
      type={type}
      className={classNames(
        s.baseButton,
        className,
        centered && 'block mx-auto',
      )}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
};
