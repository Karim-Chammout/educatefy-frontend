import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import { Typography } from '@/ui/components';

type KpiCardProps = {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  accentColor: string;
  subtitle?: string;
};

const KpiCard = ({ icon, label, value, accentColor, subtitle }: KpiCardProps) => (
  <Card
    variant="outlined"
    sx={{
      height: '100%',
      borderLeft: '3px solid',
      borderLeftColor: accentColor,
    }}
  >
    <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Box
        sx={{
          color: accentColor,
          display: 'flex',
          alignItems: 'center',
          flexShrink: 0,
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700, lineHeight: 1 }}>
          {value}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {label}
        </Typography>
        {subtitle && (
          <Typography variant="caption" color="text.disabled" sx={{ display: 'block' }}>
            {subtitle}
          </Typography>
        )}
      </Box>
    </CardContent>
  </Card>
);

export default KpiCard;
