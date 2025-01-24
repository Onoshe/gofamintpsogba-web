import React from 'react'
import { BsCloudDownload, BsFileEarmarkPdf, BsFileEarmarkWord } from 'react-icons/bs';


const Resources = ({topic, file}) => {
  const docType = file.documenttype === 'pdf'? true : false;
 

  return (
    <a className='flex  max-h-12 w-[90%] items-center flex-row justify-between 
        border boder-2 border-blue-500 bg-slate-50 hover:bg-sky-400 active:bg-slate-100 p-3 
        rounded-lg my-2 '
        href={`${file?.fileuploaded?.asset?.url}?dl=`}
        download
        onClick={e=>e.stopPropagation()}
        >
        {docType?
          <BsFileEarmarkPdf size={24} color="red"
            className='cursor-pointer'/> :
          <BsFileEarmarkWord size={24} color="mediumblue"
            className='cursor-pointer'/>
            }
          <span className='w-[85%] whitespace-nowrap text-ellipsis overflow-hidden'>{topic}</span>
        <BsCloudDownload size={24} color="#444"
            className='cursor-pointer'/>
    </a>
  )
}


export default Resources 