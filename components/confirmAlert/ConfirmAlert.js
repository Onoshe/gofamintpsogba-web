import PageBlind from '@/navigation/pageBlind/PageBlind'
import React from 'react'
import { MdCancel, MdClose } from 'react-icons/md'



const ConfirmAlert = ({showBlind, handleCancel, title, msg, handleContinue, confirmBtnName}) => {
  return (
    <PageBlind showBlind={showBlind} bg='bg-[navy]/45' top={'top-0'} contStyle={'flex justify-center pt-[20vh]'}
        childStyle={'w-full  max-w-[450px] min-w-[380px] flex justify-center h-fit'}>
        <div className='p-6 bg-white relative shadow-lg w-full flex-col flex items-center justify-center rounded-md'>
            <MdClose className='absolute right-6 top-5 text-[22px] active:text-red-400 text-red-800 hover:text-red-500 cursor-pointer'
               onClick={handleCancel}/>
            <div className="py-5 text-gray-600">
                <p className="text-center font-bold">{title}</p>
                <p className="text-center py-3">{msg}</p>
            </div>
            <div className="w-full flex flex-row flex-wrap justify-evenly">
                <button className='btn btn-error px-10' onClick={handleContinue}>{confirmBtnName || "Delete"}</button>
                <button className='btn btn-neutral px-10' onClick={handleCancel}>Cancel</button>
            </div>
        </div>
    </PageBlind>
  )
}

export default ConfirmAlert