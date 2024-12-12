'use client'
import React, {useState, useEffect} from 'react';
import DashboardCard from '../reusableComponents/DashboardCard';
import { SwitchComponent } from '@/components/forms/SwitchComponent';
import Spinner from '@/components/misc/Spinner';
import { editDeleteTranHandler } from '../utils/editDeleteTranHandler';

const EditDeleteLock = ({dispatchRefreshSettingsCount, notify, user, settings}) => {
const [postingLockInit, setPostingLockInit] = useState(0);
const [showSpinner, setShowSpinner] = useState(false);

const editDeleteLockSlug = "transaction-edit-delete-lock";

let postingLock = false;
if(settings?.data?.length){
    const lockTranFound = settings.data.find((dt)=> dt.slug === editDeleteLockSlug);
    if(lockTranFound?.smallText){postingLock = lockTranFound.smallText === "ON"}
}

React.useEffect(()=>{
  //setPostingLockInit(postingLockInit +1);  
  setShowSpinner(false);
},[postingLock]);

const handleUpdate =  (act)=>{
    const postFields = ['smallText'];
    const postValues = [act];
    const postDetails= {name:"Transaction Edit/Delete Lock", description:"Posted Transactions cannot be edited or deleted when it is ON"};
    editDeleteTranHandler({slugName:editDeleteLockSlug, postDetails, postFields, postValues, user, notify, 
        dispatchRefreshSettingsCount, setShowSpinner});
}
const handleOnChange =()=>{
    setShowSpinner(true);
    if(postingLock){
        handleUpdate("OFF");
    }else{handleUpdate("ON")}
}



  return (
    <DashboardCard title={"Lock Transaction Edit/Delete"} maxWidth="max-w-[450px]" style={``}>
        <div>
            <p className='text-red-800 font-[500] my-4'>Lock Transaction Edit/Delete: <span className={`bg-white ml-3 py-1 px-3 border border-gray-300 font-bold ${postingLock? "text-red-500" : "text-blue-500"}`}>{postingLock? "ON" : "OFF"}</span></p>
            <p className='italic pb-3'>This is used to lock transactions from being edited or deleted. If this is ON, you will not be able to edit or delete transactions that have been posted.</p>
            <form  className={`flex flex-row gap-3 items-center`}>
                <label className='font-bold'>Turn {postingLock? "OFF" : "ON"}</label>
                <SwitchComponent isOn={postingLock} 
                    handleToggle={handleOnChange}
                    isOnBallBg="bg-red-500" 
                    isOnBg="bg-red-50" 
                    isOnBorder="border-red-500" 
                    />

            <Spinner 
                showSpinner={showSpinner} 
                showMsg={false}
                msg="Loading report, please wait..."
                contStyle={`flex flex-col`}
                spinnerStyle={'ml-3 dark:text-[red] fill-[blue] h-6 w-6'}
                />
            </form>
        </div> 
    </DashboardCard>
  )
}

  
  
export default EditDeleteLock;