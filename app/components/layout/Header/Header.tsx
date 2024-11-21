import { Container } from '~/components/ui-kit/Container/Container';
import { NavBar } from '~/components/navigation/NavBar';

import { ROLES } from '~/types/enums';

export const Header = ({
  userRole,
}: {
  userRole: (typeof ROLES)[keyof typeof ROLES];
}) => {
  return (
    <header className="bg-ui_light py-6">
      <Container className="flex items-center justify-center">
        <NavBar userRole={userRole} />
      </Container>
    </header>
  );
};
