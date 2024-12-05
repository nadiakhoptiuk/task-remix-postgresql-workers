export interface ButtonProps {
  onClick?: () => void;
  type?: 'button' | 'submit';
  variant?: 'accent' | 'non-accent' | 'transparent';
  isDisabled?: boolean;
  centered?: boolean;
}
