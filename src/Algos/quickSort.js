import { cloneDeep } from 'lodash';
import { myColors } from './startingDataFunctions';
import { AniStep, setArrColor } from './animations';

function quickSort(arr1, speed) {
  const tempArr = cloneDeep(arr1);
  let output = [];
  const { myBlue, myGreen, myOrange, myRed, myPurple, myTeal } = myColors;

  const aStp = new AniStep(tempArr);
  output.push(cloneDeep(aStp));

  function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  function pivotFinder(arr, start, end) {
    const tempStore = [];

    // const pivot = arr[start];
    let i = start - 1;
    let j = end + 1;
    const mid = Math.floor((start + end) / 2);
    const pivot = arr[mid];
    setArrColor(arr, myOrange);
    setArrColor(arr.slice(start, end + 1), myPurple);
    // setArrColor(arr.slice(mid, end + 1), myTeal);
    pivot.color = myBlue;
    aStp.count();
    aStp.array = arr;
    aStp.delayMult = 3;
    tempStore.push(cloneDeep(aStp));

    while (true) {
      i += 1;
      while (arr[i].value < pivot.value) {
        arr[i].color = myOrange;
        aStp.delayMult = 1;
        aStp.sortCount();
        aStp.count();
        aStp.array = arr;
        tempStore.push(cloneDeep(aStp));
        i += 1;
      }
      j -= 1;
      while (arr[j].value > pivot.value) {
        arr[j].color = myOrange;
        aStp.delayMult = 1;
        aStp.sortCount();
        aStp.count();
        aStp.array = arr;
        tempStore.push(cloneDeep(aStp));
        j -= 1;
      }

      if (i >= j) {
        output = output.concat(tempStore);
        return j;
      }
      swap(arr, i, j);
      aStp.delayMult = 1;
      aStp.count();
      tempStore.push(cloneDeep(aStp));
    }
  }

  function helper(arr, left, right) {
    if (left < right) {
      const piv = pivotFinder(arr, left, right);
      helper(arr, left, piv);
      helper(arr, piv + 1, right);
    }
  }
  helper(tempArr, 0, tempArr.length - 1);

  // Clear out all colors and mark as last step
  setArrColor(aStp.array, myOrange);
  aStp.last = true;
  aStp.count();
  output.push(cloneDeep(aStp));

  return output;
}

export default quickSort;
