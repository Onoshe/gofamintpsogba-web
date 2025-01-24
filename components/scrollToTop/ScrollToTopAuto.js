'use client'
import React from 'react'
import {BsFillArrowUpCircleFill} from 'react-icons/bs';



const ScrollToTopButton = () => {
   const [showButton, setShowButton] = React.useState(false);

    const scrollToTop = () => {
        window.scrollTo({
        top: 0,
        behavior: 'smooth'
        });
    };

    React.useEffect(() => {
        window.addEventListener("scroll", () => {
        if (window.pageYOffset > 400) {
            setShowButton(true);
        } else {
            setShowButton(false);
        }
        });
    }, []);


  return (
    <div className='fixed bottom-5 right-5'>
     { showButton &&(
        <BsFillArrowUpCircleFill size={42} 
        onClick={scrollToTop}    
        color="gray"/>
      )}    
    </div>
  )
}

export default ScrollToTopButton