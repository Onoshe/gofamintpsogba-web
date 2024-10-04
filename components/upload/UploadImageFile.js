'use client'
import React, {useEffect, useState, useRef} from "react";



function UploadImageFile({ uploadedData, setUploadedData, resetFileUploadCount}){
  const fileInputRefs = useRef(null);
  const [base64String, setBase64String] = useState('');
  const [fileName, setFileName] = useState('');
  
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

  async function handleUploadFile(e) {
    const files = e.target.files;
    const fileExtension = e.target.value.split('.')[1];
    const fileUploaded = e.target.value.length > 0? 1 : '';

      if (!(files && files[0])) return

      if (files && files[0]){
        const file = e.target.files[0];
        const fileName = e.target.files[0].name;
        //setFileName(file.name);
        try {
          const base64 = await convertImageToBase64(file);
          setBase64String(base64);
          //console.log(base64)
        } catch (error) {
          //console.error(error);
        }
        //console.log(file, fileUploaded, fileName, fileExtension);
      }
  }
  const handleUploadFileCall =()=>{
    if (fileInputRefs.current) {
      fileInputRefs.current.click();
    }
  }

  function resetFileInput(){
    fileInputRefs.current.value = null;
    //setUploadedData([])
  }
  

    return (
      <>
        <form className={'px-3'}>
           

            <input
              type="file"
              accept={SheetJSFT}
              onChange={handleUploadFile}
              className="file-input file-input-bordered bg-slate-300"
              //ref={fileInputRefs}
            />
           
        </form>
      </>
    );
}

export default UploadImageFile

const innerStyle={
  cont:{
    paddingLeft:'10px'
  },
  errorBtn:{cursor:'pointer', color:'white',fontSize:'13px',
    backgroundColor:'maroon',padding:'1px 10px',
    marginTop:'5px', marginLeft: '7px', borderRadius:'5px',
    display:'flex', width:'60px', 
  },
  errorMsgCont:{
    color:'red',
    flexDirection:'row', justifyContents:'center',
    alignItems:'center',
    paddingBottom:'10px',
    paddingLeft:'15px',
  }
}

/* list of supported file types */
const SheetJSFT = [
  "png",
  "jpeg",
  "jpg",
]
  .map(function(x) {
    return "." + x;
  })
  .join(",");