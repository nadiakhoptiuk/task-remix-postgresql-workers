import { Form } from '@remix-run/react';

import { SimpleSubmitButton } from '~/components/ui-kit/SimpleSubmitButton';

export const DeleteItemForm = ({ formId }: { formId: string }) => {
  return (
    <Form
      id={formId}
      method="post"
      className="grid grid-cols-1 gap-y-8 w-full mx-auto"
    >
      <SimpleSubmitButton className="w-full" variant="non-accent">
        Delete
      </SimpleSubmitButton>
    </Form>
  );
};
