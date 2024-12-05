import { useState } from 'react';
import { ImMenu } from 'react-icons/im';

import { Container } from '~/components/ui-kit/Container/Container';
import { NavBar } from '~/components/navigation/NavBar';
import { Button } from '~/components/ui-kit/Button';
import { MobileMenu } from '~/components/navigation/MobileMenu';

import { ROLES } from '~/types/enums';
import { EditorLocationType } from '~/types/common.types';

export const Header = ({
  userRole,
  activeEditors,
}: {
  userRole: (typeof ROLES)[keyof typeof ROLES];
  activeEditors?: EditorLocationType[] | undefined;
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-ui_light max-md:py-4 md:py-6 fixed w-full left-0 top-0 z-10">
      <Container className="flex items-center justify-center">
        <NavBar
          userRole={userRole}
          className="max-md:hidden"
          activeEditors={activeEditors}
        />

        <Button
          variant="transparent"
          className="ml-auto md:hidden h-[50px] w-[50px]"
          onClick={toggleMenu}
        >
          <ImMenu className="text-ui_accent h-5 w-5" />
        </Button>

        {isMenuOpen && (
          <MobileMenu
            isMenuOpen={isMenuOpen}
            setIsOpen={setIsMenuOpen}
            userRole={userRole}
          />
        )}
      </Container>
    </header>
  );
};
