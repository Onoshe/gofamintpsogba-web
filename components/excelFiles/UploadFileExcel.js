'use client'
import React, {useEffect, useState, useRef} from "react";
var XLSX = require("xlsx");


function UploadFileExcel({ title, children, className, setUploadedData, resetFileUploadCount}){

  const ref = useRef();
  function handleChange(e) {
    const files = e.target.files;
    const fileExtension = e.target.value.split('.')[1];
    const fileUploaded = e.target.value.length > 0? 1 : '';
    
      if (!(files && files[0])) return

      if (files && files[0]){
        const file = e.target.files[0];
        const fileName = e.target.files[0].name;
        readSpreedSheetFile(file, fileUploaded, fileName, fileExtension);
      }
  }

  const handleUploadFile =()=>{
    ref.current.click();
  }

  function resetFileInput(){
    ref.current.value = null;
    //setUploadedData([])
  }
   React.useEffect(()=>{
    if(resetFileUploadCount){
      //resetFileInput();
    }
   },[resetFileUploadCount])

  function readSpreedSheetFile(file,) {
    let uploadMsg = "";
    const reader = new FileReader();
      const rABS = !!reader.readAsBinaryString;
      reader.onload = e => {
        /* Parse data */
        const bstr = e.target.result;
        const wb = XLSX.read(bstr, { type: rABS ? "binary" : "array" });
        /* Get first worksheet */
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        /* Convert array of arrays */
        const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      
          uploadMsg = "File upload successful";
          
          setUploadedData(data);
      };
      if(rABS){
        reader.readAsBinaryString(file);
        }else {
            reader.readAsArrayBuffer(file);
    }
  }


    return (
      <div onClick={handleUploadFile} className={className}>    
            <input
              type="file"
              accept={SheetJSFT}
              onChange={handleChange}
              name="testing"
              className="hidden text-base text-[mediumblue]"
              ref={ref}
            />
            <br/>
            <p className="bg-red-800 hidden cursor-pointer py-2 px-5 w-fit active:bg-slate-300"
             onClick={resetFileInput}> 
              Clear Upload
            </p>
            {children}
      </div>
    );
}

export default UploadFileExcel


/* list of supported file types */
const SheetJSFT = [
  "xlsx",
  "csv",
  "xls",
]
  .map(function(x) {
    return "." + x;
  })
  .join(",");