'use client'
import React from 'react';
import {BsFillPersonFill, BsPerson} from 'react-icons/bs';
import Form from './components/Form';
import Users from './components/Users';
import { UpdatedUser } from './components/UpdateUser';
import { UpdatedProfile } from './components/UpdateProfile';
import { UpdatedPassword } from './components/UpdatePassword';
import HorizontalLine from '@/components/misc/HorizontalLine';
import { AddUser } from './components/AddUser';
import useStoreHeader from '@/context/storeHeader';
import { handleUpdateUserProfile } from './utils/handleUpdateUserProfile';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
/* eslint-disable @next/next/no-img-element */
import { handleUpdateUserPassword } from './utils/handleUpdateUserPassword';
import { handleEditUserRole } from './utils/handleEditUserRole';
import { handleAddNewUser } from './utils/handleAddNewUser';
import { handleDeleteUserAcct } from './utils/handleDeleteUserAcct';
import { ResetUserPassword } from './components/ResetUserPassword';
import { handleResetUserPassword } from './utils/handleResetUserPassword';
import { getPlanLimit } from './utils/getPlanLimit';
import { capitalizeFirstCharOnly } from '@/lib/capitalize/capitalizeString';
import { useAuthCustom } from '@/lib/hooks/useAuthCustom';
import { Modal } from './components/Modal';
import { BiUpload } from 'react-icons/bi';
import { FileUploadCustom } from './components/FileUploadCustom';
import { MdClose } from 'react-icons/md';
import { getImageLink } from '@/lib/apiRequest/urlLinks';
import Image from 'next/image';
import { useSWRFetcher } from '@/lib/hooks/useSWRFetcher';
import { getRequest } from '@/lib/apiRequest/getRequest';



const updateFormAddUserDef ={firstname:"", lastname:"", title:"", email:"", 
  phoneNo:"", role:"", password:"", userId1:'', userId2:'', showUserId:false, defaultUserId:true};

const IndexProfile = ({ssUser}) => {
  const { session, signOut, status} = useAuthCustom(ssUser); 
  const {user, users, subscriptions, coy, dispatchCoy, client_Admin, clientData, generalSettings, quickrecordsLogo, dispatchFetchSettingsCall} = useStoreHeader((state) => state);
  const {online,  dispatchUser} = {online:true, user:{}, dispatchUser:()=>console.log()};
  const [changePassword, setChangePassword] = React.useState(false);
  const [changePasswordCode, setChangePasswordCode] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [updateUser, setUpdateUser] = React.useState({user:{}, update:false, reset:false});
  const [updateProfile, setUpdateProfile] = React.useState({profile:{}, update:false});
  const [updatePassword, setUpdatePassword] = React.useState({password:{}, update:false});
  const [addUser, setAddUser] = React.useState({user:{}, add:false});
  const [deleteUser, setDeleteUser] = React.useState({user:{}, delete:false});
  const [updateForm, setUpdateForm] = React.useState({});
  const [signingOut, setSigningOut] = React.useState({show:false});
  const [updateFormAddUser, setUpdateFormAddUser] = React.useState(updateFormAddUserDef);
  const [updateUserForm, setUpdateUserForm] = React.useState({role:"", nonActive:"", password:"", passwordDelete:"", passwordReset:""});
  let planLimit = getPlanLimit(subscriptions, generalSettings);
  const userId = session?.user?.userId;
  let userIdImg = userId?.replace(".", "_");
  const userPhoto = getImageLink(userIdImg);
  //console.log(userPhoto)
  //userIdImg += ".jpg";
  const [file, setFile] = React.useState(null);
  //console.log(generalSettings)

  const notify = (type, msg) => toast[type](msg, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    //transition: 'Bounce',
    });


  const handleUser =({key, row, i})=>{
    if(row?.firstname && row.role.toLowerCase() !== "admin"){
        if(key === "update"){
          setUpdateUser({user:row, update:true,})
        }else if(key === "reset"){
          setUpdateUser({user:row, reset:true})
        }

    }
  };
  const handleUpdateUser = async (e)=>{
    e.preventDefault();
    await handleUpdateUserProfile(updateForm, user, session)
    .then((res)=> {
      if(res.ok){
        setUpdateProfile(({profile:{}, update:false}))
        notify("success", "Profile update successful");
        dispatchFetchSettingsCall();
      }else{notify("error", res.msg);}
    })
  }
  const handleUpdatePwd = async (e, form)=>{
    e.preventDefault();
    //return console.log(form)
    await handleUpdateUserPassword(form, user, session)
    .then((res)=> {
      if(res.ok){
        notify("success", "Password update successful");
        setUpdatePassword({password:{}, update:false});
        setSigningOut({show:true});
        setTimeout(()=>signOut({dispatchCoy, user}), 3000);
      }else{notify("error", res.msg);}
    })
 }
 const handleEditUser = async (e, form)=>{
  e.preventDefault();
  await handleEditUserRole(form, updateUser.user, session)
  .then((res)=> {
    if(res.ok){
      notify("success", "User updated successfully");
      setUpdateUser({password:{}, update:false});
      dispatchFetchSettingsCall();
    }else{notify("error", res.msg);}
  })
}

