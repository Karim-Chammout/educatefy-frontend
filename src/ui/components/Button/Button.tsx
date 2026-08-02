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
  download?: boolean | string;
  target?: string;
  rel?: string;
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
  download,
  target,
  rel,
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
      download={download}
      target={target}
      rel={rel}
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
