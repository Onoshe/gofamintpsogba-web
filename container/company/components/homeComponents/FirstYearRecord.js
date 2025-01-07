'use client'
import React, {useState, useEffect} from 'react';
import DashboardCard from '../reusableComponents/DashboardCard';
import { postOrUpdateSettings } from '../utils/postOrUpdateSettings';
import Spinner from '@/components/misc/Spinner';
import { handleCurrencySymbolUpdate } from '../utils/handleCurrencySymbolUpdate';
import { handleFirstYearTransReport } from '../utils/handleFirstYearTransReport';


const FirstYearRecord = ({dispatchRefreshSettingsCount, notify, title, user, settings}) => {
const [showSpinner, setShowSpinner] = useState(false);
const [firstYearTrans, setFirstYearTrans] = useState("");
const slug = "first-year-transactions-report";

let firstYearRecord = "";
if(settings?.data?.length){
    const firstYearRecordFound = settings.data.find((dt)=> dt.slug === slug);
    if(firstYearRecordFound?.smallText){firstYearRecord = firstYearRecordFound.smallText}

}

React.useEffect(()=>{
  //setPostingLockInit(postingLockInit +1);  
  setShowSpinner(false);
},[firstYearRecord]);

const handleUpdate =  (act)=>{
    const postFields = ['smallText'];
    const postValues = [act];
    const postDetails= {name:"Transaction Posting toggle", description:"Transactions cannot be posted when this is ON"};
    postOrUpdateSettings({slugName:slug, postDetails, postFields, postValues, user, notify, 
        dispatchRefreshSettingsCount, setShowSpinner});
}


const handleSave = async (e)=>{
    e.preventDefault();
    setShowSpinner(true);
    if(firstYearTrans){
       await handleFirstYearTransReport({user, firstYearTransRecord:firstYearTrans, notify, dispatchRefreshSettingsCount, slug})
       .then(()=>{
        setShowSpinner(false);
        setFirstYearTrans("");
     })
    }
}


const handleOnChangeFirstYearTrans =(e)=>{
    setFirstYearTrans(e.target.value)
}


  return (
    <DashboardCard title={title} maxWidth="max-w-[450px]" style={``}>
        <div>
            <p className='text-red-800 font-[500] my-4'>First Year Record: <span className={`bg-white ml-3 py-1 px-3 border border-blue-300 font-bold text-blue-500`}>
                {firstYearRecord}</span></p>
            <p className='italic pb-3'>Use this to set the earlist period of your transactions. The earliest period should be the beginning month and year of your first transactions on the app.</p>
            <form  className={`flex flex-wrap flex-row gap-3 items-center`} onSubmit={handleSave}>
                <div className='flex flex-row flex-wrap'>
                    <label className='font-bold mr-2'>Set First Report Year</label>
                    <input
                        required
                        data-theme='winter'
                        type="month"
                        value={firstYearTrans}
                        onChange={handleOnChangeFirstYearTrans}
                        className={`border border-blue-400  outline-none py-1 px-2  mr-3 rounded-[3px] active:bg-blue-50 focus:bg-blue-50`} 
                    />
                </div>
                <button className='inline-flex btn btn-accent btn-sm px-5'
                 type='submit' disabled={firstYearTrans? '' : 'disabled'}>Save</button>
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

  
  
export default FirstYearRecord;