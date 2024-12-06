import Link from 'next/link';
import React from 'react';
import { MdCall, MdCopyright, MdOutlineAddLocation, MdOutlineLocationOn } from 'react-icons/md';


const Footer = () => {
  return (
    <footer className="py-5 bg-gray-700 text-center text-white gap-3">
        <div className='flex flex-row flex-wrap justify-center items-center gap-2'>
            <MdOutlineLocationOn size={28} color='cyan'/>
            Jibowu, Yaba, Lagos

            <div className='h-5 w-[2px] bg-gray-400 mx-4'></div>
            <div className='flex flex-row flex-wrap justify-center items-center gap-2'>
                  <MdCall size={28} color='cyan'/>
                <a href={`tel:+2348064205333`}>Contact Us</a>
            </div>
        </div>
        
        <div className='pt-10 flex flex-row items-center justify-center'>
          <MdCopyright color='white' size={18}/><span className='text-sm ml-1'>Ozitech Studio 2024. All Rights Reserved</span>
        </div>
    </footer>
  )
}

export default Footer;


// QuickRecords App
//...simplifying your financial records