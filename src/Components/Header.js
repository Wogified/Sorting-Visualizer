import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Switch,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import MailIcon from '@material-ui/icons/Mail';
import { withContext } from '../context';
import { sortAlgos } from '../Algos';

const useStyles = makeStyles({
  header: {
    flex: 1,
    textAlign: 'left',
  },
  toolbar: {
    paddingLeft: 0,
  },
});

function Header({ onThemeToggle, onAlgoSelect }) {
  const classes = useStyles();
  const [state, setState] = useState({
    checkedA: true,
    checkedB: true,
  });
  const [drawerState, setDrawerState] = useState(false);

  const sortAlgos = ['Bubble', 'Insertion', 'Merge', 'Quick'];
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerState(open);
  };
  const handleChange = (name) => (event) => {
    setState({ ...state, [name]: event.target.checked });
    onThemeToggle();
  };

  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <IconButton onClick={toggleDrawer(true)}>
          <MenuIcon fontSize="large" />
        </IconButton>
        {/* there is a warning that will pop up when using drawing about findDOMnode */}
        <Drawer anchor="left" open={drawerState} onClose={toggleDrawer(false)}>
          <List>
            {sortAlgos.map((text, index) => (
              <ListItem button key={text} onClick={() => onAlgoSelect(text)}>
                {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
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

Header.propTypes = {
  onThemeToggle: PropTypes.func.isRequired,
  darkMode: PropTypes.string.isRequired,
};

Header.defaultProps = {};
export default withContext(Header);
