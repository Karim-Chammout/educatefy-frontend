import LanguageIcon from '@mui/icons-material/Language';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { SelectChangeEvent } from '@mui/material/Select/Select';
import { useTranslation } from 'react-i18next';

import { useUpdateProfileMutation } from '@/generated/graphql';
import { useLanguageSelection } from '@/hooks';
import { isLoggedIn } from '@/ui/layout/apolloClient';

const LanguageSelector = () => {
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage, languages } = useLanguageSelection();
  const [updateSelectedLanguage] = useUpdateProfileMutation();

  const handleChangeLanguage = async (e: SelectChangeEvent) => {
    changeLanguage(e.target.value);

    if (isLoggedIn()) {
      await updateSelectedLanguage({
        variables: {
          profileDetails: {
            selectedLanguage: e.target.value,
          },
        },
      });
    }
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
