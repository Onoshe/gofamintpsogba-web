'use client'
import useLoginStore from '@/context/useLoginStore';
import React, {useState, useEffect} from 'react';
//import emailjs from '@emailjs/browser';
//import {client} from '../../client';



const Email = ({submitWidth, submitText,msgpholder, msgSize, nocontactus, mailSubject,
        children,type, contStyle,sendFieldsStyle, contactTitle, setUserEntry, commentInfo, setCommentSent}) => {
    
    const {loginForm, user} = useLoginStore((state)=>state);
    const isOnline = loginForm.isOnline;
    const {loginID} = user;
    const [checked, setChecked] = useState(true);
    const [form, setForm] = useState({user_name:'', user_email:'',user_phoneNo:'', message:''});
    const [showSentMsg, setShowSentMsg] = useState({show:false, msg:'Thanks for contacting us!'});
    const [posted, setPosted] = useState(false);
    const formRef = React.useRef();
    
    const handleSubmit=(event)=> { 
        event.preventDefault();   // prevents page from reloading on submit
        const contact_user = checked? 'I would like you to contact me' : 'Please, dont contact me!';
        const userInfo = {...form, contact_user}; //{user_name, user_email,user_phoneNo,message, contact_user};
     
        if(type==='USEREMAIL'){
            if(isOnline && loginID) {postFeedbackMsg(userInfo, loginID);}
            //sendUserEmail(userInfo);
        }else{
            setUserEntry(userInfo);  
        }
      }
      
      const handleFormChange =(e)=>{
        const {name, value} = e.target;
        setForm({...form, [name]:value});
        setCommentSent({info:''})
      };
      function resetForm(){
        setForm({user_name:'', user_email:'',user_phoneNo:'', message:''})
        setChecked(true);
        setPosted(false); 
      }
      useEffect(()=>{
        if(posted){
          resetForm();
        }
      },[posted]);

      useEffect(()=>{
        if(showSentMsg.show){
            setTimeout(()=>setShowSentMsg({show:false, msg:''}), 5000);
        }
      },[showSentMsg.show]);
      useEffect(()=>{
        if(commentInfo==="POSTED"){
            setShowSentMsg({show:true, msg:"Congratulations, your comment has been posted!"});
            setTimeout(()=>setShowSentMsg({show:false, msg:''}), 5000);
            resetForm();
        }
      },[commentInfo]);
    
      useEffect(()=>{
        if(type !=='USEREMAIL') setCommentSent({info:""});
    },[form]);

 
  return (
    <div className='flex justify-center'>
        <div className={`flex justify-center flex-col ${contStyle}`}>
            <h1 className='text-white py-1 pb-2 pl-2 text-lg md:text-2xl font-meriendOne'>
                {contactTitle}
            </h1>
            <h1 className={`${showSentMsg.show? '' : 'hidden'} text-[#85e6e8] py-1 px-3 pl-2 mb-2`}>{showSentMsg.msg}</h1>
            <div className={`block py-6 px-2 sm:px-6 rounded-lg shadow-lg bg-white w-full ${sendFieldsStyle}`}>
                <form onSubmit={handleSubmit} ref={formRef}>
                    <div className="form-group mb-2 sm:mb-5">
                    <input type="text" className="form-control block
                        w-full
                        px-3
                        py-2
                        text-base
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding
                        border border-solid border-gray-300
                        rounded
                        transition
                        ease-in-out
                        m-0
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 
                        focus:outline-none" id="exampleInput7"
                        placeholder="Name *"
                        name="user_name"
                        onChange={handleFormChange} value={form.user_name}
                        required/>
                    </div>
                    <div className="form-group mb-2 sm:mb-5">
                    <input type="email" className="form-control block
                        w-full
                        px-3
                        py-2
                        text-base
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding
                        border border-solid border-gray-300
                        rounded
                        transition
                        ease-in-out
                        m-0
                        focus:text-gray-700 focus:bg-white 
                        focus:border-blue-600 focus:outline-none" id="exampleInput8"
                        placeholder="Email address *"
                        name="user_email"
                        onChange={handleFormChange} value={form.user_email}
                        required/>
                    </div>
                    <div className="form-group mb-2 sm:mb-5">
                        <input type="phone" className="form-control block
                            w-full
                            px-3
                            py-2
                            text-base
                            font-normal
                            text-gray-700
                            bg-white bg-clip-padding
                            border border-solid border-gray-300
                            rounded
                            transition
                            ease-in-out
                            m-0
                            focus:text-gray-700 focus:bg-white 
                            focus:border-blue-600 focus:outline-none" id="exampleInput8"
                            placeholder="Phone number"
                            name="user_phoneNo"
                            onChange={handleFormChange} value={form.user_phoneNo}/>
                    </div>
                    <div className="form-group mb-2 sm:mb-5">
                    <textarea
                        className="
                            form-control
                            block
                            w-full
                            px-3
                            py-2
                            text-base
                            font-normal
                            text-gray-700
                            bg-white bg-clip-padding
                            border border-solid border-gray-300
                            rounded
                            transition
                            ease-in-out
                            m-0
                            focus:text-gray-700 focus:bg-white 
                            focus:border-blue-600 focus:outline-none"
                        id="exampleFormControlTextarea13"
                        rows={msgSize? msgSize : "6"}
                        placeholder={msgpholder? msgpholder : "Message *"}
                        name="message"
                        onChange={handleFormChange} value={form.message}
                        required
                    ></textarea>
                    </div>
                    <div className="form-group form-check text-center mb-2 sm:mb-5"
                        style={{display:nocontactus? 'none' : "block"}}>
                        <input type="checkbox"
                            className="form-check-input appearance-none h-4 w-4 
                                border border-gray-300 rounded-sm bg-white 
                                checked:bg-blue-600 checked:border-blue-600 
                                focus:outline-none transition duration-200 mt-1 
                                align-top bg-no-repeat bg-center bg-contain mr-2 cursor-pointer"
                            id="exampleCheck87" 
                            checked={checked}
                            value={checked? 'I would like you to contact me' : 'Please, dont contact me!'}
                            name="contact_user_checkbox"
                            onChange={()=>setChecked(!checked)}/>
                        <label className="form-check-label inline-block text-gray-800" htmlFor="exampleCheck87"
                        >
                            Would you like us to contact you?
                        </label>
                    </div>
                    <div>
                    <input type="text"
                            className="hidden"
                            value={mailSubject? mailSubject : `MAIL FROM ${form.user_name.toUpperCase()}`}
                            name="subject"
                            //onChange={e=>console.log('')}
                            />
                        <input type="text"
                            className="hidden"
                            value={checked? 'I would like you to contact me' : 'Please, dont contact me!'}
                            name="contact_user"
                            //onChange={e=>console.log('')}
                            />
                    </div>
                    <button type="submit" className="
                        px-4
                        py-4
                        bg-blue-600
                        text-white
                        font-medium
                        text-xs
                        leading-tight
                        uppercase
                        rounded
                        shadow-md
                        hover:bg-blue-700 hover:shadow-lg
                        focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
                        active:bg-blue-800 active:shadow-lg
                        transition
                        duration-150
                        ease-in-out"
                        style={{width:submitWidth? submitWidth : '100%', minWidth:'150px'}}
                        >{submitText? submitText : "SEND"}</button>
                </form>
            </div>
            {children}
        </div>
    </div>
  )
}

