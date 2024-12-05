import { Dispatch, SetStateAction } from 'react';

import { Container } from '~/components/ui-kit/Container/Container';
import { Modal } from '~/components/ui-kit/Modal';
import { NavBar } from '../NavBar';

import { ROLES } from '~/types/enums';

export const MobileMenu = ({
  isMenuOpen,
  setIsOpen,
  userRole,
}: {
  isMenuOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  userRole: (typeof ROLES)[keyof typeof ROLES];
}) => {
  return (
    <Modal
      isOpen={isMenuOpen}
      setIsOpen={setIsOpen}
      className="!w-screen !max-w-full h-screen !rounded-none"
      isMenu
    >
      <Container>
        <NavBar userRole={userRole} isMenu closeMenu={() => setIsOpen(false)} />
      </Container>
    </Modal>
  );
};
