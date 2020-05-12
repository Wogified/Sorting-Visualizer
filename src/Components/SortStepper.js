import React, { Fragment } from 'react';
import { IconButton } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import PropTypes from 'prop-types';

function SortStepper({
  onStop,
  currStep,
  onSetDesiredStep,
  stepLim,
  sortState,
  onSetSortState,
  algo,
}) {
  const handleCurrStepUpdate = (val) => {
    if (val > 0 && currStep < stepLim) {
      onSetDesiredStep(currStep + 1);
    } else if (val < 0 && currStep > 0) {
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

SortStepper.propTypes = {
  algo: PropTypes.shape({
    key: PropTypes.string,
    title: PropTypes.string,
  }),
  sortState: PropTypes.number,
  currStep: PropTypes.number,
  onSetDesiredStep: PropTypes.func.isRequired,
  onStop: PropTypes.func.isRequired,
  stepLim: PropTypes.number,
  onSetSortState: PropTypes.func.isRequired,
};

SortStepper.defaultProps = {
  algo: null,
  sortState: 0,
  currStep: 0,
  stepLim: 0,
};

export default SortStepper;
