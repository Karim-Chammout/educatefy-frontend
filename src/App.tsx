import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles';

import muiCustomTheme from '@/ui/theme/muiTheme';
import theme from '@/ui/theme/theme';

const App = () => {
  const muiTheme = createTheme(muiCustomTheme);

  return (
    <MUIThemeProvider theme={muiTheme}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <h1>Hello World!</h1>
      </ThemeProvider>
    </MUIThemeProvider>
  );
};

export default App;
