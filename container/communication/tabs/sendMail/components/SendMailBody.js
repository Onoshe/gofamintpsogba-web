'use client'
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { MdClose } from 'react-icons/md';
const QuillEditor = dynamic(() => import('react-quill'), { ssr: false });



const SendMailBody = ({closeSidebar, emailTemplate, emailContent, emailResponse, handleChangeUpload, handleEditorChange, handleEmailContent,
        handlePostMail, handleSubmitUpload, content, quillFormats, quillModules, error, showPreview, handlePreview, handleClosePreview, sendingMail, notify
}) => {
  const isEmpty =  content === "<p><br></p>" || !content;

  return (
    <div  data-theme='light' className='overflow-x-hidden min-h-screen'
       onClick={closeSidebar}>
      <PrevMailBody 
        showPreview={showPreview} 
        emailTemplate={emailTemplate} 
        emailContent={emailContent} 
        content={content} 
        handleClosePreview={handleClosePreview}
        emailResponse={emailResponse}/>

    {!showPreview && <>
        <div className="mb-4 hidden">
          <p>Attach file</p>
          <form className='flex flex-row gap-2' onSubmit={handleSubmitUpload}>
            <input type="file" onChange={handleChangeUpload} />
            <button className='bg-gray-200 border border-gray-400 cursor-pointer hover:bg-slate-300 active:bg-slate-100 py-1 px-7 text-center' type="submit">Upload</button>
          </form>
          {error && <p>Error uploading file: {error.message}</p>}
        </div>

          <div className="flex w-full justify-center items-center flex-col">
              <div className='flex w-[95%] max-w-[750px]  gap-2 py-3 flex-col items-start mx-3 smc:mx-10'>
                  <p className='text-center w-full text-blue-700 font-bold mb-5'> Compose and Send Email to {emailContent?.holder || "Client"}</p>

                  <div className='flex justify-start flex-row items-center w-[95%] max-w-[550px]'>
                    <p className='px-2 font-bold w-[120px]'>Mail To:</p>
                    <input  placeholder='Recipient email' name='email' required  value={emailContent.email}
                      className='border border-gray-500 px-2 py-1 flex flex-1 rounded-md'
                    onChange={handleEmailContent}/>
                  </div>
                  <div className='flex justify-start flex-row items-center w-[95%] max-w-[550px]'>
                    <p className='px-2 font-bold w-[120px]'>Mail holder:</p>
                    <input placeholder='Recipient name' name='holder' required value={emailContent.holder}
                      className='border border-gray-500 px-2 py-1 flex-1 flex rounded-md'
                    onChange={handleEmailContent}/>
                  </div>
                  <div className='flex justify-start flex-row items-center w-[95%] max-w-[550px]'>
                    <p className='px-2 font-bold w-[120px]'>Mail Subject:</p>
                    <input placeholder='Mail Subject' name='title' required value={emailContent.title}
                      className='border border-gray-500 px-2 py-1 flex-1 flex rounded-md'
                    onChange={handleEmailContent}/>
                  </div>
                  <div className='flex justify-start flex-row items-center w-[95%] max-w-[550px]'>
                    <p className='px-2 font-bold w-[120px]'>Sender Team:</p>
                    <input placeholder='Sender Team' name='senderTeam' required value={emailContent.senderTeam}
                      className='border border-gray-500 px-2 py-1 flex-1 flex rounded-md'
                    onChange={handleEmailContent}/>
                  </div>
                  <div className='flex justify-start flex-row items-center w-[95%] max-w-[550px]'>
                    <p className='px-2 font-bold w-[120px]'>Copy Mail CC:</p>
                    <input  placeholder='Copy Mail' name='copyMail'  value={emailContent.copyMail}
                      className='border border-gray-500 px-2 py-1 flex flex-1 rounded-md'
                    onChange={handleEmailContent}/>
                  </div>
              </div>
          </div>
          <div className="flex w-full justify-center items-center flex-col">
            <p className='text-blue-800 font-bold px-2 mx-5 hidden'>Mail Body</p>
              <QuillEditor
                value={content}
                onChange={handleEditorChange}
                modules={quillModules}
                formats={quillFormats}
                className="w-[95%] max-w-[750px] bg-white  mx-3 shadow-lg h-[350px]"
                placeholder='Compose an epic...'
              />
          </div>
          <br/>
          <br/>
          <br/>
          <div className={`w-full flex justify-around items-center ${!isEmpty && emailContent?.email && emailContent?.holder && emailContent?.title && emailContent?.senderTeam? '' : 'hidden'}`}>
           <button className='float-left btn text-white btn-info py-2 px-10  cursor-pointer'
              onClick={handlePreview}>Preview
            </button>
            <button className={`btn text-white btn-accent py-2 px-10  cursor-pointer ${sendingMail? 'btn-disabled' : ''}`}
              onClick={handlePostMail}>Post Mail
            </button>
          </div>
        </>}

      <br/><br/><br/>
    </div>
  )
}

export default SendMailBody;



export const PrevMailBody = ({showPreview, emailTemplate, emailContent, content, handleClosePreview, emailResponse})=>{

  return(
    <div className={`relative mt-[20px] bg-gray-200 ${showPreview? '' :'hidden'}`}>
          <MdClose className='absolute right-10 text-red-700 cursor-pointer top-5 hover:text-red-800 active:text-red-500' size={28}
            onClick={handleClosePreview}/>
          <br/><br/><br/>
          <div className='mt-[-80px] hidden sm:block'>
            <div className='' dangerouslySetInnerHTML={{ __html: emailTemplate }}></div>
          </div>

          <div className='m-5 bg-[aliceblue] shadow-lg p-3 sm:hidden min-w-[90%]'>
            <p className='text-[maroon] py-2 font-bold underline'>Mail Body</p>
            <p className='py-2'>Dear {emailContent.holder},</p>
            <p className='pb-2 text-blue-700 font-bold underline'>{emailContent.title}</p>
            <div
              className=''
              //className={styles.description}
              dangerouslySetInnerHTML={{ __html: content }}
            ></div>
          </div>
          
          <p className={`${emailResponse.style} mt-[-20px] mb-[10px]`}>{emailResponse.msg}</p>
          <br/>
          <br/>
    </div>
  )
} 