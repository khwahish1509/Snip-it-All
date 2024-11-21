* **Persistent State** : It automatically saves and retrieves state to/from localStorage, which is perfect for:
* Saving user preferences
* Caching form data
* Maintaining app state between page reloads
* **Type-Safe** : It's written in TypeScript with generics, so it works with any type of data
* **Error Handling** : Includes try-catch blocks to prevent breaking the app if localStorage is unavailable

```
function UserSettings() {
  // Persist theme preference
  const [theme, setTheme] = useLocalStorage('theme', 'light');  // Persist user settings
  const [settings, setSettings] = useLocalStorage('userSettings', {
    notifications: true,
    language: 'en'
  });
}

```

Key features:

* Supports both direct value setting and functional updates
* Handles JSON serialization/deserialization
* Works with primitive and complex data types
* Provides a clean, simple API





# Useful JavaScript Code Snippets

This repository contains a collection of **useful JavaScript code snippets** that every developer should know. These snippets are designed to simplify common tasks, optimize performance, and improve productivity.


## Contents

* **Debouncing and Throttling** : Optimize event handling.
* **Object and Array Utilities** : Deep cloning, flattening arrays, and grouping elements.
* **DOM Interactions** : Smooth scrolling and mobile device detection.
* **Network Utilities** : Fetch with timeout.
* **Utility Functions** : Random hex colors, capitalize strings, check if an object is empty.
* **Date and URL Utilities** : Format dates and retrieve query parameters.



## Usage

Copy the code snippets you need and integrate them into your project. Each snippet includes a usage example for easy reference.

Feel free to customize or improve them as required. Happy coding! 🎉
