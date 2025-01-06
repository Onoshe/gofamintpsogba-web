'use client'
import React, { useState } from 'react';
import composeClientEmail from '@/constants/formFields/emailTemplate/composeClientEmail';
import 'react-quill/dist/quill.snow.css';
import { quillFormats, quillModules } from '../../modules/toolbarAndFormats';
import SendMailBody from './components/SendMailBody';
import { handlePostMail } from './handlePostMail';


const access = process.env.NEXT_SECRETS_COUNTIXPRESSSERVER_TOKEN;

const IndexSendMail = ({companyDetails, user, notify}) => {
  const [content, setContent] = useState('');
  const [emailContent, setEmailContent] = useState({holder:'', title:'', body:'', email:'', senderTeam:''});
  
  const coyDomain = user?.companyId?.toLowerCase();
  const coyLogoUrl = `https://quickrecords.gofamintpsogba.org/image_server.php?image=${coyDomain?.toUpperCase()}@LOGO&isLogo=TRUE`;
  const companyLogo = coyLogoUrl;
  
  const emailTemplate = composeClientEmail(emailContent.holder, emailContent.title, emailContent.body, emailContent.email, emailContent.senderTeam, companyDetails, companyLogo);
  const [emailResponse, setEmailResponse] = useState({style:'', msg:''});
  const [file, setFile] = useState();
  const [error, setError] = useState();
  const [showPreview, setShowPreview] = useState(false);
  const [sendingMail, setSendingMail] = useState(false);

  

    const rawTrans = [];
    let latestTransDate = rawTrans[rawTrans?.length - 1]?.transDate;
    latestTransDate = new Date(latestTransDate).toDateString();

    
    
    function closeSidebar(){
      //if(isOpen){dispatchIsOpen(false)}
    }


  function handleChangeUpload(event) {
    setFile(event.target.files[0]);
  }
  const handlePreview =()=>{
    setShowPreview(!showPreview)
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

 const handlePostMailCall = async ()=>{
  setSendingMail(true);
  await handlePostMail({emailContent, file, setEmailContent, setEmailResponse, companyDetails, companyLogo, user, setContent, notify})
  .then(res=> {
     setSendingMail(false)
    if(res.ok) {
      notify('success', 'Mail sent successfully');
      setEmailResponse({style:'text-[green]', msg:'Congratulations! Your mail was sent successfully'});
      setEmailContent({holder:'', title:'', body:'', email:'', copyMail:'', senderTeam:''});
      setContent("")
    }else{
      setEmailResponse({style:'text-[red]', msg:'Message sent failed!. Please, try again'});
    }
  });
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
        handlePostMail={handlePostMailCall}
        handleSubmitUpload={handleSubmitUpload} 
        content={content}
        quillFormats={quillFormats}
        quillModules={quillModules}
        error={error}
        showPreview={showPreview}
        handlePreview={handlePreview}
        handleClosePreview={()=>setShowPreview(false)}
        sendingMail={sendingMail}
      />
    </>
  )
}

export default IndexSendMail;
