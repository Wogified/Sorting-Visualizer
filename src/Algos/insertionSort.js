import { cloneDeep } from 'lodash';
import { swapArr, myColors } from './startingDataFunctions';
import { AniStep, setArrColor } from './animations';

function insertionSort(arr, speed) {
  let count = 0;
  const temp = cloneDeep(arr);
  let output = [];
  const { myBlue, myGreen, myOrange, myRed } = myColors;
  let swapped = false;
  const aStp = new AniStep(arr);
  output.push(cloneDeep(aStp));
  // for loop that starts at the second element
  for (let i = 1; i < arr.length; i += 1) {
    // for loop to compare current value to previous value(s)
    for (let j = i - 1; j >= 0; j -= 1) {
      const tempStore = [];
      // const animateStep = new AniStep(j + 1, j);

      setArrColor(temp.slice(0, j), myOrange);
      if (j + 2 < temp.length - 1) setArrColor(temp.slice(j + 1), myOrange);
      temp[j].color = myBlue;
      temp[j + 1].color = myBlue;
      aStp.array = temp;
      aStp.count();
      aStp.delayMult = 1;
      tempStore.push(cloneDeep(aStp));

      if (temp[j + 1].value < temp[j].value) {
        if (speed < 3) {
          temp[j + 1].color = myGreen;
          temp[j].color = myRed;
          aStp.array = temp;
          aStp.count();
          aStp.delayMult = 1;
          tempStore.push(cloneDeep(aStp));
        }

        swapArr(temp, j + 1, j);
        swapped = true;
        aStp.array = temp;
        aStp.count();
        aStp.delayMult = 1;
        tempStore.push(cloneDeep(aStp));
      } else if (speed < 3) {
        temp[j + 1].color = myRed;
        temp[j].color = myGreen;
        aStp.array = temp;
        aStp.count();
        aStp.delayMult = 1;
        tempStore.push(cloneDeep(aStp));
      }
      output = output.concat(tempStore);
      count += 1;
      if (!swapped) {
        break;
      } else swapped = false;
    }
  }

  return output;
}
export default insertionSort;

// function insertionSort(arr) {
//   let count = 0;
//   const temp = [...arr];
//   const output = [];
//   // for loop that starts at the second element
//   for (let i = 1; i < arr.length; i += 1) {
//     // for loop to compare current value to previous value(s)
//     for (let j = i - 1; j >= 0; j -= 1) {
//       const tempStore = [];
//       const animateStep = new AnimationStep(j + 1, j);

//       if (temp[j + 1].value < temp[j].value) {
//         animateStep.compare = true;
//         tempStore.push({ ...animateStep });
//         swapArr(temp, j + 1, j);
//         animateStep.swap = true;
//         tempStore.push({ ...animateStep });
//       } else {
//         animateStep.compare = false;
//         animateStep.delayMult = 2;
//         tempStore.push({ ...animateStep });
//         output.push(tempStore);
//         break;
//       }
//       output.push(tempStore);
//       count += 1;
//     }
//   }

//   return output;
// }
