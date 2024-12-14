import { Button as MuiButton, SxProps, Theme } from '@mui/material';
import { ElementType, ReactNode } from 'react';

type ButtonType = {
  children: ReactNode;
  color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  fullWidth?: boolean;
  type?: 'submit' | 'reset' | 'button';
  variant?: 'text' | 'outlined' | 'contained';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onClick?: () => void;
  LinkComponent?: ElementType;
  href?: string;
  to?: string;
  startIcon?: ReactNode;
  sx?: SxProps<Theme>;
};

const Button = ({
  children,
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  type,
  disabled,
  onClick,
  fullWidth,
  startIcon,
  LinkComponent,
  href,
  to,
  sx,
}: ButtonType) => {
  return (
    // @ts-expect-error FIXME: 'to' prop is not supported by TypeScript but it works
    <MuiButton
      size={size}
      variant={variant}
      color={color}
      type={type}
      fullWidth={fullWidth}
      LinkComponent={LinkComponent}
      href={href}
      to={to}
      disabled={disabled}
      startIcon={startIcon}
      onClick={onClick}
      sx={{ ...sx }}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
