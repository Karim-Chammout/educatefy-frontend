import { ApolloProvider } from '@apollo/client';
import createCache from '@emotion/cache';
import { CacheProvider, ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';

import { useLanguageSelection } from '@/hooks';
import { client } from '@/ui/layout/apolloClient';
import Main from '@/ui/layout/Main';
import muiCustomTheme from '@/ui/theme/muiTheme';
import theme from '@/ui/theme/theme';

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

const cacheLtr = createCache({
  key: 'mui',
  stylisPlugins: [prefixer],
});

const App = () => {
  const { languageDirection } = useLanguageSelection();
  const muiTheme = createTheme(muiCustomTheme(languageDirection));

  return (
    <CacheProvider value={languageDirection === 'rtl' ? cacheRtl : cacheLtr}>
      <MUIThemeProvider theme={muiTheme}>
        <ThemeProvider theme={theme}>
          <ApolloProvider client={client}>
            <CssBaseline />
            <Main />
          </ApolloProvider>
        </ThemeProvider>
      </MUIThemeProvider>
    </CacheProvider>
  );
};

export default App;
