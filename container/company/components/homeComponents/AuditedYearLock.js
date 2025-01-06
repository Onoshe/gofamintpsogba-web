'use client'
import React, {useState} from 'react';
import DashboardCard from '../reusableComponents/DashboardCard';
import { TextTitle } from '../../_IndexCompany';
import { postOrUpdateSettings } from '../utils/postOrUpdateSettings';


const AuditedYearLock = ({dispatchRefreshSettingsCount, notify, user, settings}) => {
const [date, setDate] = useState('');
const tranLockSlug = "transaction-lock-date";


let tranLockDate = 'Not set';
if(settings?.data?.length){
    const lockTranFound = settings.data.find((dt)=> dt.slug === tranLockSlug);
    if(lockTranFound?.smallText){tranLockDate = lockTranFound.smallText}
}
   
const handleUpdate =  (e)=>{
    e.preventDefault();
    if(!date) return
    const postFields = ['smallText'];
    const postValues = [date];
    const postDetails= {name:"Posting lock date", description:"Transactions cannot be posted before this date"};
    postOrUpdateSettings({slugName:tranLockSlug, postDetails, postFields, postValues, user, notify, dispatchRefreshSettingsCount})
    .then(()=> setDate(""))
}
const handleOnChange =(e)=>{
    setDate(e.target.value)
}
const handleRemovePostingDate =()=>{
    const postFields = ['smallText'];
    const postValues = [""];
    const postDetails= {name:"Posting lock date", description:"Transactions cannot be posted before this date"};
    postOrUpdateSettings({slugName:tranLockSlug, postDetails, postFields, postValues, user, notify, dispatchRefreshSettingsCount})
    .then(()=> setDate(""))
};

  return (
    <DashboardCard title={"Lock Posting by Date"}>
        <div>
            <TextTitle title="Lock Date" style="" name={tranLockDate}/>
            <p className='italic pt-3'>{"You won't be able to record transactions before this date"}</p>
            <p className='italic pb-3'>This is crucial for audited years to prevent posting to previous periods</p>
            <form className='' onSubmit={handleUpdate}>
                <label>Change date</label>
                <input type='date' required className='mx-2 bg-gray-400 border border-white '
                    onChange={handleOnChange}
                    value={date}/>
                <button className={`py-[2px] px-3 rounded-md ${!date? 'text-gray-400 bg-gray-200': 'text-[blue] bg-[#dadaf7] border border-blue-300 cursor-pointer hover:bg-[#c5c5fa] active:bg-[#eaeaf7]'}`}
                    >
                    Update
                </button>
            </form>
            <button className='btn btn-sm btn-error mt-6' disabled={tranLockDate.toLocaleLowerCase().includes("not set")? true : false}
              onClick={handleRemovePostingDate}>
                Remove lock date
            </button>
        </div> 
    </DashboardCard>
  )
}

export default AuditedYearLock