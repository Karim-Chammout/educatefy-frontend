import type { MockLink } from '@apollo/client/testing';
import { MockedProvider } from '@apollo/client/testing/react';
import createCache from '@emotion/cache';
import { CacheProvider, ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';
import { render, RenderOptions } from '@testing-library/react';
import i18n from 'i18next';
import type { ReactElement } from 'react';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import type { InitialEntry } from 'react-router';
import { MemoryRouter } from 'react-router';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';

import { AuthContext } from '@/ui/context/AuthContext';
import muiCustomTheme from '@/ui/theme/muiTheme';
import { createAppTheme } from '@/ui/theme/theme';
import { ThemeContextProvider } from '@/ui/theme/ThemeContext';

import en from '../../public/locales/en/translation.json';
import ar from '../../public/locales/ar/translation.json';

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: { translation: en },
    ar: { translation: ar },
  },
  interpolation: {
    escapeValue: false,
  },
  supportedLngs: ['en', 'ar'],
});

export type TestAuthUser = {
  userId: number;
  role: string;
};

export type TestProvidersOptions = {
  /** Initial entry for MemoryRouter — a URL, or `{ pathname, state }` when the
   *  page reads `location.state`. */
  route?: InitialEntry;
  apolloMocks?: ReadonlyArray<MockLink.MockedResponse>;
  authUser?: TestAuthUser | null;
  language?: 'en' | 'ar';
};

/**
 * Single render entry point for all component/integration tests.
 */
export function renderWithProviders(
  ui: ReactElement,
  options: TestProvidersOptions & Omit<RenderOptions, 'wrapper'> = {},
) {
  const {
    route = '/',
    apolloMocks = [],
    authUser = null,
    language = 'en',
    ...renderOptions
  } = options;
  const isRtl = language === 'ar';

  i18n.changeLanguage(language);
  document.documentElement.setAttribute('dir', isRtl ? 'rtl' : 'ltr');

  const cache = createCache({
    key: isRtl ? 'test-rtl' : 'test',
    stylisPlugins: isRtl ? [prefixer, rtlPlugin] : [prefixer],
  });

  const theme = responsiveFontSizes(createTheme(muiCustomTheme('light', isRtl ? 'rtl' : 'ltr')));
  const emotionTheme = createAppTheme('light');

  return render(
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <EmotionThemeProvider theme={emotionTheme}>
          <ThemeContextProvider>
            <I18nextProvider i18n={i18n}>
              <AuthContext.Provider
                value={{
                  authModal: {
                    isAuthModalVisible: false,
                    setModalVisibility: () => undefined,
                    setAuthModalVisibility: () => undefined,
                    authModalType: undefined,
                  },
                  user: authUser,
                  loading: false,
                  refresh: () => Promise.resolve(),
                }}
              >
                <MockedProvider mocks={apolloMocks}>
                  <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
                </MockedProvider>
              </AuthContext.Provider>
            </I18nextProvider>
          </ThemeContextProvider>
        </EmotionThemeProvider>
      </ThemeProvider>
    </CacheProvider>,
    renderOptions,
  );
}

export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
