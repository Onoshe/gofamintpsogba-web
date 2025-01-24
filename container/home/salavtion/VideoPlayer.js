'use client'
import React from 'react';
//import bgVideo from '../../../../../assets/videos/PassionOfChristTrillerConverted.mp4'https://www.googleadservices.com/pagead/aclk?sa=L&ai=DChcSEwjftarU3-3_AhXP6u0KHfKRDVAYABAAGgJkZw&ohost=www.google.com&cid=CAESbOD2GPeeS-Q2rrR0xkJHi3FdGwIMDjxm2CCHigPaqog7XhH3t6hEaC3gZs5lG7uCz6O5kO9DBWlpuIxH07NF4-UmkzrT3LBJUvGGQ0jnXWdMyBUky72GvueL0yi1i6kJA_So1Cpz7ji7m6EGPg&sig=AOD64_3miRpWmaB8KUrjTiPU60uxwjUrMg&q&adurl&ved=2ahUKEwjB_qLU3-3_AhUbQUEAHa4LDpAQ0Qx6BAgHEAE;
//import video from '../../../../../assets/videos/passionOfChristTrillerConverted.mp4';
import useElementDimension from '@/lib/hooks/useElementDimension';
import RandomBibleVerses from './RandomBibleVerses';
import { bibleRefsArr } from '../resources/bibleRefs';
import useWindowDimensions from '@/lib/hooks/useWindowDimension';


const VideoPlayerAutoRaw = ({salVideoUrl}) => {
    const contRef = React.useRef();
    const dimensions = useElementDimension(contRef);
    let { width } = useWindowDimensions();
    const [fontSize, setFontSize] = React.useState(12);

    React.useEffect(()=>{
      if(dimensions.checked){
        //Use container size to determine fontsize. More accurate
        const fontSize = Math.round(0.043*dimensions.width);
        setFontSize(fontSize);
      }else{
        //Use screen size to determine fontsize
        const fontSize = getFontSize(width);
        setFontSize(fontSize);
      }
    },[dimensions.checked, width, dimensions.width]);

    //const salVideoUrlPrev = "http://localhost/psogbaasset/official_website/videos/PassionOfChristTrillerConverted.mp4"; //"https://cdn.sanity.io/files/lrfq9wxv/production/5c8939bc498b2991a0e5fa1fd79f468a37042e73.mp4"
  return (
          <div className='w-full bg-center bg-cover h-fit max-h-[600px]
            flex justify-center items-center relative
            border-4 border-solid border-rose-500'
           >
               <video width="320" height="240" 
                  //controls={true} 
                  autoPlay loop muted
                  className="w-full h-fit object-cover "
                >
                  <source src={salVideoUrl} type="video/mp4"/>
                  Your browser does not support the video tag.
                </video> 
                
              <div className='bg-sky-500/40 w-full h-full absolute
                   flex hover:bg-slate-100/40 group p-3 text-white hover:text-
                   items-center justify-center text-center
                   hover:text-[#74efed]'
                   style={{fontSize: `${fontSize}px`}}
                   ref={contRef}>
                    <RandomBibleVerses bibleRefs={bibleRefsArr}  len={bibleRefsArr.length-1}/>
              </div>  
          </div>
  )
}

export default VideoPlayerAutoRaw;

function getFontSize(screenWidth) {
  let fontSize = 0;    

  if(screenWidth >0 && screenWidth <= 300){
      fontSize = 12;
  }else if(screenWidth >300 && screenWidth <= 400){
      fontSize = 14
  }else if(screenWidth >400 && screenWidth <= 700){
      fontSize = 18
  }else if(screenWidth >700 && screenWidth <= 1023){
      fontSize = 24
  }else if(screenWidth >1023 && screenWidth <= 1200){
      fontSize = 20
  }else if(screenWidth >1200 && screenWidth <= 1500){
      fontSize = 24
  }else{
      fontSize = 24
  }

 return fontSize
}


//const aa =     'and will forgive their sin, and will heal their land. II Chronicles 7:14';