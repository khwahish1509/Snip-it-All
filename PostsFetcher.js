/* This code snippet is a simple React app that fetches a list of posts from a fake 
online API and displays them on the screen. It uses React's "useState" to store the 
posts data and "useEffect" to make the API request when the app first loads. The app 
checks if the data is successfully fetched and shows a list of post titles. If the data 
is still loading, it displays a "Loading..." message. If an error occurs while fetching 
the data, it shows an error message. This is a basic example of how to fetch data from 
an API and display it in a React component. */

import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState(null); // State to store fetched data
  const [error, setError] = useState(null); // State to store any errors

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts') // Fetch data from API
      .then((response) => {
        if (!response.ok) { // Check if response is successful
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse response to JSON
      })
      .then((data) => setData(data)) // Update state with fetched data
      .catch((error) => setError(error)); // Handle any errors during fetch
  }, []); // Empty array means this effect runs only once on mount

  return (
    <div>
      <h1>Fetched Posts</h1>

      {error ? (
        <p>Error: {error.message}</p> // Show error message if there's an error
      ) : data ? (
        <ul>
          {data.map((post) => (
            <li key={post.id}>{post.title}</li> // Display post titles
          ))}
        </ul>
      ) : (
        <p>Loading...</p> // Show loading message if data is still being fetched
      )}
    </div>
  );
}

export default App;
