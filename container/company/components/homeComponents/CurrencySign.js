'use client'
import React, {useState, useEffect} from 'react';
import DashboardCard from '../reusableComponents/DashboardCard';
import { postOrUpdateSettings } from '../utils/postOrUpdateSettings';
import Spinner from '@/components/misc/Spinner';
import { handleCurrencySymbolUpdate } from '../utils/handleCurrencySymbolUpdate';


const CurrencySign = ({dispatchRefreshSettingsCount, notify, title, user, settings, currentSymbol}) => {
const [showSpinner, setShowSpinner] = useState(false);
const [newCurrencySymbol, setNewCurrencySymbol] = useState("");

const postingLockSlug = "transaction-posting-lock";

let postingLock = false;
if(settings?.data?.length){
    const lockTranFound = settings.data.find((dt)=> dt.slug === postingLockSlug);
    if(lockTranFound?.smallText){postingLock = lockTranFound.smallText === "ON"}

}

React.useEffect(()=>{
  //setPostingLockInit(postingLockInit +1);  
  setShowSpinner(false);
},[postingLock]);

const handleUpdate =  (act)=>{
    const postFields = ['smallText'];
    const postValues = [act];
    const postDetails= {name:"Transaction Posting toggle", description:"Transactions cannot be posted when this is ON"};
    postOrUpdateSettings({slugName:postingLockSlug, postDetails, postFields, postValues, user, notify, 
        dispatchRefreshSettingsCount, setShowSpinner});
}


const handleSave = async (e)=>{
    e.preventDefault();
    setShowSpinner(true);
    if(newCurrencySymbol){
       await handleCurrencySymbolUpdate({user, currencySymbolNew:newCurrencySymbol, notify, dispatchRefreshSettingsCount})
       .then(()=>{
        setShowSpinner(false);
        setNewCurrencySymbol("");
     })
    }
}


const handleOnChangeCurrencySymbol =(e)=>{
    setNewCurrencySymbol(e.target.value)
}


  return (
    <DashboardCard title={title} maxWidth="max-w-[450px]" style={``}>
        <div>
            <p className='text-red-800 font-[500] my-4'>Current Symbol: <span className={`bg-white ml-3 py-1 px-3 border border-blue-300 font-bold text-blue-500`}>
                {currentSymbol}</span></p>
            <p className='italic pb-3'>Change the currency symbol to be displayed on your report</p>
            <form  className={`flex flex-wrap flex-row gap-3 items-center`} onSubmit={handleSave}>
                <div className='flex flex-row flex-wrap'>
                    <label className='font-bold mr-2'>Change Symbol</label>
                    <input
                        required
                        data-theme='winter'
                        text="text"
                        value={newCurrencySymbol}
                        onChange={handleOnChangeCurrencySymbol}
                        className={`border border-blue-400  outline-none py-1 px-2  mr-3 rounded-[3px] active:bg-blue-50 focus:bg-blue-50`} 
                    />
                </div>
                <button className='inline-flex btn btn-accent btn-sm px-5'
                 type='submit' disabled={newCurrencySymbol? '' : 'disabled'}>Save</button>
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

  
  
export default CurrencySign;