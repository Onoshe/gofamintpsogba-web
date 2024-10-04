import HorizontalLine from '@/components/misc/HorizontalLine';
import React from 'react'
import { BsGearFill } from 'react-icons/bs';
import { MdDashboard, MdKeyboardArrowDown, MdPerson } from "react-icons/md";
import { MdLogout } from "react-icons/md";


const HeaderUser = ({userEmail, userFullName, userDropdown, setUserDropdown, handleLogout, handleBackToDashboard}) => {
    const handleDropdown = ()=>{
        setUserDropdown(true)
    }
    const handleCloseDropdown = ()=>{
        //setUserDropdown(!userDropdown)
        setUserDropdown(false)
    }
   

    //console.log(session)
  return (
    <div className='relative ' onMouseLeave={handleCloseDropdown}>
        <div className='flex flex-row gap-2 items-center'>
            <div className='text-[12px]'>
                <p className=''>{userEmail}</p>
                <p className='text-right'>{userFullName}</p>
            </div>
            <MdKeyboardArrowDown size={28} className='cursor-pointer text-white active:text-gray-300'
             //onClick={handleDropdown}
             onMouseEnter={handleDropdown}
             //onMouseLeave={handleCloseDropdown}
             />
        </div>
        {userDropdown && <UserDropdown handleLogout={handleLogout} handleBackToDashboard={handleBackToDashboard}/>}
    </div>
  )
}


const UserDropdown =({handleLogout, handleBackToDashboard})=>{

    return(
        <div className='flex flex-col gap-3 absolute right-2 text-sm text-gray-600 shadow-lg bg-[aliceblue] p-3 w-[200px]'>
            <div className='flex flex-row gap-2 items-center cursor-pointer hover:text-blue-600'
              onClick={handleBackToDashboard}>
                <MdDashboard size={25}/>
                <p>Back to Dashboard</p>
            </div>
            
            <HorizontalLine widths={100} heights={1}/>
            <div className='flex flex-row gap-2 text-red-500 items-center cursor-pointer hover:text-red-700'
              onClick={handleLogout}>
                <MdLogout size={25} className=''/>
                <p>Logout</p>
            </div>
        </div>
    )
}


export default HeaderUser