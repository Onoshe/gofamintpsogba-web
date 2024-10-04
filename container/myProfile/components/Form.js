'use client'
import { capitalizeFirstChar } from '@/lib/modules/CapitalizeFirstChar';
//import { TextInput } from '@/components/forms/InputComponents';
import { TextInput } from './FormInputs';
import React from 'react';




const Form = ({
    user, dispatchUser,
    changePassword, setChangePassword, 
    changePasswordCode, setChangePasswordCode, 
    newPassword, setNewPassword}) => {
  
   const onChangeUser = (e)=>{
        const {name, value} = e.target;
        dispatchUser({...user, [name]:value})
   }
   const gender = capitalizeFirstChar(user.form.gender);
  return (
    <div >
        <div className='text-lg mx-2 lg:mx-10 xl:mx-[200px] lg:gap-10 font-bold grid gap-5 sm:grid-cols-2 grid-cols-1'>
            <TextInput
                title="Surname"
                name="surname"
                value={user.form.surname}
                readOnly
                onChange={onChangeUser}
                inputStyle={`${styles.genInput}`}
            />
            <TextInput
                title="Firstname"
                name="firstname"
                value={user.form.firstname}
                readOnly
                onChange={onChangeUser}
                inputStyle={`${styles.genInput}`}
            />
            <TextInput
                title="Gender"
                name="gender"
                value={gender}
                readOnly
                onChange={onChangeUser}
                type="email"
                inputStyle={`${styles.genInput}`}
            />
             <TextInput
                title="Email"
                name="email"
                value={user.form.email}
                readOnly
                onChange={onChangeUser}
                type="email"
                inputStyle={`${styles.genInput}`}
            />
             
            <TextInput
                title="Phone Number"
                value={user.form.phoneNo}
                name="phoneNo"
                readOnly
                onChange={onChangeUser}
                type="phone"
                inputStyle={`${styles.genInput}`}
            />
            <TextInput
                title="Username"
                value={user.userName}
                readOnly
                inputStyle={`${styles.genInput}`}
            />
            <TextInput
                title="Permission"
                value={user.form.permissions?.split('|')}
                readOnly
                inputStyle={`${styles.genInput}`}
            />
        </div>
        <br/>
        <div className='py-4 hidden'>
            <p className={`${changePassword? '' :'hidden'} text-[navy]`}>A password change code was sent to your email. Check your spam or junk messages if the code is not in your inbox.</p>
            <div className='text-lg font-bold grid gap-3 sm:grid-cols-2 grid-cols-1'>
                <TextInput
                    title="Enter password code"
                    value={changePasswordCode}
                    onChange={e=>setChangePasswordCode(e.target.value)}
                    type="phone"
                    contStyle={`${changePassword? '' : 'hidden'}`}
                    titleColor={`text-[dodgerblue]`}
                    inputStyle={`${styles.genInput}`}
                />
                
                {changePassword?
                   <div className='flex items-center justify-center'>
                        <TextInput
                        title={`Enter new password`}
                        type="text"
                        titleColor={`text-[dodgerblue]`}
                        value={newPassword}
                        onChange={e=>setNewPassword(e.target.value)}
                        inputStyle={`${styles.genInput}`}
                      />
                    <p className='mt-6 text-[blue] cursor-pointer ml-2 active:text-blue-600 font-bold'
                     onClick={()=>setChangePassword(!changePassword)}>Save</p>
                  </div>
                :
                <div className='flex items-center justify-center'> 
                <TextInput
                    title={`Password`}
                    type="password"
                    value="mypassword"
                    titleColor={`text-[teal]`}
                    inputStyle={`${styles.genInput}`}
                />
                <p className='mt-6 text-[blue] cursor-pointer ml-2 active:text-blue-600 font-bold'
                    onClick={()=>setChangePassword(!changePassword)}>Edit Password</p>
                </div>
                }
            </div>
        </div>
    </div>
  )
}

export default Form;


var styles ={
    genInput: `text-[gray]`
}