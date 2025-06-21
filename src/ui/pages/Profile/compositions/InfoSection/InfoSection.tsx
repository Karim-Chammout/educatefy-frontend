import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import { Typography } from '@/ui/components';

const InfoSection = ({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) => {
  const theme = useTheme();

  return (
    <Paper
      variant="outlined"
      sx={{
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
          <Box>{icon}</Box>
          <Typography variant="h6" color="text.primary" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
        </Box>
        {children}
      </Box>
    </Paper>
  );
};

export default InfoSection;
