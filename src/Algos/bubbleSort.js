import { cloneDeep } from 'lodash';
import { swapArr, myColors } from './startingDataFunctions';
import { AniStep, setArrColor } from './animations';

function bubbleSort(arr, speed) {
  let temp = cloneDeep(arr);
  let output = [];
  const { myBlue, myGreen, myOrange, myRed } = myColors;

  // variable for determining whether or not any array values have been swapped per iteration
  let swapped = false;
  const aStp = new AniStep(arr);
  output.push(cloneDeep(aStp));

  // for loop to interate through the length of the array
  for (let i = 0; i < arr.length; i += 1) {
    //  nested for loop to check each element in the array against the rest of the array

    for (let j = 0; j < arr.length - 1 - i; j += 1) {
      aStp.sortCount();
      // if the array elem at the current position is greater
      // than the value at the next elem, then swap
      const tempStore = [];
      // setArrColor2(temp, [0, j], myOrange);
      // if (j + 2 < temp.length - 1) setArrColor2(temp, [j + 2, temp.length], myOrange);
      setArrColor(temp.slice(0, j), myOrange);
      if (j + 2 < temp.length - 1) setArrColor(temp.slice(j + 1), myOrange);
      temp[j].color = myBlue;
      temp[j + 1].color = myBlue;
      aStp.array = temp;
      aStp.count();
      aStp.delayMult = 1;
      tempStore.push(cloneDeep(aStp));

      if (temp[j].value > temp[j + 1].value) {
        if (speed < 3) {
          temp[j].color = myGreen;
          temp[j + 1].color = myRed;
          aStp.array = temp;
          aStp.count();
          aStp.delayMult = 1;
          tempStore.push(cloneDeep(aStp));
        }
        swapArr(temp, j, j + 1);
        swapped = true;

        aStp.array = temp;
        aStp.count();
        aStp.delayMult = 1;
        tempStore.push(cloneDeep(aStp));
      } else if (speed < 3) {
        temp[j].color = myRed;
        temp[j + 1].color = myGreen;
        aStp.array = temp;
        aStp.count();
        aStp.delayMult = 1;
        tempStore.push(cloneDeep(aStp));
      }

      output = output.concat(tempStore);
    }
    if (!swapped) {
      break;
    } else swapped = false;
  }

  // Clear out all colors and mark as last step
  setArrColor(aStp.array, myOrange);
  aStp.last = true;
  aStp.count();
  output.push(cloneDeep(aStp));
  return output;
}

export default bubbleSort;
