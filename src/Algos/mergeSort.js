import { cloneDeep } from 'lodash';
import { myColors } from './startingDataFunctions';
import { AniStep, setArrColor } from './animations';

function mergeSort(arr, speed) {
  let output = [];
  const temp = cloneDeep(arr);
  let prevArr = [...temp];
  const { myBlue, myGreen, myOrange, myTeal, myPurple } = myColors;

  const aStp = new AniStep(arr);
  output.push(cloneDeep(aStp));

  function mergeArr(a, b, start, end) {
    aStp.sortCount();
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

    // AniStep: Highlight target arrays to be sorted
    arrStart = setArrColor(arrStart, myOrange);
    if (speed < 3) arrMid = setArrColor(arrMid, myGreen);
    else arrMid = setArrColor(arrMid, myOrange);
    a = setArrColor(a, myTeal);
    b = setArrColor(b, myPurple);
    arrEnd = setArrColor(arrEnd, myOrange);
    aStp.array = arrStart.concat(arrMid, a, b, arrEnd);
    aStp.count();
    aStp.level = 5;
    aStp.delayMult = 2;
    tempStore.push(cloneDeep(aStp));

    while (a.length || b.length) {
      let smallest;
      let change = false;
      if (speed < 3) {
        arrMid = setArrColor(arrMid, myGreen);
        if (a.length) a[0].color = myBlue;
        if (b.length) b[0].color = myBlue;
        aStp.array = arrStart.concat(arrMid, a, b, arrEnd);
        aStp.level = 3;
        aStp.delayMult = 1;
        aStp.count();
        tempStore.push(cloneDeep(aStp));
      }

      if (a.length && !b.length) {
        smallest = a.shift();
      } else if (!a.length && b.length) {
        smallest = b.shift();
      } else if (a[0].value < b[0].value) {
        // change = true;
        smallest = a.shift();
      } else {
        change = true;
        smallest = b.shift();
      }

      arrMid.push(smallest);
      // aStp.delayMult = 1;

      if (change) {
        aStp.array = arrStart.concat(arrMid, a, b, arrEnd);
        aStp.level = 5;
        aStp.delayMult = 2;
        aStp.count();
        tempStore.push(cloneDeep(aStp));
      }
      aStp.sortCount();
    }
    output = output.concat(tempStore);
    // set final sorted portion of the array to be green

    if (speed < 3) {
      arrMid = setArrColor(arrMid, myGreen);
      aStp.array = arrStart.concat(arrMid, arrEnd);
      aStp.level = 5;

      aStp.count();
      output.push(cloneDeep(aStp));
    }

    const arrTemp = arrStart.concat(arrMid, arrEnd);
    prevArr = arrTemp;

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
  }
  let n = temp.length;
  const result = helper(temp, 0, n);

  // Clear out all colors and mark as last step
  setArrColor(aStp.array, myOrange);
  aStp.last = true;
  aStp.count();
  output.push(cloneDeep(aStp));

  return output;
}

export default mergeSort;
