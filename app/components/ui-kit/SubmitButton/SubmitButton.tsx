import { useIsSubmitting } from 'remix-validated-form';

import { Button } from '../Button';

import { WithChildren, WithClassName } from '~/types/common.types';

export const SubmitButton: React.FC<WithChildren & WithClassName> = ({
  children,
  className = '',
}) => {
  const isSubmitting = useIsSubmitting();

  return (
    <Button type="submit" isDisabled={isSubmitting} className={className}>
      {isSubmitting ? 'Submitting...' : children}
    </Button>
  );
};
