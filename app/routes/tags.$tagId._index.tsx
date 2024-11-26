import { LoaderFunctionArgs } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import invariant from 'tiny-invariant';
import { ImArrowLeft2 } from 'react-icons/im';

import { Container } from '~/components/ui-kit/Container/Container';

import { getTagById } from '~/models/tags.server';

import { ROLES, ROUTES } from '~/types/enums';
import { TagType } from '~/types/common.types';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { tagId } = params;
  invariant(tagId, 'Tag id not found');

  const tagData = await getTagById(Number(tagId));

  if (tagData !== null) {
    return Response.json({ tagData });
  }

  return Response.json({
    error: 'User with such Id does not exist',
  });
};

// export const action = async ({ params }: ActionFunctionArgs) => {
//   const { tagId } = params;
//   try {
// await deleteUserById(Number(tagId)); TODO

//     return redirect(ROUTES.TAGS);
//   } catch (error) {
//     if (
//       error instanceof Prisma.PrismaClientKnownRequestError &&
//       error.code === 'P2025'
//     ) {
//       return Response.json(
//         {
//           error: 'User with such Id does not exist',
//         },
//         { status: 404 },
//       );
//     }

//     return Response.json(
//       {
//         error: 'An unexpected error occurred',
//       },
//       { status: 400 },
//     );
//   }
// };

export default function TagPage() {
  const {
    tagData: { id, name, users },
  } = useLoaderData<TagType>();

  return (
    <section className="section bg-ui_lighter h-full">
      <Container>
        <Link to={ROUTES.TAGS} className="flex gap-4 items-center mb-20">
          <ImArrowLeft2 />
          Back to all tags
        </Link>

        <h1 className="text-ui_accent_dark">TAG: {name}</h1>

        <h2 className="text-ui_dark">Users:</h2>

        {users.length > 0 && (
          <ul className="flex flex-col gap-y-4 mb-16">
            {users.map(({ user: { id, name, role } }) => {
              return (
                <li
                  key={id}
                  className="flex justify-between border-b-[1px] border-ui_grey"
                >
                  <p className="text-start text-lg md:text-xl xl:text-2xl">
                    {name}
                  </p>

                  {role === ROLES.ADMIN && (
                    <p className="text-start text-ui_accent_dark mb-16 text-lg md:text-xl xl:text-2xl">
                      {role}
                    </p>
                  )}
                </li>
              );
            })}
          </ul>
        )}

        <div className="flex flex-col gap-y-6 w-[300px] mx-auto">
          <Link
            to={`${ROUTES.TAGS}/${id}/edit`}
            className="border-[1px] rounded-md border-ui_accent_dark bg-ui_accent hocus:bg-ui_accent_dark text-white transition-all duration-150 w-full h-full flex px-4 py-3 text-dark text-lg md:text-xl xl:text-2xl justify-center "
          >
            Edit Tag
          </Link>
          {/* <DeleteTagForm /> */}
        </div>
      </Container>
    </section>
  );
}
