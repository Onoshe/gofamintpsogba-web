import React from 'react';
import { BsPlusLg, BsUpload } from 'react-icons/bs';




const Header = ({handleClickBtn, createType}) => {


  return (
      <div className='flex p-4 bg-blue-50 flex-col gap-2 smc:flex-row smc:items-center justify-between'>
        <p className='text-lg font-bold text-blue-700'>{createType==="UPLOAD"? "Create by upload": "All Accounts"}</p>
        <div>
          <div className='smc:flex self-end gap-4'>
              <button className=" btn-info btn btn-sm text-[12px] smc:text-base smc:btn-md text-white px-4 mr-4"
                onClick={()=>handleClickBtn('MANUAL')}>
                <BsPlusLg size={23}/> New Account
              </button>
              <button className="btn btn-sm smc:btn-md btn-neutral text-white px-4 text-[12px] smc:text-base"
                onClick={()=>handleClickBtn('UPLOAD')}>
                <BsUpload size={23}/> Upload
              </button>
          </div>
        </div>
      </div>
  )
}

export default Header