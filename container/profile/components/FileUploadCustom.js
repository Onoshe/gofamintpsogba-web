'use client'
import { postRequest, postRequestFormData } from "@/lib/apiRequest/postRequest";
import { getPostImageLink } from "@/lib/apiRequest/urlLinks";
import React, { Children } from "react";
import { BiCloudUpload, BiUpload } from "react-icons/bi";
import { BsImage } from "react-icons/bs";
import { IoMdTrash } from "react-icons/io";
import { MdClose, MdDelete } from "react-icons/md";
/* eslint-disable @next/next/no-img-element */


export const FileUploadCustom = ({file, setFile, session,userId, userPhotoCheck, className, notify}) => {
    const inputRef = React.useRef();
    const postUrl = getPostImageLink();
    //const [file, setFile] = React.useState(null);
   

  const handleReset =()=>{
    setFile(null);
    inputRef.current.value = null;
    userPhotoCheck.mutate();
  }

  async function handleFileChange(e) {
    const files = e.target.files;
    const fileExtension = e.target.value.split('.')[1];

      if (!(files && files[0])) return
      if(!['jpg', 'jpeg', 'png'].includes(fileExtension?.toLowerCase())){
        notify("error", "Supported file format include jpg, jpeg and png!")
      }else{
          const file = e.target.files[0];
          const fileName = e.target.files[0].name;
          let fileSize = e.target.files[0].size;
          const fileSizeInKb = fileSize/1000+"kb"; //600kb
          if(fileSize < 600000){
            try {
                setFile(file);
            } catch (error) {
              console.error(error);
            }
          }else{notify("error", "Maximum file size is 600kb");}
      }
  }

  const handleSaveImage = async ()=>{
    //return console.log(userId)
     try {
      const formData = new FormData();
      const newImageName = userId?.replace(".", "_");
      formData.append('image', file);
      formData.append('newImageName', newImageName);
      await postRequestFormData(postUrl, formData)
      .then((res)=>{
        if(res.ok){
          notify("success", res.msg);
          handleReset();
        }else{
          notify("error", res.msg || res.error);
        }
      });

    } catch (error) {
      notify("error", "Error uploading file");
      console.error('Error uploading file:', error);
    }

  };

const handleDeletePhoto = async ()=>{
    try {
      const formData = new FormData();
      const userIdFmt = userId.replace('.', '_');
      formData.append('imageDelete', userIdFmt);
      await postRequestFormData(postUrl, formData)
      .then((res)=>{
        if(res.ok){
          notify("success", res.msg);
          handleReset();
        }else{
          notify("error", res.msg || res.error);
        }
      });

    } catch (error) {
      notify("error", "Error deleting file");
      console.error('Error uploading file:', error);
    }
}


//  const userPhoto = getImageLink("https://quickrecords.gofamintpsogba.org/image_server.php?image=DEMO@sundaycom");

  return (
    <div className={className}>   
        <input ref={inputRef}  type='file' onChange={handleFileChange} className='hidden'/>
        
        {!file?.name? 
            <div className=''>
                <div className='bg-red-200 group/img peer/img peer-hover/trash:hidden'>
                    <p className="text-[12px] hidden group-hover/img:block peer-hover/trash:hidden absolute bg-slate-300 bottom-10 text-nowrap px-1 py-[2px] rounded-sm">
                      {userPhotoCheck?.data?.ok? 'Change Image' : 'Upload photo'}
                    </p>
                    <BsImage className="absolute  -right-3 bottom-0 font-bold text-blue-600 cursor-pointer hover:text-[blue] active:text-blue-400"  size={24}
                    onClick={()=>inputRef.current.click()}/>
                </div>
                <div className=' group/trash peer/trash peer-hover/img:hidden'>
                  <p className="text-[12px] hidden group-hover/trash:block absolute text-red-700 bg-slate-300 bottom-10 text-nowrap px-1 py-[2px] rounded-sm">Delete Photo</p>
                 {userPhotoCheck?.data?.ok && <IoMdTrash className="absolute hidden group-hover/parent:block group-hover/img:hidden -right-0 bottom-[70px] z-20  font-bold text-red-600 cursor-pointer hover:text-[red] active:text-red-400"  size={30}
                    onClick={handleDeletePhoto}/>}
                </div>
            </div>
          :
          <>
            <MdClose className="absolute -left-3  font-bold text-red-600 cursor-pointer hover:text-[red] active:text-red-400"  size={24}
             onClick={handleReset} />
            
            <div className='bg-red-200 group'>
                 <p className="text-[12px] hidden group-hover:block absolute bg-slate-300 bottom-10 text-nowrap px-1 py-[2px] rounded-sm">Save Image</p>
                 <BiUpload className="absolute -right-3 bottom-0 font-bold text-blue-600 cursor-pointer hover:text-[blue] active:text-blue-400"  size={24}
                  onClick={handleSaveImage}/>
            </div>
          </>
        }
       
    </div>
  )
}

/*
<BsImage /> BiUpload
<div className=''>
              
        <input ref={inputRef}  type='file' onChange={handleFileChange} className='hidden'/>
        
        <BiCloudUpload size={36} className=' active:text-teal-400 hover:shadow-lg hover:bg-gray-300 mt-1 rounded-md text-teal-600 hover:teal-red-700 cursor-pointer'
                      onClick={handleUploadOnline}/>
        <div className='absolute left-0 -top-3 hover:tooltip-open tooltip tooltip-top' data-tip='Cancel'>
                    <MdClose size={20} className=' active:text-red-400 text-red-600 hover:text-red-700 cursor-pointer'
                    onClick={handleReset}/>
                </div>             
        <p className='bg-blue-400 text-white mt-3 text-[12px] smc:text-base  w-fit py-2 px-5 rounded-md active:bg-blue-300 hover:bg-blue-500 cursor-pointer'
            onClick={()=>inputRef.current.click()}>
              {coyLogo? 'Change logo' : 'Select logo'}
        </p>

    </div>
*/