const handleAddUser =async (e, updateForm)=>{
  e.preventDefault();
  //console.log(updateForm)
  if(users?.length < planLimit){
    setUpdateFormAddUser(updateFormAddUser)
    await handleAddNewUser(updateFormAddUser, session)
    .then((res)=> {
      if(res.ok){
        notify("success", "User updated successfully");
        setUpdateFormAddUser(updateFormAddUserDef);
        setAddUser({user:{}, add:false})
        dispatchFetchSettingsCall();
      }else{
        notify("error", res.msg);
        if(res.type === "USERID"){
          setUpdateFormAddUser({...updateFormAddUser, defaultUserId:false})
        }
      }
    })
  }
}
const handleDeleteUserContinue= async ()=>{
  if(updateUserForm?.passwordDelete){
    //setUpdateFormAddUser(updateFormAddUser)
    await handleDeleteUserAcct(updateUserForm, deleteUser.user, session)
    .then((res)=> {
      if(res.ok){
        notify("success", "User deleted successfully");
        setUpdateFormAddUser(updateFormAddUserDef);
        setDeleteUser(({user:{}, delete:false}));
        setUpdateUserForm(({role:"", nonActive:"", password:"", passwordDelete:""}));
        setUpdateUser({password:{}, update:false});
        dispatchFetchSettingsCall();
      }else{
        notify("error", res.msg);
      }
    })
  }else{notify("error", "Please enter your login password")}
}

