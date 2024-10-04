import React, {useState, useEffect, useRef} from 'react'
import { MdClose } from 'react-icons/md';
/* eslint-disable @next/next/no-img-element */


const DragAndDropFileInput = ({file, setFile, handleUpload, getFileExtension, infoMsg, setInfoMsg, handleCancel, 
  isDragging, isDropped, setIsDragging, setIsDropped, selected, selectFile, fileFormats, showUploadBtn, maxSize}) => {
    const inputRef = useRef()

  const fileExt = getFileExtension(file);
  //console.log(fileExt)
  const handleFileChange = (e) => {
    //console.log(e.target.files[0])
    setFile(e.target.files[0]);
    setIsDropped(true);
    setInfoMsg({msg:""})
  };


  const handleAllowDrop =(e)=>{
    e.preventDefault(); 
  }
  const handleDragEnter =(e)=>{
    e.preventDefault();
    setIsDragging(true);
  }
  const handleDragLeave =(e)=>{
    e.preventDefault();
    setIsDragging(false);
  }
  const handleDrop =(e)=>{
    e.preventDefault();
    setIsDragging(false);
    setIsDropped(true)
    //console.log(e.dataTransfer)
    const dropFile = e.dataTransfer.files[0];
    setFile(dropFile);
    setInfoMsg({msg:""})
  }

  //console.log(file);

  var fileThumbnail;  
  if(file){
    if(['xls', 'xlsx', 'csv'].includes(fileExt?.ext?.toLowerCase())){
        fileThumbnail = <img src="/icons8Excel.png" alt="Uploade image" className='size-[100px]'/>;
    }else if(['jpg', 'jpeg', 'png',].includes(fileExt?.ext?.toLowerCase())){
        fileThumbnail =  <img src={URL.createObjectURL(file)} alt="Uploade image" className='size-[100px]'/>;
    }else if(['pdf'].includes(fileExt?.ext?.toLowerCase())){
      fileThumbnail =  <img src="/icons8Pdf.png" alt="Uploade image" className='size-[100px]'/>;
    }else{
    fileThumbnail =  <img src={URL.createObjectURL(file)} alt="Uploade image" className='size-[100px]'/>;
    }
  }
  
  const dropZoneBg = isDragging || isDropped? 'bg-sky-100' : 'bg-[#fefefe]';
  return (
    <div className='p-2 flex flex-col'>
        

        <div className='flex justify-center items-center flex-col'>
              <div className={`w-full py-5 px-3 max-w-screen-smc border-dashed border-2 ${isDropped? 'border-teal-500' : 'border-sky-500'} ${dropZoneBg} flex flex-col justify-center items-center`}
               onDragOver={handleAllowDrop}
               onDrop={handleDrop}
               onDragEnter={handleDragEnter}
               onDragLeave={handleDragLeave}>
                <MdClose size={32} className={`ml-[100px] font-bold text-red-900 hover:text-red-700 active:text-red-500 cursor-pointer ${file?.name? '' :'hidden'}`}
                  onClick={handleCancel}/>
                {file ? (
                    fileThumbnail
                  ) : <></>
                  }

                {isDropped?
                  <p className='text-blue-700 text-center'>{file?.name}</p>
                  :<div className={`flex justify-center items-center flex-col ${file?.name? 'hidden':''}`}>
                    <p>Drag and drop to upload</p>
                  <p>or</p>
                </div>
                }
                {!file?.name?
                  <div>
                      <input ref={inputRef}  type='file' onChange={handleFileChange} className='hidden'/>
                      <p className='bg-blue-400 text-white  w-fit py-2 px-5 rounded-md active:bg-blue-300 hover:bg-blue-500 cursor-pointer my-3'
                        onClick={()=>inputRef.current.click()}>
                        {selectFile || `Select File`}
                      </p>
                  </div>

                :<></>
                 }                 
                 <p className='py-1 italic text-sm text-center'>{`File formats: ${fileFormats?.toString()}`}</p>
                 <p className='py-1 italic text-sm text-center'>{`Maximum size: ${maxSize}kb`}</p>
                 <p className='italic text-sm'>{file?.size? 'Selected file - '+getFileExtension(file)?.ext+"/"+file?.size/1000+'kb' : ""}</p>
              </div>
              <p className={`text-sm p-2 ${infoMsg?.error? 'text-red-500' :'text-teal-800'}`}>{infoMsg?.msg}</p>
              <p className={`${showUploadBtn? '' : 'hidden'} ${file?.name? 'active:bg-teal-600 hover:bg-teal-700 bg-teal-800 cursor-pointer ': 'bg-slate-400'} text-white w-fit py-2 px-7 rounded-md my-5`}
             onClick={handleUpload}>Upload</p>
        </div>
        
        
    </div>
  )
}




export default DragAndDropFileInput