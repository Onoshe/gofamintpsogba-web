'use client'
import React from 'react'
import {FaFacebook} from 'react-icons/fa';
//import mixlrlogo from "../../assets/mixlr-logo.png";
import { Zoom, GoogleMap, Instagram } from '../../assets/svg/SVGIcons';


const ColumnTwo = () => {


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
            <span className='pr-5 '><FaFacebook size={50} 
                className="hover:bg-white hover:text-blue-600 rounded-full"/></span>
            <span className='pr-0  mt-[-12px] ml-[-15px]'>
                <Instagram size={20}/>
            </span>
            <span className='pr-5 '><Zoom/></span>
            <span className='pr-5 '><GoogleMap size={20} className="bg-[blue]"/></span>
        </div>
    </div>
  )


}

export default ColumnTwo


const text1 = "Don't miss our services!";
const text2 = "Our Sunday services are broadcasted live on facebook.";