'use client'
import React from 'react'
import HomeHeader from '@/container/_home/header/Header'
import { BiWifiOff } from 'react-icons/bi'
import { useRouter } from 'next/navigation'




const NetworkError = () => {
  const [showLoader, setShowLoader] = React.useState(false);
  const router = useRouter();

  const handleReloadPage =()=>{
    setShowLoader(true)
    router.refresh();
    setTimeout(()=>{
      setShowLoader(false)
    }, 6000);
  }
  
  return (
    <div data-theme="light" className='h-screen w-full fixed z-50'>
        <HomeHeader/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <div className="flex bottom-0 w-full right-0 justify-center bg-white">
            <div className="flex p-4 text-red-500 flex-col justify-center items-center text-[100px] sm:text-[180px]">
                <BiWifiOff />
                <p className="text-base text-red-600 text-center">Ohhhs! You seems to be having Network Challenge</p>
                <div className="text-[32px] mt-[50px]">{showLoader? '😀' : '😔'}</div>
                
                <button className={`btn btn-warning px-3 mt-20 mb-5 btn-sm smc:btn-md smc:px-10 ${showLoader? 'btn-disabled' : ''}`}
                 onClick={handleReloadPage}>
                  {showLoader && <span className="loading loading-spinner text-info mr-6"></span>}
                  Reload
                </button>  
            </div>  
        </div>      
    </div>
  )
}

export default NetworkError;