export interface ModalType {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleCloseModal?: () => void;
  isMenu?: boolean;
}
