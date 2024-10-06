'use client'
import React, {useState, useEffect, Suspense} from 'react'
import HomeHeader from '@/container/_home/header/Header'
import { BiWifiOff } from 'react-icons/bi'




const NetworkError = () => { 
  
  return (
    <div data-theme="light" className='h-screen w-full'>
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
                <p className="text-base text-red-600 text-center">Ohhhs! You seems to be having Network Problem</p>
                <div className="text-[32px] mt-[50px]">😔</div>
              
            </div>  
        </div>      
    </div>
  )
}

export default NetworkError;