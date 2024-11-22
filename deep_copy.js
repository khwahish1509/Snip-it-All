// Function to create a deep copy of an object

const deepCopy = (obj) => JSON.parse(JSON.stringify(obj)); // Using JSON to deep copy

const original = { a: 1, b: { c: 2 } }; // Original object
const copy = deepCopy(original); // Deep copy of the object

copy.b.c = 42; // Modify the copy

console.log(original.b.c); // 2 (original is not affected)
