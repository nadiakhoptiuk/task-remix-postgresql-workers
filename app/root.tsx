import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteError,
} from '@remix-run/react';
import type { LinksFunction, LoaderFunctionArgs } from '@remix-run/node';
import { Toaster } from 'react-hot-toast';

import { Header } from './components/layout/Header';

import {
  getAllActiveEditorsLocation,
  sendEditorLocation,
} from './models/userLocation';
import { getAuthUser } from './services/auth.server';
import { filterLocationByAccess } from './services/userLocation.server';

import { RootLoaderData } from './types/common.types';
import { ROLES, ROUTES } from './types/enums';
import './tailwind.css';

export const links: LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
];

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const loggedUser = await getAuthUser(request);

    if (loggedUser === null) {
      return { user: null, activeEditors: [] };
    }

    await sendEditorLocation(loggedUser.id, ROUTES.HOME);

    const activeEditors =
      loggedUser.role !== ROLES.USER
        ? await getAllActiveEditorsLocation(loggedUser.id)
        : [];

    const availableLocations =
      activeEditors.length > 0
        ? filterLocationByAccess(activeEditors, loggedUser.role)
        : null;

    return availableLocations
      ? { user: loggedUser, activeEditors: availableLocations }
      : { user: loggedUser };
  } catch (error) {
    if (error instanceof Response) return error;
    return error;
  }
}

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useLoaderData<RootLoaderData>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>

      <body>
        <Header
          userRole={data?.user?.role}
          activeEditors={data?.activeEditors}
        />
        <main className="min-h-full max-md:pt-[82px] md:pt-[91px]">
          {children}
        </main>
        <Toaster position="top-center" reverseOrder={false} />

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>Помилка {error.status}</h1>
        <p>{error.data}</p>
      </div>
    );
  }

  if (error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  }

  return (
    <div>
      <h1>Something went wrong</h1>
      <p>Unfortunately, an unexpected error occurred</p>
    </div>
  );
}
