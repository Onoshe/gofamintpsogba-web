import React from 'react'
import bgchurch from "@/assets/bgroundHome.jpg";
import { MdArrowForwardIos, MdArrowBackIos} from 'react-icons/md';
import Image from 'next/image';
import fiveStarPhotos from '@/assets/fivestar';

//import { useSelector } from 'react-redux';


const FiveStarChurch = () => {
    const scrollRef = React.useRef(null);
    const lastChildRef = React.useRef(null);
    //const {fiveStarPhotos} = useSelector((state)=>state.photoGalleries);

    function  scroll(scrollOffset){
        //scrollRef.current.scrollLeft += scrollOffset;
        
        if(scrollOffset==="START"){
            scrollRef.current.scrollTo({left: 0, behavior: 
                'smooth' 
              });
        }
        if(scrollOffset==="END"){
            lastChildRef.current.scrollIntoView({behavior:'smooth'});
        }
      };

    
    return (
        <div  style={{backgroundImage: `url(${bgchurch})`, opacity:0.03}}
        className="bg-no-repeat bg-cover bg-center h-[60vh] lg:h-[65vh] xl:h-[75vh] relative
            mx-0 sm:mx-8 md:mx-16">
            <div className='absolute top-0 bottom-0 w-full h-full bg-[#80808090] flex
                p-10 overflow-y-auto whitespace-nowrap scrollbar-hide
                group'
                ref={scrollRef}
                name="blind">
                <Card src={fiveStarPhotos[0]} delay={'animate-bounceCard0'}/>
                <Card src={fiveStarPhotos[1]} delay={'animate-bounceCard1'}/>
                <Card src={fiveStarPhotos[2]} delay={'animate-bounceCard2'}/>
                <Card src={fiveStarPhotos[3]} delay={'animate-bounceCard1'}/>
                <Card src={fiveStarPhotos[4]} lastChildRef={lastChildRef} delay={'animate-bounceCard0'}/>
            </div>
            <div
                className="absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0  left-6 cursor-pointer xlc:hidden"
                onClick={()=>scroll('START')}>
                <MdArrowBackIos size={32} className="text-[tomato] hover:text-[mediumblue]"/>
            </div>
            <div
                className="absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0  right-6 cursor-pointer xlc:hidden"
                onClick={()=>scroll('END')}>
                <MdArrowForwardIos size={32} className="text-[tomato] hover:text-[mediumblue]"/>
            </div>
        </div>
    )
}



const Card = ({src, lastChildRef, delay}) => {
    const [anim, setAnim] = React.useState(false);

    return (
            <Image src={src} alt="Media2" 
            className={`flex flex-1 mx-2 smc:mx-5 shadow-[0_0_10px_white] cursor-pointer  ${anim? 'animate-scaleCard shadow-[0_0_10px_blue]' :delay} `} 
            ref={lastChildRef}
            onMouseEnter={()=>setAnim(true)}
            onMouseLeave={()=>setAnim(false)}
            />
    )
}




export default FiveStarChurch