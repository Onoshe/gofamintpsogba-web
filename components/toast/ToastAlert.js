'use client'
import React from 'react';
import { MdCancel } from 'react-icons/md';


const ToastAlert = ({alert, setAlert}) => {

  const alertType = {
    error:'alert-error',
    info:'alert-info',
    success:'alert-success'
  };
  const handleClose =()=>{
    setAlert({...alert, show:false});
  }
  
  React.useEffect(() => {

    if(alert.show){
        const timeoutId = setTimeout(() => {
            handleClose();
          }, 8000);
      
          // Cleanup function to clear the timeout if the component unmounts
          return () => clearTimeout(timeoutId);
    }
    
  },[alert]); // Empty dependency array ensures the effect runs only once


  return (
    <div className={`fixed right-0 left-0 top-1 z-50 w-full flex justify-center px-3 ${alert.show? '' :'hidden'}`}>
            <div className={`relative alert flex flex-col rounded-md pb-3 pt-6 ${alertType[alert.type]} min-w-[250px] max-w-[450px]`}>
            <MdCancel size={24} className='absolute cursor-pointer text-white right-2 top-2'
                    onClick={handleClose}/>
                <div className='text-center font-bold -mt-3'>{alert?.msgTitle}</div>
                <div className={'-mt-3 text-center'}>{alert?.msg}</div>
            </div>
    </div>
  )
}

export default ToastAlert