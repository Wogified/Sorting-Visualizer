import { deepOrange, cyan, red, green } from '@material-ui/core/colors';

const myColors = {
  myOrange: deepOrange[500],
  myBlue: cyan[400],
  myGreen: green[200],
  myRed: red[200],
};

class Node {
  constructor(val) {
    this.value = val;
    this.key = `${val}`;
    this.color = myColors.myOrange;
  }
}

function genArr(n) {
  const x = [];
  for (let i = 1; i <= n; i += 1) {
    x.push(new Node(i));
  }
  return shuffle(x);
}

function shuffle(array) {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function swapArr(array, i, j) {
  let temp = array[i];
  array[i] = array[j];
  array[j] = temp;
  return array;
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
      // newArr[i].color = color;
      if (compare) newArr[i].color = myGreen;
      else newArr[i].color = myRed;
    } else newArr[i].color = myOrange;
  }

  setState(newArr);
}

function AnimateSort(source, animations, setState, sortSpeed) {
  const n = animations.length;
  let delay = 200;
  const speedRef = [600, 300, 150, 50, 15];
  const speed = speedRef[sortSpeed];
  // loop through all recorded iterations
  const timeouts = [];
  for (let i = 0; i < n; i += 1) {
    for (let j = 0; j < animations[i].length; j += 1) {
      let speedMod = 0;
      if (j === 0) speedMod = speed;
      timeouts.push(setTimeout(arrAnimate, delay, source, animations[i][j], setState, speed));
      delay = delay + speed + speedMod;
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

export { genArr, shuffle, AnimateSort, stopAnimation, swapArr, myColors };
