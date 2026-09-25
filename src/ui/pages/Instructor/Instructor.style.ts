import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

import { Typography } from '@/ui/components';

export const HeaderSection = styled(Paper)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: theme.spacing(4),
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),

  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing(3),
    padding: theme.spacing(2),
    textAlign: 'start',
  },
}));

export const InstructorInfo = styled(Box)(({ theme }) => ({
  flex: 1,
  minWidth: 0,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  alignSelf: 'flex-start',
}));

export const HeaderIdentity = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) auto',
  gridTemplateRows: 'auto auto',
  alignItems: 'center',
  gap: theme.spacing(1),
  columnGap: theme.spacing(3),
  minWidth: 0,

  [theme.breakpoints.down('md')]: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing(1),
    textAlign: 'center',
    width: '100%',
  },
}));

export const InstructorName = styled(Typography)(({ theme }) => ({
  gridColumn: 1,
  gridRow: 1,
  fontWeight: 700,
  fontSize: theme.typography.h4.fontSize,

  [theme.breakpoints.up('md')]: {
    fontSize: theme.typography.h3.fontSize,
  },
}));

export const BioText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  maxWidth: 800,
  fontStyle: 'italic',
}));

export const SocialLinksGroup = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  width: '100%',
}));

export const SocialLinksLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontWeight: 600,
}));

export const SocialLinksRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(1),
  width: '100%',
}));

export const SocialLinkButton = styled('a')(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  minHeight: 40,
  minWidth: 0,
  maxWidth: '100%',
  padding: `${theme.spacing(0.5)} ${theme.spacing(1.5)}`,
  border: '1px solid',
  borderColor: theme.palette.divider,
  borderRadius: 50,
  color: theme.palette.text.secondary,
  backgroundColor: theme.palette.background.paper,
  textDecoration: 'none',

  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:focus-visible': {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: 2,
  },
}));

export const SocialLinkText = styled('span')(({ theme }) => ({
  minWidth: 0,
  maxWidth: 140,
  overflow: 'hidden',
  color: theme.palette.text.primary,
  fontSize: theme.typography.body2.fontSize,
  lineHeight: 1.2,
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}));

export const FollowActions = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: theme.spacing(2),
  rowGap: theme.spacing(1),
  minWidth: 0,
  width: 'auto',

  [theme.breakpoints.up('md')]: {
    gridColumn: 2,
    gridRow: '1 / span 2',
    alignSelf: 'center',
  },

  [theme.breakpoints.down('md')]: {
    width: '100%',
    justifyContent: 'center',
    marginBlock: theme.spacing(1),
  },
}));

export const FollowButtonContent = styled('span')({
  display: 'inline-flex',
  alignItems: 'center',
  minWidth: 0,
});

export const FollowerCount = styled('span')(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: theme.spacing(4),
  minHeight: 24,
  marginInlineStart: theme.spacing(1.5),
  paddingInlineStart: theme.spacing(1.5),
  borderInlineStart: '1px solid currentColor',
  fontWeight: 700,
}));

export const SubjectsRow = styled(Box)(({ theme }) => ({
  gridColumn: 1,
  gridRow: 2,
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(1),
  minWidth: 0,
  maxWidth: '100%',

  [theme.breakpoints.down('md')]: {
    justifyContent: 'center',
  },
}));

export const StatCard = styled(Paper)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  padding: theme.spacing(3),
  height: '100%',
}));

export const StatIcon = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 56,
  height: 56,
  borderRadius: theme.spacing(1.5),
  backgroundColor: theme.palette.grey[50],
  border: `1px solid ${theme.palette.divider}`,
}));

export const StatContent = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
});
