import { useState, useEffect, useLayoutEffect } from 'react';


const useContainerDimension =(ref)=>{

  const [dimensions, setDimensions] = useState({width:120, height:230, xCord:10, checked:false});

  const getDimensions=()=>{
    const { current } = ref
        const boundingRect = current.getBoundingClientRect()
        const { width, height, top } = boundingRect
        setDimensions({ width: Math.round(width), height: Math.round(height), xCord:Math.round(top), checked:true })
    }

  useLayoutEffect(()=>{
    //First run
    if (ref.current) {getDimensions()}
  },[]);
  useEffect(() => {
    const resizeListener = () => {
        if (ref.current) {getDimensions()}
    };
    window.addEventListener('resize', resizeListener);

    return () => {
      window.removeEventListener('resize', resizeListener);
    }
  }, []);

  return dimensions;
}


export default useContainerDimension;