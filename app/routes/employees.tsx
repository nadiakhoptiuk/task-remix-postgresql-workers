import { LoaderFunctionArgs } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';

import { Container } from '~/components/ui-kit/Container/Container';
import { EmployeesList } from '~/components/lists/EmployeesList';

import { getEmployeesList } from '~/models/employees.server';
import { getAuthUserAndVerifyAccessOrRedirect } from '~/services/auth.server';

import { ROLES, ROUTES } from '~/types/enums';
import { EmployeeLoaderData, Role } from '~/types/common.types';

const pageAllowedRoles: Role[] = [ROLES.ADMIN];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await getAuthUserAndVerifyAccessOrRedirect(
    request,
    ROUTES.HOME,
    pageAllowedRoles,
  );

  const employeesList = await getEmployeesList();
  return Response.json({ employeesList });
};

export default function EmployeesPage() {
  const data = useLoaderData<EmployeeLoaderData>();

  return (
    <div className="md:flex h-[calc(100vh-140px)] md:h-[calc(100vh-96px)]">
      <section className="section flex-1 flex-grow border-r-[2px] border-ui_grey ">
        <Container>
          <h1>All Employees</h1>

          <div>
            {data?.employeesList.length > 0 ? (
              <EmployeesList data={data?.employeesList} />
            ) : (
              <p>No Employees find</p>
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
