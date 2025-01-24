'use client'
/* eslint-disable @next/next/no-img-element */
import React,{createRef,} from 'react';



const EnlargeThumbnail=({photosGal, seltdIndex, handleSelectedPhoto,})=>{
    const contRef = React.useRef(null);
    const arrLength = photosGal.length;
    const elRefs = React.useRef([]);

    if(arrLength>0){
        if (elRefs.current.length !== arrLength) {
            elRefs.current = Array(arrLength)
                .fill()
                .map((_, i) => elRefs.current[i] || createRef());
            }
    }

    const scrollToPhoto = (index) => {
        const scrollOffset = elRefs.current[index].current.getBoundingClientRect().right;
        contRef.current.scrollTo({ left: scrollOffset, behavior: 
          'smooth' 
        })
      };
   React.useEffect(() => {
        scrollToPhoto(seltdIndex);
    }, [seltdIndex]);

    
    function handleOnClick(i){
        handleSelectedPhoto(i); 
        scrollToPhoto(i);
    }

    return(
            <div className='w-[99%] bg-[aliceblue] m-2 my-1 mb-0 mr-4 h-24 p-2 overflow-x-auto flex flex-row'
                ref={contRef}>
              {photosGal.map((photo,i)=>{

                    return (
                        <img
                            key={`${i}+phot`}
                            ref={elRefs.current[i]}  
                            src={photo?.imgPath} alt={photo.name}
                            className={`flex w-24 mr-2 cursor-pointer thumbnailRef-${i}`}
                            style={{border:seltdIndex===i? '5px solid lime' :''}}
                            onClick={()=>handleOnClick(i)}
                        />
                    );
              })}
            </div>
    );
}

export default EnlargeThumbnail;
