'use client'
import { useState, useEffect } from "react";

function getWindowDimensions(){
    const {innerWidth: width, innerHeight: height} = window;
    return {
        winWidth:width, 
        winHeight:height
    };
}

function useWindowsDimensions(){
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(()=>{
        function handleResize(){
            setWindowDimensions(getWindowDimensions());
        }
        window.addEventListener('resize', handleResize);
        return ()=>window.removeEventListener('resize', handleResize);
    },[]);

    return windowDimensions;
}