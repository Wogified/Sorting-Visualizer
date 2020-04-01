import React, { Fragment, useState } from 'react';
import { CssBaseline, ThemeProvider, createMuiTheme, responsiveFontSizes } from '@material-ui/core';
import { deepOrange, cyan } from '@material-ui/core/colors';

import { Header, SortViewer } from './Components';

function App() {
  const [darkMode, setDarkMode] = useState('dark');
  const initTheme = {
    palette: {
      primary: deepOrange,
      secondary: {
        main: cyan.A400,
        light: cyan[200],
        dark: cyan[800],
      },
      type: darkMode,
    },
  };
  const theme = responsiveFontSizes(createMuiTheme(initTheme));

  const handleThemeToggle = () => {
    // console.log(theme.palette.type);
    setDarkMode(darkMode === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <CssBaseline />
        <Header onThemeToggle={handleThemeToggle} darkMode={theme.palette.type} />
        <SortViewer />
      </Fragment>
    </ThemeProvider>
  );
}

export default App;
