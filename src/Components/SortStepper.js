import React, { Fragment, useState } from 'react';
import { IconButton, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';

function SortStepper({
  onStop,
  currStep,
  onSetDesiredStep,
  stepLim,
  sortState,
  onSetSortState,
  algo,
}) {
  //   const classes = useStyles();

  const handleCurrStepUpdate = (val) => {
    // TODO: add a max length limit for steps
    if (val > 0 && currStep < stepLim) {
      // console.log(currStep, 'add 1');
      onSetDesiredStep(currStep + 1);
    } else if (val < 0 && currStep > 0) {
      // console.log(currStep, 'minus 1');
      onSetDesiredStep(currStep - 1);
    }
  };

  const handlePlayPause = () => {
    if (sortState === 0 || sortState === 2) onSetSortState(1);
    else if (sortState === 1) onSetSortState(2);
  };

  return (
    <Fragment>
      <IconButton
        disabled={sortState === 0 || currStep <= 0}
        onClick={() => handleCurrStepUpdate(-1)}
      >
        <ArrowBackIcon />
      </IconButton>
      <IconButton disabled={!algo} onClick={handlePlayPause}>
        {sortState === 1 ? <PauseIcon /> : <PlayArrowIcon />}
      </IconButton>
      <IconButton disabled={sortState === 0} onClick={onStop}>
        <StopIcon />
      </IconButton>
      <IconButton
        disabled={sortState === 0 || currStep >= stepLim}
        onClick={() => handleCurrStepUpdate(1)}
      >
        <ArrowForwardIcon />
      </IconButton>
    </Fragment>
  );
}

export default SortStepper;
