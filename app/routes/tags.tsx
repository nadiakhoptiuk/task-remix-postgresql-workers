import { LoaderFunctionArgs } from '@remix-run/node';
import {
  Link,
  Outlet,
  useLoaderData,
  useRouteLoaderData,
} from '@remix-run/react';

import { Container } from '~/components/ui-kit/Container/Container';
import { BaseNavList } from '~/components/lists/BaseNavList';
import { SearchForm } from '~/components/forms/SearchForm';
import { PaginationBar } from '~/components/navigation/PaginationBar';

import { getTagsList } from '~/models/tags.server';
import { getAuthUserAndVerifyAccessOrRedirect } from '~/services/auth.server';
import { sendEditorLocation } from '~/models/userLocation';

import {
  NAVLINKS,
  PAGINATION_PARAMETR_NAME,
  SEARCH_PARAMETER_NAME,
} from '~/constants/constants';
import { Role, RootLoaderData, TagsLoaderData } from '~/types/common.types';
import { ROUTES } from '~/types/enums';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const pageAllowedRoles: Role[] =
    NAVLINKS.find(({ route }) => route === ROUTES.TAGS)?.roles ?? [];

  const loggedUser = await getAuthUserAndVerifyAccessOrRedirect(
    request,
    ROUTES.HOME,
    pageAllowedRoles,
  );

  await sendEditorLocation(loggedUser.id, ROUTES.TAGS);

  const url = new URL(request.url);
  const query = url.searchParams.get(SEARCH_PARAMETER_NAME);
  const page = Number(url.searchParams.get(PAGINATION_PARAMETR_NAME) || '1');

  const {
    tags: tagsList,
    actualPage,
    pagesCount,
  } = await getTagsList(page, query);
  return Response.json({ tagsList, query, actualPage, pagesCount });
};

export default function TagsPage() {
  const { tagsList, query, actualPage, pagesCount } =
    useLoaderData<TagsLoaderData>();
  const data = useRouteLoaderData<RootLoaderData>('root');

  return (
    <div className="md:flex h-[calc(100vh-140px)] md:h-[calc(100vh-96px)]">
      <section className="section flex-1 flex-grow md:border-r-[2px] border-ui_grey ">
        <Container>
          <h1 className="md:visually-hidden">All tags</h1>

          <div className="flex gap-x-8 mb-8 ">
            <SearchForm query={query} />

            <Link
              to="new"
              className="primaryButton py-1 px-3 w-max shrink-0 text-white bg-ui_accent border-[1px] border-ui_accent_dark rounded-md text-center h-[42px] text-base md:text-lg flex items-center justify-center"
            >
              Add New Tag
            </Link>
          </div>

          {tagsList.length > 0 ? (
            <BaseNavList
              data={tagsList}
              baseRoute={ROUTES.TAGS}
              activeEditors={data?.activeEditors}
            />
          ) : (
            <p>No tags found</p>
          )}

          <PaginationBar page={actualPage} pagesCount={pagesCount} />
        </Container>
      </section>

      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
