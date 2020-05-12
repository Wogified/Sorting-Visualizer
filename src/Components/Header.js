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
  ListItemText,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  header: {
    flex: 1,
    textAlign: 'left',
  },
  toolbar: {
    paddingLeft: 0,
  },
  listItemContainer: {
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      width: '25vw',
    },
    [theme.breakpoints.down('xs')]: {
      width: '50vw',
    },
  },
  listItem: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  Drawer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  author: {
    display: 'flex',
  },
}));

function Header({ onThemeToggle, onAlgoSelect, Algorithms }) {
  const classes = useStyles();
  const [state, setState] = useState({
    checkedA: true,
    checkedB: true,
  });
  const [drawerState, setDrawerState] = useState(false);
  // handling drawer menu toggle
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerState(open);
  };
  // handling dark theme toggle
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
        <Drawer
          anchor="left"
          open={drawerState}
          onClose={toggleDrawer(false)}
          className={classes.Drawer}
        >
          <List>
            {Algorithms.map((item) => (
              <ListItem
                button
                className={classes.listItemContainer}
                key={item.key}
                onClick={() => onAlgoSelect(item)}
              >
                <ListItemText className={classes.listItem}>
                  <Typography variant="h4">{item.title}</Typography>
                </ListItemText>
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
  onAlgoSelect: PropTypes.func.isRequired,
  Algorithms: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Header.defaultProps = {};
export default Header;
