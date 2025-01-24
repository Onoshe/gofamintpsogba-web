'use client'
import React from 'react'
import {FaHandPointRight} from 'react-icons/fa';
import Resources from './Resources';



const Container = ({queryDownloads}) => {
  //const [fetchedResources, setFetchedResources] = React.useState(queryDownloads);
  const fetchedResources = queryDownloads
  

    return (
    <div className='my-10 w-full bg-slate-200 flex max-h-[500px] min-h-[300px] flex-col 
        md:flex-row '>
        <div className='flex flex-[40%] items-center mb-4 md:mb-0 md:mr-2 p-4 justify-center'>
          <div class="relative flex items-center justify-center h-12 w-12 mr-3">
                <span class=" animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <FaHandPointRight size={38} color="#a40abf" className='animate-bounce'/>
         </div>
          
          <h1 className='text-2xl text-center text-[mediumblue] items-center font-bold flex-row flex'>       
              Resources for your download
          </h1>
        </div>
        
        <div className='flex flex-[60%] bg-slate-100 md:ml-2 p-4  
          overflow-y-auto mx-4 flex-col rounded-lg my-2 items-center '>
            {fetchedResources.length>1?
              fetchedResources?.map((file, i)=>{
                
                return(
                  <Resources topic={file.topic} file={file} key={`${i}+key`}/>
                );
              })
              :
              <div className='text-[maroon] font-bold mt-[100px]'>
                Please, check your internet connection!
              </div>
            }
      

            
        </div>
    </div>
  )
}

export default Container
