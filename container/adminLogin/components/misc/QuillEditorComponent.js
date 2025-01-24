'use client'
import React, { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { quillFormats, quillModules } from './quillModules';
import Collapsible from '../Collapsible';
const QuillEditor = dynamic(() => import('react-quill'), { ssr: false });



const QuillEditorComponent = ({closeSidebar,  emailContent, emailResponse, handleChangeUpload, handleEditorChange, handleEmailContent,
        handlePostMail, handleSubmitUpload, content,  error,  handleClosePreview,
}) => {
  const [collapse, setCollapse] = React.useState(0);
  const quillRef = useRef(null);
  const isEmpty =  content === "<p><br></p>" || !content;

  const handleEditor = (content, delta, source, editor)=>{
    const text = editor.getText(); // Extract plain text
    const lines = text.split("\n");
    handleEditorChange(content);
  }

  return (
    <div  data-theme='light' className='overflow-x-hidden min-h-screen'
       onClick={closeSidebar}>
      <Collapsible
            contStyle="m-3 border-2 border-solid border-teal-700"
            titleStyle={`bg-gray-300`}
            iconCol="fill-black"
            iconHoverCol="hover:fill-black"
            hideDeleteIcon
            collapse={collapse}
            addedInfo={"Preview Message"}
            >
            
            <PrevMailBody 
              emailContent={content} 
              content={content} 
              handleClosePreview={handleClosePreview}
              emailResponse={emailResponse}
            />
        </Collapsible>
      <>
        <div className="mb-4 hidden">
          <p>Attach file</p>
          <form className='flex flex-row gap-2' onSubmit={handleSubmitUpload}>
            <input type="file" onChange={handleChangeUpload} />
            <button className='bg-gray-200 border border-gray-400 cursor-pointer hover:bg-slate-300 active:bg-slate-100 py-1 px-7 text-center' type="submit">Upload</button>
          </form>
          {error && <p>Error uploading file: {error.message}</p>}
        </div>

          <div className="flex w-full justify-center items-center flex-col">
              <div className='hidden w-[95%] max-w-[750px]  gap-2 py-3 flex-col items-start mx-3 smc:mx-10'>
                  <p className='text-center w-full text-blue-700 font-bold mb-5'> Compose and Send Email to {emailContent?.holder || "Client"}</p>

                  <div className='flex justify-start flex-row items-center w-[95%] max-w-[550px]'>
                    <p className='px-2 font-bold w-[120px]'>Mail To:</p>
                    <input  placeholder='Recipient email' name='email' required  value={emailContent?.email}
                      className='border border-gray-500 px-2 py-1 flex flex-1 rounded-md'
                    onChange={handleEmailContent}/>
                  </div>
                  <div className='flex justify-start flex-row items-center w-[95%] max-w-[550px]'>
                    <p className='px-2 font-bold w-[120px]'>Mail holder:</p>
                    <input placeholder='Recipient name' name='holder' required value={emailContent?.holder}
                      className='border border-gray-500 px-2 py-1 flex-1 flex rounded-md'
                    onChange={handleEmailContent}/>
                  </div>
                  <div className='flex justify-start flex-row items-center w-[95%] max-w-[550px]'>
                    <p className='px-2 font-bold w-[120px]'>Mail Subject:</p>
                    <input placeholder='Mail Subject' name='title' required value={emailContent?.title}
                      className='border border-gray-500 px-2 py-1 flex-1 flex rounded-md'
                    onChange={handleEmailContent}/>
                  </div>
                  <div className='flex justify-start flex-row items-center w-[95%] max-w-[550px]'>
                    <p className='px-2 font-bold w-[120px]'>Sender Team:</p>
                    <input placeholder='Sender Team' name='senderTeam' required value={emailContent?.senderTeam}
                      className='border border-gray-500 px-2 py-1 flex-1 flex rounded-md'
                    onChange={handleEmailContent}/>
                  </div>
                  <div className='flex justify-start flex-row items-center w-[95%] max-w-[550px]'>
                    <p className='px-2 font-bold w-[120px]'>Copy Mail CC:</p>
                    <input  placeholder='Copy Mail' name='copyMail'  value={emailContent?.copyMail}
                      className='border border-gray-500 px-2 py-1 flex flex-1 rounded-md'
                    onChange={handleEmailContent}/>
                  </div>
              </div>
          </div>
          <div className="flex w-full justify-center items-center flex-col">
            <p className='text-blue-800 font-bold px-2 mx-5 hidden'>Mail Body</p>
              <QuillEditor
                ref={quillRef}
                value={content}
                onChange={handleEditor}
                modules={quillModules}
                formats={quillFormats}
                className="w-[95%] max-w-[750px] bg-white  mx-3 shadow-lg h-[350px]"
                placeholder='Compose an epic...'
              />
          </div>
          <br/>
          <br/>
          <br/>
          <div className={`w-full flex justify-around items-center`}>
            <button className={`btn text-white btn-accent py-2 px-10  cursor-pointer`}
              onClick={handlePostMail}>Post Mail
            </button>
          </div>
        </>

      <br/><br/><br/>
    </div>
  )
}

export default QuillEditorComponent;



export const PrevMailBody = ({content})=>{

  return(
    <div className={`relative p-5 border`}>
          <div className='border p-5 border-green-600 bg-white'>
            <div className='' 
                dangerouslySetInnerHTML={{ __html: content }}>
            </div>
          </div>
    </div>
  )
} 