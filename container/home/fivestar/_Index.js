import React from 'react'
import FiveStarChurch from './FiveStarChurch'
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";



const variants = {
    visible: { opacity: 1, scale:1,  transition: { duration: 0.5 } },
    hidden: { opacity: 0, scale:0 }
  };

function FiveStarChurchIndex() {
    const controls = useAnimation();
    const { ref, inView, entry } = useInView({
        /* Optional options */
        threshold: 0,
      });
  
    React.useEffect(() => {
      if (inView) {
        controls.start("visible");
      }else{
        //controls.start("hidden");
      }
    }, [controls, inView]); 
  
    return (
      <motion.div
        ref={ref}
        animate={controls}
        initial="hidden"
        variants={variants}
        className='w-full'
      >
        <div className='mt-5 mb-0 p-5 mx-0 sm:mx-8 md:mx-16 rounded-t-lg bg-purple-900'>
                <h1 className='text-[white] font-meriendOne text-bold text-base xsmc:text-lg smc:text-xl md:text-2xl lg:text-4xl 
                    flex justify-center text-bold text-center'>
                    We are Positioned to Raise A Five Star Church
                </h1>
            </div>
        <FiveStarChurch/>
      </motion.div>
    );
  }

  

export default FiveStarChurchIndex