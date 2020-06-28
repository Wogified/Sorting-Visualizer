import React, { Fragment, useState } from 'react';
import {
  CssBaseline,
  ThemeProvider,
  createMuiTheme,
  responsiveFontSizes,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { deepOrange, cyan } from '@material-ui/core/colors';
import { algos as Algorithms } from './data.json';
import { Header, SortViewer } from './Components';

const useStyles = makeStyles((theme) => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  },
  author: {
    textAlign: 'center',
    paddingBottom: '1em',
  },
  '@global': {
    'html, body, #root': {
      height: '100%',
    },
  },
}));

function App() {
  const classes = useStyles();
  // Dark mode toggle
  const [darkMode, setDarkMode] = useState('dark');
  // Variable for which sort algo to use
  const [algo, setAlgo] = useState(null);

  // basic theme colors
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
  // Scales the font sizes based on window size
  const theme = responsiveFontSizes(createMuiTheme(initTheme));

  // Callback for handling dark/light mode
  const handleThemeToggle = () => {
    setDarkMode(darkMode === 'light' ? 'dark' : 'light');
  };

  // Callback for handling algorithm selection
  const handleAlgorithmSelect = (algo) => {
    setAlgo(algo);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.main}>
        {/* sets some default styling and paddings */}
        <CssBaseline />
        <Header
          Algorithms={Algorithms}
          onThemeToggle={handleThemeToggle}
          darkMode={theme.palette.type}
          onAlgoSelect={handleAlgorithmSelect}
        />
        <SortViewer algo={algo} Algorithms={Algorithms} />
        <Typography variant="h6" className={classes.author}>
          Created by Kevin Chang
        </Typography>
      </div>
    </ThemeProvider>
  );
}

export default App;
