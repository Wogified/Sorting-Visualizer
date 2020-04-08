// import { AnimationStep } from "./animations";

function printArr(arr) {
  let output = '[';
  let n = arr.length;
  for (let i = 0; i < arr.length; i += 1) {
    output += `${arr[i]},`;
  }
  output += ']';
  console.log(output);
  console.log('='.repeat(n * 2 + 2));
}

function mergeSort(arr) {
  const output = [];
  let temp = [...arr];
  let prevArr = [...arr];

  function mergeArr(a, b, start, end) {
    let count = 0;
    let arrMid = [];
    let arrImage = prevArr;
    // console.log(arrImage);
    let arrStart = arrImage.slice(0, start);
    let arrEnd = arrImage.slice(end);
    printArr(arrStart.concat(a, b, arrEnd));
    let unsortedArr = a.concat(b);
    while (a.length || b.length) {
      let smallest;
      if ((a.length && !b.length) || a[0] < b[0]) {
        smallest = a.shift();
      } else {
        smallest = b.shift();
      }
      if (smallest !== unsortedArr[count]) console.log(smallest, unsortedArr[count], 'swap');
      arrMid.push(smallest);
      printArr(arrStart.concat(arrMid, a, b, arrEnd));
      count += 1;
      //   console.log(arrStart.concat(arrMid, a, b, arrEnd));
    }
    const arrTemp = arrStart.concat(arrMid, arrEnd);
    prevArr = arrTemp;
    output.push(arrTemp);
    return arrMid;
  }

  function helper(array, start, end) {
    // the base case is that if the length of the arr is less than or equal to 1 then return the arr
    if (array.length <= 1) return array;
    let n = array.length;
    let mid = Math.floor(n / 2);

    let left = helper(array.slice(0, mid), 0, end - mid);
    let right = helper(array.slice(mid), end - n, end);
    // console.log(array, `${end - n}-${end}`);

    return mergeArr(left, right, end - n, end);
    // return mergeArr(mergeSort(arr.slice(0, n)), mergeSort(arr.slice(n)));
  }
  let n = temp.length;
  const result = helper(temp, 0, n);
  //   console.log(output);
  console.log('This is the output Animation Array');
  for (item in output) {
    printArr(output[item]);
  }
  return result;
}

var testCases2 = [
  [[5, 1, 3, 6, 4, 9, 5, 2], 'ello'],
  //   [[4, 3, 2, 1], "poo"],
  //   [[1, 2, 3, 4, 5, 6, 8, 7, 9], "poo"],
];

for (item in testCases2) {
  a = testCases2[item][0];
  console.log('-----------------------------------------------------');
  console.log(a);
  console.log('-----------------------------------------------------');
  result = mergeSort(a);
  console.log(result);
}
