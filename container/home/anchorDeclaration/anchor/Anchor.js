'use client'
import React, {useState, useRef, useLayoutEffect} from "react";
import { motion } from "framer-motion";
//import "./marquee.css";
import useWindowDimensions from "@/lib/hooks/useWindowDimension";



const Anchor = ({text}) => {
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
          <h1 ref={ref} className='w-fit text-lg md:text-3xl font-bold whitespace-nowrap'>
            {text}
          </h1>
        </motion.div>
  );
};

export default Anchor;




