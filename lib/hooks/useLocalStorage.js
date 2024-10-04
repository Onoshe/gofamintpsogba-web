'use client'
import { useState, useEffect } from "react";


function getLocalStorage(key, initialValue) {
    const { localStorage } = typeof window !== "undefined" ? window : {};
    return localStorage?.getItem(key)?  JSON.parse(localStorage?.getItem(key)) : initialValue
  }

function useLocalStorage(key, initialValue) {
    // Get the stored value from localStorage, or use the initialValue
    
    const storedValue =  getLocalStorage(key, initialValue); //JSON.parse(localStorage.getItem(key)) || initialValue;
  
    // State to keep track of the current value
    const [value, setValue] = useState(storedValue);
  
    // Function to set a new value in localStorage and update the state
    const setStoredValue = (newValue) => {
      setValue(newValue);
      if(typeof window !== "undefined" && window?.localStorage)
        localStorage.setItem(key, JSON.stringify(newValue));
    };
  
    return [value, setStoredValue];
  }
  

  export default useLocalStorage