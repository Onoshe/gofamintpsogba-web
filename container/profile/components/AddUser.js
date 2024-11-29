'use client'
import { capitalizeFirstChar } from '@/lib/capitalize/capitalizeString';
import { TextInput } from './FormInputs';
import React from 'react';
import HorizontalLine from '@/components/misc/HorizontalLine';
import { MdClose } from 'react-icons/md';





export const AddUser = ({
    user, updateForm, setUpdateForm,   handleClose,  handleAddUser, addingUser, generalSettings, roles}) => {
    

    const onChangeHandler = (e)=>{
        const {name, value} = e.target;
        if(updateForm.defaultUserId){
            if(name === "firstname"){
                setUpdateForm({...updateForm, [name]:value, userId1:value.toLowerCase()});
            }else if(name === "lastname"){
                setUpdateForm({...updateForm, [name]:value, userId2:value.toLowerCase()});
            }else{
                setUpdateForm({...updateForm, [name]:value});
            }
        }else{
            setUpdateForm({...updateForm, [name]:value});
        }
    }
    const classNameUserId = `flex-grow flex max-w-[80px] rounded-sm outline-none ${updateForm.defaultUserId? '' :'pl-1 bg-teal-200'}`;
  return (
    <div className='z-50 fixed top-0 bottom-0 right-0 w-full h-screen bg-[#33486ea7] flex justify-center items-center'>
        <div className='relative text-[12px] bg-blue-100 boder border-blue-500 p-3 rounded-md w-full max-w-[450px] '>
            <MdClose size={28} className='absolute right-5 cursor-pointer text-red-500 hover:text-red-800'
             onClick={handleClose}/>
            <p className='text-center font-bold py-3'>Add New User</p>

            <form className='flex flex-col' onSubmit={(e)=>handleAddUser(e, updateForm)}>
                <div className='max-h-[55vh] bg-white overflow-y-auto flex flex-col gap-3 p-4'>
                    <div>
                        <p className='font-[600] text-blue-800 pb-2'>Firstname</p>
                        <input name="firstname" value={updateForm.firstname} className='w-full border-b border-b-blue-400 outline-none' placeholder='Firstname' required onChange={onChangeHandler}/>
                    </div>
                    <div>
                        <p className='font-[600] text-blue-800 pb-2'>Lastname</p>
                        <input name="lastname" value={updateForm.lastname} className='w-full border-b border-b-blue-400 outline-none' placeholder='Lastname' required  onChange={onChangeHandler}/>
                    </div>
                    <div>
                        <p className='font-[600] text-blue-800 pb-2'>Title</p>
                        <div>
                            <select className='border-b border-b-blue-400 w-full' value={updateForm.title} name="title" onChange={onChangeHandler} required >
                                <option value="">---Select---</option>
                                <option value="Mr">Mr</option>
                                <option value="Mrs">Mrs</option>
                                <option value="Miss">Miss</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <p className='font-[600] text-blue-800 pb-2'>Email</p>
                        <input name="email" className='w-full border-b border-b-blue-400 outline-none' value={updateForm.email} placeholder='email' required  onChange={onChangeHandler}/>
                    </div>
                    <div>
                        <p className='font-[600] text-blue-800 pb-2'>Phone number</p>
                        <input name="phoneNo" className='w-full border-b border-b-blue-400 outline-none' value={updateForm.phoneNo} placeholder='Phone number' required  onChange={onChangeHandler}/>
                    </div>
                    <div>
                        <p className='font-[600] text-blue-800 pb-2'>Role</p>
                        <div>
                            <select className='border-b border-b-blue-400 w-full' name="role" value={updateForm.role} onChange={onChangeHandler} required>
                                <option value="">---Select---</option>
                                {roles?.map((role, i)=>{
                                    return(
                                        <option key={`${i}role`} value={role}>{role}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                    <div className={`${updateForm.showUserId? '' : ''}`}>
                        <p className='font-[600] text-blue-800 py-2'>UserId <span className='text-red-800'>{updateForm.defaultUserId? '(Default)' : ''}</span></p>
                        <div className='w-full border-b border-b-blue-400 flex flex-row items-center'>
                            <span>{user?.companyId?.toUpperCase()}@</span>
                            <input name="userId1" value={updateForm.userId1} className={classNameUserId} placeholder='firstname' required  onChange={onChangeHandler}
                                readOnly={updateForm.defaultUserId}/>
                            <span>.</span>
                            <input name="userId2" value={updateForm.userId2} className={classNameUserId} placeholder='lastname' required  onChange={onChangeHandler}
                                readOnly={updateForm.defaultUserId}/>
                            <p className='hidden btn btn-xs btn-info px-6'>Edit</p>
                        </div>
                    </div>
                    <p className={`text-teal-600 italic -mt-2 ${updateForm.defaultUserId? 'hidden' :''}`}>You can change the default highlighted userId</p>
                    <div className='mt-5'>
                        <p className='text-blue-900 font-[600]'>Your Password</p>
                        <input name="password" value={updateForm.password} className='w-full border-b border-b-blue-400 outline-none' onChange={onChangeHandler} placeholder='Your login password' required/>
                    </div> 
                </div>
                <button className={`btn btn-info my-3 ${addingUser? 'btn-disabled' : ''}`} type='submit'>{addingUser? "Adding User, please wait..." : "Add User"}</button>
                <p className='text-teal-900 italic'>A default login password together with login details will be sent to the new user email when new user is added successfully</p>

                
            </form>
        </div>
    </div>
  )
}
