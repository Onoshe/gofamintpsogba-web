'use client'
import React from 'react'
import HomeHeader from '@/container/_home/header/Header'
import { useRouter } from 'next/navigation'
import FastRecordBox from '@/appLogo/FastRecordBox'


const PageLogOut = () => {
    
  return (
    <div data-theme="light" className='h-screen w-full fixed z-50'>
        <HomeHeader/>
        
        <div className="flex flex-col h-full w-full right-0 justify-center items-center bg-red-50">
            <div className="flex p-4 text-red-500 flex-col justify-center items-center">
                <FastRecordBox/> 
                <br/>
               <p className="text-base text-red-600 text-center">Logging out, please wait...</p>
          
            </div>  
            
        </div>      
    </div>
  )
}

export default PageLogOut;