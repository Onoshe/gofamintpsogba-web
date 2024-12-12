import HorizontalLine from '@/components/misc/HorizontalLine';
import React from 'react'
import { BsGearFill } from 'react-icons/bs';
import { MdKeyboardArrowDown, MdKeyboardArrowUp, MdPerson } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { capitalizeFirstCharOnly } from '@/lib/capitalize/capitalizeString';

const User = ({userInit, userEmail, userRole, userDropdown, setUserDropdown, handleLogout,
    handleClickCompany, handleClickProfile,expired
}) => {
    const handleDropdown = ()=>{
        setUserDropdown(true)
    }
    const handleCloseDropdown = ()=>{
        //setUserDropdown(!userDropdown)
        setUserDropdown(false)
    }

   // console.log(userDropdown)
  return (
    <div className='relative -mt-3' onMouseLeave={handleCloseDropdown}>
        <div className='flex flex-row gap-2 items-center'>
            <div className={`hidden avatar online placeholder w-6 h-6 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2`}>
                <div className="bg-neutral-focus text-neutral-content rounded-full ">
                    <span className="text-[16px] text-transparent">{userInit}</span>
                </div> 
            </div>
            <div className='text-[11px] smc:text-[13px] pt-1'>
                <p className=''>{userEmail}</p>
                <p className='text-right text-cyan-300'>{capitalizeFirstCharOnly(userRole)}</p>
            </div>
            <MdKeyboardArrowUp size={28} className={`cursor-pointer text-white active:text-gray-300 duration-200 ${userDropdown?  'rotate-180' : ''}`}
             //onClick={handleDropdown}
             onMouseEnter={handleDropdown}
             //onMouseLeave={handleCloseDropdown}
             />
        </div>
        {userDropdown && <UserDropdown 
            handleLogout={handleLogout}
            handleClickCompany={handleClickCompany}
            handleClickProfile={handleClickProfile}
            expired={expired}
            />}
    </div>
  )
}


const UserDropdown =({handleLogout, handleClickCompany, handleClickProfile,expired})=>{

    return(
        <div className='flex flex-col gap-3 rounded-md absolute right-2 shadow-md text-gray-600 bg-sky-100 p-3 w-[200px]'>
            <div className={`flex flex-row gap-2 items-center w-fit ${expired? '' : 'cursor-pointer hover:text-blue-600'}`}
                onClick={expired? ()=>console.log() :handleClickProfile}>
                <MdPerson size={25}/>
                <p>Profile</p>
            </div>
            <div className={`flex flex-row gap-2 items-center w-fit ${expired? '' : 'cursor-pointer hover:text-blue-600'}`}
                onClick={expired? ()=>console.log(): handleClickCompany}>
                <BsGearFill size={20}/>
                <p>Company</p>
            </div>
            <div className='hidden flex-row gap-2 items-center w-fit cursor-pointer hover:text-blue-600'>
                <MdPerson size={25} className=''/>
                <p>Switch User</p>
            </div>
            <HorizontalLine widths={100} heights={1}/>
            <div className='flex flex-row gap-2 text-red-500 w-fit items-center cursor-pointer hover:text-red-700'
              onClick={handleLogout}>
                <MdLogout size={25} className=''/>
                <p>Logout</p>
            </div>
        </div>
    )
}


export default User