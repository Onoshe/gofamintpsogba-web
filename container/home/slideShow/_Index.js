'use client'
import React, { useState } from "react";
import FloatText from "./FloatText";



const delay = 7000;

const SlideShowIndex = ({slidesImages}) => {
    const [index, setIndex] = useState(0);
    const timeoutRef = React.useRef(null);
    const [pause, setPause] = useState(false);
    //const {homeImg } = usePhotoGalleriesStore((state)=>state);

    const images = [
      {image: slidesImages[0] },
      {image: slidesImages[1] },
      {image: slidesImages[2] },
      {image: slidesImages[3] },
      {image:slidesImages[4] },
      {image:slidesImages[5] },
      {image:slidesImages[6] },
      {image:slidesImages[7] },
    ];

    function resetTimeout() {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }
    function togglePulseSlide(){
        setPause(!pause);
    }
    function changeSlide(act){
        if(act==="PREV"){
            setIndex(prev=>prev===0? images.length-1 : prev -1);
        }
        if(act==="NEXT"){
            setIndex(prev=>prev=== images.length-1? 0 : prev +1);
        }
        if(!isNaN(act)){
            setIndex(act);
        }
        setPause(false);
    }
    React.useEffect(() => {
      resetTimeout();
      if(pause){
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          } 
      }else{
        timeoutRef.current = setTimeout(
            () =>
              setIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
              ),
            delay
          );
      }
  
      return () => {
        resetTimeout();
      };
    }, [index, pause]);

    if(!images){
      return <div>Loading page, please wait....</div>
    }
    return (
      <div className="overflow-hidden bg-fuchsia-400 w-full pb-5"
        style={{clipPath:"polygon(0 0,100% 0, 100% 90%, 50% 100%, 0 90%)"}}>
        <div className="overflow-hidden w-full relative"
          style={{clipPath:"polygon(0 0,100% 0, 100% 90%, 50% 100%, 0 90%)"}}>
          <div
            className="transition duration-1000 ease-linear whitespace-nowrap"
            style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
          >
            {images.map((img, index) => (
              <img key={`${index}+slides`}
                  className="inline-block w-full rounded-b-lg min-h-[270px] h-[43vw]" src={img?.image} 
                  alt="gofamint_PS_Ogba"/>
            ))}
          </div>
          <div className="text-center absolute bottom-5 w-full flex flex-row justify-center">
            {images.map((_, idx) => (
              <div
                key={`${idx}+slidesDots`}
                className={`inline-block h-3 w-3 sm:h-4 sm:w-4 border-[#c4c4c4] border-solid border-2 rounded-full cursor-pointer m-2  ${index === idx ? "bg-[#6a0dad]" : "bg-transparent"}`}
                onClick={() => {
                  changeSlide(idx);
                }}
              ></div>
            ))}
          </div>
          <FloatText/>
        </div>
      </div>
    );
  };


export default SlideShowIndex;
//export {images}

