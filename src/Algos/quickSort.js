import { cloneDeep } from 'lodash';
import { myColors } from './startingDataFunctions';
import { AniStep, setArrColor } from './animations';

function quickSort(arr1, speed) {
  const tempArr = cloneDeep(arr1);
  let output = [];
  const { myBlue, myGreen, myOrange, myRed, myPurple } = myColors;

  const aStp = new AniStep(tempArr);
  output.push(cloneDeep(aStp));

  function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  function pivotFinder(arr, start, end) {
    const tempStore = [];

    const pivot = arr[Math.floor((start + end) / 2)];
    // const pivot = arr[start];
    let i = start - 1;
    let j = end + 1;

    setArrColor(arr, myOrange);
    pivot.color = myBlue;
    while (true) {
      i += 1;
      while (arr[i].value < pivot.value) {
        arr[i].color = myRed;
        aStp.sortCount();
        aStp.count();
        aStp.array = arr;
        tempStore.push(cloneDeep(aStp));
        i += 1;
      }
      arr[i].color = myGreen;
      aStp.count();
      tempStore.push(cloneDeep(aStp));
      j -= 1;
      while (arr[j].value > pivot.value) {
        arr[j].color = myRed;
        aStp.sortCount();
        aStp.count();
        aStp.array = arr;
        tempStore.push(cloneDeep(aStp));
        j -= 1;
      }
      arr[j].color = myGreen;
      aStp.count();
      tempStore.push(cloneDeep(aStp));

      if (i >= j) {
        output = output.concat(tempStore);
        return j;
      }
      swap(arr, i, j);
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
  return output;
}

export default quickSort;

// function quickSort(arr1, speed) {
//   const tempArr = cloneDeep(arr1);
//   let output = [];
//   const { myBlue, myGreen, myOrange, myRed, myPurple } = myColors;

//   const aStp = new AniStep(tempArr);
//   output.push(cloneDeep(aStp));

//   function swap(arr, i, j) {
//     let temp = arr[i];
//     arr[i] = arr[j];
//     arr[j] = temp;
//   }
//   function pivotFinder(arr, start, end) {
//     const tempStore = [];

//     const pivot = arr[end];
//     //  count of elems smaller than pivot
//     let compInd = start - 1;
//     setArrColor(arr, myOrange);
//     // for loop to go through the array to check the pivot against all elements
//     for (let i = start; i < end; i += 1) {
//       aStp.sortCount();

//       pivot.color = myBlue;
//       // arr[i].color = myBlue;

//       aStp.count();
//       tempStore.push(cloneDeep(aStp));

//       if (arr[i].value < pivot.value) {
//         arr[i].color = myPurple;
//         aStp.count();
//         tempStore.push(cloneDeep(aStp));

//         compInd += 1;
//         swap(arr, compInd, i);
//       } else {
//         arr[i].color = myRed;
//         aStp.count();
//         tempStore.push(cloneDeep(aStp));
//         arr[i].color = myOrange;
//       }
//       aStp.count();
//       tempStore.push(cloneDeep(aStp));
//       // console.log(arr);
//     }
//     output = output.concat(tempStore);

//     compInd += 1;
//     pivot.color = myBlue;
//     arr[compInd].color = myBlue;
//     aStp.count();
//     // aStp.delayMult = 2;
//     output.push(cloneDeep(aStp));

//     aStp.sortCount();

//     swap(arr, end, compInd);
//     aStp.count();
//     output.push(cloneDeep(aStp));
//     console.log(compInd);
//     return compInd;
//   }

//   function helper(arr, left, right) {
//     if (left < right) {
//       const piv = pivotFinder(arr, left, right);
//       helper(arr, left, piv - 1);
//       helper(arr, piv + 1, right);
//     }
//   }
//   helper(tempArr, 0, tempArr.length - 1);
//   return output;
// }

// export default quickSort;
