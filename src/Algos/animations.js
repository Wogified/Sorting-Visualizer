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

function AnimateSort(source, animations, setState, sortSpeed, type = null) {
  const n = animations.length;
  let delay = 200;
  const speedRef = [600, 300, 200, 100, 15];
  const speed = speedRef[sortSpeed];
  // loop through all recorded iterations
  const timeouts = [];
  for (let i = 0; i < n; i += 1) {
    for (let j = 0; j < animations[i].length; j += 1) {
      const { delayMult } = animations[i][j];
      if (type === null)
        timeouts.push(setTimeout(arrAnimate, delay, source, animations[i][j], setState, speed));
      else timeouts.push(setTimeout(setState, delay, [...animations[i][j].array]));
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

function printArr(arr) {
  let output = '[';
  let output2 = '[';
  let n = arr.length;
  const { myOrange, myGreen, myRed, myPurple, myTeal, myBlue } = myColors;
  for (let i = 0; i < arr.length; i += 1) {
    switch (arr[i].color) {
      case myBlue:
        output += 'b';
        break;
      case myOrange:
        output += 'o';
        break;
      case myGreen:
        output += 'g';
        break;
      case myRed:
        output += 'r';
        break;
      case myPurple:
        output += 'p';
        break;
      case myTeal:
        output += 't';
        break;
      default:
        break;
    }
    output2 += `${arr[i].value}`;
    if (i < arr.length - 1) {
      output += ',';
      output2 += ',';
    }
  }
  output += ']';
  console.log(output2);
  console.log(output);
  console.log('='.repeat(n * 2 + 2));
}

function RecurArrAnimate(animation, setState, sortSpeed) {
  const { merge, array, compare, swap, step, start, aLen, bLen } = animation;
  // console.log(arr);
  console.log(step, compare);
  const { myOrange, myGreen, myRed, myPurple, myTeal, myBlue } = myColors;
  const Lstart = start;
  const Lend = start + aLen;
  let Rstart = Lend;
  const Rend = Lend + bLen;
  for (let i = 0; i < array.length; i += 1) {
    // if (i < left.start) array[i].color = myOrange;
    // else if (left.start <= i && i < left.end) array[i].color = myTeal;
    // else if (right.start <= i && i < right.end) array[i].color = myPurple;
    // else if (i >= right.end) array[i].color = myOrange;

    if (i < Lstart) array[i].color = myOrange;
    else if (Lstart <= i && i < Lend) array[i].color = myTeal;
    else if (Rstart <= i && i < Rend) array[i].color = myPurple;
    else if (i >= Rend) array[i].color = myOrange;
  }

  if (sortSpeed >= 100) {
    if (step === 1 && sortSpeed >= 200) {
      console.log('here');
      if (aLen && bLen) {
        array[Lstart].color = myBlue;
        array[Rstart].color = myBlue;
      }
      // if (aLen) array[Lstart].color = myBlue;
      // if (bLen) array[Rstart].color = myBlue;
    } else if (step > 1) {
      if (merge === 'left') {
        if (aLen) array[Lstart].color = myGreen;
        if (bLen) array[Rstart].color = myRed;
      } else if (merge === 'right') {
        if (aLen) array[Lstart].color = myRed;
        if (bLen || swap) {
          if (swap) {
            Rstart = start - 1;
          }
          array[Rstart].color = myGreen;
        }
      }
    }

    console.log(
      `${step} ${merge}=> R: ${Rstart}, L: ${Lstart}, arr: ${start}, aLen: ${aLen}, bLen: ${bLen}`
    );
    printArr(array);
  }

  // console.log(array);
  // console.log(left.start, left.end);

  setState([...array]);
}

function AnimateRecursiveSort(source, animations, setState, sortSpeed) {
  const n = animations.length;
  let delay = 200;
  const speedRef = [600, 300, 200, 100, 15];
  const speed = speedRef[sortSpeed];
  console.log(animations);
  // loop through all recorded iterations
  const timeouts = [];
  for (let i = 0; i < n; i += 1) {
    for (let j = 0; j < animations[i].length; j += 1) {
      const { delayMult } = animations[i][j];
      // console.log(array);
      timeouts.push(setTimeout(RecurArrAnimate, delay, animations[i][j], setState, speed));
      delay += speed * delayMult;
    }
  }
  // add animation to turn all elems green after sorting is complete
  for (let i = 0; i < source.length; i += 1) {
    timeouts.push(
      setTimeout(() => {
        const newArr = [...animations[n - 1][animations[n - 1].length - 1].array];
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

export { stopAnimation, AnimateSort, AnimationStep, AnimateRecursiveSort };
