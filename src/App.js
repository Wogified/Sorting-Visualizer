import React, { Fragment, useState } from 'react';
import { CssBaseline, ThemeProvider, createMuiTheme, responsiveFontSizes } from '@material-ui/core';
import { red, amber } from '@material-ui/core/colors';

import { Header } from './Components';

function App() {
  const [darkMode, setDarkMode] = useState('dark');
  const initTheme = {
    palette: {
      primary: red,
      secondary: {
        main: amber.A400,
        light: amber[200],
        dark: amber[800],
      },
      type: darkMode,
    },
  };
  const theme = responsiveFontSizes(createMuiTheme(initTheme));

  const handleThemeToggle = () => {
    console.log(theme.palette.type);
    setDarkMode(darkMode === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <CssBaseline />
        <Header onThemeToggle={handleThemeToggle} darkMode={theme.palette.type} />
      </Fragment>
    </ThemeProvider>
  );
}

export default App;
