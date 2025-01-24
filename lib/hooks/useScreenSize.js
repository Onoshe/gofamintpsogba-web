'use client'
import { useState, useEffect } from "react";
import useWindowDimensions from "./useWindowDimension";
const sizes = ['xxsmc', 'xsmc', 'smc', 'sm', 'md', 'mdc', 'lg', 'xl','xlc', '2xl'];

function getScreenSize(size) {
    let screenSize = 0;    

    if(size >0 && size <= 300){
        screenSize = sizes[0]
    }else if(size >300 && size <= 360){
        screenSize = sizes[1]
    }else if(size >360 && size <= 500){
        screenSize = sizes[2]
    }else if(size >500 && size <= 640){
        screenSize = sizes[3]
    }else if(size >640 && size <= 768){
        screenSize = sizes[4]
    }else if(size >768 && size <= 900){
        screenSize = sizes[5]
    }else if(size >900 && size <= 1024){
        screenSize = sizes[6]
    }else if(size >1024 && size <= 1280){
        screenSize = sizes[7]
    }else if(size >1028 && size <= 1500){
        screenSize = sizes[8]
    }else{
        screenSize = sizes[9]
    }

   return screenSize
}


export default function useScreenSize() {
    const [screenSize, setScreenSize] = useState(useWindowDimensions().width);
    const {width} = useWindowDimensions();

    useEffect(() => {
      setScreenSize(getScreenSize(width))

    }, [width]);
  
    return screenSize;
  }

