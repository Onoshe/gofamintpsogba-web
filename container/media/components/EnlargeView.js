'use client'
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import {MdArrowForwardIos, MdArrowBackIos} from 'react-icons/md';
import EnlargeThumbnail from './EnlargeThumbnail';


const EnlargeView=({closeModal, photoSrc, photosGal, seltdIndex, 
        handleSelectedPhoto, title})=>{
    const handlePhotoScroll =(act)=>{
        const galLen = photosGal.length;
        const prevIndex = seltdIndex === 0? 0 : seltdIndex -1;
        const nextIndex = seltdIndex === galLen-1? galLen-1 : seltdIndex +1;
        if(act==="PREV"){handleSelectedPhoto(prevIndex);}
        if(act==="NEXT"){handleSelectedPhoto(nextIndex);}
    }

    return(
        <div className="z-50 relative max-w-[1200px] mt-[7rem] mb-8 mx-0 sm:mx-8 md:mx-16">
            
        <div className='bg-[silver] flex rounded-lg flex-col
            justify-center p-2 pt-8  overflow-y-auto whitespace-nowrap scrollbar-hide max9-h-[75vh]'
           >
            
            <p className='text-[#403f3f] font-bold absolute p-x2 pt-1 top-1 w-[80%] truncate text-ellipsis'
                >{title}</p>

            <div className='text-[#403f3f] font-bold absolute right-[60px] px-2 pt-1 top-1'
                onClick={closeModal}>
                    {`${seltdIndex +1}/${photosGal.length}`}
            </div>
            <div className='text-[red] font-bold absolute right-5 px-3 py-0 rounded-full top-1 cursor-pointer hover:bg-[red] hover:text-white'
                onClick={closeModal}>X</div>
            <img src={photoSrc} alt="" className='flex w-full9 max-h-[67vh] lg9:h-[65vh]'/>
            <button
                className="carousel-control-prev ml-6 absolute top-8 bottom-20 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
                onClick={()=>handlePhotoScroll('PREV')}>
                <MdArrowBackIos color='mediumblue' size={32} className="pl-2 hover:bg-sky-100"/>
            </button>
            <button
                className="carousel-control-next mr-6 pr-2 absolute top-8 bottom-20 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
                onClick={()=>handlePhotoScroll('NEXT')}>
                <MdArrowForwardIos color='mediumblue' size={32} className="hover:bg-sky-100"/>
            </button>
            <EnlargeThumbnail photosGal={photosGal} seltdIndex={seltdIndex} 
                handleSelectedPhoto={handleSelectedPhoto}
                />
        </div>
        </div>
    );
}

export default EnlargeView;
