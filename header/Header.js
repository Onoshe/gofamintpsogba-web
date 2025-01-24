'use client'
import React, { useState, } from 'react';
import { HiMenu } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';
import Link from 'next/link';
import logo from '@/assets/gofamintLogo.png';
import Navbar from './Navbar';
import UserLoginprofile from './UserLoginProfile';
import { usePathname } from 'next/navigation';
import { getPathName } from './paths';
import Image from 'next/image';
import { getImgLink, getImgLinkBase } from '@/lib/apis/urlLinks';
import { useSWRFetcher } from '@/lib/hooks/useSWRFetcher';
import { imagesState, postImagesState } from './postImagesState';
import useStoreHeader from '@/context/useStoreHeader';
import { getRequest } from '@/lib/apis/getRequest';



const Header = ({hide, scrollDown, user, set}) => {
  const pathname = usePathname();
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const {imgGroup, dispatchImgGroup} = useStoreHeader((state)=>state);
  const imgLink = getImgLink();
  const [dataFetched, setDataFetched] = useState(false);


  const fetchData = async ()=>{
    getRequest(imgLink).then((res)=> {
      postImagesState(res?.data, dispatchImgGroup);
    });
  }
  //console.log(imgGroup);


  React.useEffect(()=>{
    if(!imgGroup?.fiveStar?.length){
      fetchData();
    }
    if(!dataFetched){
      fetchData();
      setDataFetched(true);
    }
  },[dataFetched]);



  return (
    <div className={`${hide && 'hidden' } flex flex-row relative  bg-[rgb(1,1,60)] shadow-2xl w-full`}>
          <div className={`px-2 ${scrollDown? 'pb-[2px] pt-1' : 'py-2'} w-full flex flex-row justify-between items-center shadow-md`}>
            <HiMenu fontSize={30} className="cursor-pointer md:hidden ml-3 text-white" onClick={() => setToggleSidebar(true)} />
            <Link href="/">
              <Image src={logo} alt="logo" className={`w-[40px] transition-all duration-500 ${scrollDown? '' : 'xsmc:w-[50px] smc:w-[60px] md:w-[70px]'}`} />
            </Link>
            <h2 className="flex md:hidden text-white">
              {getPathName(pathname)}
            </h2>
          <div className='flex flex-row justify-center items-center'>
            <div className="hidden md:flex justify-end">
              <Navbar  user={user}/>
            </div>
          </div>
          </div>
          {toggleSidebar && ( //Sidebar
          <div className="fixed w-full bg-blackOverlay h-screen z-50 top-0" onClick={() => setToggleSidebar(false)}>
            <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
              <div className="absolute w-full flex justify-end items-center p-2">
                <AiFillCloseCircle fontSize={42} color="ivory" className="cursor-pointer" onClick={() => setToggleSidebar(false)} />
              </div>
                <Navbar closeToggle={setToggleSidebar} user={user} />
            </div>
          </div>
          )}
          
    </div>
  );
};

export default Header;
