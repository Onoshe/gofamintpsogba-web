'use client'
import React from 'react';
import Link from 'next/link';
import logo from '@/assets/gofamintLogo.png';
import LinkCustom from './LinksCustom';
import { pathTitle, pathNames, navLinks, } from './paths';
import { usePathname} from 'next/navigation';
import Image from 'next/image';
import { MdPerson2 } from 'react-icons/md';
import { FaUserAlt } from 'react-icons/fa';



const isNotActiveStyle = 'flex items-center px-2 mdc:px-4 gap-3 text-gray-500 md:text-gray-400 hover:text-black md:hover:text-white transition-all duration-200 ease-in-out hover:border-b-2 border-red-500 capitalize';
const isActiveStyle = 'md:text-white flex items-center px-2 mdc:px-4 gap-3 font-extrabold   transition-all duration-50 ease-in-out border-b-2 border-[#f55b23] capitalize';


const Navbar = ({ closeToggle, user}) => {
  const pathname = usePathname()
  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  };

  let navLinksFmt = navLinks?.filter((dt)=> dt.title !== "Admin");
  if(user?.email && user.phoneNo){
    navLinksFmt = navLinks;
  }
  const isAnonymous = user?.type === "ANONYMOUS";

  return (
    <div className="flex flex-col justify-between h-full 
        overflow-y-scroll min-w-210 hide-scrollbar mr-0">
      <div className="flex flex-col  md:flex-row">
        <div className=" mb-5  flex justify-center bg-blue-900 md:hidden">
            <Link
              href="/"
              className="flex px-5 gap-2 my-6  pt-1 w-190 items-center"
              onClick={handleCloseSidebar}
              >
              <Image src={logo} alt="logo"  className="w-full" />
            </Link>
        </div>
        {navLinksFmt.map(({path, title}, i)=>{
            return(
              <LinkCustom
                key={`${i}+nav`}
                name={title}  
                handleCloseSidebar={handleCloseSidebar} 
                isActiveStyle={isActiveStyle} 
                isNotActiveStyle={isNotActiveStyle}
                linkTo={pathNames[i]}
                index={i}
                isActive={path === pathname || pathname.includes(`${path}/`)}
                />
            );
        })}
        {isAnonymous && 
          <div className='bg-lime-400 size-2 rounded-full md:mt-2 md:ml-0 -mt-2 ml-5 '/>
        }
      </div>
    </div>
  );
};

export default Navbar;
