'use client'
import React from 'react';
import HorizontalLine from '@/components/horizontalLine/HorizontalLine';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Spinner from '@/assets/svg/Spinner';



const PageNotFound = ({title}) => {
    const router = useRouter();
    const [mounted, setMounted] = React.useState(false);
    
    React.useEffect(()=>{
        setTimeout(() => {
            setMounted(true);
        }, 5000);
    },[]);

    return(
        <div className="pt-[50px] px-[10px] smc:px-[30px] md:px-[50px] lg:px-[70px] flex  flex-col bg-mainColor ">
            <div className={`flex flex-col w-full py-20 items-center justify-center ${mounted? 'hidden' : ''}`}>
                <div className='flex flex-row justify-center items-center'>
                    <h1 className='text-[24px] text-[blue] text-center'>
                        Loading message, please wait
                    </h1>
                    <span className="ml-3 loading text-blue-600 loading-bars loading-md"></span>
                </div>
                <h1 className='py-5 pb-2 text-base sm:text-lg md:text-xl lg:text-2xl text-[maroon] text-center'>
                    {title}
                </h1>
                
                <HorizontalLine bColor="gray" widths={100} margTop={30} margBot={2}/>
            </div>
            <div className={`flex flex-col w-full items-center justify-center  pt-20  ${mounted? '' : 'hidden'}`}>
                <h1 className='font-archivo py-5 pb-2 text-xl sm:text-2xl md:text-3xl lg:text-5xl text-[red] text-center'>
                    Wrong message title selected!
                </h1>
                <h1 className='py-5 pb-2 text-base sm:text-lg md:text-xl lg:text-2xl text-[maroon] text-center'>
                    {title}
                </h1>
                <Link href={'/'}
                  className="w-fit px-16 py-3 my-10 bg-green-700 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-500 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out">
                    Go Home
                </Link>
                <HorizontalLine bColor="gray" widths={100} margTop={30} margBot={2}/>
            </div>
                <div className="py-10 flex flex-col gap-3 justify-start">
                    <button type="button" className="w-fit inline-block px-10 py-3 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                        onClick={()=>router.back()}>
                            Back
                    </button>
                    
                </div>
            
        </div>
    );
}



export default PageNotFound