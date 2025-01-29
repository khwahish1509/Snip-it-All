// Function to fetch data with retry logic

const fetchWithRetry = async (url, retries = 3) => {
  for (let i = 0; i < retries; i++) { // Loop to retry
    try {
      const response = await fetch(url); // Fetch API
      if (!response.ok) throw new Error("Failed to fetch"); // Handle HTTP errors
      return await response.json(); // Return parsed response
    } catch (err) {
      if (i === retries - 1) throw err; // Rethrow error after max retries
    }
  }
};

fetchWithRetry("https://jsonplaceholder.typicode.com/posts") // Example API
  .then((data) => console.log(data)) // Log successful response
  .catch((err) => console.error(err)); // Handle failure
