import { LoaderFunctionArgs } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';

import { BaseList } from '~/components/lists/BaseList';
import { Container } from '~/components/ui-kit/Container/Container';
import { NAVLINKS } from '~/constants/constants';

import { getTagsList } from '~/models/tags.server';
import { getAuthUserAndVerifyAccessOrRedirect } from '~/services/auth.server';

import { Role, TagsLoaderData } from '~/types/common.types';
import { ROUTES } from '~/types/enums';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const pageAllowedRoles: Role[] =
    NAVLINKS.find(({ route }) => route === ROUTES.TAGS)?.roles ?? [];

  await getAuthUserAndVerifyAccessOrRedirect(
    request,
    ROUTES.HOME,
    pageAllowedRoles,
  );

  const tagsList = await getTagsList();
  return Response.json({ tagsList });
};

export default function TagsPage() {
  const data = useLoaderData<TagsLoaderData>();

  return (
    <div className="md:flex h-[calc(100vh-140px)] md:h-[calc(100vh-96px)]">
      <section className="section flex-1 flex-grow border-r-[2px] border-ui_grey ">
        <Container>
          <h1>All Tags</h1>

          <div>
            {data?.tagsList.length > 0 ? (
              <BaseList data={data?.tagsList} baseRoute={ROUTES.TAGS} />
            ) : (
              <p>No tags found</p>
            )}
          </div>
        </Container>
      </section>

      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
