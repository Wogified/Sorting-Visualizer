function genArr(n) {
  const x = [];
  for (let i = 1; i <= n; i += 1) {
    x.push({ value: i, key: `hello${i}` });
  }
  return shuffle(x);
  //   return x;
}

function shuffle(array) {
  let currentIndex = array.length;
  let temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function swap(array, i, j) {
  // console.log(array[0].value, i, j);
  console.log('hi');
  let temp = array[i];
  array[i] = array[j];
  array[j] = temp;
  return array;
}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

function bubble(arr, setState) {
  let count = 0;
  let swapCount = 0;
  let temp = [...arr];

  // for loop to interate through the length of the array
  for (let i = 0; i < arr.length; i += 1) {
    //  nested for loop to check each element in the array against the rest of the array
    for (let j = 0; j < arr.length - 1 - i; j += 1) {
      // if the array elem at the current position is greater
      // than the value at the next elem, then swap
      if (temp[j].value > temp[j + 1].value) {
        swap(temp, j, j + 1);
        setTimeout(() => {
          const newArr = [...swap(arr, j, j + 1)];
          setState(newArr);
        }, 250 * swapCount);
        swapCount += 1;
      }

      count += 1;
    }
  }
  return arr;
}

function pivot(arr, start = 0, end = arr.length + 1) {
  // create a variable to store the pivot value
  let pivot = arr[start];
  //  count of elems smaller than pivot
  let compInd = start;
  // for loop to go through the array to check the pivot against all elements
  for (let i = start + 1; i < arr.length; i++) {
    // if the current value at index is less than the value of the pivot
    // then add to the pivot index compInder and swap the value to
    // start accumulating in front of the pivot
    if (pivot > arr[i]) {
      compInd++;
      swap(arr, compInd, i);
    }
  }
  swap(arr, start, compInd);
  return compInd;
}

function quickSort(arr, left = 0, right = arr.length - 1) {
  //   console.log(arr);
  console.log(left, right);

  if (left < right) {
    let piv = pivot(arr, left, right);
    quickSort(arr, left, piv - 1);
    quickSort(arr, piv + 1, right);
  }
  return arr;
}

export { genArr, shuffle, swap, bubble };
