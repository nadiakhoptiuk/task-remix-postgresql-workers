import { LoaderFunctionArgs } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';

import { Container } from '~/components/ui-kit/Container/Container';
import { EmployeesList } from '~/components/lists/EmployeesList';

import { getEmployeesList } from '~/models/employees.server';
import { getAuthUserAndVerifyAccessOrRedirect } from '~/services/auth.server';

import { ROUTES } from '~/types/enums';
import { EmployeeLoaderData, Role } from '~/types/common.types';
import { NAVLINKS } from '~/constants/constants';
import { SearchForm } from '~/components/forms/SearchForm';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const pageAllowedRoles: Role[] =
    NAVLINKS.find(({ route }) => route === ROUTES.EMPLOYEES)?.roles ?? [];

  await getAuthUserAndVerifyAccessOrRedirect(
    request,
    ROUTES.HOME,
    pageAllowedRoles,
  );

  const url = new URL(request.url);
  const query = url.searchParams.get('query');

  const employeesList = await getEmployeesList(query);

  return Response.json({ employeesList, query });
};

export default function EmployeesPage() {
  const data = useLoaderData<EmployeeLoaderData>();

  return (
    <div className="md:flex h-[calc(100vh-140px)] md:h-[calc(100vh-96px)]">
      <section className="section flex-1 flex-grow border-r-[2px] border-ui_grey ">
        <Container>
          <SearchForm query={data.query} />

          <div>
            {data?.employeesList.length > 0 ? (
              <EmployeesList data={data?.employeesList} />
            ) : (
              <p>No Employees found</p>
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
