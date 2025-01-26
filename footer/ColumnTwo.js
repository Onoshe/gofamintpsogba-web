'use client'
import React from 'react'
import {FaFacebook} from 'react-icons/fa';
import { Zoom, GoogleMap, Instagram } from '@/assets/svg/SVGIcons';


const ColumnTwo = ({dataRes, mapUrl}) => {

  //console.log(dataRes, mapUrl)
  
  return (
    <div className='p-5 md:p-10'>
      <h1 className='font-archivo text-xl sm:text-4xl pb-5 bold md:text-left'>Connect with Us</h1>
      <h1 className='text-xs sm:text-base md:text-justify text-[silver]'>
        {text1}
      </h1>
      <h1 className='text-xs sm:text-base md:text-justify text-[silver]'>
        {text2}
      </h1>
      <div className="flex flex-row scale-[0.60] xxsmc:scale-75 md:scale-100 justify-center md:justify-start mt-5">
            <a target="_blank" href={dataRes?.mediaLinks?.group || '#'} className='pr-5'>
                <FaFacebook size={50} 
                className="hover:bg-white hover:text-blue-600 rounded-full"/>
            </a>
            <a target="_blank" href={dataRes?.mediaLinks?.groupSub || '#'} className='pr-0  mt-[-12px] ml-[-15px]'>
                <Instagram size={20}/>
            </a>
            <a target="_blank" href={dataRes?.mediaLinks?.textShort1 || '#'} className='pr-5 '>
              <Zoom/>
            </a>
            <a target="_blank" href={dataRes?.mediaLinks?.textShort2 || '#'} className='pr-5 '>
              <GoogleMap size={20} className="bg-[blue]"/>
            </a>
        </div>
    </div>
  )


}

export default ColumnTwo


const text1 = "Don't miss our services!";
const text2 = "Our Sunday services are broadcasted live on facebook.";