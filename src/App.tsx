import { ApolloProvider } from '@apollo/client';
import createCache from '@emotion/cache';
import { CacheProvider, ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import {
  ThemeProvider as MUIThemeProvider,
  createTheme,
  responsiveFontSizes,
} from '@mui/material/styles';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';

import { useLanguageSelection } from '@/hooks';
import { client } from '@/ui/layout/apolloClient';
import Main from '@/ui/layout/Main';
import muiCustomTheme from '@/ui/theme/muiTheme';
import { createAppTheme } from '@/ui/theme/theme';
import { ThemeContextProvider, useThemeContext } from '@/ui/theme/ThemeContext';

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

const cacheLtr = createCache({
  key: 'mui',
  stylisPlugins: [prefixer],
});

const AppContent = () => {
  const { languageDirection } = useLanguageSelection();
  const { themeMode } = useThemeContext();

  const emotionTheme = createAppTheme(themeMode);
  const muiTheme = responsiveFontSizes(createTheme(muiCustomTheme(themeMode, languageDirection)));

  return (
    <CacheProvider value={languageDirection === 'rtl' ? cacheRtl : cacheLtr}>
      <MUIThemeProvider theme={muiTheme}>
        <ThemeProvider theme={emotionTheme}>
          <ApolloProvider client={client}>
            <CssBaseline />
            <Main />
          </ApolloProvider>
        </ThemeProvider>
      </MUIThemeProvider>
    </CacheProvider>
  );
};

const App = () => {
  return (
    <ThemeContextProvider>
      <AppContent />
    </ThemeContextProvider>
  );
};

export default App;
