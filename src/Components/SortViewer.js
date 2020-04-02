import React, { Fragment, useState } from 'react';
import {
  Typography,
  Grid,
  Button,
  makeStyles,
  Slider,
  useMediaQuery,
  useTheme,
  Select,
  MenuItem,
} from '@material-ui/core';
import SortGraphics from './SortGraphics';

const useStyles = makeStyles(({ breakpoints }) => ({
  Paper: {
    [breakpoints.up('sm')]: {
      padding: '2em',
      marginTop: '1em',
      marginBottom: '1em',
      marginRight: '.5em',
      height: 'calc(100% - 2em)',
    },
    [breakpoints.down('xs')]: {
      padding: '1em',
      margin: '0.5em',
      height: 'calc(100% - 1em)',
      overflowY: 'auto',
    },
    overflowY: 'auto',
  },
  title: {
    width: '100vw',
    textAlign: 'center',
    padding: '.5em',
  },
  description: {
    textAlign: 'center',
    padding: '1em',
  },
  itemContainer: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 5,
  },
  sortGraphicsContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: 5,
    paddingBottom: 10,
  },
  slider: {
    [breakpoints.up('sm')]: {
      width: '100%',
    },
    [breakpoints.down('xs')]: {
      width: '80%',
    },
  },
}));

const marks = [
  {
    value: 5,
    label: '5',
  },
  {
    value: 20,
    label: '20',
  },
  {
    value: 50,
    label: '50',
  },
];

function SortViewer() {
  const classes = useStyles();
  const [sliderState, setSlider] = useState(5);
  const [speed, setSpeed] = useState(300);
  const [scramble, setScramble] = useState(false);
  const theme = useTheme();
  // checks for screens that are mobile sized and below
  const mobile = useMediaQuery(theme.breakpoints.down('xs'));

  const handleSpeedChange = (event) => {
    console.log(event);
    setSpeed(event.target.value);
  };

  const handleElemsChange = (event, newValue) => {
    setSlider(newValue);
  };

  return (
    <Fragment>
      <Typography className={classes.title} variant="h1">
        Sort Algorithm
      </Typography>
      <Typography className={classes.description} variant="body1">
        This is where I would put a brief description of how the sorting algorithm works
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={4} className={classes.itemContainer}>
          <Button onClick={() => setScramble(!scramble)}>Scramble</Button>
        </Grid>
        <Grid item xs={12} sm={4} className={classes.itemContainer}>
          <Slider
            className={classes.slider}
            value={sliderState}
            aria-labelledby="discrete-slider-custom"
            step={1}
            valueLabelDisplay="auto"
            marks={mobile ? marks.slice(0, 2) : marks}
            min={marks[0].value}
            max={mobile ? 20 : 50}
            onChange={handleElemsChange}
          />
        </Grid>
        <Grid item xs={12} sm={4} className={classes.itemContainer}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={speed}
            onChange={handleSpeedChange}
          >
            <MenuItem value={1000}>Slow</MenuItem>
            <MenuItem value={600}>Slowish</MenuItem>
            <MenuItem value={300}>Medium</MenuItem>
            <MenuItem value={150}>Fastish</MenuItem>
            <MenuItem value={50}>Fast</MenuItem>
          </Select>
        </Grid>

        <Grid item xs={12} sm={12} className={classes.sortGraphicsContainer}>
          <SortGraphics numElems={sliderState} scramble={scramble} speed={speed} />
        </Grid>
      </Grid>
    </Fragment>
  );
}

export default SortViewer;
