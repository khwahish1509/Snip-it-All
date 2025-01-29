// Middleware to log requests
const logRequest = (req, res, next) => {
  const { method, url } = req;
  console.log(`[${new Date().toISOString()}] ${method} ${url}`);
  next(); // Pass control to the next middleware
};

// Usage in Express app
const express = require("express");
const app = express();
app.use(logRequest);

app.get("/", (req, res) => res.send("Hello, world!"));
app.listen(3000, () => console.log("Server running on port 3000"));
