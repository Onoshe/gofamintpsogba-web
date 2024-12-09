import Link from 'next/link';
import React from 'react';
import { MdCall, MdCopyright, MdOutlineAddLocation, MdOutlineLocationOn, MdOutlinePrivacyTip } from 'react-icons/md';


const Footer = ({settings}) => {
  let latestVer = "";
  let latestControlNo = 1;
  const latest = settings?.find((dt)=> dt.slug === "app-version-control" && dt.number1 >= latestControlNo);
  latestVer = latest?.smallText1;

  return (
    <footer className="py-5 bg-gray-700 text-center text-white gap-3">
        <div className='flex flex-row flex-wrap justify-center items-center gap-2'>
            <MdOutlineLocationOn size={28} color='cyan'/>
            Jibowu, Yaba, Lagos

            <VertBreaker style='h-5'/>
            <div className='flex flex-row flex-wrap justify-center items-center gap-2'>
                  <MdCall size={28} color='cyan'/>
                <a href={`tel:+2348064205333`}>Contact Us</a>
            </div>
        </div>
        <div className='flex flex-row flex-wrap justify-center items-center gap-2'>
            <Link href={"/privacy-policy"} className='cursor-pointer hover:text-[cyan] active:text-cyan-200'>
              Privacy Policy
            </Link>
            <VertBreaker myStyle={'w-[1px] bg-gray-500 mx-4 h-4'}/>
            <Link href={"/terms-and-conditions"} className='cursor-pointer hover:text-[cyan] active:text-cyan-200'>
              Terms and Conditions
            </Link>
        </div>
        <div className='pt-10 flex flex-col smc:flex-row items-center gap-3 justify-center'>
          <div className='flex flex-row items-center justify-center'>
            <MdCopyright color='white' size={18}/>
              <span className='text-sm ml-1'>
                Ozitech Studio 2024. All Rights Reserved
              </span>
          </div>
          <VertBreaker style='h-3 hidden smc:block'/>
          <p className='text-sm block'>
            {latestVer}
          </p>
        </div>
    </footer>
  )
}

export default Footer;


const VertBreaker =({style, myStyle})=>{
  return <div className={`${style} ${myStyle? myStyle : 'w-[2px] bg-gray-400 mx-4'}`}></div>
}
// QuickRecords App
//...simplifying your financial records