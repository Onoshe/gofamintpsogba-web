import React, { useEffect } from 'react';
import {AiOutlineUserAdd} from 'react-icons/ai';
import Image from 'next/image';




const UserAvatar = ({loginForm}) => {
  const {isOnline, picture} = loginForm;

  
  return (
        <div className="w-[34px] h-[34px] flex justify-center content-center items-center"
          >
          <div className={`${isOnline && 'bg-[lime]'} ${!isOnline && 'bg-[#e2d6d6]'} w-[34px] h-[34px] flex justify-center content-center items-center cursor-pointer rounded-full`}>
            {isOnline? 
            <Image src={picture}
            alt="UserPicture" className="object-cover w-[90%] h-[90%] rounded-full"/> :
            <AiOutlineUserAdd size="80%"/>
            }
          </div>
        </div>
  );
};


export default UserAvatar;  