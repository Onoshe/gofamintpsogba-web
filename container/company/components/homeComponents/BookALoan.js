'use client'
import React, {useState, useEffect} from 'react';
import DashboardCard from '../reusableComponents/DashboardCard';
import { SwitchComponent } from '@/components/forms/SwitchComponent';
import Spinner from '@/components/misc/Spinner';
import { editDeleteTranHandler } from '../utils/editDeleteTranHandler';

const BookALoanControl = ({dispatchRefreshSettingsCount, notify, user, settings, bookLoanCheckbox, dispatchBookLoanCheckbox}) => {
const [showSpinner, setShowSpinner] = useState(false);

const bookALoanControl = "book-a-loan-control";

let bookALoanOn = false;
if(settings?.data?.length){
    const controlFound = settings.data.find((dt)=> dt.slug === bookALoanControl);
    if(controlFound?.smallText){bookALoanOn = controlFound.smallText === "ON"}
}

React.useEffect(()=>{
    if(bookLoanCheckbox?.show){
        //Update the database if bookLoanCheckbox.show = true; This can be set to true upon edit 
        const noNotify = true;
        handleUpdate("ON", noNotify);
    }
  },[bookLoanCheckbox.show]);

  
React.useEffect(()=>{
  //setbookALoanOnInit(bookALoanOnInit +1);  
  setShowSpinner(false);
},[]);

React.useEffect(()=>{
    if(bookALoanOn){
      dispatchBookLoanCheckbox({show:true});
    }else{dispatchBookLoanCheckbox({show:false});}
  },[bookALoanOn]);

const handleUpdate = async (act, noNotify=false)=>{
    const postFields = ['smallText'];
    const postValues = [act];
    const postDetails= {name:"Book a Loan Control", description:"User will be a ble to record a loan in Record Transaction module if this is turn ON"};
   await editDeleteTranHandler({slugName:bookALoanControl, postDetails, postFields, postValues, user, notify, noNotify,
        dispatchRefreshSettingsCount, setShowSpinner})
        .then(()=>setShowSpinner(false));
}
const handleOnChange =()=>{
    setShowSpinner(true);
    if(bookALoanOn){
        handleUpdate("OFF");
    }else{handleUpdate("ON")}
}



  return (
    <DashboardCard title={"Book a Loan"} maxWidth="max-w-[450px]" style={``}>
        <div>
            <p className='text-teal-800 font-[500] my-4'>Book a Loan: <span className={`bg-white ml-3 py-1 px-3 border border-gray-300 font-bold ${bookALoanOn? "text-green-500" : "text-gray-600"}`}>{bookALoanOn? "ON" : "OFF"}</span></p>
            <p className='italic pb-1'>Use this settings to manage Staff or Other Loan from Company booking in Record Transaction Module.
            </p>
            <p className='italic pb-3'>Book a Loan checkbox will show in the Module when this is turned ON</p>
            <form  className={`flex flex-row gap-3 items-center`}>
                <label className='font-bold'>Turn {bookALoanOn? "OFF" : "ON"}</label>
                <SwitchComponent isOn={bookALoanOn} 
                    handleToggle={handleOnChange}
                    isOnBallBg="bg-green-500" 
                    isOnBg="bg-green-50" 
                    isOnBorder="border-green-500" 
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

  
  
export default BookALoanControl;