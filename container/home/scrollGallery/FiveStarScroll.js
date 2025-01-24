'use client'
import React, {useState, useRef, useLayoutEffect} from "react";
import { motion } from "framer-motion";
//import "./marquee.css";
import useWindowDimensions from "@/lib/hooks/useWindowDimension";



const FiveStarScroll = ({text, photos}) => {
    const ref = useRef(null);
    const {width} = useWindowDimensions();
    const [elWidth, setElWidth] = useState(0);

    const marqueeVariants = {
        animate: {
          x: [width, -(elWidth) || -1000],
          transition: {
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear",
            },
          },
        },
      };

      
    useLayoutEffect(() => {
        setElWidth(ref.current.offsetWidth);
    }, []);

  return (
        <motion.div
          className=" text-[mediumblue]"
          variants={marqueeVariants}
          animate="animate"
        >
           <div className="flex space-x-10 py-10 animate-loop-scroll- group-hover:paused">
          {
          [...photos, ...photos]?.map((el, i)=>{
            const bounceNo = i%5;
            return(
              <img key={`key${i}`} loading="lazy" src={el.src} className={`max-w-none h-[50vh] animate-bounceCard${bounceNo} cursor-pointer hover:animate-scaleCard shadow-[0_0_10px_#a1f4de]`} alt={el.alt}/>
            )
          })
        }
        </div>
        </motion.div>
  );
};

export default FiveStarScroll;




