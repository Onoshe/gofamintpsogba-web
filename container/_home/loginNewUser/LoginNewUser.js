'use client'
import React from 'react'
import Card from '../components/Card'
import InputLabel from '../components/InputLabel';
import InputLabel2 from '../components/InputLabel2';
import Link from 'next/link';
import iconsPath from '../components/iconsPath/iconsPath';


const LoginNewUser = ({viewPwd, handleViewPwd, enterBtn,goBack,  handleForgotPassword, form, handleOnChange, goToPage}) => {  
    return (
     <div className='w-full flex justify-center'>
        <Card
            title="Login"
            details="Login with your username and password"
        >  
         <div className='flex flex-col gap-3 w-full'>
                <InputLabel
                    form={form}
                    handleOnChange={handleOnChange}
                    icon1={iconsPath.person}
                    name="userName"
                    value={form.userName}
                    type="text" 
                    placeholder="Username"
                />
                <InputLabel2
                    form={form}
                    name="password"
                    value={form.password}
                    type={viewPwd? 'password' :'text'}
                    placeholder="Password"
                    viewIcon={viewPwd}
                    handleOnChange={handleOnChange}
                    icon1={iconsPath.padlock}
                    rightIconT1={iconsPath.eyeClosed1}
                    rightIconT2={iconsPath.eyeClosed2} 
                    rightIconB1={iconsPath.eyeOpen1}
                    rightIconB2={iconsPath.eyeOpen2}
                    handleViewIcon={handleViewPwd}
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

export default LoginNewUser;