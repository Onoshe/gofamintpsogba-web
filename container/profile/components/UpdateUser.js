'use client'
import { capitalizeFirstChar } from '@/lib/capitalize/capitalizeString';
import React from 'react';
import HorizontalLine from '@/components/misc/HorizontalLine';
import { MdClose } from 'react-icons/md';



export const UpdatedUser = ({ updateForm, setUpdateForm,
    user, selectedUser, handleClose, roles, handleUpdateUser,handleDeleteUser, handleDeleteUserContinue,  handleEditUser, deleteUser}) => {
    
    
    
    const onChangeHandler = (e)=>{
        const {name, value} = e.target;
        setUpdateForm({...updateForm, [name]:value})
    }
    React.useEffect(()=>{
        setUpdateForm({role:selectedUser.role, nonActive:selectedUser.nonActive == 0? "active" : "nonactive"})
    },[]);

  return (
    <div className='z-50 fixed top-0 bottom-0 right-0 w-full h-screen bg-[#33486ea7] flex justify-center items-center'>
        <div className='relative text-[12px] bg-white boder border-blue-500 p-3 rounded-md w-full max-w-[400px]'>
            <MdClose size={28} className='absolute right-5 cursor-pointer text-red-500 hover:text-red-800'
             onClick={handleClose}/>
            <p className='text-center font-bold pt-2'>Update User</p>
            <form className='flex flex-col gap-3 px-4' onSubmit={(e)=>handleEditUser(e, updateForm)}>
                <div>
                    <p>Username</p>
                    <p className='text-blue-400 border-b border-b-blue-400'>{selectedUser.userName}</p>
                </div>
                <div className='pt-1'>
                    <p className='text-gray-600'>Change user role</p>
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
                <div className='pt-1'>
                    <p  className='text-gray-600'>Activate or deactivate user</p>
                    <div>
                        <select className='border-b text-blue-800 border-b-blue-400 w-full' value={updateForm.nonActive} name="nonActive" onChange={onChangeHandler} required>
                            <option value="">---Select---</option>
                            <option value={"active"}>Activate</option>
                            <option value={"nonactive"}>Deactivate</option>
                        </select>
                    </div>
                </div>
                <div className=''>
                    <p className='text-blue-900 font-[600]'>Password</p>
                    <input name="password" value={updateForm.password} className='w-full border-b border-b-blue-400 outline-none' onChange={onChangeHandler} placeholder='Your password' required/>
                </div>
                {!deleteUser?.delete && <button className='btn btn-info btn-sm' type='submit'>Save Changes</button>}

                <HorizontalLine widths={100} margTop={20} margBot={10} bColor={'red'}/>
                
            </form>
                <div className='flex flex-row px-4 pb-2 gap-5 '>
                    <div className={`${deleteUser?.delete? '' : 'hidden'} bg-red-100 px-4 pb-2`}>
                        <p className='text-red-600 font-bold py-1 underline'>Delete User Account</p>
                        <p className='text-red-700'>{"User '"+deleteUser.user.userName+"' will be deleted permanently!. Enter your login password to continue"}</p>
                        <input name="passwordDelete" value={updateForm.passwordDelete} className=' rounded-sm p-2 my-3 border border-red-400 outline-none' placeholder='Login password' required  onChange={onChangeHandler}/>
                        <div className='flex flex-row gap-8 flex-wrap'>
                            {deleteUser?.delete? 
                             <p className='btn btn-error btn-sm' onClick={handleDeleteUserContinue}>{"Continue"}</p>
                            :<p className='btn btn-error btn-sm' onClick={(e)=>handleDeleteUser(e, "CONTINUE", updateForm)}>{"Delete User"}</p>
                            }
                            <p className='btn bg-gray-400 btn-sm' onClick={(e)=>handleDeleteUser(e, "CANCEL", updateForm)}>Cancel</p>
                        </div>
                    </div>
                    <p className={`btn btn-error btn-sm ${deleteUser?.delete? 'hidden' : ''}`} onClick={(e)=>handleDeleteUser(e, "DELETE", updateForm)}>Delete User</p>
                </div>
        </div>
    </div>
  )
}
