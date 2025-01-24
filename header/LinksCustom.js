'use client'
import React from 'react';
import Link from 'next/link';
import {IoMdHome, IoMdPhotos, IoMdInformationCircleOutline,} from 'react-icons/io';
import {FaBookReader, FaRegAddressCard, FaUserAlt} from 'react-icons/fa';


const LinkCustom = ({isActive, handleCloseSidebar, isActiveStyle, isNotActiveStyle, linkTo, name, index }) => {
  const navIcon = [
  <IoMdHome className='md:hidden' size={32} key="iconHome"/>,
  <IoMdInformationCircleOutline className='md:hidden' size={32} key="iconCircle"/>,
  <FaBookReader className='md:hidden' size={32} key="iconBook"/>,
  <IoMdPhotos className='md:hidden' size={32} key="iconPhoto"/>,
  <FaRegAddressCard className='md:hidden' size={32} key="iconCard"/>,
  <FaUserAlt className='md:hidden' size={32} key="iconUser"/>,
];

  return (
        <nav className="flex flex-col gap-5 px-1 pb-5 lg:px-2 xl:px-5 xl:text-xl">
          <Link
            href={linkTo}
            end={name==="Home"? true : ""}
            className={isActive ? isActiveStyle : isNotActiveStyle}
            onClick={handleCloseSidebar}
          >
            {navIcon[index]}
            {name}
          </Link>
        </nav>
  );
};

export default LinkCustom;
