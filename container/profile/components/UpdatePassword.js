'use client'
import { capitalizeFirstChar } from '@/lib/capitalize/capitalizeString';
import { TextInput } from './FormInputs';
import React from 'react';
import HorizontalLine from '@/components/misc/HorizontalLine';
import { MdClose } from 'react-icons/md';





export const UpdatedPassword = ({user,  handleClose, handleUpdatePwd}) => {
    const [updatePwd, setUpdatePwd] = React.useState({passwordOld:'', passwordNew:'', passwordConfirm:''});

    
    const onChangeHandler = (e)=>{
        const {name, value} = e.target;
        setUpdatePwd({...updatePwd, [name]:value})
    }
  return (
    <div className='z-50 fixed top-0 bottom-0 right-0 w-full h-screen bg-[#33486ea7] flex justify-center items-center'>
        <div className='relative bg-white boder border-blue-500 p-3 rounded-md w-full max-w-[450px]'>
            <MdClose size={28} className='absolute right-5 cursor-pointer text-red-500 hover:text-red-800'
             onClick={handleClose}/>
            <p className='text-center font-bold py-3 text-red-800'>Change Password</p>
            <div className='flex flex-col gap-3 p-4 text-sm'>
                <p>A password update code was sent to your email. Check your spam or junk messages if the code is not in your inbox.</p>
                <div>
                    <p>Username</p>
                    <p className='text-blue-400 border-b border-b-blue-400'>{user.userName}</p>
                </div>
                <div>
                    <p>Email</p>
                    <p className='text-blue-400 border-b border-b-blue-400'>{user.email}</p>
                </div>
                 <form onSubmit={(e)=>handleUpdatePwd(e, updatePwd)}>
                    <div className='mb-4 flex flex-col gap-3'>
                        <p>Change password</p>
                        <input name="passwordOld"  className='w-full border-b border-b-blue-400 outline-none' placeholder='Old or current password'
                        onChange={onChangeHandler} value={updatePwd.passwordOld} required/>
                        <input name="passwordNew" className='mt-3 w-full border-b border-b-blue-400 outline-none' placeholder='New password'
                            onChange={onChangeHandler} value={updatePwd.passwordNew} required/>
                        <input name="passwordConfirm" className='w-full border-b border-b-blue-400 outline-none' placeholder='Confirm password'
                            onChange={onChangeHandler} value={updatePwd.passwordConfirm} required/>
                    </div>
                    <button type='submit' className='btn btn-info px-10'>Update</button>
                </form>
                <form className='hidden' onSubmit={(e)=>handleUpdatePwd(e, updatePwd)}>
                    <div className='mb-4 flex flex-col gap-3'>
                        <p>OTP has been sent to your eamil. Enter the code</p>
                        <input name="otp"  className='w-full border-b border-b-blue-400 outline-none' placeholder='Old password'
                        onChange={onChangeHandler} value={updatePwd.otp} required/>
                        <p>{"You did'nt see the message?"}<span className='btn btn-success btn-sm ml-2'>Resend</span></p>
                    </div>
                    <button type='submit' className='btn btn-info px-10'>Enter</button>
                </form>
            </div>
        </div>
    </div>
  )
}
