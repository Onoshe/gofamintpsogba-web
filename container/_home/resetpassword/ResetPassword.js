'use client'
import React from 'react'
import Card from '../components/Card'
import InputLabel from '../components/InputLabel';
import InputLabel2 from '../components/InputLabel2';
import Link from 'next/link';
import iconsPath from '../components/iconsPath/iconsPath';
import { useSearchParams } from 'next/navigation';


const ResetPassword = ({viewPwd, handleViewPwd, resetPwdInfo, goToPage, form, handleOnChange,goBack, resendOpt, handleResendOpt, showBlind, 
    setShowBlind, setAlert, setModalAlert, setModalAlertCall, resetPasswordHandler}) => {
    const searchParams = useSearchParams();

    const handleResetPassword =(e)=>{
        e.preventDefault()
        const userId = searchParams.get('u');
        if(userId){
            resetPasswordHandler({...form, userName:userId}, setAlert, setModalAlert, setModalAlertCall);
        }else{setAlert({msgTitle:'Username retrieval failed!', msg:'Go back and try again!', type:'error', show:true})}
    }
    const handleResendOptCall =()=>{
        const userId = searchParams.get('u');
        if(userId){
            handleResendOpt(userId);
        }else{setAlert({msgTitle:'Username retrieval failed!', msg:'Go back and try again!', type:'error', show:true})}
    }
    React.useEffect(()=>{
        if(showBlind){setShowBlind({show:false})}
    },[]);


    return (
     <div className='w-full flex justify-center'>
        <Card
            title={resetPwdInfo.title}
            detailsTop={resetPwdInfo.msg}
            detailsTopClassName={resetPwdInfo.style}
            details="Enter your new password and the OPT that was sent to you. Check your inbox or spam messages for the OPT"
        >  
         <form className='flex flex-col gap-3 w-full' onSubmit={handleResetPassword}>
                {resendOpt && <p className='bg-green-200 py-3 px-8 text-center rounded-md text-green-700'>OTP has been re-sent successfully</p>}
                <InputLabel2
                    form={form}
                    name="password"
                    value={form.password}
                    type={viewPwd? 'password' :'text'}
                    placeholder="New password"
                    viewIcon={viewPwd}
                    handleOnChange={handleOnChange}
                    icon1={iconsPath.padlock}
                    rightIconT1={iconsPath.eyeClosed1}
                    rightIconT2={iconsPath.eyeClosed2} 
                    rightIconB1={iconsPath.eyeOpen1}
                    rightIconB2={iconsPath.eyeOpen2}
                    handleViewIcon={handleViewPwd}
                />
             
                <InputLabel
                    form={form}
                    handleOnChange={handleOnChange}
                    icon1={iconsPath.key1}
                    icon2={iconsPath.key2}
                    name="otp"
                    value={form.otp}
                    type="text" 
                    placeholder="Enter OPT Code"
                />
               <p className='text-white'>You did not receive the OTP code? <span className='font-bold cursor-pointer hover:text-blue-100 active:text-blue-200'
                onClick={handleResendOptCall}>Resend</span></p>
             
                <div className='flex w-full flex-col sm:flex-row md:flex-row items-center mt-6 space-y-5 md:space-y-0'>
                    <input className='bg-[#FFA900] hover:bg-[#fbc049]  active:bg-[#af9259] w-full items-center justify-center py-3 px-5 rounded-md cursor-pointer flex flex-1 mr-2 font-bold'
                          type="submit" value="Reset password"/>
                            
                    
                    <Link href={"/"} className='flex-1 pl-3' onClick={()=>setShowBlind({show:true})}>
                        <p className='flex text-white w-fit cursor-pointer hover:text-blue-100 active:text-blue-200 whitespace-nowrap'
                            onClick={goBack}>Go back</p>
                    </Link>
                </div>
            </form>
            <div className='hidden'>
                <p className='mt-5 w-full justify-center items-center flex text-white font-bold'>or</p>
                <div className='w-full justify-center flex items-center text-white mt-10 mb-5'>
                    <p className='cursor-pointer bg-white py-3 px-8 rounded-md hover:bg-blue-100 active:bg-blue-200 text-gray-600'>Sign in with Google</p>
                </div>
            </div>
            <div onClick={()=>setShowBlind({show:true})}>
                <div className='w-full justify-center flex items-center text-white mt-10 mb-5'>
                    <div>Already have an account? <Link href={"/"} className='font-bold cursor-pointer hover:text-blue-100 active:text-blue-200'>Login</Link></div>
                </div>
            </div>
        </Card>
    </div>
  )
}

export default ResetPassword;