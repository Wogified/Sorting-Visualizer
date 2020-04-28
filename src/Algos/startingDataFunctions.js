import { deepOrange, blue, red, green, purple, teal } from '@material-ui/core/colors';

const myColors = {
  myOrange: deepOrange[500],
  myBlue: blue[400],
  myGreen: green[200],
  myRed: red[200],
  myPurple: purple[500],
  myTeal: teal[700],
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

function resetArrColors(arr) {
  for (let i = 0; i < arr.length; i += 1) {
    arr[i].color = myColors.myOrange;
  }
  return arr;
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

export { genArr, shuffle, swapArr, myColors, resetArrColors };
