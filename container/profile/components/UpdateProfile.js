'use client'
import { capitalizeFirstChar } from '@/lib/capitalize/capitalizeString';
import { TextInput } from './FormInputs';
import React from 'react';
import HorizontalLine from '@/components/misc/HorizontalLine';
import { MdClose } from 'react-icons/md';





export const UpdatedProfile = ({
    user, form, setForm,  handleClose, handleUpdateUser}) => {
    
    const onChangeHandler =(e)=>{
        const {name, value} = e.target;
        setForm({...form, [name]:value});
    }
    
  return (
    <div className='z-50 fixed top-0 bottom-0 right-0 w-full h-screen bg-[#33486ea7] flex justify-center items-center'>
        <div className='relative bg-white boder text-[12px] border-blue-500 p-3 py-6 rounded-md w-full max-w-[400px]'>
            <MdClose size={28} className='absolute right-5 cursor-pointer text-red-500 hover:text-red-800'
             onClick={handleClose}/>
            <p className='text-center font-bold pb-3'>Update Profile</p>
            <form className='flex flex-col gap-3 p-4 ' onSubmit={handleUpdateUser}>
                <div>
                    <p>Username</p>
                    <p className='text-blue-400 border-b border-b-blue-400' >{user.userName}</p>
                </div>
                <div className='mt-3'>
                    <p className='text-blue-900 font-[600]'>Update Phone number</p>
                    <input name="phoneNo" value={form.phoneNo} className='w-full border-b border-b-blue-400 outline-none' onChange={onChangeHandler} placeholder='Phone number' />
                </div>
                <div>
                    <p className='text-blue-900 font-[600]'>Update Title</p>
                    <div>
                        <select className='border-b border-b-blue-400 w-full' value={form.title} name="title" onChange={onChangeHandler} >
                            <option value="">---Select---</option>
                            <option value="Mr">Mr</option>
                            <option value="Mrs">Mrs</option>
                            <option value="Miss">Miss</option>
                        </select>
                    </div>
                </div>
                <div className=''>
                    <p className='text-blue-900 font-[600]'>Update Recovery Email</p>
                    <input name="recoveryEmail" value={form.recoveryEmail} className='w-full border-b border-b-blue-400 outline-none' onChange={onChangeHandler} placeholder='Recovery email'/>
                </div>
              
                <div className='mt-7'>
                    <p className='text-red-900 font-[600]'>Enter Password</p>
                    <input name="password" value={form.password} className='w-full border-b border-b-blue-400 outline-none' onChange={onChangeHandler} placeholder='Password' required/>
                </div>
                <button type='submit' className='btn btn-info'>Save Changes</button>

                
            </form>
        </div>
    </div>
  )
}
