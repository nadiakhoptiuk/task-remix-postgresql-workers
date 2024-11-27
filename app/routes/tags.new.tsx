import { useLoaderData } from '@remix-run/react';
import { ActionFunctionArgs, redirect } from '@remix-run/node';

import { Container } from '~/components/ui-kit/Container/Container';
import { CreateOrUpdateTagForm } from '~/components/forms/CreateOrEditTagForm';

import { createNewTag } from '~/models/tags.server';
import { getEmployeesList } from '~/models/employees.server';

import { ROUTES } from '~/types/enums';

export const loader = async () => {
  const allUsersData = await getEmployeesList();

  const selectData = allUsersData.map(({ name, id }) => ({
    label: name,
    value: String(id),
  }));

  return Response.json({
    users: selectData,
  });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const tagName = formData.get('tagName');
  const users = formData.getAll('users') as string[];

  if (typeof tagName !== 'string') {
    return Response.json({
      error: 'Tag name is not a string',
    });
  }

  try {
    await createNewTag({ tagName, users });
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ error: error.message });
    }
    return Response.json({ error: 'Error during creating tag' });
  }

  return redirect(ROUTES.TAGS);
};

export default function NewTagPage() {
  const { users } = useLoaderData<typeof loader>();

  return (
    <section className="section bg-ui_lighter h-full">
      <Container>
        <h2 className="text-ui_accent_dark">Create new Tag</h2>

        <CreateOrUpdateTagForm formType="create" users={users} />
      </Container>
    </section>
  );
}
