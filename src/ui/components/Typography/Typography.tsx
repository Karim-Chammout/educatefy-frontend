import { SxProps, Theme, TypeText } from '@mui/material';
import MuiTypography from '@mui/material/Typography';
import { Variant } from '@mui/material/styles/createTypography';
import { ElementType, ReactNode } from 'react';

const Typography = ({
  children,
  variant,
  gutterBottom,
  component,
  sx,
  color,
  dangerouslySetInnerHTML,
  className,
}: {
  children?: ReactNode;
  variant?: Variant;
  component?: ElementType;
  gutterBottom?: boolean;
  sx?: SxProps<Theme>;
  color?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning'
    | `text${Capitalize<keyof TypeText>}`
    | string;
  dangerouslySetInnerHTML?: {
    __html: string;
  };
  className?: string;
}) => {
  return (
    <MuiTypography
      variant={variant}
      component={component || 'p'}
      gutterBottom={gutterBottom}
      color={color}
      sx={{ ...sx }}
      dangerouslySetInnerHTML={dangerouslySetInnerHTML}
      className={className}
    >
      {children}
    </MuiTypography>
  );
};

export default Typography;
