import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, makeStyles, Switch, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { withContext } from '../context';

const useStyles = makeStyles({
  header: {
    flex: 1,
    textAlign: 'left',
  },
  toolbar: {
    paddingLeft: 0,
  },
});

function Header({ onThemeToggle, darkMode }) {
  const classes = useStyles();
  const [state, setState] = useState({
    checkedA: true,
    checkedB: true,
  });
  const handleChange = (name) => (event) => {
    setState({ ...state, [name]: event.target.checked });
    onThemeToggle();
  };

  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <IconButton>
          <MenuIcon fontSize="large" />
        </IconButton>
        <Typography variant="h4" color="inherit" className={classes.header}>
          Sort Viz
        </Typography>
        <Switch
          checked={state.checkedB}
          onChange={handleChange('checkedB')}
          value="checkedB"
          color="secondary"
        />
        <Typography variant="h6" color="inherit">
          Dark Mode
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default withContext(Header);
