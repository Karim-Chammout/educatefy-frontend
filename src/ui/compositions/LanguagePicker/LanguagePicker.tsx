import CheckIcon from '@mui/icons-material/Check';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LanguageIcon from '@mui/icons-material/Language';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Typography } from '@/ui/components';
import { useLanguageSelection } from '@/hooks';

const LanguagePicker = () => {
  const { t } = useTranslation();
  const { currentLanguage, languages, getLanguageName, handleChangeLanguage } =
    useLanguageSelection();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpenLanguageMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseLanguageMenu = () => {
    setAnchorEl(null);
  };

  const handleLanguageSelect = (lang: string) => {
    handleCloseLanguageMenu();
    handleChangeLanguage(lang).catch(() => {});
  };

  return (
    <>
      <Button
        variant="outlined"
        size="small"
        color="inherit"
        startIcon={<LanguageIcon fontSize="small" />}
        endIcon={
          <ExpandMoreIcon
            fontSize="small"
            sx={{
              transition: 'transform 0.2s',
              transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          />
        }
        onClick={handleOpenLanguageMenu}
        aria-label={t('language.selector.label')}
        aria-expanded={open}
      >
        {currentLanguage.toUpperCase()}
      </Button>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        keepMounted
        open={open}
        onClose={handleCloseLanguageMenu}
        disableScrollLock
        slotProps={{
          paper: {
            elevation: 2,
            sx: { mt: 1.5, minWidth: 240 },
          },
        }}
      >
        <Box sx={{ px: 2, pt: 1.5, pb: 1 }}>
          <Typography variant="overline" color="text.secondary">
            {t('language.selector.label')}
          </Typography>
        </Box>
        <Divider />
        {Object.values(languages).map((language) => {
          const isActive = language === currentLanguage;

          return (
            <MenuItem
              key={language}
              selected={isActive}
              onClick={() => handleLanguageSelect(language)}
            >
              <ListItemIcon sx={{ minWidth: 28 }}>
                {isActive ? (
                  <CheckIcon fontSize="small" color="primary" />
                ) : (
                  <Box sx={{ width: 20 }} />
                )}
              </ListItemIcon>
              <ListItemText
                primary={getLanguageName(language)}
                slotProps={{
                  primary: { sx: { fontWeight: isActive ? 600 : 400 } },
                }}
              />
              <Typography variant="caption" color="text.secondary">
                {language.toUpperCase()}
              </Typography>
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};

export default LanguagePicker;
