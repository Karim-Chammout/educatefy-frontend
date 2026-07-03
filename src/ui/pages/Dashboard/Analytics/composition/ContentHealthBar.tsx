import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import LinearProgress from '@mui/material/LinearProgress';
import Tooltip from '@mui/material/Tooltip';

import { Typography } from '@/ui/components';

const ContentHealthBar = ({
  label,
  published,
  draft,
}: {
  label: string;
  published: number;
  draft: number;
}) => {
  const total = published + draft;
  const publishedPct = total > 0 ? (published / total) * 100 : 0;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          {label}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Chip
            label={`${published} published`}
            size="small"
            color="success"
            variant="outlined"
            sx={{ height: 20, fontSize: 11 }}
          />
          <Chip
            label={`${draft} draft`}
            size="small"
            variant="outlined"
            sx={{ height: 20, fontSize: 11 }}
          />
        </Box>
      </Box>
      <Tooltip title={`${publishedPct.toFixed(0)}% published`} placement="top">
        <LinearProgress
          variant="determinate"
          value={publishedPct}
          color="success"
          sx={{ height: 8, borderRadius: 4 }}
        />
      </Tooltip>
    </Box>
  );
};

export default ContentHealthBar;
