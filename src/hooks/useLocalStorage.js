// Custom hook: useLocalStorage
// Handles reading and writing any value to localStorage with useState sync

import { useState, useEffect } from "react";

export function useLocalStorage(key, initialValue) {
  // Read from localStorage on first render (or use initialValue)
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (err) {
      console.error("useLocalStorage read error:", err);
      return initialValue;
    }
  });

  // Persist to localStorage whenever storedValue changes
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (err) {
      console.error("useLocalStorage write error:", err);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
