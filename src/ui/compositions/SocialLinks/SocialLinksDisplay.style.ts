import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

export const LinksRoot = styled('div')({
  display: 'grid',
  gridTemplateColumns: '1fr',
  width: 'fit-content',
});

export const LinkItem = styled('div')({});

export const LinkDivider = styled(Divider)(({ theme }) => ({
  borderColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
}));

export const LinkIcon = styled('div', {
  shouldForwardProp: (prop) => prop !== 'iconColor',
})<{ iconColor?: string }>(({ iconColor }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: iconColor,
  flexShrink: 0,
  transition: 'transform 0.15s ease-in-out',
}));

export const LinkLabelBox = styled('div')({
  minWidth: 0,
  flex: 1,
});

export const LinkLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 500,
  lineHeight: 1.3,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}));

export const LinkSublabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginTop: 4,
  lineHeight: 1,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: 'block',
}));

export const PrimaryBadge = styled(Chip)({
  height: 20,
  fontSize: '0.625rem',
  fontWeight: 600,
  flexShrink: 0,
  '& .MuiChip-label': { padding: '0 6px' },
});

export const LinkRow = styled('a')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  padding: '10px 8px',
  textDecoration: 'none',
  transition: 'background-color 0.15s ease-in-out',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  [`&:hover ${LinkIcon}`]: {
    transform: 'scale(1.1)',
  },
  [`&:hover ${LinkLabel}`]: {
    textDecoration: 'underline',
  },
}));
