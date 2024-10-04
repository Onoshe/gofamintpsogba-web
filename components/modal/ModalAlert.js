'use client'
import React from 'react';
import { MdCancel } from 'react-icons/md';



const ModalAlert = ({alert, handleClose}) => {
    

  return (
    <div className={`fixed right-0 left-0 bottom-0 top-0 z-50 w-full flex items-center justify-center bg-[#2c3d48]/95 px-4 ${alert?.show? '' :'hidden'}`}>
            <div className={`relative bg-sky-50 border border-blue-700 flex flex-col rounded-md pb-3 pt-6 px-4 min-w-[250px] max-w-[450px]`}>
            <MdCancel size={24} className='absolute cursor-pointer text-red-600 right-2 top-2'
                    onClick={handleClose}/>
                <div className='text-center font-bold'>{alert?.msgTitle}</div>
                <div className={'text-center pt-1'}>{alert?.msg}</div>

                <div className={`mt-5 flex justify-center items-center flex-col ${alert?.showLoading? '' : 'hidden'}`}>
                    <span className='loading loading-spinner text-info'></span>
                    <p className='text-blue-500'>{alert?.loadingMsg}</p>
                    <p className='text-blue-500'>{alert?.loadingCount}</p>
                </div>
            </div>
    </div>
  )
}

export default ModalAlert