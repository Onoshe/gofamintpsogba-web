'use client'
/* eslint-disable @next/next/no-img-element */
import React from 'react';


function PhotoViewerForPhone({photosGal,details, show, closeModal, photoIsClicked}){
  const contRef = React.useRef(null);
    const autoScrollToTop = () => {
        contRef.current.scrollTo({ top: 0, behavior: 
          'smooth' 
        })
    };
    React.useEffect(()=>{
      contRef.current.scrollTo({ top: photosGal.length * 70,});
      setTimeout(()=> autoScrollToTop(), 50)
      
    },[photoIsClicked]);
 
  return (
      
      <div className={`bg-gray-600 fixed h-screen w-full fixed-top
          ${show? '' :'hidden'} z-3 overflow-y-auto`}
          ref = {contRef}>
           <p className='text-[#403f3f] fixed pl-2 pt-1 top-1 w-[85%] truncate text-ellipsis'
                >{details}</p>
          <p className='bg-white fixed py-1 m-3 px-2 right-3 cursor-pointer hover:bg-red-600 hover:text-white rounded-lg text-red-600 w-fit font-bold'
           onClick={closeModal}>X</p>
              {
                photosGal?.map((item,i)=>{

                  return(
                    <img src={item.imgPath} alt="ps-media" key={`${i}+galls`} 
                      className='w-full rounded-md mb-2'/>
                  );
                })
              }
      </div>
  
      );
}


export default PhotoViewerForPhone;
