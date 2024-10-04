import { useState, useEffect, useLayoutEffect } from 'react';


const useTopAndLeftOffset =(ref)=>{
  const [offSets, setDimensions] = useState({leftOffset:0, topOffset:0, checked:false});

  const getDimensions=()=>{
    const { current } = ref
        const leftOffset = current.offsetLeft;
        const topOffset = current.offsetTop;
        setDimensions({ leftOffset: Math.round(leftOffset), topOffset: Math.round(topOffset), checked:true })
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

  return offSets;
}


export default useTopAndLeftOffset;