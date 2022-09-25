//Get Data From text file
const fs = require("fs");
var items = fs.readFileSync("Data.txt").toString().split(/\r?\n/);
function compare(p1, p2) {
  if (p1[0] > p2[0]) {
    return false;
  } else if (p1[0] == p2[0]) {
    if (p1[9] > p2[9]) {
      return false;
    } else if (p1[9] == p2[9]) {
      if (p1.slice(1, 9) >= p2.slice(1, 9)) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  } else {
    return true;
  }
}

function compare2(p1, p2) {
  if (p1[0] < p2[0]) {
    return false;
  } else if (p1[0] == p2[0]) {
    if (p1[9] < p2[9]) {
      return false;
    } else if (p1[9] == p2[9]) {
      if (p1.slice(1, 9) <= p2.slice(1, 9)) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  } else {
    return true;
  }
}
function swap(items, leftIndex, rightIndex) {
  var temp = items[leftIndex];
  items[leftIndex] = items[rightIndex];
  items[rightIndex] = temp;
}

function partition(items, left, right) {
  var pivot = items[Math.floor((right + left) / 2)], //middle element
    i = left, //left pointer
    j = right; //right pointer
  while (i <= j) {
    while (compare(items[i], pivot)) {
      i++;
    }
    while (compare2(items[j], pivot)) {
      j--;
    }
    if (i <= j) {
      swap(items, i, j); //sawpping two elements
      i++;
      j--;
    }
  }
  return i;
}
//fastest sort algorithm
function quickSort(items, left, right) {
  var index;
  if (items.length > 1) {
    index = partition(items, left, right); //index returned from partition
    if (left < index - 1) {
      //more elements on the left side of the pivot
      quickSort(items, left, index - 1);
    }
    if (index < right) {
      //more elements on the right side of the pivot
      quickSort(items, index, right);
    }
  }
  return items;
}
var sortedArray = quickSort(items, 0, items.length - 1);
console.log(sortedArray);

for (let x in sortedArray) {
  fs.appendFile("Output.txt", sortedArray[x] + "\n", (err) => {
    if (err) throw err;
  });
}
