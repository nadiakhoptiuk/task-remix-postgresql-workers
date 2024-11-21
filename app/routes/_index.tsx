import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { getAuthUser } from '~/services/auth.server';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  return await getAuthUser(request);
}

export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-16">
        <p>Home Page</p>
      </div>
    </div>
  );
}
