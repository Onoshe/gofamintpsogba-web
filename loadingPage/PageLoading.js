'use client'
import useStoreHeader from '@/context/storeHeader';
import React from 'react'
import FastRecordLogo from '@/appLogo/FastRecord';
import { IoMdClose, IoMdMenu } from 'react-icons/io'
import FastRecordBox from '@/appLogo/FastRecordBox';
import backgroundImage from '@/public/bigCity.jpg';


const PageLoading = () => {
  const { activePage, pageLoading} = useStoreHeader((state) => state);


  let userInit = 'NA';
  //const pageLoading = true;
  //const activePage = {title:'Home Demo'}  

  const styles = {
    container: {
      backgroundColor:'#acacddbb', 
      width:'100%', 
      position:'fixed', 
      top:'0', zIndex:'50', bottom:'0', left:'0',
      
      //width: '100%',
      //height: '400px',
      //backgroundImage: `url(${backgroundImage})`, // Use the imported image
      //backgroundSize: 'cover',
      //backgroundPosition: 'center',
      //backgroundRepeat: 'no-repeat',
    },
  };

  
    return (
      <>
        {pageLoading?
            <div
            style={styles.container}
            >
              <div data-theme="aqua" className='py-3 z-50 px-3 flex items-center justify-between'
           >
              <div className='flex flex-row gap-2 items-center '>
              
                  <IoMdMenu size={24} color='white' className='lg:hidden'/>
                  
                  <FastRecordLogo
                      width={120} 
                      height={30}
                      className={'py-2 px-3 hidden sm:flex bg-[aliceblue]'}
                  />
              </div>
              <p className='font-bold text-[14px] md:text-lg text-white'>{activePage?.title}</p>
              <div>
                <span className="text-xl text-transparent">{userInit}</span>
              </div>
              
            </div>  
              <div //className='h-[80vh] fixed flex items-center justify-center bg-red-300 flex-col'
                  style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', marginTop:'20vh'}}
               >  
                  <FastRecordBox width={60} height={60}/>
                  <br/>
                  <p className='text-center p-3 font-bold mb-7 text-white'>Loading, please wait....</p>
              </div>
        </div>
        : <></>
        }
      </>
      
    )
  }
  
  export default PageLoading
