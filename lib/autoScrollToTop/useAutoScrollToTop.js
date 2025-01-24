import React from 'react'
//import {BsFillArrowUpCircleFill} from 'react-icons/bs';


const useAutoScrollToTop = () => {
   //const [showButton, setShowButton] = React.useState(false);

    const scrollToTop = () => {
        window.scrollTo({
        top: 0,
        behavior: 'smooth' // for smoothly scrolling
        });
    };

    React.useEffect(() => {
        window.addEventListener("scroll", () => {
        if (window.pageYOffset > 400) {
            scrollToTop();
        } 
        });
    }, []);

}

export default useAutoScrollToTop