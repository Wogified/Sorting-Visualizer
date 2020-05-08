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
    textAlign: 'center',
    padding: '.5em',
  },
  noTitle: {
    width: '60vw',
    textAlign: 'center',
    padding: '.5em',
  },
  description: {
    textAlign: 'center',
    padding: '1em',
    [breakpoints.up('sm')]: {
      width: '50%',
    },
    [breakpoints.down('xs')]: {
      width: '100%',
    },
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
    paddingTop: '10vh',
    paddingBottom: '10vh',
  },
  slider: {
    [breakpoints.up('sm')]: {
      width: '100%',
    },
    [breakpoints.down('xs')]: {
      width: '80%',
    },
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '20vh',
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

function SortViewer({ algo, Algorithms }) {
  const classes = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('xs'));
  const [sliderState, setSlider] = useState(10);
  const [speed, setSpeed] = useState(2);
  const [sortState, setSortState] = useState(0);
  const [scramble, setScramble] = useState(false);
  // current animation step
  const [currStep, setCurrStep] = useState(0);
  // desired animation step
  const [desiredStep, setDesiredStep] = useState(0);
  // sort algorithm step
  const [sortStep, setSortStep] = useState(0);
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
  };

  const handleStopSort = () => {
    setSortState(0);
    setCurrStep(0);
    setDesiredStep(0);
    setStepLimit(0);
    setSortStep(0);
  };
  const renderTitle = () => {
    if (algo) {
      return (
        <Typography className={classes.title} variant="h1">
          {algo.title}
        </Typography>
      );
    }
    return (
      <Typography className={classes.noTitle} variant="h4">
        Choose a sorting algorithm from the menu in the top left corner.
      </Typography>
    );
  };

  return (
    <Fragment>
      <div className={classes.titleContainer}>{renderTitle()}</div>

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
            algo={algo}
          />
        </Grid>
        <Grid item xs={12} sm={12} className={classes.itemContainer}>
          <Typography>Step: {sortStep}</Typography>
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
            setSortStep={setSortStep}
            setStepLimit={setStepLimit}
            onStop={handleStopSort}
          />
        </Grid>
      </Grid>
    </Fragment>
  );
}

export default SortViewer;
