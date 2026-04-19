import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

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
