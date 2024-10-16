import React from 'react';
import { BsPlusLg, BsUpload } from 'react-icons/bs';




const Header = ({handleClickBtn, createType}) => {


  return (
      <div className='flex px-4 pt-4 bg-blue-50 flex-col gap-2 smc:flex-row smc:items-center justify-between'>
        <p className='text-lg font-bold text-blue-700'>{createType==="UPLOAD"? "Create by upload": "Products List"}</p>
        <div>
          <div className='smc:flex self-end gap-4'>
              <button className="btn btn-info text-white px-4 mr-4 btn-sm text-[12px]"
                onClick={()=>handleClickBtn('MANUAL')}>
                <BsPlusLg size={23}/> New Product
              </button>
              <button className="btn btn-neutral text-white px-4 btn-sm text-[12px]"
                onClick={()=>handleClickBtn('UPLOAD')}>
                <BsUpload size={23}/> Upload
              </button>
          </div>
        </div>
      </div>
  )
}

export default Header;