import { styled } from '@mui/material/styles';

export const SubjectHeader = styled('div')(({ theme }) => ({
  marginBottom: theme.spacing(6),
  paddingBottom: theme.spacing(4),
  borderBottom: `1px solid ${theme.palette.divider}`,
  textAlign: 'center',
}));

export const StatsContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  gap: theme.spacing(6),
  flexWrap: 'wrap',
}));
