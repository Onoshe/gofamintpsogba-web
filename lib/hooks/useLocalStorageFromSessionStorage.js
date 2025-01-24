'use client'
import { useState, useEffect } from "react";
//https://codesandbox.io/s/0oxqm8l54l?file=/src/index.js:229-430

export default function useLocalStorageSessionStorage(key, defaultValue = null) {
  const [value, setValue] = useState(getValueFromLocalStorage(key));

  function init() {
    const initialValue = getValueFromLocalStorage(key);
    if (initialValue === null || initialValue === "null") {
      set(defaultValue);
    }
  }

  function getValueFromLocalStorage() {
    const res = localStorage.getItem(key);
    return JSON.parse(res)
  }

  function saveValueToLocalStorage(key, value) {
    return localStorage.setItem(key, JSON.stringify(value));
  }

  function set(newValue) {
    setValue(newValue);
    saveValueToLocalStorage(key, newValue);
  }

  function remove() {
    set(null);
    localStorage.removeItem(key);
  }

  useEffect(() => {
    init();
  }, []);

  return {
    value,
    set,
    remove
  };
}
