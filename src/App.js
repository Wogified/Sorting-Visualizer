import React, { Fragment, useState, useEffect } from 'react';
import { CssBaseline, ThemeProvider, createMuiTheme, responsiveFontSizes } from '@material-ui/core';
import { deepOrange, cyan } from '@material-ui/core/colors';

import { Header, SortViewer } from './Components';

function App() {
  const [darkMode, setDarkMode] = useState('dark');
  const [algo, setAlgo] = useState('Bubble');
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
    setDarkMode(darkMode === 'light' ? 'dark' : 'light');
  };

  const handleAlgorithmSelect = (id) => {
    setAlgo(id);
  };

  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <CssBaseline />
        <Header
          onThemeToggle={handleThemeToggle}
          darkMode={theme.palette.type}
          onAlgoSelect={handleAlgorithmSelect}
        />
        <SortViewer algo={algo} />
      </Fragment>
    </ThemeProvider>
  );
}

export default App;
