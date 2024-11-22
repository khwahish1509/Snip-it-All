// Function to generate a random unique ID

const generateUID = () => "_" + Math.random().toString(36).substr(2, 9); // Random string

console.log(generateUID()); // Example output: _5g9a1lfk2
