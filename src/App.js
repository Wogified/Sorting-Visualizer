import React, { Fragment, useState } from 'react';
import { CssBaseline, ThemeProvider, createMuiTheme, responsiveFontSizes } from '@material-ui/core';
import { deepOrange, cyan } from '@material-ui/core/colors';
import { algos as Algorithms } from './data.json';
import { Header, SortViewer } from './Components';

function App() {
  const [darkMode, setDarkMode] = useState('dark');
  const [algo, setAlgo] = useState(null);

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

  const handleAlgorithmSelect = (algo) => {
    setAlgo(algo);
  };

  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <CssBaseline />
        <Header
          Algorithms={Algorithms}
          onThemeToggle={handleThemeToggle}
          darkMode={theme.palette.type}
          onAlgoSelect={handleAlgorithmSelect}
        />

        <SortViewer algo={algo} Algorithms={Algorithms} />
      </Fragment>
    </ThemeProvider>
  );
}

export default App;
