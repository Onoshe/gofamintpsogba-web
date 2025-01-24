'use client'
import { useState } from "react";

function useLocalStorageNew(keyName="@gofamintpsogba", defaultValue) {
  //const key = "@gofamintpsogba";
  //const [returnedVal, setReturnedVal] = useState(null);
  const [persistState, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {
      return defaultValue;
    }
    try {
      const value = window.localStorage.getItem(keyName);
      if(value){
        return JSON.parse(value);
      }else{
          window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
          return defaultValue
      } 
    } catch (error) {
      return defaultValue;
    }
  });

  /*const getStoredValue =(keyNam)=>{
    const value = window.localStorage.getItem(keyNam);
      if(value){
        setStoredValue(JSON.parse(value));
      }else{
          window.localStorage.setItem(keyNam, JSON.stringify(defaultValue));
          setStoredValue(defaultValue)
      }
  };*/

  const setPersistState = (newValue) => {
    if(newValue){
      try {
          window.localStorage.setItem(keyName, JSON.stringify(newValue));
      } catch (error) {}
      setStoredValue(newValue);
    }
  };


  return [persistState, setPersistState];
}

export default useLocalStorageNew