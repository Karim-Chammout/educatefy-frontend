import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import { Typography } from '@/ui/components';

const ProfileField = ({ label, value }: { label: string; value?: string | null }) => (
  <Grid size={{ xxs: 12, sm: 6 }}>
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }} gutterBottom>
        {label}
      </Typography>
      <Typography variant="body1" color={value ? 'text.primary' : 'text.disabled'}>
        {value || '—'}
      </Typography>
    </Box>
  </Grid>
);

export default ProfileField;
