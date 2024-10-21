import PageBlind from '@/navigation/pageBlind/PageBlind'
import React from 'react'
import { MdCancel, MdClose } from 'react-icons/md';



const ConfirmAlert = ({showBlind, handleCancel, title, msg,  handleContinue, confirmBtnName, showConfirm, setShowConfirm}) => {
  
  const onChangeHandler = (e)=>{
    const inputVal = e.target.value;
    setShowConfirm({...showConfirm, inputVal})
  }

  return (
    <PageBlind showBlind={showBlind} bg='bg-[navy]/45' top={'top-0'} contStyle={'flex justify-center pt-[20vh]'}
        childStyle={'w-full  max-w-[400px] min-w-[300px] flex justify-center h-fit text-[12px]'}>
        <div className='p-6 bg-white relative shadow-lg w-full flex-col flex items-center justify-center rounded-md'>
            <MdClose className='absolute right-6 top-2 text-[22px] active:text-red-400 text-red-800 hover:text-red-500 cursor-pointer'
               onClick={handleCancel}/>
            <div className="py-2 text-gray-600">
                <p className={`text-center font-bold ${showConfirm?.titleRed? 'red' : ''}`}>{title}</p>
                <p className="text-center py-3">{msg}</p>
            </div>
            <div className={`mb-4 ${showConfirm?.showInput && setShowConfirm? '' : 'hidden'}`}>
              <input className='input input-sm bg-red-50 border-red-500 focus:border-red-500 focus:bg-white'
                onChange={onChangeHandler} value={showConfirm?.inputVal} placeholder='Enter Account code'/>
            </div>
            <div className="w-full flex flex-row flex-wrap justify-evenly">
                <button className='btn btn-error px-8 btn-sm' onClick={handleContinue}>{confirmBtnName || "Delete"}</button>
                <button className='btn btn-neutral px-8 btn-sm' onClick={handleCancel}>Cancel</button>
            </div>
        </div>
    </PageBlind>
  )
}

export default ConfirmAlert;


const ConfirmAlertDefault = ({showBlind, handleCancel, title, msg, handleContinue, titleRed, confirmBtnName}) => {
  return (
    <PageBlind showBlind={showBlind} bg='bg-[navy]/45' top={'top-0'} contStyle={'flex justify-center pt-[20vh]'}
        childStyle={'w-full  max-w-[400px] min-w-[300px] flex justify-center h-fit text-[12px]'}>
        <div className='p-6 bg-white relative shadow-lg w-full flex-col flex items-center justify-center rounded-md'>
            <MdClose className='absolute right-6 top-2 text-[22px] active:text-red-400 text-red-800 hover:text-red-500 cursor-pointer'
               onClick={handleCancel}/>
            <div className="pb-5 pt-2 text-gray-600">
                <p className={`text-center font-bold ${titleRed? 'red' : ''}`}>{title}</p>
                <p className="text-center py-3">{msg}</p>
            </div>
            <div className="w-full flex flex-row flex-wrap justify-evenly">
                <button className='btn btn-error px-8 btn-sm' onClick={handleContinue}>{confirmBtnName || "Delete"}</button>
                <button className='btn btn-neutral px-8 btn-sm' onClick={handleCancel}>Cancel</button>
            </div>
        </div>
    </PageBlind>
  )
}
