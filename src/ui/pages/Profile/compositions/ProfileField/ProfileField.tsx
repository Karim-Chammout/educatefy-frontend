import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import { Typography } from '@/ui/components';

const ProfileField = ({ label, value }: { label: string; value?: string | null }) => (
  <Grid size={{ xxs: 12, sm: 6 }}>
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }} gutterBottom>
        {label}
      </Typography>
      {value && (
        <Typography variant="body1" color="text.primary">
          {value}
        </Typography>
      )}
    </Box>
  </Grid>
);

export default ProfileField;