export default Email;



function postFeedbackMsg(inputData, loginID){
    const docId = new Date().toUTCString().toLocaleLowerCase().replace(/ |:|,/g,'.').replace('..','.');
    const {user_name, user_email,user_phoneNo,message, contact_user} = inputData;
    const feedbackDoc = {
    _id:`contactusfeedback_${docId}`,
    _type: 'feedbackMessages',
    title: `Contact Us Feedback-${docId}`,
    userName:user_name,
    userEmail:user_email,
    phoneNo:user_phoneNo,
    message:message,
    datePosted: new Date().toUTCString(),
    additionalInfo:contact_user,
    postedBy:{ _type: 'postedBy', _ref:loginID } ,
    }
    //setPastorMsg(pastMsg);
    //console.log(feedbackDoc);
   // client.createIfNotExists(feedbackDoc).then(response => {
        //setPostFeedback({error:false,show:true, errorMsg:"Message posted successfully!"});
        //setFormValues(pstcornerflds.values);
        //const queryPstCorner = getQueryPstCorner();
        //fetchAndSetData(queryPstCorner);
     //   console.log(response)
    //  }).catch(e => {
        //setPostFeedback({error:true,show:true, errorMsg:"Error! Message could not be posted."});
   // });
    //setTimeout(()=>setPostFeedback({error:false,show:false, errorMsg:""}), 10000);
  }