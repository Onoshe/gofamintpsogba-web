import React from 'react'
import FastRecordLogo from '@/appLogo/FastRecord';
import { IoMdClose, IoMdMenu } from 'react-icons/io'
import FastRecordBox from '@/appLogo/FastRecordBox';



const PageLoadingInnerControl = ({pageLoading, activePageTitle, userId}) => {
  //const { activePage, pageLoading} = useStoreHeader((state) => state);
  

    return (
      <>
        {pageLoading?
            <div
            style={{backgroundColor:'#acacddbb', width:'100%', position:'fixed', top:'0', zIndex:'50', bottom:'0', left:'0',}}
            >
              <div data-theme="aqua" className='py-4 z-50 px-3 flex items-center justify-between'
           >
              <div className='flex flex-row gap-2 items-center '>
              
                  <IoMdMenu size={24} color='white' className='lg:hidden'/>
                  
                  <FastRecordLogo
                      width={150} 
                      height={50}
                      className={'py-2 px-3 hidden sm:flex bg-[aliceblue]'}
                  />
              </div>
              <p className='font-bold text-[14px] md:text-lg text-white'>{activePageTitle}</p>
              <div>
                  <div className={`avatar online placeholder w-8 h-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2`}>
                      <div className="bg-neutral-focus text-neutral-content rounded-full ">
                          <span className="text-xl">{userId}</span>
                      </div> 
                  </div>
              </div>
              
            </div>  
              <div //className='h-[80vh] fixed flex items-center justify-center bg-red-300 flex-col'
                  style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', marginTop:'20%'}}
               >  
                  <FastRecordBox width={60} height={60}/>
                  <br/>
                  <p className='text-center text-white p-3 font-bold mb-7'>Loading, please wait....</p>
              </div>
        </div>
        : <></>
        }
      </>
      
    )
  }
  
  export default PageLoadingInnerControl
