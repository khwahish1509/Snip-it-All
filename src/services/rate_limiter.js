// Function to create a rate limiter
const rateLimiter = (func, limit, time) => {
  let calls = 0;
  return (...args) => {
    if (calls < limit) {
      calls++;
      func(...args);
      setTimeout(() => calls--, time); // Reset after time interval
    } else {
      console.log("Rate limit exceeded. Try again later.");
    }
  };
};

// Usage example: limited logging
const limitedLog = rateLimiter(console.log, 2, 3000); // Allow 2 calls per 3 seconds
limitedLog("Call 1");
limitedLog("Call 2");
limitedLog("Call 3"); // Exceeds rate limit
