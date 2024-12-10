import { LoaderFunctionArgs } from '@remix-run/node';
import { Link, Outlet, useLoaderData } from '@remix-run/react';

import { Container } from '~/components/ui-kit/Container/Container';
import { EmployeesList } from '~/components/lists/EmployeesList';
import { SearchForm } from '~/components/forms/SearchForm';
import { PaginationBar } from '~/components/navigation/PaginationBar';

import { getEmployeesList } from '~/repository/employees.server';
import { getAuthUserAndVerifyAccessOrRedirect } from '~/services/auth.server';

import { ROUTES } from '~/types/enums';
import { EmployeeLoaderData, Role } from '~/types/common.types';
import {
  NAVLINKS,
  PAGINATION_PARAMETR_NAME,
  SEARCH_PARAMETER_NAME,
} from '~/constants/constants';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const pageAllowedRoles: Role[] =
    NAVLINKS.find(({ route }) => route === ROUTES.EMPLOYEES)?.roles ?? [];

  await getAuthUserAndVerifyAccessOrRedirect(
    request,
    ROUTES.HOME,
    pageAllowedRoles,
  );

  const url = new URL(request.url);
  const query = url.searchParams.get(SEARCH_PARAMETER_NAME);
  const page = Number(url.searchParams.get(PAGINATION_PARAMETR_NAME) || '1');

  const {
    users: employeesList,
    actualPage,
    pagesCount,
  } = await getEmployeesList(page, query);

  return Response.json({ employeesList, query, actualPage, pagesCount });
};

export default function EmployeesPage() {
  const { employeesList, query, actualPage, pagesCount } =
    useLoaderData<EmployeeLoaderData>();

  return (
    <div className="md:flex h-[calc(100vh-140px)] md:h-[calc(100vh-96px)]">
      <section className="section flex-1 flex-grow md:border-r-[2px] border-ui_grey h-screen fixed">
        <Container>
          <h1 className="md:visually-hidden">All Employees</h1>

          <div className="flex gap-x-8 mb-8 ">
            <SearchForm query={query} />

            <Link
              to="new"
              className="primaryButton py-1 px-3 w-max shrink-0 text-white bg-ui_accent border-[1px] border-ui_accent_dark rounded-md text-center h-[42px] text-base md:text-lg flex items-center justify-center"
            >
              Add New User
            </Link>
          </div>

          <div>
            {employeesList.length > 0 ? (
              <EmployeesList data={employeesList} />
            ) : (
              <p>No Employees found</p>
            )}
          </div>

          {employeesList.length > 0 && (
            <PaginationBar page={actualPage} pagesCount={pagesCount} />
          )}
        </Container>
      </section>

      <div className="flex-1 pl-[510px] overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}
