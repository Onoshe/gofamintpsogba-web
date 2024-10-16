'use client'
import { capitalizeFirstChar } from '@/lib/capitalize/capitalizeString';
import { TextInput } from './FormInputs';
import React from 'react';




const Form = ({
    user, dispatchUser,
    changePassword, setChangePassword, 
    changePasswordCode, setChangePasswordCode, 
    newPassword, setNewPassword, handleUpdatePassword, handleUpdateProfile}) => {
  
   const onChangeUser = (e)=>{
        const {name, value} = e.target;
        dispatchUser({...user, [name]:value})
   }
   const gender = capitalizeFirstChar(user.gender);
  return (
    <div className=''>
        <div className=' mx-2 lg:mx-10 xl:mx-[200px] font-[600] grid gap-5 sm:grid-cols-2 grid-cols-1'>
            <TextInput
                title="Lastname"
                name="lastname"
                value={user.lastname}
                readOnly
                onChange={onChangeUser}
                inputStyle={`${styles.genInput}`}
            />
            <TextInput
                title="Firstname"
                name="firstname"
                value={user.firstname}
                readOnly
                onChange={onChangeUser}
                inputStyle={`${styles.genInput}`}
            />
            <TextInput
                title="Title"
                name="title"
                value={user.title}
                readOnly
                onChange={onChangeUser}
                inputStyle={`${styles.genInput}`}
            />
             <TextInput
                title="Email"
                name="email"
                value={user.email}
                readOnly
                onChange={onChangeUser}
                type="email"
                inputStyle={`${styles.genInput}`}
            />
             
            <TextInput
                title="Phone Number"
                value={user.phoneNo}
                name="phoneNo"
                readOnly
                onChange={onChangeUser}
                type="phone"
                inputStyle={`${styles.genInput}`}
            />
            <TextInput
                title="Recovery Email"
                name="recoveryEmail"
                value={user.recoveryEmail}
                readOnly
                onChange={onChangeUser}
                type="recoveryEmail"
                inputStyle={`${styles.genInput}`}
            />
            <TextInput
                title="Username"
                value={user.userName}
                readOnly
                inputStyle={`${styles.genInput}`}
            />
            <TextInput
                title="Role"
                value={user.role}
                readOnly
                inputStyle={`${styles.genInput}`}
            />
             <TextInput
                title="Password"
                value={"*******"}
                readOnly
                inputStyle={`${styles.genInput}`}
            />
        </div>
        <br/>
        <div className='flex gap-5 flex-wrap'>
            <button className='btn btn-info btn-sm text-[12px] btn-outline' onClick={handleUpdateProfile}>Update profile</button>
            <button className='btn btn-error btn-sm text-[12px] btn-outline' onClick={handleUpdatePassword}>Change password</button>
        </div>
        
    </div>
  )
}

export default Form;


var styles ={
    genInput: `text-[gray]`
}