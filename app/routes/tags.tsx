import { LoaderFunctionArgs } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';

import { Container } from '~/components/ui-kit/Container/Container';
import { BaseNavList } from '~/components/lists/BaseNavList';
import { SearchForm } from '~/components/forms/SearchForm';

import { getTagsList } from '~/models/tags.server';
import { getAuthUserAndVerifyAccessOrRedirect } from '~/services/auth.server';

import { NAVLINKS, SEARCH_PARAMETER_NAME } from '~/constants/constants';
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

  const url = new URL(request.url);
  const query = url.searchParams.get(SEARCH_PARAMETER_NAME);

  const tagsList = await getTagsList(query, SEARCH_PARAMETER_NAME);
  return Response.json({ tagsList, query });
};

export default function TagsPage() {
  const data = useLoaderData<TagsLoaderData>();

  return (
    <div className="md:flex h-[calc(100vh-140px)] md:h-[calc(100vh-96px)]">
      <section className="section flex-1 flex-grow border-r-[2px] border-ui_grey ">
        <Container>
          <SearchForm query={data.query} />

          {data?.tagsList.length > 0 ? (
            <BaseNavList data={data?.tagsList} baseRoute={ROUTES.TAGS} />
          ) : (
            <p>No tags found</p>
          )}
        </Container>
      </section>

      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
