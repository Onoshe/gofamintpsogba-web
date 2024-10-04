import React from 'react'
import { IoMdNotifications } from 'react-icons/io'



const HeaderNotification = ({newNotice, allNotice, handleOnClickNotice}) => {
  return (
    <div className={`relative hidden smc:flex flex-row gap-4 items-center group ${newNotice? 'cursor-pointer' : ''}`}>
        <IoMdNotifications size={30}  className={`${newNotice? 'text-cyan-300' : ''}`}/>
        <span className={`${newNotice? 'inline-flex' : ''} -ml-1 animate-ping absolute size-10 rounded-full bg-sky-400 opacity-75`}></span>
        <div className={`${newNotice? 'group-hover:flex' : 'hidden'} cursor-default hidden text-[10px] absolute left-[-130px] shadow-lg p-2 bg-[aliceblue] top-[25px] flex-col justify-center min-w-[210px]`}>
            <p className='font-bold text-[maroon] pb-2'>{"Celebrate them, it's their day"}</p>
            <div className={`${newNotice? '' : 'hidden'} mt-2`}>
            <p className='font-bold text-[dodgerblue]'>🎂 Birthday</p>
                {
                    allNotice?.map((dt, i)=>{
                        return(
                            <p className='text-[purple] cursor-pointer hover:bg-sky-200 hover:px-2' key={`${i}key`}
                            onClick={()=>handleOnClickNotice(dt)}>{i+1}. {dt.name} -{dt.date}</p>
                        )
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default HeaderNotification