'use client'
import React, { useReducer, useState } from 'react';
import HorizontalLine from '@/components/horizontalLine/HorizontalLine';
import HeaderBar from './headerTabs/HeaderBar';
import IndexPostPastorCorner from './components/pastorCorner/IndexPastorCorner';
import CreateUploadIndex from './components/uploads/CreateUpload';
import { useAuthCustom } from '@/lib/authActions/useAuthCustom';
import Dashboard from './components/dashboard/Dashboard';
import Login from './components/dashboard/Login';




const AdminLogin = ({ssUser}) => {
    const { signIn, signOut, user, status} = useAuthCustom(ssUser);
    const [hideHeader, setHideHeader] = useState(false);
    const [selTab, setSelTab] = useState([0,1, { name: 'PastorCorner', title: 'ADMINPASTORCORNER' }]);
    

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
    const handlePostMail =()=>{

    }
  
    const tabsHandler = (tab)=>{
        setSelTab(tab)
    }
    
    const selectedTab = {
        "ADMINPASTORCORNER":<IndexPostPastorCorner/>,
        "ADMINUPLOADS":<CreateUploadIndex/>,
        "ADMINDASHBOARD":<Dashboard signIn={signIn} signOut={signOut} user={user}/>
        /*"ADMINDASHBOARD":
          <QuillEditorApp
            closeSidebar={()=> console.log(12)} 
            emailTemplate={""} 
            emailContent={state.emailContent}
            emailResponse={state.emailResponse} 
            handleChangeUpload={(e)=>dispatch({type:'handleChangeUpload', payload:e.target.files[0]})} 
            handleEditorChange={(e)=>dispatch({type:'handleEditorChange', payload:e})}
            handleEmailContent={(e)=>dispatch({type:'handleEmailContent', payload:e})}
            handlePostMail={handlePostMail} 
            handleSubmitUpload={handleSubmitUpload} 
            content={state.content} 
            error={""}
            showPreview={state.showPreview}
            handlePreview={()=>dispatch({type:'setShowPreview', payload:!state.showPreview})}
            handleClosePreview={()=>dispatch({type:'setShowPreview', payload:!state.showPreview})}
            sendingMail={state.sendingMail}
          />*/        
    };
  
   // console.log(user);


  if(!user?.name && !user?.email){
    return (<div className='flex justify-center items-center h-screen bg-red-100'><Login signIn={signIn} signOut={signOut}/></div>)
  }

  return (
    <div>
        <HeaderBar
             hideHeader={hideHeader}
             setHideHeader={setHideHeader}
             seltdTab={selTab}
             disSeltdTab={tabsHandler}
             userType='DEVELOPER'
             loginForm={''} 
             loginUser={''}
        
        />
        <HorizontalLine bColor="red" widths={98} heights={3} margBot={10} margTop={10}/>
        <div>
            <p className='px-4 font-bold text-blue-800 underline text-lg'>
              <span className='text-[mediumblue] no-underline ml-2'>LoginType: </span> 
              <span className='text-[maroon] no-underline ml-2'>{selTab[2]?.name}</span>
            </p>
            {selectedTab[selTab[2]['title']]}
        </div>
    </div>
  )
}

export default AdminLogin

