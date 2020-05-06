import { cloneDeep } from 'lodash';
import { myColors } from './startingDataFunctions';
import { AniStep, setArrColor } from './animations';

function quickSort(arr, speed) {
  const tempArr = cloneDeep(arr);
  let output = [];
  const { myBlue, myGreen, myOrange, myRed } = myColors;

  const aStp = new AniStep(tempArr);
  output.push(cloneDeep(aStp));

  function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  function pivot(arr, start = 0, end = arr.length + 1) {
    const tempStore = [];
    // create a variable to store the pivot value
    let pivot = arr[start];
    //  count of elems smaller than pivot
    let compInd = start;
    // for loop to go through the array to check the pivot against all elements
    for (let i = start + 1; i < arr.length; i++) {
      aStp.sortCount();
      // if the current value at index is less than the value of the pivot
      // then add to the pivot index compInder and swap the value to
      // start accumulating in front of the pivot
      setArrColor(arr, myOrange);
      pivot.color = myBlue;
      if (start !== i) arr[i].color = myBlue;
      aStp.array = arr;
      aStp.count();
      tempStore.push(cloneDeep(aStp));

      if (pivot.value > arr[i].value) {
        if (speed < 3) {
          arr[start].color = myGreen;
          arr[i].color = myRed;
          aStp.array = arr;
          aStp.count();
          tempStore.push(cloneDeep(aStp));
        }

        compInd++;
        swap(arr, compInd, i);

        aStp.array = arr;
        aStp.count();
        tempStore.push(cloneDeep(aStp));
      } else if (speed < 3) {
        arr[start].color = myRed;
        arr[i].color = myGreen;
        aStp.array = arr;
        aStp.count();
        tempStore.push(cloneDeep(aStp));
      }
      // console.log(arr);
    }
    output = output.concat(tempStore);

    arr[start].color = myBlue;
    arr[compInd].color = myBlue;
    aStp.array = arr;
    aStp.count();
    output.push(cloneDeep(aStp));

    aStp.sortCount();

    swap(arr, start, compInd);

    aStp.array = arr;
    aStp.count();
    output.push(cloneDeep(aStp));
    return compInd;
  }

  function helper(arr, left = 0, right = arr.length - 1) {
    //   console.log(arr);
    //   console.log(left, right);

    if (left < right) {
      let piv = pivot(arr, left, right);
      helper(arr, left, piv - 1);
      helper(arr, piv + 1, right);
    }
    return arr;
  }

  const result = helper(tempArr);
  return output;
}

export default quickSort;
