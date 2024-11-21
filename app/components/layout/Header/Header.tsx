import { Container } from '~/components/ui-kit/Container/Container';
import { NavBar } from '~/components/navigation/NavBar';

export const Header = () => {
  return (
    <header className="bg-ui_light py-6">
      <Container className="flex items-center justify-center">
        <NavBar />
      </Container>
    </header>
  );
};
