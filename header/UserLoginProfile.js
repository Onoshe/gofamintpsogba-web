import React from 'react';
import UserAvatar from './UserAvatar';




const UserLoginProfile= ()=>{
  const loginForm = {};

  return(
    <div className="flex justify-center group"
      >
        <div className="dropdown relative">
          <div
            className="
              dropdown-toggle"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            //onClick={()=>userActionHandler()}
          >
            <UserAvatar loginForm={loginForm}/>
          </div>
          <div className={`${loginForm.isOnline && 'group-hover:flex'} ${loginForm.isOnline && 'group-hover:""'} bottom-[0.2rem] md:bottom-[-1.2rem] hidden bg-gray-100 left-[-4rem] md:left-[-3.5rem] text-[12px] md:text-sm rounded-full  text-[red] absolute px-3 py-1 cursor-pointer hover:bg-[red] hover:text-white`}
            //onClick={logoutHandler}
            >
            Logout
          </div>
          <div className={`${!loginForm.isOnline && 'group-hover:flex'} ${!loginForm.isOnline && 'group-hover:""'} bottom-[0.2rem] md:bottom-[-1.2rem] hidden bg-gray-100 left-[-4rem] md:left-[-3.5rem] text-[12px] md:text-sm rounded-full text-[blue] absolute px-3 py-1  cursor-pointer hover:bg-[mediumblue] hover:text-white`}
            //onClick={()=>userActionHandler()}
            >
            Login
          </div>
        </div>
    </div>
  );
}


export default UserLoginProfile;  


