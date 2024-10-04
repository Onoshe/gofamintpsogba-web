'use client'
import React from 'react'
import Card from '../components/Card'
import InputLabel from '../components/InputLabel';
import InputLabel2 from '../components/InputLabel2';
import Link from 'next/link';
import { BiError } from 'react-icons/bi';


const ForgotPassword = ({goBack,  handleForgotPassword, form, handleOnChange, goToPage}) => {
  
    return (
     <div className='w-full flex justify-center'>
        <Card
            title="Forgot Password"
            details="Enter your username and registered email. A password reset code will be sent to you."
        >  
         <div className='flex flex-col gap-3 w-full'>
                <InputLabel
                    form={form}
                    handleOnChange={handleOnChange}
                    icon1={person}
                    name="userName"
                    value={form.userName}
                    type="text" 
                    placeholder="Username"
                />
                <InputLabel
                    form={form}
                    handleOnChange={handleOnChange}
                    icon1={emailIcon}
                    name="email"
                    value={form.email}
                    type="email" 
                    placeholder="Email"
                />
                <div className='flex w-full flex-col md:flex-row items-center space-y-5 md:space-y-0'>
                    <p className='bg-[#FFA900] hover:bg-[#fbc049]  active:bg-[#af9259] w-full items-center justify-center py-3 px-5 rounded-md cursor-pointer flex flex-1 mr-2 font-bold'
                      onClick={handleForgotPassword}>Send OTP Code</p>
                    <p className='flex flex-1 text-white cursor-pointer hover:text-blue-100 active:text-blue-200 whitespace-nowrap'
                            onClick={goBack}>Go back</p>
                    
                </div>
            </div>
            <div className='hidden'>
                <p className='mt-5 w-full justify-center items-center flex text-white font-bold'>or</p>
                <div className='w-full justify-center flex items-center text-white mt-10 mb-5'>
                    <p className='cursor-pointer bg-white py-3 px-8 rounded-md hover:bg-blue-100 active:bg-blue-200 text-gray-600'>Sign in with Google</p>
                </div>
            </div>
            <Link href={"/"}>
                <div className='w-full justify-center flex items-center text-white mt-10 mb-5'>
                    <p>Already have an account? <span className='font-bold cursor-pointer hover:text-blue-100 active:text-blue-200'>Login</span></p>
                </div>
            </Link>
        </Card>
    </div>
  )
}

export default ForgotPassword;

var padlock = <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2M5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1"/>;
var eyeOpen1 = <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>;
var eyeOpen2 = <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>;
var eyeClosed1 = <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z"/>;
var eyeClosed2 = <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z"/>;
var emailIcon =   <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>;
var person = <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>;
var key1 = <path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8m4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5"/>;
var key2 =  <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>;
