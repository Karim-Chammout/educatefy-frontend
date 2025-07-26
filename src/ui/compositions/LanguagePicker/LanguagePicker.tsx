import LanguageIcon from '@mui/icons-material/Language';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';

import { Typography } from '@/ui/components';

import { useLanguageSelection } from '@/hooks';

const LanguagePicker = () => {
  const { currentLanguage, languages, getLanguageName, handleChangeLanguage } =
    useLanguageSelection();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenLanguageMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseLanguageMenu = () => {
    setAnchorEl(null);
  };

  const handleLanguageSelect = (lang: string) => {
    handleChangeLanguage(lang);
    handleCloseLanguageMenu();
  };

  return (
    <>
      <IconButton onClick={handleOpenLanguageMenu} color="inherit" size="large">
        <LanguageIcon />
        <Typography variant="body2" sx={{ ml: 0.5 }}>
          {currentLanguage.toUpperCase()}
        </Typography>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleCloseLanguageMenu}
      >
        {Object.values(languages).map((language) => (
          <MenuItem
            key={language}
            selected={language === currentLanguage}
            onClick={() => handleLanguageSelect(language)}
          >
            {getLanguageName(language)}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default LanguagePicker;
