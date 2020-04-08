import { swapArr } from './startingDataFunctions';
import { AnimationStep } from './animations';

function insertionSort(arr) {
  let count = 0;
  const temp = [...arr];
  const output = [];
  // for loop that starts at the second element
  for (let i = 1; i < arr.length; i += 1) {
    // for loop to compare current value to previous value(s)
    for (let j = i - 1; j >= 0; j -= 1) {
      const tempStore = [];
      const animateStep = new AnimationStep(j + 1, j);

      if (temp[j + 1].value < temp[j].value) {
        animateStep.compare = true;
        tempStore.push({ ...animateStep });
        swapArr(temp, j + 1, j);
        animateStep.swap = true;
        tempStore.push({ ...animateStep });
      } else {
        animateStep.compare = false;
        animateStep.delayMult = 2;
        tempStore.push({ ...animateStep });
        output.push(tempStore);
        break;
      }
      output.push(tempStore);
      count += 1;
    }
  }

  return output;
}
export default insertionSort;
