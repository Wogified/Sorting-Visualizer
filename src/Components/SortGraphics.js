import React, { Fragment, useState, useEffect, useRef } from 'react';
import { useTransition, animated as a } from 'react-spring';
import { makeStyles, useTheme } from '@material-ui/core';
import PropTypes from 'prop-types';
import {
  genArr,
  resetArrColors,
  stopAnimation,
  bubbleSort,
  insertionSort,
  mergeSort,
  quickSort,
  genericArrAnimate,
  AnimateSortFinished,
} from '../Algos';

const useStyles = makeStyles(({ palette, breakpoints }) => ({
  sortElemContainer: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
  },
  sortElem: {
    backgroundColor: palette.primary.main,
    marginLeft: '10%',
    marginRight: '10%',
    // margin: '10%',
    borderTopLeftRadius: '5px',
    borderTopRightRadius: '5px',
    height: '100%',
    width: '100%',
    '&:hover': {
      backgroundColor: palette.secondary.main,
    },
  },
  sortContainer: {
    width: '80%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    [breakpoints.down('xs')]: {
      height: '300px',
    },
    [breakpoints.up('sm')]: {
      height: '500px',
    },
  },
}));

function SortGraphics({
  numElems,
  scramble,
  speed,
  algo,
  sortState,
  desiredStep,
  currStep,
  setCurrStep,
  setStepLimit,
  setSortStep,
  onStop,
}) {
  const classes = useStyles({ numElems });
  const parentRef = useRef(null);
  const theme = useTheme();
  // Controls the number of elements to sort
  const [sortElems, setSortElems] = useState(genArr(numElems, theme));
  // For tracking interval timeouts created by animation
  const [animationTimeouts, setAnimationTimeouts] = useState([]);
  // Keeps a history of all sort steps
  const [aniSteps, setAniSteps] = useState([]);
  // Tracks the size of the container for the sort elements
  const [containerDim, setContainerDim] = useState([0, 0]);
  const [contWidth, contHeight] = containerDim;
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const width = contWidth / numElems;

  // Refreshes sort elems whenever the user changes the slider for num of sort elems
  useEffect(() => {
    setSortElems(genArr(numElems));
  }, [numElems]);

  // define limit for steps
  useEffect(() => {
    setStepLimit(aniSteps.length);
  }, [aniSteps]);

  // Handles Playback control updates
  useEffect(() => {
    if (sortState === 1) {
      /*
      Play State 
      if the sort process has not been started before, then use handleStartsort
      Otherwise, use previously generated animation steps to continue from 
      where the animation was paused
      */
      if (currStep === 0) handleStartSort();
      else {
        const timeouts = genericArrAnimate(
          aniSteps.slice(currStep),
          setSortElems,
          setCurrStep,
          setSortStep,
          speed
        );
        // Update animation timeouts so that they can be stopped if necessary
        setAnimationTimeouts(timeouts);
      }
    } else if (sortState === 2) {
      /*
      Paused State 

      stop all animation timeouts.
      */
      stopAnimation(animationTimeouts);
    } else if (sortState === 0) {
      /*
      Stop State

      stop all animation timeouts 
      and reset all colors
      */
      stopAnimation(animationTimeouts);
      setSortElems([...resetArrColors(sortElems)]);
    }
  }, [sortState]);

  /*
  Step by Step Animation controls.
  as the desired step changes, the animation will update the sort elems
*/
  useEffect(() => {
    if (sortState === 2 && desiredStep < aniSteps.length) {
      genericArrAnimate(aniSteps[desiredStep], setSortElems, setCurrStep, setSortStep, speed);
    }
    if (aniSteps.length > 0) {
      if (aniSteps[currStep].last && sortState === 1) {
        AnimateSortFinished(sortElems, setSortElems);
        onStop();
      }
    }
  }, [desiredStep, currStep]);

  // Handles window resizing
  const updateWidthAndHeight = () => {
    setWindowWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener('resize', updateWidthAndHeight);
    return () => window.removeEventListener('resize', updateWidthAndHeight);
  });

  // Scrambles the elements
  useEffect(() => {
    stopAnimation(animationTimeouts);
    setSortElems(genArr(numElems, theme));
    onStop();
  }, [scramble, algo]);

  //   grab the dimensions of the parent element of the sorting elems
  useEffect(() => {
    const parentHeight = parentRef.current.offsetHeight;
    const parentWidth = parentRef.current.offsetWidth;
    setContainerDim([parentWidth, parentHeight]);
  }, [parentRef, windowWidth]);

  // React spring stuff
  const items = sortElems.map((child, i) => {
    const height = (child.value / numElems) * contHeight;
    const background = child.color;
    const x = width * i;
    return { ...child, x, width, height, background };
  });

  const transitions = useTransition(items, (item) => item.key, {
    from: ({ x, width, height }) => ({ x, width, height, opacity: 0 }),
    enter: ({ x, width, height }) => ({ x, width, height, opacity: 1 }),
    update: ({ x, width, height }) => ({ x, width, height }),
    leave: { height: 0, opacity: 0 },
    config: { mass: 1, tension: 500, friction: 50 },
  });

  const handleStartSort = () => {
    // runs various sort algos and generates animation steps to show
    let animations;
    switch (algo.key) {
      case 'bubble':
        animations = bubbleSort(sortElems, speed);
        break;
      case 'insertion':
        animations = insertionSort(sortElems, speed);
        break;
      case 'merge':
        animations = mergeSort(sortElems, speed);
        break;
      case 'quick':
        animations = quickSort(sortElems, speed);
        break;
      default:
        animations = bubbleSort(sortElems);
        break;
    }
    setAniSteps([...animations]);
    const timeouts = genericArrAnimate(animations, setSortElems, setCurrStep, setSortStep, speed);
    setAnimationTimeouts(timeouts);
  };

  function renderDivs() {
    return transitions.map(({ item, props: { x, ...rest }, key }) => (
      <a.div
        className={classes.sortElemContainer}
        key={key}
        style={{
          transform: x.interpolate((x) => `translate3d(${x}px,0,0)`),
          ...rest,
        }}
      >
        <a.div className={classes.sortElem} style={{ backgroundColor: item.color }} />
      </a.div>
    ));
  }

  return (
    <Fragment>
      <div className={classes.sortContainer} ref={parentRef}>
        {renderDivs()}
      </div>
    </Fragment>
  );
}

SortGraphics.propTypes = {
  numElems: PropTypes.number.isRequired,
  scramble: PropTypes.bool,
  speed: PropTypes.number.isRequired,
  algo: PropTypes.shape({
    key: PropTypes.string,
    title: PropTypes.string,
  }),
  sortState: PropTypes.number,
  desiredStep: PropTypes.number,
  currStep: PropTypes.number,
  setCurrStep: PropTypes.func.isRequired,
  setStepLimit: PropTypes.func.isRequired,
  setSortStep: PropTypes.func.isRequired,
  onStop: PropTypes.func.isRequired,
};

SortGraphics.defaultProps = {
  scramble: false,
  algo: null,
  sortState: 0,
  desiredStep: 0,
  currStep: 0,
};

export default SortGraphics;
