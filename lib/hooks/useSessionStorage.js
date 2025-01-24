'use client'
import { useState, useEffect } from "react";
//https://codesandbox.io/s/0oxqm8l54l?file=/src/index.js:229-430

export default function useSessionStorage(key, defaultValue = null) {
  const [value, setValue] = useState(getValueFromSessionStorage(key));

  function init() {
    const initialValue = getValueFromSessionStorage(key);
    if (initialValue === null || initialValue === "null") {
      set(defaultValue);
    }
  }

  function getValueFromSessionStorage() {
    const res = sessionStorage.getItem(key);
    return JSON.parse(res)
  }

  function saveValueToSessionStorage(key, value) {
    return sessionStorage.setItem(key, JSON.stringify(value));
  }

  function set(newValue) {
    setValue(newValue);
    saveValueToSessionStorage(key, newValue);
  }

  function remove() {
    set(null);
    sessionStorage.removeItem(key);
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