const handleResetUserPwd =async (e)=>{
  e.preventDefault();
  await  handleResetUserPassword(updateUserForm, updateUser.user, session)
  .then((res)=> {
    //console.log(res)
    if(res.ok){
      notify("success", "Login details have been sent to user email");
      setUpdateUser(({userL:{}, update:false, reset:false}))
      setUpdateUserForm({role:"", nonActive:"", password:"", passwordDelete:"", passwordReset:""})
      dispatchFetchSettingsCall();
    }else{ notify("error", res.msg);}
  })
}
  const handleDeleteUser =(e, type)=>{
    e.preventDefault();

    if(type==="DELETE"){
        setDeleteUser({user:updateUser.user, delete:true})
    }else if(type==="CONTINUE"){
        setDeleteUser({user:{}, delete:false});
    }else if(type==="CANCEL"){
        setDeleteUser({user:{}, delete:false})
    }

  }

 
  
  const onChangeAddForm =(e)=>{
     const {name, value} = e.target;
     setAddUser({user:{...addUser.form, [name]:value}, ...addUser});
  }
  const handleCloseUpdate =()=>{
    setUpdateUser({user:{}, update:false});
    setUpdateProfile({profile:{}, update:false});
    setUpdatePassword({password:{}, update:false});
    setAddUser({user:{}, add:false})
  };
  
  //console.log(userPhoto)

  React.useEffect(()=>{
    setUpdateForm({title:user.title, phoneNo:user.phoneNo, recoveryEmail:user.recoveryEmail, password:''})
  },[user]);
  

  const userPhotoRender = (userPhoto?
  <Image width={100} height={100} src={userPhoto} alt='photo' className='size-[100px]'/>
  :<BsPerson color='seagreen' className='text-[100px] text-center'/>);

  return (
    <div  data-theme='light'  className='p-3 md:p-4 min-h-screen'>
        <div className='font-bold flex  flex-row items-center gap-2 header1 text-blue-700'>
            <BsFillPersonFill  className={`${user?.lastname? 'text-green' : ''} text-[28px]`}/>
                {user?.lastname? user?.lastname+"'s Profile" : 'My Profile'}
        </div>
        <div className='font-bold  flex-row items-center gap-2 header1 text-sm text-teal-800 mt-2'>{capitalizeFirstCharOnly(user?.role)}</div>
        <div className='flex justify-center items-center my-3 '>
          {!user?.imageUrl?
            <div className="avatar online relative">
                <div className="w-24 rounded-full flex justify-center items-center ring ring-primary ring-offset-base-100 ring-offset-2">
                    {file?.name? 
                      <img src={URL.createObjectURL(file)} alt="Uploade image" className='size-[50px]'/>
                      : userPhotoRender
                    }
                </div>   
                <FileUploadCustom file={file} setFile={setFile} session={session} 
                  className={'hidden'} notify={notify} userId={userId}/>
            </div>
            :<div className='flex justify-center items-center pt-4 pb-6'>
                <div className="avatar">
                    <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        {/*<img src={user?.imageUrl} alt='photo' />*/}
                       
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
            handleUpdatePassword={()=>setUpdatePassword({password:{}, update:true})}
            handleUpdateProfile={()=>setUpdateProfile({profile:{}, update:true})}
        />
        <HorizontalLine widths={100} margTop={20} margBot={15} bColor={'dodgerblue'}/>
        <Users users={users} 
          handleClickCell={handleUser} 
          handleAddUser={()=>setAddUser({user:{}, add:true})}
          planLimit={planLimit}
          />
        {updateUser.update && 
            <UpdatedUser 
                user={user} 
                handleClose={handleCloseUpdate} 
                selectedUser={updateUser.user}
                handleUpdateUser={handleUpdateUser}
                deleteUser={deleteUser}
                handleDeleteUser={handleDeleteUser}
                handleEditUser={handleEditUser}
                handleDeleteUserContinue={handleDeleteUserContinue}
                updateForm={updateUserForm}
                setUpdateForm={setUpdateUserForm}
                />
        }
        {updateUser.reset && 
            <ResetUserPassword 
                user={user} 
                handleClose={handleCloseUpdate} 
                selectedUser={updateUser.user}
                handleUpdateUser={handleUpdateUser}
                deleteUser={deleteUser}
                handleDeleteUser={handleDeleteUser}
                handleEditUser={handleEditUser}
                handleDeleteUserContinue={handleDeleteUserContinue}
                updateForm={updateUserForm}
                setUpdateForm={setUpdateUserForm}
                handleResetUserPwd={handleResetUserPwd}
                />
        }
        {updateProfile.update && 
          <UpdatedProfile user={user} 
            handleClose={handleCloseUpdate} 
            handleUpdateUser={handleUpdateUser}
            form={updateForm}
            setForm={setUpdateForm}
            />}
        {updatePassword.update && 
            <UpdatedPassword user={user} 
              handleClose={handleCloseUpdate} 
              handleUpdateUser={handleUpdateUser}
              handleUpdatePwd={handleUpdatePwd}/>
          }
        {addUser.add && 
            <AddUser user={session?.user} handleClose={handleCloseUpdate} 
            handleAddUser={handleAddUser}
            onChangeHandler={onChangeAddForm}
            updateForm={updateFormAddUser}
            setUpdateForm={setUpdateFormAddUser}
            />
        }
        {signingOut.show && <Modal />}
        <br/>
        <ToastContainer 
            position="top-right"
            autoClose={5000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick={true}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            //bodyClassName={postError.color}
          />
    </div>
  )
}

export default IndexProfile;
