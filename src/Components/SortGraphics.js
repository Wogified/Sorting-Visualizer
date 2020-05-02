import React, { Fragment, useState, useEffect, useRef } from 'react';
import { useTransition, animated as a, config } from 'react-spring';
import { Button, makeStyles, useTheme } from '@material-ui/core';
import PropTypes from 'prop-types';
import {
  genArr,
  resetArrColors,
  stopAnimation,
  bubbleSort,
  insertionSort,
  mergeSort,
  genericArrAnimate,
} from '../Algos';

const useStyles = makeStyles(({ palette, breakpoints }) => ({
  sortElemContainer: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
  },
  sortElem: {
    backgroundColor: palette.primary.main,
    margin: '10%',
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
}) {
  const classes = useStyles({ numElems });
  const parentRef = useRef(null);
  const theme = useTheme();
  const [sortElems, setSortElems] = useState(genArr(numElems, theme));
  const [animationTimeouts, setAnimationTimeouts] = useState([]);
  const [aniSteps, setAniSteps] = useState([]);
  const [containerDim, setContainerDim] = useState([0, 0]);
  const [contWidth, contHeight] = containerDim;
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const width = contWidth / numElems;

  useEffect(() => {
    setSortElems(genArr(numElems));
  }, [numElems]);

  // define limit for steps
  useEffect(() => {
    setStepLimit(aniSteps.length);
  }, [aniSteps]);

  // pause Animation Effect
  useEffect(() => {
    if (sortState === 1) {
      // console.log(sortState, 'play');
      if (currStep === 0) handleStartSort();
      else {
        let timeouts = genericArrAnimate(
          aniSteps.slice(currStep),
          setSortElems,
          setCurrStep,
          speed
        );
        setAnimationTimeouts(timeouts);
      }
    } else if (sortState === 2) {
      console.log(sortState, 'paused');
      stopAnimation(animationTimeouts);
    } else if (sortState === 0) {
      console.log(sortState, 'stopped');
      stopAnimation(animationTimeouts);
      setSortElems([...resetArrColors(sortElems)]);
    }
  }, [sortState]);

  useEffect(() => {
    if (sortState === 2 && desiredStep < aniSteps.length) {
      console.log(desiredStep, aniSteps[desiredStep].step);
      // console.log('hi');
      genericArrAnimate(aniSteps[desiredStep], setSortElems, setCurrStep, speed);
    }
  }, [desiredStep, currStep]);

  //   console.log(sortElems);

  const updateWidthAndHeight = () => {
    setWindowWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener('resize', updateWidthAndHeight);
    return () => window.removeEventListener('resize', updateWidthAndHeight);
  });
  useEffect(() => {
    stopAnimation(animationTimeouts);
    setSortElems(genArr(numElems, theme));
  }, [scramble, algo]);

  //   grab the dimensions of the parent element of the sorting elems
  useEffect(() => {
    const parentHeight = parentRef.current.offsetHeight;
    const parentWidth = parentRef.current.offsetWidth;
    setContainerDim([parentWidth, parentHeight]);
  }, [parentRef, windowWidth]);

  const items = sortElems.map((child, i) => {
    // console.log(child, i);
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
    config: { mass: 1, tension: 200, friction: 20 },
  });

  // Todo: implement bubble and insertion sorts with generic animation
  const handleStartSort = () => {
    // stopAnimation(animationTimeouts);
    let animations;
    switch (algo) {
      case 'Bubble':
        animations = bubbleSort(sortElems, speed);
        break;
      case 'Insertion':
        animations = insertionSort(sortElems, speed);
        break;
      case 'Merge':
        animations = mergeSort(sortElems, speed);
        break;
      default:
        animations = bubbleSort(sortElems);
        break;
    }
    setAniSteps([...animations]);
    const timeouts = genericArrAnimate(animations, setSortElems, setCurrStep, speed);
    // console.log(animations);
    setAnimationTimeouts(timeouts);
  };
  // const lastX = transitions[1].props.x.lastPosition;
  // console.log(lastX);
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

SortGraphics.propTypes = {};

SortGraphics.defaultProps = {};

export default SortGraphics;
