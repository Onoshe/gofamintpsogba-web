'use client'
import { capitalizeFirstChar } from '@/lib/capitalize/capitalizeString';
import React from 'react';
import HorizontalLine from '@/components/misc/HorizontalLine';
import { MdClose } from 'react-icons/md';



export const ResetUserPassword = ({ updateForm, setUpdateForm,
    user, selectedUser, handleClose, handleResetUserPwd }) => {
    
    
    
    const onChangeHandler = (e)=>{
        const {name, value} = e.target;
        setUpdateForm({...updateForm, [name]:value})
    }
    

  return (
    <div className='z-50 fixed top-0 bottom-0 right-0 w-full h-screen bg-[#33486ea7] flex justify-center items-center'>
        <div className='relative bg-red-100 boder border-blue-500 p-3 rounded-md w-full max-w-[450px]'>
            <MdClose size={28} className='absolute right-5 cursor-pointer text-red-500 hover:text-red-800'
             onClick={handleClose}/>
            <p className='text-center font-bold py-3 text-red-900'>Reset User Password</p>
            <form className='flex flex-col gap-3 p-4' onSubmit={(e)=>handleResetUserPwd(e, updateForm)}>
                <div>
                    <p>Username</p>
                    <p className='text-blue-400 border-b border-b-blue-400'>{selectedUser.userName}</p>
                </div>
                <div>
                    <p>Email</p>
                    <p className='text-blue-400 border-b border-b-blue-400'>{selectedUser.email}</p>
                </div>
                <p className='italic text-sm'>A new default login password will be sent to the above username email. The user is expected to login with the default password and change it.</p>
                <p className='italic text-sm'>{"Note that it's possible for the message to be delivered on inbox or spam messages"}</p>

                <div className=''>
                    <p className='text-blue-900 font-[600]'>Password</p>
                    <input name="passwordReset" value={updateForm.passwordReset} className='px-2 w-full border-b border-b-blue-400 outline-none' onChange={onChangeHandler} placeholder='Your password' required/>
                </div>
                <HorizontalLine widths={100} margTop={20} margBot={10} bColor={'red'}/>
                <button className='btn btn-error' type='submit'>Enter</button>

            </form>
        </div>
    </div>
  )
}
