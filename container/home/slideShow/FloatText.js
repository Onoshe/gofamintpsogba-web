'use client'

import Link from "next/link";

const FloatText=()=>{

    return(
        <section className="hidden xxsmc:flex scale-1 lg:scale-125 carousel-indicators rounded-md 
            justify-center items-center flex-col absolute left-[50px] top-[8%] smc:top-[25%] 
            p-5 mb-4 text-fuchsia-50 shadow-md z-10 animate-slide-in-text scale-125">
                <h2 className='text-[#f7be43] text-center font-bold my-2 sm:3 lg:5 text-sm sm:text-base lg:text-2xl '>Welcome to GOFAMINT PS Ogba</h2>
                  <>
                    <h2 className='text-xs sm:text-sm lg:text-base'>Oh, send out Your light and Your truth!</h2>
                    <h2 className='text-xs sm:text-sm lg:text-base'> Let them lead me; Let them bring me to Your holy hill</h2>
                    <h2 className='text-xs sm:text-sm lg:text-base'>And to Your tabernacle. (Psalm 43:3 NKJV)</h2>
                  </>
                <div className='bg-red-600 p-2 sm:3 lg:p-4 rounded-lg hover:bg-red-400 mt-2 text-xs sm:text-sm lg:text-base cursor-pointer'
                  >
                    <Link href={'/contact-us'}>Connect with us Today</Link>
                </div>
        </section>
    );
  }
  

  export default FloatText