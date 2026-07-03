import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Tooltip from '@mui/material/Tooltip';

import { Typography } from '@/ui/components';

const DemographicBar = ({
  title,
  data,
  subtitle,
}: {
  title: string;
  data: { label: string; count: number }[];
  subtitle?: string;
}) => {
  const max = Math.max(...data.map((d) => d.count), 1);

  return (
    <Box>
      <Typography variant="subtitle2" sx={{ mb: 0.5, fontWeight: 600 }}>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
          {subtitle}
        </Typography>
      )}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {data.slice(0, 8).map((item) => (
          <Box key={item.label}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.25 }}>
              <Typography variant="caption">{item.label}</Typography>
              <Typography variant="caption" sx={{ fontWeight: 600 }}>
                {item.count}
              </Typography>
            </Box>
            <Tooltip title={`${item.count} students`} placement="right">
              <LinearProgress
                variant="determinate"
                value={(item.count / max) * 100}
                sx={{ height: 6, borderRadius: 3 }}
              />
            </Tooltip>
          </Box>
        ))}
        {data.length === 0 && (
          <Typography variant="caption" color="text.disabled">
            No data available
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default DemographicBar;
