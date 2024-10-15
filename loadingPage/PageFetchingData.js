'use client'
import React from 'react'
import HomeHeader from '@/container/_home/header/Header'
import { useRouter } from 'next/navigation'
import FastRecordBox from '@/appLogo/FastRecordBox'
import useStoreTransactions from '@/context/storeTransactions'




const PageFetchingData = () => {
  const {runDispatchClientDataCall} = useStoreTransactions((state) => state);
  const [noSpin, setNoSpin] = React.useState(false);
  const router = useRouter();

  const handleSpin =()=>{
    setNoSpin(false);
    runDispatchClientDataCall();
  }
  
  React.useEffect(()=>{
    if(!noSpin){
      setTimeout(()=>{
        setNoSpin(true)
      }, 10000);
    }
  },[noSpin]);

  return (
    <div data-theme="light" className='h-screen w-full fixed z-50'>
        <HomeHeader/>
        
        <div className="flex flex-col h-full w-full right-0 justify-center items-center bg-white">
            <div className="flex p-4 text-red-500 flex-col justify-center items-center">
                <FastRecordBox noSpin={noSpin? "noSpin" : ""}/> 
                <br/>
               {!noSpin && <p className="text-base text-blue-600 text-center">Loading data, please wait...</p>}
          
            </div>  
            <div className="flex p-4 text-red-500 flex-col justify-center items-center text-[100px] sm:text-[180px]">
                
                {noSpin && <p className="text-base text-red-600 text-center">Ohhhs! Error occured while loading data. Please reload</p>}
                <div className="text-[32px] mt-[50px]">{noSpin? '😔' : ''}</div>
                
                <button className={`btn btn-warning px-3 mt-20 mb-5 btn-sm smc:btn-md smc:px-10 ${noSpin? '' : 'hidden'}`}
                 onClick={handleSpin}>
                    Reload
                </button>  
            </div> 
        </div>      
    </div>
  )
}

export default PageFetchingData;