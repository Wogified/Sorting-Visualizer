import React, { Fragment, useState, useEffect } from 'react';
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
import SortStepper from './SortStepper';

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
    value: 35,
    label: '35',
  },
];

function SortViewer({ algo }) {
  const classes = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('xs'));
  const [sliderState, setSlider] = useState(10);
  const [speed, setSpeed] = useState(2);
  const [stop, setStop] = useState(false);
  const [play, setPlay] = useState(false);
  const [sortState, setSortState] = useState(0);
  const [scramble, setScramble] = useState(false);
  const [currStep, setCurrStep] = useState(0);
  const [desiredStep, setDesiredStep] = useState(0);
  const [stepLimit, setStepLimit] = useState(0);

  // checks for screens that are mobile sized and below
  const handleSpeedChange = (event) => {
    setSpeed(event.target.value);
  };

  const handleElemsChange = (event, newValue) => {
    setSlider(newValue);
  };

  const handleScramble = () => {
    setScramble(!scramble);
    setStop(false);
  };

  const handleStopSort = () => {
    setStop(false);
    setPlay(false);
    setSortState(0);
    setCurrStep(0);
    setDesiredStep(0);
    setStepLimit(0);
  };

  return (
    <Fragment>
      <Typography className={classes.title} variant="h1">
        {algo}
        {' Sort'}
      </Typography>
      <Typography className={classes.description} variant="body1">
        This is where I would put a brief description of how the sorting algorithm works
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={4} className={classes.itemContainer}>
          <Button onClick={handleScramble} disabled={sortState > 0}>
            Scramble
          </Button>
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
            max={mobile ? 20 : 35}
            onChange={handleElemsChange}
            disabled={sortState > 0}
          />
        </Grid>
        <Grid item xs={12} sm={4} className={classes.itemContainer}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={speed}
            onChange={handleSpeedChange}
            disabled={sortState > 0}
          >
            <MenuItem value={0}>Slow</MenuItem>
            <MenuItem value={1}>Slowish</MenuItem>
            <MenuItem value={2}>Medium</MenuItem>
            <MenuItem value={3}>Fastish</MenuItem>
            <MenuItem value={4}>Fast</MenuItem>
          </Select>
        </Grid>
        {/* <Grid item xs={12} sm={12} className={classes.itemContainer}>
          <Button onClick={() => handleSortState(!sort)}>
            {sort ? 'Stop Sort' : 'Start Sort'}
          </Button>
        </Grid> */}
        <Grid item xs={12} sm={12} className={classes.itemContainer}>
          <SortStepper
            sortState={sortState}
            onSetSortState={setSortState}
            onStop={handleStopSort}
            onSetDesiredStep={setDesiredStep}
            stepLim={stepLimit}
            currStep={currStep}
          />
        </Grid>
        <Grid item xs={12} sm={12} className={classes.itemContainer}>
          <Typography>Step: {currStep}</Typography>
        </Grid>

        <Grid item xs={12} sm={12} className={classes.sortGraphicsContainer}>
          <SortGraphics
            sortState={sortState}
            numElems={sliderState}
            scramble={scramble}
            speed={speed}
            algo={algo}
            desiredStep={desiredStep}
            currStep={currStep}
            setCurrStep={setCurrStep}
            setStepLimit={setStepLimit}
          />
        </Grid>
      </Grid>
    </Fragment>
  );
}

export default SortViewer;
