import { myColors, swapArr } from './startingDataFunctions';

class AnimationStep {
  constructor(index1, index2) {
    this.ind1 = index1;
    this.ind2 = index2;
    this.swap = false;
    this.compare = false;
    this.delayMult = 1;
  }
}

function arrAnimate(arr, animation, setState, sortSpeed) {
  const { ind1, ind2, swap, compare } = animation;
  const { myBlue, myOrange, myGreen, myRed } = myColors;
  let newArr = [];
  if (swap) newArr = [...swapArr(arr, ind1, ind2)];
  else newArr = [...arr];
  for (let i = 0; i < newArr.length; i += 1) {
    let temp1 = ind1;
    let temp2 = ind2;
    if (swap) {
      temp1 = ind2;
      temp2 = ind1;
    }
    if (i === temp1) newArr[i].color = myBlue;
    else if (i === temp2 && sortSpeed >= 100) {
      if (compare) newArr[i].color = myGreen;
      else newArr[i].color = myRed;
    } else newArr[i].color = myOrange;
  }
  setState(newArr);
}

function AnimateSort(source, animations, setState, sortSpeed) {
  const n = animations.length;
  let delay = 200;
  const speedRef = [600, 300, 200, 100, 15];
  const speed = speedRef[sortSpeed];
  // loop through all recorded iterations
  const timeouts = [];
  for (let i = 0; i < n; i += 1) {
    for (let j = 0; j < animations[i].length; j += 1) {
      const { delayMult } = animations[i][j];
      timeouts.push(setTimeout(arrAnimate, delay, source, animations[i][j], setState, speed));
      delay += speed * delayMult;
    }
  }
  // add animation to turn all elems green after sorting is complete
  for (let i = 0; i < source.length; i += 1) {
    timeouts.push(
      setTimeout(() => {
        const newArr = [...source];
        newArr[i].color = myColors.myGreen;
        setState(newArr);
      }, delay)
    );
    delay += 50;
  }

  return timeouts;
}

function stopAnimation(timeouts) {
  for (let i = 0; i < timeouts.length; i += 1) {
    clearTimeout(timeouts[i]);
  }
}

export { stopAnimation, AnimateSort, AnimationStep };
