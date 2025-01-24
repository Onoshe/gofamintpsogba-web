'use client'
import { useState, useEffect } from 'react';


const useElementDimension =(ref)=>{
  // save current window width in the state object
  //let [width, setWidth] = useState(getWidth());
  //let [height, setHeight] = useState(getHeight());
  const [dimensions, setDimensions] = useState({width:300, height:300, checked:false});

  // in this case useEffect will execute only once because
  // it does not have any dependencies.
  useEffect(() => {
    const resizeListener = () => {
        if (ref.current) {
            const { current } = ref
            const boundingRect = current.getBoundingClientRect()
            const { width, height } = boundingRect
            setDimensions({ width: Math.round(width), height: Math.round(height), checked:true })
          }
    };
    // set resize listener
    window.addEventListener('resize', resizeListener);

    // clean up function
    return () => {
      // remove resize listener
      window.removeEventListener('resize', resizeListener);
    }
    //console.log('CHECK')
  }, []);

  return dimensions;
}


export default useElementDimension;