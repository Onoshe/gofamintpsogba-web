import React from 'react';
import { MdClose } from 'react-icons/md';


const PostingGuide = ({title, showCard, toggleShowCard, children, childrenStyle}) => {
   
    return (
    <div className={`fixed h-screen bg-[gray]/60 w-full bottom-0 pt-[15vh] overflow-x-auto p-4 text-gray-700 justify-center ${showCard? 'flex' : 'hidden'}`}>
        <div className='relative w-[450px] shadow-lg bg-white border rounded-md border-blue-400 h-fit'>
            <MdClose className='absolute right-4 text-red-700 top-1 cursor-pointer hover:text-red-900 active:text-red-500' size={24}
              onClick={toggleShowCard}/>
            <div className='w-full py-3 bg-gray-300 text-base flex justify-center items-center font-bold'>
                {title}
            </div>
            <div className={`overflow-y-auto h-[60vh] p-3 ${childrenStyle}`}>
                {children}
            </div>
        </div>
    </div>
  )
}

export default PostingGuide