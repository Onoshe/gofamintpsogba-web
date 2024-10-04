'use client'
import useStoreCompany from '@/context/storeCompany.js';
import useStoreHeader from '@/context/storeHeader';
import Link from 'next/link';
import React, { use } from 'react'
import {BiLogOutCircle,} from 'react-icons/bi';
import {BsFillPersonFill} from 'react-icons/bs';


const UserProfileLink = () => {
    const {dynamicPage} = useStoreHeader((state) => state);
    const {user} = useStoreCompany((state) => state);
    const companyId = dynamicPage;


    return (
    <div class="dropdown dropdown-hover dropdown-bottom dropdown-end">
        <label tabIndex="0" 
        className={`flex justify-center cursor-pointer rounded-lg items-center py-2 px-3 mx-2`}>
            <div className="avatar online placeholder">
            <div className="bg-neutral-focus text-neutral-content rounded-full w-10">
                <span className="text-xl">JO</span>
            </div>
        </div> 
        </label>
    
        <ul tabIndex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            <li><Link href={`/`}>
                <BiLogOutCircle color='red' className='rotate-180 text-[24px]'/> 
                Logout
                </Link>
            </li>
            <li><Link href={`/${companyId}/profile`}>
                <BsFillPersonFill  className='text-[22px]'/>
                My Profile
                </Link>
            </li>
        </ul>
    </div>
  )
}

export default UserProfileLink