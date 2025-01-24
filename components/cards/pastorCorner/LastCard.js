'use client'
import React from "react";
import { useRouter } from "next/navigation";


const LastCard =({text, type, pastorCornerPhotos})=>{
    const router = useRouter();    
    const lenPC = pastorCornerPhotos?.length? pastorCornerPhotos.length : 0;
    const randomPhoto = getRandomNumber(0, lenPC-1);

    const navigateHandler =()=>{
        if(type==="MORE") router.push('/pastor-corner')
    }

    let bgImg = "";
    if(randomPhoto && pastorCornerPhotos?.length){
         bgImg = pastorCornerPhotos[randomPhoto]
    }
    return( 
        <div className="rounded-lg mx-2 border-4 border-solid border-white  min-w-[250px] w-[30vw] max-w-sm
            h-[350px] cursor-pointer shadow-md bg-center bg-contain"
            style={{backgroundImage:`url(${bgImg})`}}
            onClick={navigateHandler}>
            <p className='bg-[rgba(100,100,200,0.7)] hover:bg-[rgba(100,100,200,0.4)] text-center
                text-white hover:text-[coral] px-3 flex flex-1 h-full justify-center items-center'>
                {text}
            </p>
        </div>
     
    );
}


export default LastCard;

export function getRandomNumber(min, max) {
    if (min > max) {
        [min, max] = [max, min]; // Swap if min is greater than max
      }
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }