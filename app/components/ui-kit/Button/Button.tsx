import classNames from 'classnames';

import { WithChildren, WithClassName } from '~/types/common.types';
import { ButtonProps } from './Button.types';

import s from './Button.module.css';

export const Button: React.FC<ButtonProps & WithChildren & WithClassName> = ({
  children,
  onClick,
  variant = 'accent',
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
        isDisabled && s.disabledButton,
        variant === 'accent' &&
          '!bg-ui_accent hocus:!bg-ui_accent_dark text-white border-ui_accent_dark',
        variant === 'non-accent' &&
          '!bg-white hocus:!bg-ui_light !text-dark  !border-ui_grey',
        variant === 'transparent' &&
          '!bg-transparent hocus:bg-ui_light !text-dark !border-none',
      )}
      disabled={isDisabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
