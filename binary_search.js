// Function for binary search

const binarySearch = (arr, target) => {
  let left = 0, right = arr.length - 1; // Define boundaries
  while (left <= right) {
    const mid = Math.floor((left + right) / 2); // Calculate mid-point
    if (arr[mid] === target) return mid; // Target found
    arr[mid] < target ? (left = mid + 1) : (right = mid - 1); // Adjust search range
  }
  return -1; // Target not found
};

console.log(binarySearch([1, 3, 5, 7, 9], 7)); // 3 (Index of target)
