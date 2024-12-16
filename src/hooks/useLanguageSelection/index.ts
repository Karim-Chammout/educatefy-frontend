import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { LANGUAGES } from '../../i18n';

type LangDirectionType = 'rtl' | 'ltr';
const rtlLanguages = ['ar'];

const useLanguageSelection = () => {
  const { i18n } = useTranslation();
  const languageDirection: LangDirectionType = rtlLanguages.includes(i18n.language) ? 'rtl' : 'ltr';

  const updateDocumentLanguage = useCallback(
    (languageCode: string) => {
      document.documentElement.dir = languageDirection;
      document.documentElement.lang = languageCode;
    },
    [i18n.language],
  );

  const changeLanguage = useCallback(
    (languageCode: string) => {
      i18n.changeLanguage(languageCode);

      updateDocumentLanguage(languageCode);

      localStorage.setItem('i18nextLng', languageCode);
    },
    [i18n, updateDocumentLanguage],
  );

  useEffect(() => {
    const storedLanguage = localStorage.getItem('i18nextLng') || 'en';

    i18n.changeLanguage(storedLanguage);

    updateDocumentLanguage(storedLanguage);
  }, [i18n, updateDocumentLanguage]);

  return {
    currentLanguage: i18n.language,
    changeLanguage,
    languages: LANGUAGES,
    languageDirection,
  };
};

export default useLanguageSelection;
