import { myColors, swapArr } from './startingDataFunctions';

class AniStep {
  constructor(array) {
    this.step = 0;
    this.array = array;
    this.level = 5;
    this.delayMult = 1;
  }

  count() {
    this.step += 1;
  }
}

function setArrColor(arr, color) {
  // console.log(arr);
  if (arr.length) {
    for (let i = 0; i < arr.length; i += 1) {
      if (arr[i]) arr[i].color = color;
    }
  }
  return arr;
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
  // console.log(output2);
  console.log(output);
  console.log('='.repeat(n * 2 + 2));
}

function genericHelper(animation, setState, setCurrStep) {
  const { array, step } = animation;
  // printArr(array);
  // console.log(level, spd);
  setCurrStep(step);
  setState([...array]);
}

function genericArrAnimate(animations, setState, setCurrStep, sortSpeed) {
  const n = animations.length;
  let delay = 200;
  const speedRef = [600, 300, 200, 100, 50];
  const speed = speedRef[sortSpeed];
  let timeouts = [];
  console.log(animations);

  if (n) {
    for (let i = 0; i < n; i += 1) {
      const { delayMult, level } = animations[i];
      if (level >= sortSpeed) {
        timeouts.push(setTimeout(genericHelper, delay, animations[i], setState, setCurrStep));
        delay += speed * delayMult;
      }
    }
  } else {
    genericHelper(animations, setState, setCurrStep);
  }

  return timeouts;
}

// function AnimateSortFinished(source, delay, setState) {
//   const timeouts = [];
//   for (let i = 0; i < source.length; i += 1) {
//     timeouts.push(
//       setTimeout(() => {
//         const newArr = [...source];
//         newArr[i].color = myColors.myGreen;
//         setState(newArr);
//       }, delay)
//     );
//     delay += 50;
//   }
//   return timeouts;
// }

function stopAnimation(timeouts) {
  for (let i = 0; i < timeouts.length; i += 1) {
    clearTimeout(timeouts[i]);
  }
}

export { stopAnimation, AniStep, genericArrAnimate, setArrColor };

// class AnimationStep {
//   constructor(index1, index2) {
//     this.ind1 = index1;
//     this.ind2 = index2;
//     this.swap = false;
//     this.compare = false;
//     this.delayMult = 1;
//   }
// }

// function arrAnimate(arr, animation, setState, sortSpeed) {
//   const { ind1, ind2, swap, compare } = animation;
//   const { myBlue, myOrange, myGreen, myRed } = myColors;
//   let newArr = [];
//   if (swap) newArr = [...swapArr(arr, ind1, ind2)];
//   else newArr = [...arr];
//   for (let i = 0; i < newArr.length; i += 1) {
//     let temp1 = ind1;
//     let temp2 = ind2;
//     if (swap) {
//       temp1 = ind2;
//       temp2 = ind1;
//     }
//     if (i === temp1) newArr[i].color = myBlue;
//     else if (i === temp2 && sortSpeed >= 100) {
//       if (compare) newArr[i].color = myGreen;
//       else newArr[i].color = myRed;
//     } else newArr[i].color = myOrange;
//   }
//   setState(newArr);
// }

// function AnimateSort(source, animations, setState, sortSpeed, type = null) {
//   const n = animations.length;
//   let delay = 200;
//   const speedRef = [600, 300, 200, 100, 15];
//   const speed = speedRef[sortSpeed];
//   // loop through all recorded iterations
//   const timeouts = [];
//   for (let i = 0; i < n; i += 1) {
//     for (let j = 0; j < animations[i].length; j += 1) {
//       const { delayMult } = animations[i][j];
//       if (type === null)
//         timeouts.push(setTimeout(arrAnimate, delay, source, animations[i][j], setState, speed));
//       else timeouts.push(setTimeout(setState, delay, [...animations[i][j].array]));
//       delay += speed * delayMult;
//     }
//   }
//   // add animation to turn all elems green after sorting is complete
//   for (let i = 0; i < source.length; i += 1) {
//     timeouts.push(
//       setTimeout(() => {
//         const newArr = [...source];
//         newArr[i].color = myColors.myGreen;
//         setState(newArr);
//       }, delay)
//     );
//     delay += 50;
//   }

//   return timeouts;
// }
