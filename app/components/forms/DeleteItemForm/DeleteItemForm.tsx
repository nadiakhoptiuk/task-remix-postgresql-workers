import { Form, useNavigation } from '@remix-run/react';

import { SubmitButton } from '~/components/ui-kit/SubmitButton';

export const DeleteItemForm = ({ formId }: { formId: string }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <Form
      id={formId}
      method="post"
      className="grid grid-cols-1 gap-y-8 w-full mx-auto"
    >
      <SubmitButton className="w-full" variant="non-accent">
        {isSubmitting ? 'Deleting...' : 'Delete'}
      </SubmitButton>
    </Form>
  );
};
