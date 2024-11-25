import classNames from 'classnames';

import { WithChildren, WithClassName } from '~/types/common.types';
import { ButtonProps } from './Button.types';

import s from './Button.module.css';

export const Button: React.FC<ButtonProps & WithChildren & WithClassName> = ({
  children,
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
        variant === 'accent'
          ? '!bg-ui_accent hocus:!bg-ui_accent_dark text-white border-ui_accent_dark'
          : '!bg-white hocus:!bg-ui_light !text-dark  !border-ui_grey',
      )}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
};
