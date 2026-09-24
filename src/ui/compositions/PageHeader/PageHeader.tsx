import Box from '@mui/material/Box';

import { Typography } from '@/ui/components';

const PageHeader = ({ title, subtitle }: { title: string; subtitle: string }) => {
  return (
    <Box
      sx={{
        textAlign: 'center',
        marginBottom: 6,
        paddingBottom: 3,
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold' }} gutterBottom>
        {title}
      </Typography>
      <Typography variant="h6" color="text.secondary">
        {subtitle}
      </Typography>
    </Box>
  );
};

export default PageHeader;
