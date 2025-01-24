'use client'
import React from 'react'
import { BsSearch, } from 'react-icons/bs';
import {IoMdClose} from 'react-icons/io';



const SearchInput =({pastorCornerMsgs, setPastorCornerMsgs})=>{
  const [checked, setChecked] = React.useState('topic');
  const [searchTerm, setSearchTerm] = React.useState('');

  const searchTermHandler=(e)=>{
    const searchVal = e.target.value;
    setSearchTerm(searchVal);
    if(searchTerm !== ""){
      const sterm = searchVal.trim().toLowerCase();
      const pcornercopy = [...pastorCornerMsgs];
      //console.log(pcornercopy, sterm)
      const resTopic = pcornercopy?.filter((item, i)=> {
          return item?.title?.toString()?.toLowerCase()?.search(sterm) !== -1;
      });
      const resBody = pcornercopy?.filter((itembody, i)=> {
          return itembody?.message?.toString()?.toLowerCase().search(sterm) !== -1; });
          //return itembody?.body?.toLowerCase().search(sterm) !== -1; });

      setPastorCornerMsgs(checked==="topic"? resTopic : [...resTopic, ...resBody]);
    }else{
      setPastorCornerMsgs(pastorCornerMsgs);
    }
  }

  function resetSearchTermHandler(){
    setSearchTerm('');
    setPastorCornerMsgs(pastorCornerMsgs);
  };

  React.useEffect(()=>{
    resetSearchTermHandler();
  },[]);

  return(
    <div className='mx-10'>
      <div className='flex flex-row bg-white items-center
        bg-clip-padding border border-solid border-gray-300
        px-3 hover:border-blue-500 max-w-[700px] mt-3'>
        {!searchTerm?
          <BsSearch size={28} className='cursor-pointer fill-blue-600 hover:fill-[blue]'/>
          : <IoMdClose size={28} 
            onClick={resetSearchTermHandler}
            className='cursor-pointer fill-red-600'/>
          }
        <input
          placeholder='Search by topic or the entire message....'
          value={searchTerm}
          onChange={searchTermHandler}
          className={
            `form-control block
              w-full
              px-3
              py-2.5
              text-base
              font-normal
              text-gray-700
              transition
              ease-in-out
              outline-none
              border-transparent focus:border-transparent focus:ring-0
              focus:outline-none
              `}
        />
        
      </div>
      <div className='flex flex-wrap flex-row mt-3'>
        <div className='pr-3'><span className='pr-2'>
        <input
          className='scale-[1.3]'
          type="radio"
          value="topic"
          checked={checked === "topic"}
          onChange={()=>setChecked('topic')}
        />
          
          </span>Search Topic 
        </div>
        <div className=''><span className='pr-1'>
        <input
          className='scale-[1.3]'
          type="radio"
          value="topic"
          checked={checked === "all"}
          onChange={()=>setChecked('all')}
        />
          </span> Search All
        </div>
        
      </div>
    </div>
  );
}


export default SearchInput