import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles';

import { client } from '@/ui/layout/apolloClient';
import muiCustomTheme from '@/ui/theme/muiTheme';
import theme from '@/ui/theme/theme';

const App = () => {
  const muiTheme = createTheme(muiCustomTheme);

  return (
    <MUIThemeProvider theme={muiTheme}>
      <ThemeProvider theme={theme}>
        <ApolloProvider client={client}>
          <CssBaseline />
          <h1>Hello World!</h1>
        </ApolloProvider>
      </ThemeProvider>
    </MUIThemeProvider>
  );
};

export default App;
