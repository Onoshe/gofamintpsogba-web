'use client'

import {useState, useEffect} from "react";

function getOnScroll() {
    //const { innerWidth: width, innerHeight: height } = window;
    const {scrollX, scrollY, scrollTo} = typeof window !== "undefined" ? window : {};
    return {
      scrollX,
      scrollY
    };
  }

export default function useOnScroll() {
    const [scrollPos, setScrollPos] = useState(getOnScroll());
  
    useEffect(() => {
      function handleResize() {
        setScrollPos(getOnScroll());
      }
  
      window.addEventListener('scroll', handleResize);
      return () => window.removeEventListener('scroll', handleResize);
    }, []);
  
    return [scrollPos, setScrollPos];
  }

