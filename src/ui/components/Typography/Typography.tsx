import { SxProps, Theme, TypeText } from '@mui/material';
import MuiTypography from '@mui/material/Typography';
import { TypographyVariant } from '@mui/material/styles';
import { ElementType, ReactNode } from 'react';

const Typography = ({
  children,
  variant,
  gutterBottom,
  component,
  sx,
  color,
  dangerouslySetInnerHTML,
  title,
  className,
}: {
  children?: ReactNode;
  variant?: TypographyVariant;
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
  title?: string;
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
      title={title}
      className={className}
    >
      {children}
    </MuiTypography>
  );
};

export default Typography;
