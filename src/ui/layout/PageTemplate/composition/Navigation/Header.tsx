import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router';

import logoDark from '@/assets/logo_dark.png';
import logoLight from '@/assets/logo_light.png';
import { LanguagePicker, NotificationBell } from '@/ui/compositions';
import { useThemeContext } from '@/ui/theme/ThemeContext';

const Header = () => {
  const { themeMode } = useThemeContext();
  const navigate = useNavigate();

  return (
    <header>
      <Container sx={{ display: 'flex', justifyContent: 'space-between', my: 2 }}>
        <img
          src={themeMode === 'light' ? logoDark : logoLight}
          width={60}
          alt="Logo"
          role="presentation"
          onClick={() => navigate('/')}
          style={{ cursor: 'pointer' }}
        />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <NotificationBell />
          <LanguagePicker />
        </Box>
      </Container>
    </header>
  );
};

export default Header;
