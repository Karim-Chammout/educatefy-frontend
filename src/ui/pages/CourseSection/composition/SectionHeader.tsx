import Menu from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';

import { Typography } from '@/ui/components';

import { MobileMenuButton } from '../Section.style';

const SectionHeader = ({
  componentDenomination,
  onMenuToggle,
}: {
  componentDenomination: string;
  onMenuToggle: () => void;
}) => (
  <MobileMenuButton onClick={onMenuToggle}>
    <IconButton edge="start" color="inherit" aria-label="menu">
      <Menu />
    </IconButton>
    <Typography variant="h6" sx={{ ml: 1 }}>
      {componentDenomination}
    </Typography>
  </MobileMenuButton>
);

export default SectionHeader;
