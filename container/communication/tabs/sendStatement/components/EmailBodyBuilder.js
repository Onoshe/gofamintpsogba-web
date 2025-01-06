'use client'
import React, { useState } from 'react';
//import useStoreHeader from '@/context/storeHeader';
//import useStoreCompany from '@/context/storeCompany.js';
import composeClientEmail from '@/constants/formFields/emailTemplate/composeClientEmail';
import 'react-quill/dist/quill.snow.css';
//import { quillFormats, quillModules } from '../../modules/toolbarAndFormats';
import { quillFormats, quillModules } from '../../../modules/toolbarAndFormats';
import SendMailBody, { PrevMailBody } from '../../sendMail/components/SendMailBody';


const access = process.env.NEXT_SECRETS_COUNTIXPRESSSERVER_TOKEN;


const EmailBodyBuilder = ({content, setContent, emailContent, setEmailContent, emailTemplate, 
    handlePostMail, emailResponse, setEmailResponse, sendingMail}) => {
  const [file, setFile] = useState();
  const [error, setError] = useState();
  const [showPreview, setShowPreview] = useState(false);
  //const [sendingMail, setSendingMail] = useState(false);

    const rawTrans = [];
    let latestTransDate = rawTrans[rawTrans?.length - 1]?.transDate;
    latestTransDate = new Date(latestTransDate).toDateString();

    function closeSidebar(){
      //if(isOpen){dispatchIsOpen(false)}
    }

  //console.log(file.name.split('.')[1])

  function handleChangeUpload(event) {
    setFile(event.target.files[0]);
  }

  function handleSubmitUpload(event) {
    event.preventDefault();
    const url = 'http://localhost:3000/uploadFile';
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
  }


 const handleEditorChange = (newContent) => {
  setContent(newContent);
  setEmailContent({...emailContent, body:newContent});
  setEmailResponse({style:'', msg:''})
 };
const handleEmailContent =(e)=>{
  const {name, value} = e.target;
  setEmailContent({...emailContent, [name]:value});
  setEmailResponse({style:'', msg:''})
}


  return (
    <>
      <SendMailBody
        closeSidebar={closeSidebar}
        emailTemplate={emailTemplate}
        emailContent={emailContent}
        emailResponse={emailResponse}
        handleChangeUpload={handleChangeUpload}
        handleEditorChange={handleEditorChange} 
        handleEmailContent={handleEmailContent}
        handlePostMail={handlePostMail}
        handleSubmitUpload={handleSubmitUpload} 
        content={content}
        quillFormats={quillFormats}
        quillModules={quillModules}
        error={error}

        showPreview={showPreview}
        handlePreview={()=>setShowPreview(!showPreview)}
        handleClosePreview={()=>setShowPreview(!showPreview)}
        sendingMail={sendingMail}
      />
      
    </>
  )
}

export default EmailBodyBuilder;
