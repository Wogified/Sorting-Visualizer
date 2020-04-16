import _ from 'lodash';
import { AnimationStep } from './animations';
import { myColors } from './startingDataFunctions';

function setArrColor(arr, color) {
  // console.log(arr);
  if (arr.length) {
    for (let i = 0; i < arr.length; i += 1) {
      if (arr[i]) arr[i].color = color;
    }
  }
  // return [...arr];
}

class RecurAniStep {
  constructor(array, arrStartLen, aLen, bLen) {
    this.step = 0;
    this.left = {
      start: arrStartLen,
      end: arrStartLen + aLen,
    };
    this.right = {
      start: this.left.end,
      end: this.left.end + bLen,
    };
    this.start = arrStartLen;
    this.aLen = aLen;
    this.bLen = bLen;
    this.merge = null;
    this.compare = 0;

    this.delayMult = 1;
    this.array = array;
  }
}
function printArr(arr) {
  let output = '[';
  let n = arr.length;
  for (let i = 0; i < arr.length; i += 1) {
    output += `${arr[i].value}`;
    if (i < arr.length - 1) output += ',';
  }
  output += ']';
  console.log(output);
  console.log('='.repeat(n * 2 + 2));
}

function mergeSort(arr) {
  const output = [];
  const temp = [...arr];
  let prevArr = [...temp];
  // const { myBlue, myGreen, myOrange, myRed, myTeal, myPurple } = myColors;
  let count = 0;

  function mergeArr(a, b, start, end) {
    // console.log(start, end);
    const tempStore = [];
    const arrImage = prevArr;
    // array to store sorted values
    let arrMid = [];
    // array to store any values that precede values of interest
    let arrStart = arrImage.slice(0, start);
    // store values that are beyond the current values of interest
    let arrEnd = arrImage.slice(end);
    // highlight diff colors for current values of interest

    while (a.length || b.length) {
      let smallest;
      let mergeDir;
      // AniStep: Highlight target arrays to be sorted
      const arrTracker = [...arrStart.concat(arrMid, a, b, arrEnd)];
      const aStp = new RecurAniStep(arrTracker, arrStart.concat(arrMid).length, a.length, b.length);

      tempStore.push({ ...aStp });
      // Highligh two elements of focus
      aStp.step += 1;
      aStp.delayMult = 2;
      tempStore.push({ ...aStp });

      aStp.step += 1;
      aStp.delayMult = 1;
      if (a.length && !b.length) {
        mergeDir = 'left';
        aStp.merge = mergeDir;
        tempStore.push({ ...aStp });

        smallest = a.shift();
      } else if (!a.length && b.length) {
        mergeDir = 'right';
        aStp.merge = mergeDir;
        tempStore.push({ ...aStp });

        smallest = b.shift();
      } else if (a[0].value < b[0].value) {
        mergeDir = 'left';
        aStp.merge = mergeDir;
        tempStore.push({ ...aStp });

        smallest = a.shift();
      } else {
        mergeDir = 'right';
        aStp.merge = mergeDir;
        tempStore.push({ ...aStp });

        smallest = b.shift();
      }

      arrMid.push(smallest);
      // aStp.delayMult = 1;
      aStp.swap = true;
      aStp.array = [...arrStart.concat(arrMid, a, b, arrEnd)];
      aStp.aLen = a.length;
      aStp.bLen = b.length;
      aStp.start = arrStart.concat(arrMid).length;
      aStp.step += 1;
      tempStore.push({ ...aStp });
    }
    output.push(tempStore);
    const arrTemp = arrStart.concat(arrMid, arrEnd);
    prevArr = arrTemp;
    count += 1;
    return arrMid;
  }

  function helper(array, start, end) {
    // the base case is that if the length of the arr is less than or equal to 1 then return the arr
    if (array.length <= 1) return array;
    const n = array.length;
    const mid = Math.floor(n / 2);

    const L_arr = array.slice(0, mid);
    const R_arr = array.slice(mid);

    const Ln = mid - L_arr.length + start;
    const Rn = n - R_arr.length + start;

    const left = helper(L_arr, Ln, end);
    const right = helper(R_arr, Rn, end);
    // console.log(array, L_arr, R_arr);
    const finalEnd = Ln + left.length + right.length;
    // console.log("ahhh", Ln, finalEnd);
    // console.log(start, end, n);
    return mergeArr(left, right, Ln, finalEnd);
    // return mergeArr(mergeSort(arr.slice(0, n)), mergeSort(arr.slice(n)));
  }
  let n = temp.length;
  const result = helper(temp, 0, n);

  return output;
}

export default mergeSort;
