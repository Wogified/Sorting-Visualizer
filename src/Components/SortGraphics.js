import React, { Fragment, useState, useEffect, useRef } from 'react';
import { useTransition, animated as a } from 'react-spring';
import { Button, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { genArr, swap, shuffle, bubble } from '../Algos/startingDataFunctions';

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
    // width: ({ numElems }) => `calc(100%/${Math.floor(numElems * 1.5)})`,
    // width: ({ numElems }) => `calc(80% + (${numElems}-5)/45*20%)`,
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

function SortGraphics({ numElems, scramble, speed }) {
  const classes = useStyles({ numElems });
  const parentRef = useRef(null);
  const [rows, set] = useState(genArr(numElems));
  const [containerDim, setContainerDim] = useState([0, 0]);
  const [contWidth, contHeight] = containerDim;
  // const [buttonState, setButtonState] = useState(false);
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  const width = contWidth / numElems;

  useEffect(() => {
    set(genArr(numElems));
  }, [numElems]);
  //   console.log(rows);

  const updateWidthAndHeight = () => {
    setWindowWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener('resize', updateWidthAndHeight);
    return () => window.removeEventListener('resize', updateWidthAndHeight);
  });
  useEffect(() => {
    set([...shuffle(rows)]);
  }, [scramble]);

  //   grab the dimensions of the parent element of the sorting elems
  useEffect(() => {
    // if (parentRef.current) {
    const parentHeight = parentRef.current.offsetHeight;
    const parentWidth = parentRef.current.offsetWidth;
    setContainerDim([parentWidth, parentHeight]);
    // }
  }, [parentRef, windowWidth]);

  const items = rows.map((child, i) => {
    const height = (child.value / numElems) * contHeight;
    const x = width * i;
    return { ...child, x, width, height };
  });

  const transitions = useTransition(items, (item) => item.key, {
    from: ({ x, width, height }) => ({ x, width, height, opacity: 0 }),
    enter: ({ x, width, height }) => ({ x, width, height, opacity: 1 }),
    update: ({ x, width, height }) => ({ x, width, height }),
    leave: { height: 0, opacity: 0 },
    config: { mass: 1, tension: 200, friction: 20 },
    // trail: 25,
  });

  const handleStartSort = () => {
    // setButtonState(!buttonState);
    bubble(rows, set, speed);
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
          //   height: `calc((${item.value}/${numElems})*100%)`,
          ...rest,
        }}
      >
        <div className={classes.sortElem} />
      </a.div>
    ));
  }

  return (
    <Fragment>
      <Button onClick={handleStartSort}>Start Sort!</Button>

      <div className={classes.sortContainer} ref={parentRef}>
        {renderDivs()}
      </div>
    </Fragment>
  );
}

SortGraphics.propTypes = {};

SortGraphics.defaultProps = {};

export default SortGraphics;
