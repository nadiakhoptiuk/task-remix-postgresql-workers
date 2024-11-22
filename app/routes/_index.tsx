import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { AuthorizationError } from 'remix-auth';

import { getAuthUser } from '~/services/auth.server';

import { SerializedUserType } from '~/types/common.types';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    return await getAuthUser(request);
  } catch (error) {
    if (error instanceof Response) return error;
    if (error instanceof AuthorizationError) {
      return Response.json({ error: error.message });
    }
    return error;
  }
}

export default function Index() {
  const { role: userRole } = useLoaderData<SerializedUserType>();

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-16">
        <h1>{userRole ? `Hello, ${userRole}` : 'Home Page'}</h1>
      </div>
    </div>
  );
}
