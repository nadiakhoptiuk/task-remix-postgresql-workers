import { Button } from '../Button';
import { WithChildren, WithClassName } from '~/types/common.types';

export const SimpleSubmitButton: React.FC<
  WithChildren & WithClassName & { variant: 'accent' | 'non-accent' }
> = ({ children, variant = 'non-accent', className = '' }) => {
  return (
    <Button type="submit" className={className} variant={variant}>
      {children}
    </Button>
  );
};
