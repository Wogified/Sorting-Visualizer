import { myColors } from './startingDataFunctions';

class AniStep {
  constructor(array) {
    this.step = 0;
    this.index = 0;
    this.array = array;
    this.level = 5;
    this.delayMult = 1;
    this.last = false;
  }

  count() {
    this.index += 1;
  }

  sortCount() {
    this.step += 1;
  }
}

// Set the entire input arr to desired color
function setArrColor(arr, color) {
  if (arr.length) {
    for (let i = 0; i < arr.length; i += 1) {
      if (arr[i]) arr[i].color = color;
    }
  }
  return arr;
}

// setTimeout Animation Callback function
function genericHelper(animation, setState, setCurrStep, setSortStep) {
  const { array, index, step } = animation;
  setCurrStep(index);
  setSortStep(step);
  setState([...array]);
}

function genericArrAnimate(animations, setState, setCurrStep, setSortStep, sortSpeed) {
  const n = animations.length;
  let delay = 200;
  const speedRef = [600, 300, 200, 125, 75];
  const speed = speedRef[sortSpeed];
  const timeouts = [];

  if (n) {
    for (let i = 0; i < n; i += 1) {
      const { delayMult, level } = animations[i];
      if (level >= sortSpeed) {
        timeouts.push(
          setTimeout(genericHelper, delay, animations[i], setState, setCurrStep, setSortStep)
        );
        delay += speed * delayMult;
      }
    }
  } else {
    genericHelper(animations, setState, setCurrStep, setSortStep);
  }

  return timeouts;
}

// Generate a animation that sets the color of all elems to green incrementally
function AnimateSortFinished(source, setState) {
  const { myGreen } = myColors;
  const timeouts = [];
  let delay = 0;

  for (let i = 0; i < source.length; i += 1) {
    timeouts.push(
      setTimeout(() => {
        const newArr = [...source];
        newArr[i].color = myGreen;
        setState(newArr);
      }, delay)
    );
    delay += 25;
  }
  return timeouts;
}

function stopAnimation(timeouts) {
  for (let i = 0; i < timeouts.length; i += 1) {
    clearTimeout(timeouts[i]);
  }
}

export { stopAnimation, AniStep, genericArrAnimate, setArrColor, AnimateSortFinished };

// function printArr(arr) {
//   let output = '[';
//   let output2 = '[';
//   let n = arr.length;
//   const { myOrange, myGreen, myRed, myPurple, myTeal, myBlue } = myColors;
//   for (let i = 0; i < arr.length; i += 1) {
//     switch (arr[i].color) {
//       case myBlue:
//         output += 'b';
//         break;
//       case myOrange:
//         output += 'o';
//         break;
//       case myGreen:
//         output += 'g';
//         break;
//       case myRed:
//         output += 'r';
//         break;
//       case myPurple:
//         output += 'p';
//         break;
//       case myTeal:
//         output += 't';
//         break;
//       default:
//         break;
//     }
//     output2 += `${arr[i].value}`;
//     if (i < arr.length - 1) {
//       output += ',';
//       output2 += ',';
//     }
//   }
//   output += ']';
//   // console.log(output2);
//   console.log(output);
//   console.log('='.repeat(n * 2 + 2));
// }
