import LanguageIcon from '@mui/icons-material/Language';
import {
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

import { useLanguageSelection } from '@/hooks';

const LanguageSelector = () => {
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage, languages } = useLanguageSelection();

  const handleChangeLanguage = (e: SelectChangeEvent) => {
    changeLanguage(e.target.value);
  };

  const getLanguageName = (lang: string): string => {
    switch (lang) {
      case 'ar':
        return 'AR - العربية';
      default:
        return 'EN - English';
    }
  };

  return (
    <FormControl
      variant="outlined"
      sx={{
        m: 2,
        minWidth: '120px',
      }}
    >
      <InputLabel id="language-selector-label">{t('language.selector.label')}</InputLabel>
      <Select
        labelId="language-selector-label"
        value={currentLanguage}
        onChange={handleChangeLanguage}
        label={t('language.selector.label')}
        startAdornment={
          <InputAdornment position="start">
            <LanguageIcon />
          </InputAdornment>
        }
      >
        {Object.values(languages).map((language) => (
          <MenuItem key={language} value={language}>
            {getLanguageName(language)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default LanguageSelector;
