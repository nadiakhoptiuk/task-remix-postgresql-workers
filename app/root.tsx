import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import type { LinksFunction, LoaderFunctionArgs } from '@remix-run/node';
import { Toaster } from 'react-hot-toast';

import { Header } from './components/layout/Header';

import { getAuthUser } from './services/auth.server';

import { SerializedUserType } from './types/common.types';

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
    return await getAuthUser(request);
  } catch (error) {
    if (error instanceof Response) return error;
    return error;
  }
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { role: userRole } = useLoaderData<SerializedUserType>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>

      <body>
        <Header userRole={userRole} />
        {children}

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
