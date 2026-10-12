import Brightness4 from '@mui/icons-material/Brightness4';
import Brightness7 from '@mui/icons-material/Brightness7';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import person from '@/assets/person.png';
import { AccountInfoQuery, AccountRole } from '@/generated/graphql';
import { Typography } from '@/ui/components';
import { useThemeContext } from '@/ui/theme/ThemeContext';
import { logout } from '@/utils/logout';

type UserMenuProps = {
  accountInfo: AccountInfoQuery['me'];
  anchorEl: HTMLElement | null;
  onClose: () => void;
  anchorOrigin?: { vertical: 'top' | 'bottom'; horizontal: 'left' | 'right' | 'center' };
  transformOrigin?: { vertical: 'top' | 'bottom'; horizontal: 'left' | 'right' | 'center' };
};

const UserMenu = ({
  accountInfo,
  anchorEl,
  onClose,
  anchorOrigin = { horizontal: 'right', vertical: 'bottom' },
  transformOrigin = { horizontal: 'right', vertical: 'top' },
}: UserMenuProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { themeMode, toggleTheme } = useThemeContext();
  const isTeacher = accountInfo.accountRole === AccountRole.Teacher;

  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
      anchorOrigin={anchorOrigin}
      transformOrigin={transformOrigin}
      disableScrollLock
      slotProps={{
        paper: {
          elevation: 2,
          sx: { mt: 1.5, minWidth: 264, maxWidth: 300 },
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 2, py: 1.75 }}>
        <Avatar
          alt={accountInfo.nickname || t('navigation.avatarAlt')}
          src={accountInfo.avatar_url || person}
          sx={{ width: 44, height: 44 }}
        />
        <Box sx={{ minWidth: 0 }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              lineHeight: 1.25,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {accountInfo.nickname || t('navigation.avatarAlt')}
          </Typography>
          <Chip
            size="small"
            color={isTeacher ? 'primary' : 'default'}
            label={t(isTeacher ? 'register.teacher' : 'register.student')}
            sx={{ mt: 0.5 }}
          />
        </Box>
      </Box>
      <Divider />
      <MenuItem
        onClick={() => {
          navigate('/profile');
          onClose();
        }}
      >
        <ListItemIcon>
          <PersonIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary={t('navigation.profile')} />
      </MenuItem>
      <MenuItem
        onClick={() => {
          toggleTheme();
          onClose();
        }}
      >
        <ListItemIcon>
          {themeMode === 'light' ? (
            <Brightness4 fontSize="small" />
          ) : (
            <Brightness7 fontSize="small" />
          )}
        </ListItemIcon>
        <ListItemText primary={t(`theme.${themeMode === 'light' ? 'dark' : 'light'}`)} />
      </MenuItem>
      <Divider />
      <MenuItem
        sx={{ color: 'error.main' }}
        onClick={() => {
          logout();
          onClose();
        }}
      >
        <ListItemIcon sx={{ color: 'error.main' }}>
          <LogoutIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary={t('navigation.logout')} />
      </MenuItem>
    </Menu>
  );
};

export default UserMenu;
