'use client'
import React from 'react';
import {BsFillPersonFill, BsPerson} from 'react-icons/bs';
import Form from './components/Form';
import useStoreCompany from '@/context/storeCompany.js';
import useStoreHeader from '@/context/storeHeader';
/* eslint-disable @next/next/no-img-element */

const IndexMyProfile = () => {
  const { dispatchShowLoadingNavPage} = useStoreHeader((state) => state);
  const {online, user, dispatchUser} = useStoreCompany((state) => state);
  const [changePassword, setChangePassword] = React.useState(false);
  const [changePasswordCode, setChangePasswordCode] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");

 // console.log(user);
  
  React.useEffect(()=>{
    dispatchShowLoadingNavPage(false)
  },[]);
  
  return (
    <div  data-theme='light'  className='p-3 md:p-4 min-h-screen'>
        <div className='font-bold flex flex-row items-center gap-2 header1 text-blue-700'>
            <BsFillPersonFill  className={`${user.userName? 'text-green' : ''} text-[28px]`}/>
                {user?.userName? user.form.surname+"'s Profile" : 'My Profile'}
            
        </div>
        <div className='font-bold hidden flex-row items-center gap-2 header1 mt-2'>
                <p>User Type:-- </p>
                {user.userType}
        </div>
        <div className='flex justify-center items-center my-5'>
          {!user?.form?.imageUrl?
            <div className="avatar online">
                <div className="w-24 rounded-full flex justify-center items-center ring ring-primary ring-offset-base-100 ring-offset-2">
                    <BsPerson color='seagreen' className='text-[100px] text-center'/>
                </div>
            </div>
            :<div className='flex justify-center items-center pt-4 pb-6'>
                <div className="avatar">
                    <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src={user.form.imageUrl} alt='photo' />
                    </div>
                </div>
            </div>}
        </div>
        <Form
            user={user}
            dispatchUser={dispatchUser}
            changePassword={changePassword}
            setChangePassword={setChangePassword}
            changePasswordCode={changePassword}
            setChangePasswordCode={setChangePasswordCode}
            newPassword={newPassword}
            setNewPassword={setNewPassword}
        />
    </div>
  )
}

export default IndexMyProfile;


var styles ={
    genInput: `rounded-md text-[gray]`
}