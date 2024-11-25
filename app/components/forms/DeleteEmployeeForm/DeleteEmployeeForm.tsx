import { Form } from '@remix-run/react';
import { SimpleSubmitButton } from '~/components/ui-kit/SimpleSubmitButton';

export const DeleteEmployeeForm = () => {
  return (
    <Form
      id="delete-user-form"
      method="post"
      className="grid grid-cols-1 gap-y-8 w-full mx-auto"
    >
      <SimpleSubmitButton className="w-full" variant="non-accent">
        Delete
      </SimpleSubmitButton>
    </Form>
  );
};
