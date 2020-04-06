import { swapArr } from './startingDataFunctions';

function bubbleSort(arr) {
  const temp = [...arr];
  const output = [];
  // variable for determining whether or not any array values have been swapped per iteration
  let swapped = false;

  // for loop to interate through the length of the array
  for (let i = 0; i < arr.length; i += 1) {
    //  nested for loop to check each element in the array against the rest of the array

    for (let j = 0; j < arr.length - 1 - i; j += 1) {
      // if the array elem at the current position is greater
      // than the value at the next elem, then swap
      const tempStore = [];
      const iterDetail = {
        ind1: j,
        ind2: j + 1,
        swap: false,
        compare: false,
      };

      if (temp[j].value > temp[j + 1].value) {
        iterDetail.compare = true;
        tempStore.push({ ...iterDetail });

        swapArr(temp, j, j + 1);

        swapped = true;
        iterDetail.swap = true;
        tempStore.push({ ...iterDetail });
      } else {
        iterDetail.compare = false;
        tempStore.push({ ...iterDetail });
        iterDetail.compare = false;
        tempStore.push({ ...iterDetail });
      }

      output.push(tempStore);
    }
    if (!swapped) {
      break;
    } else swapped = false;
  }

  return output;
}

export { bubbleSort };
