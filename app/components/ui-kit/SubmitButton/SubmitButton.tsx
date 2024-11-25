import { useIsSubmitting } from 'remix-validated-form';

import { Button } from '../Button';

import { WithChildren } from '~/types/common.types';

export const SubmitButton: React.FC<WithChildren> = ({ children }) => {
  const isSubmitting = useIsSubmitting();

  return (
    <Button type="submit" isDisabled={isSubmitting}>
      {isSubmitting ? 'Submitting...' : children}
    </Button>
  );
};
