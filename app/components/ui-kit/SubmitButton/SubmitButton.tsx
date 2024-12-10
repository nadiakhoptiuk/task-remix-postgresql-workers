import { Button } from '../Button';
import { BusyIndicator } from '../BusyIndicator';

import {
  WithChildren,
  WithClassName,
  WithIsSubmitting,
} from '~/types/common.types';
import classNames from 'classnames';

import s from './SubmitButton.module.css';

export const SubmitButton: React.FC<
  WithChildren &
    WithClassName &
    WithIsSubmitting & { variant?: 'accent' | 'non-accent' }
> = ({ children, isSubmitting, className = '', variant = 'accent' }) => {
  return (
    <Button
      type="submit"
      isDisabled={isSubmitting}
      className={classNames(
        'flex items-center justify-center gap-x-4',
        isSubmitting && s.disabled,
        className,
      )}
      variant={variant}
    >
      {children}
      {isSubmitting && (
        <BusyIndicator
          isLoading={isSubmitting}
          className="!static !text-white !w-fit"
        />
      )}
    </Button>
  );
};
