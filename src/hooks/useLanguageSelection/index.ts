import { useLazyQuery, useMutation } from '@apollo/client/react';
import { useCallback, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { MeDocument, UpdateProfileDocument } from '@/generated/graphql';
import { AuthContext } from '@/ui/context';

import { LANGUAGES } from '../../i18n';

type LangDirectionType = 'rtl' | 'ltr';
const rtlLanguages = ['ar'];

const useLanguageSelection = () => {
  const { i18n } = useTranslation();
  const { user } = useContext(AuthContext);
  const [updateSelectedLanguage] = useMutation(UpdateProfileDocument);
  const [, { refetch }] = useLazyQuery(MeDocument);

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

  const getLanguageName = (lang: string): string => {
    switch (lang) {
      case 'ar':
        return 'AR - العربية';
      default:
        return 'EN - English';
    }
  };

  const handleChangeLanguage = async (lang: string) => {
    changeLanguage(lang);

    if (user) {
      await updateSelectedLanguage({
        variables: {
          profileDetails: {
            selectedLanguage: lang,
          },
        },
      });
      await refetch();
    }
  };

  return {
    currentLanguage: i18n.language,
    changeLanguage,
    languages: LANGUAGES,
    languageDirection,
    getLanguageName,
    handleChangeLanguage,
  };
};

export default useLanguageSelection;
