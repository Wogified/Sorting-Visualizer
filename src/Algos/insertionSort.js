import { swapArr } from './startingDataFunctions';

function insertionSort(arr) {
  let count = 0;
  let temp = [...arr];
  let output = [];
  // for loop that starts at the second element
  for (let i = 1; i < arr.length; i += 1) {
    // for loop to compare current value to previous value(s)
    for (let j = i - 1; j >= 0; j -= 1) {
      let tempStore = [];
      let iterDetail = {
        ind1: j + 1,
        ind2: j,
        swap: false,
        compare: false,
      };

      if (temp[j + 1].value < temp[j].value) {
        iterDetail.compare = true;
        tempStore.push({ ...iterDetail });
        swapArr(temp, j + 1, j);
        iterDetail.swap = true;
        tempStore.push({ ...iterDetail });
      } else {
        iterDetail.compare = false;
        tempStore.push({ ...iterDetail });
        iterDetail.compare = false;
        tempStore.push({ ...iterDetail });
        output.push(tempStore);
        break;
      }
      output.push(tempStore);
      count += 1;
    }
  }

  return output;
}
export { insertionSort };
