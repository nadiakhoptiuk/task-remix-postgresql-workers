import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
} from '@remix-run/node';
import { Link, useLoaderData, useParams } from '@remix-run/react';
import { ImArrowLeft2 } from 'react-icons/im';
import invariant from 'tiny-invariant';
import { CreateOrUpdateTagForm } from '~/components/forms/CreateOrEditTagForm';
import { Container } from '~/components/ui-kit/Container/Container';
import { getRestEmployeesList } from '~/models/employees.server';
import { getTagById } from '~/models/tags.server';
import { ROUTES } from '~/types/enums';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { tagId } = params;
  invariant(tagId, 'Tag id not found');
  const tagData = await getTagById(Number(tagId));

  const allRestUsersData = await getRestEmployeesList(Number(tagId));

  const selectData = allRestUsersData.map(({ name, id }) => ({
    label: name,
    value: String(id),
  }));

  if (tagData !== null) {
    const { name, users } = tagData;

    return Response.json({
      formDefaults: {
        name: name,
        connectedUsers: users,
      },
      restUsers: selectData,
    });
  }
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const { tagId } = params;

  const formData = await request.formData();

  const tagName = formData.get('tagName');
  // const users = formData.getAll('users') as string[];

  if (typeof tagName !== 'string') {
    return Response.json({
      error: 'Tag name is not a string',
    });
  }

  try {
    // await createNewTag({ tagName, users });
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ error: error.message });
    }
    return Response.json({ error: 'Error during creating tag' });
  }

  return redirect(`${ROUTES.TAGS}/${tagId}`);
};

export default function EditEmployeePage() {
  const { formDefaults, restUsers } = useLoaderData<typeof loader>();
  const { tagId } = useParams();

  return (
    <section className="section bg-ui_lighter h-full overflow-y-auto">
      <Container>
        <Link
          to={`${ROUTES.TAGS}/${tagId}`}
          className="flex gap-4 items-center mb-10"
        >
          <ImArrowLeft2 />
          Back
        </Link>

        <h2 className="text-ui_accent_dark">Edit {formDefaults.name}</h2>

        <CreateOrUpdateTagForm
          formType="update"
          defaultValues={formDefaults}
          users={restUsers}
        />
      </Container>
    </section>
  );
}
