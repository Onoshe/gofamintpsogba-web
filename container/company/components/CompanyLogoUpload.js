import { postRequest, postRequestFormData } from '@/lib/apiRequest/postRequest';
import React, {useState, useEffect, useRef} from 'react'
import { BiCloudUpload } from 'react-icons/bi';
import { MdClose, MdUpload } from 'react-icons/md';
//import { prepareQuerySettings } from './utils/prepareQuerySettings';
import { handleUploadLogo, handleUploadQuickRecordsLogo } from './utils/handleUploadLogo';
import { getPostImageLink } from '@/lib/apiRequest/urlLinks';

/* eslint-disable @next/next/no-img-element */


export const CompanyLogoUpload = ({coyLogo, base64String, setBase64String,notify,user,dispatchRefreshSettingsCount, setInfoMsg, setIsDropped, }) => {
    const inputRef = useRef();
    const [file, setFile] = React.useState(null);
    const postUrl = getPostImageLink();
    //const fileInputRefs = useRef(null);
    //const [base64String, setBase64String] = useState('');
    //const [fileName, setFileName] = useState('');

  
  const handleReset =()=>{
    setFile(null);
    inputRef.current.value = null;
    setBase64String("");
  }
  //handleUploadLogo({base64String, user, notify, handleReset});
  
  const handleUploadOnline = async ()=>{
   handleUploadLogo({base64String, user, notify, handleReset, dispatchRefreshSettingsCount, file})
   
    //handleUploadQuickRecordsLogo({base64String, notify, handleReset, dispatchRefreshSettingsCount})
  }
  //console.log(file);

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(',')[1]; // Remove data:image/jpeg;base64, part
        resolve(base64String);
      };

      reader.onerror = (error) => {
        reject('Error reading file: ' + error);
      };
      reader.readAsDataURL(file);
    });
  };

  async function handleFileChange(e) {
    const files = e.target.files;
    const fileExtension = e.target.value.split('.')[1];
    const fileUploaded = e.target.value.length > 0? 1 : '';

      if (!(files && files[0])) return
      if(!['jpg', 'jpeg', 'png'].includes(fileExtension?.toLowerCase())){
        notify("error", "Supported file format include jpg, jpeg and png!")
      }else{
        if (files && files[0]){
          const file = e.target.files[0];
          const fileName = e.target.files[0].name;
          let fileSize = e.target.files[0].size;
          const fileSizeInKb = fileSize/1000+"kb";
          if(fileSize < 2000000){
            try {
              const base64 = await convertImageToBase64(file);
              setBase64String({file:base64, type:'base64', fileSize:fileSizeInKb, fileName});
              //console.log(fileExtension, base64);
              setFile(file);
            } catch (error) {
              //console.error(error);
            }
          }else{notify("error", "Maximum file size is 2000kb");}
        }
      }
  }

  const handleOnSelectLogo =()=>{
    const isAdmin = user?.role?.toUpperCase() === "ADMIN";
    if(isAdmin){
      inputRef.current.click()
    }else{
      notify('error', "Only Admin can change the Company's Logo" )
    }
  }

  //----------------------- UPLOAD AS A FIL- urlPath
  
    const handleSaveImage = async (file)=>{
      //return console.log(userId)
       try {
        const formData = new FormData();
        formData.append('image', file);
        if(isLogo === "CLIENTLOGO"){
          let newImageName = userId?.split("@");
          newImageName = newImageName[0]+"@LOGO";
          formData.append('newImageName', newImageName);
          formData.append('CLIENTLOGO', 'CLIENTLOGO');
        }else{
          const newImageName = userId?.replace(".", "_");
          formData.append('newImageName', newImageName);
        }
        await postRequestFormData(postUrl, formData)
        .then((res)=>{
          if(res.ok){
            notify("success", res.msg);
            //handleReset();
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
            //handleReset();
          }else{
            notify("error", res.msg || res.error);
          }
        });
  
      } catch (error) {
        notify("error", "Error deleting file");
        console.error('Error uploading file:', error);
      }
  }


  //------------------------

  var fileThumbnail;  
  if(file){
    fileThumbnail =  <img src={URL.createObjectURL(file)} alt="Uploade image" className='size-[50px]'/>;
  }
  

  return (
    <div className='mb-2 flex flex-col'>
              
        <input ref={inputRef}  type='file' onChange={handleFileChange} className='hidden'/>
        
        {file ? 
             <div className={`relative items-center flex flex-col bg-blue-100 border border-gray-100`}>
                <div className='absolute left-0 -top-3 hover:tooltip-open tooltip tooltip-top' data-tip='Cancel'>
                    <MdClose size={20} className=' active:text-red-400 text-red-600 hover:text-red-700 cursor-pointer'
                    onClick={handleReset}/>
                </div>
                <div className='flex flex-row gap-2 items-baseline p-1'>
                  {fileThumbnail}
                  <div className='hover:tooltip-open tooltip tooltip-top' data-tip="Upload">
                      <BiCloudUpload size={36} className=' active:text-teal-400 hover:shadow-lg hover:bg-gray-300 mt-1 rounded-md text-teal-600 hover:teal-red-700 cursor-pointer'
                      onClick={handleUploadOnline}/>
                  </div>
                </div>
             </div>
             : 
            <p className='bg-blue-400 text-white mt-3 text-[12px] smc:text-base  w-fit py-2 px-5 rounded-md active:bg-blue-300 hover:bg-blue-500 cursor-pointer'
            onClick={handleOnSelectLogo}>
              {coyLogo? 'Change logo' : 'Select logo'}
            </p>
            }
    </div>
  )
}

