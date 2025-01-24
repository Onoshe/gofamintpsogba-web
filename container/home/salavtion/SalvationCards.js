'use client'
import React from 'react'
import { useInView } from "framer-motion";
import {FaHandPointRight} from 'react-icons/fa';
import {BiPhoneCall} from 'react-icons/bi';
import { useRouter } from 'next/navigation';


const SalvationCard = ({photo,steps, topic,  transform, transition}) => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true });
    const router = useRouter();

    function connectWithUsHandler(){
        router.push('/contactUs')
    }    
    
    return (
        <div className="flex justify-center mx-2 mb-5"
            ref={ref}
            style={{
                transform: isInView ? "none" : transform,
                opacity: isInView ? 1 : 0,
                transition: transition
              }}>

            <div className="rounded-2xl shadow-lg bg-white w-[90vw] sm:w-[70vw] max-w-[650px]
                ">
                <div className='bg-center bg-cover rounded-2xl h-[120px] smc:h-[150px] lg:h-[200px] flex justify-center items-center'
                    style={{backgroundImage:`url(${photo})`}}>
                    
                    <div className='relative rounded-2xl top-0 py-2 px-4 smc:py-5 smc:px-7 bottom-0 w-full h-full flex
                            bg-gradient-to-r from-pink-600/80 to-yellow-400/80'>
                        {steps !=="STEP5"?
                            <div className='text-[aliceblue] flex font-bold flex-col'>
                            <p className='text-[14px] sm:text-lg md:text-2xl lg:text-3xl underline md:pb-3'>
                                <FaHandPointRight className='text-[28px] md:text-[32px]' color='yellow'/>
                            </p>
                            <span className='text-[16px] xsmc:text-[17px] smc:text-[22px] sm:text-2xl lg:text-3xl'>
                                {topic}
                            </span>
                        </div>
                        :<div className='text-[aliceblue] flex font-bold flex-row justify-between items-center'>
                            <p className='text-[14px] sm:text-lg md:text-2xl lg:text-3xl underline md:pb-3'>
                                <BiPhoneCall className='text-[48px] md:text-[54px]' color='yellow'/>
                            </p>
                            <p className='text-[16px] xsmc:text-[17px] smc:text-[22px] sm:text-2xl lg:text-3xl
                                ml-3 sm:ml-6 lg:ml-12 border rounded-xl border-white hover:bg-[red] p-3 md:p-5 cursor-pointer
                                bg-gradient-to-r from-blue-600/80 to-red-400/80 italic'
                                onClick={connectWithUsHandler}>
                                {topic}
                            </p>
                        </div>}
                    </div>
                    
                </div>
               
            </div>
        </div>
    )
}


export default SalvationCard;

