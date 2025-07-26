import LanguageIcon from '@mui/icons-material/Language';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useTranslation } from 'react-i18next';

import { useLanguageSelection } from '@/hooks';

const LanguageSelector = () => {
  const { t } = useTranslation();
  const { currentLanguage, handleChangeLanguage, languages, getLanguageName } =
    useLanguageSelection();

  const handleUpdateLanguage = (e: SelectChangeEvent) => {
    handleChangeLanguage(e.target.value);
  };

  return (
    <FormControl
      variant="outlined"
      sx={{
        minWidth: '120px',
        width: '100%',
      }}
    >
      <InputLabel id="language-selector-label">{t('language.selector.label')}</InputLabel>
      <Select
        labelId="language-selector-label"
        value={currentLanguage}
        onChange={handleUpdateLanguage}
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
