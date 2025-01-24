import React from 'react'
import { MdDelete } from 'react-icons/md'
import { BsFileEarmarkPdf, BsFileEarmarkWord } from 'react-icons/bs';



const UploadedItem = ({imgSrc, seltdTab, onClickHandler, uploadedDoc}) => {
  //console.log(imgSrc)
  const docUpload = 
        (<div className='w-full h-full flex flex-col justify-center'>
            {uploadedDoc[0].type === 'pdf'?
                <BsFileEarmarkPdf color="red" className='cursor-pointer w-full h-full'/> :
                <BsFileEarmarkWord color="mediumblue" className='cursor-pointer w-full h-full'/>
            }
            <h1>{uploadedDoc[0].name}</h1>
        </div>); // :
       

  return (
      <div className="relative h-full">
        {seltdTab === 0?    
         docUpload : seltdTab === 3?
         <video
         src={imgSrc}
         type="video/mp4"
         loop
         controls={false}
         //muted
         autoPlay
         className="w-full h-full object-cover"
        /> :
        <img
        src={imgSrc}
        alt="uploaded-pic"
        className={`h-full w-full`}
        />
        
        }

          <button
            type="button"
            className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
            onClick={onClickHandler}
          >
            <MdDelete />
        </button>
      </div>
  )
}


const UploadedImage =({src})=>{

  return(
      <div className="flex gap-2 mt-2 mb-2 items-center bg-white rounded-lg ">
          <img
            src={src}
            className="w-10 h-10 rounded-full"
            alt="user-profile"
          />
          <p className="font-bold">{'user.userName'}</p>
        </div>
  );
}

export {UploadedItem, UploadedImage, }
