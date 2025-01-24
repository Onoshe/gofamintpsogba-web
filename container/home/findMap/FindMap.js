'use client'
import React from "react";
import useWindowDimensions from "@/lib/hooks/useWindowDimension";


const FindMap=({mapUrl})=>{
    let { width } = useWindowDimensions();
    let snSize = 1000;
    
    if(width > 0 && width <500){
        snSize = 250
    }else if(width > 500 && width < 900){
        snSize = 350
    }else{ snSize = 450}

    return(
        <div className="text-bold flex justify-center flex-col flex-1 mx-5 my-10">
            <h2>Find us on Google Map</h2>
            <div className="findmap-cont">
                <iframe 
                    src={mapUrl} 
                    loading="eager" 
                    referrerPolicy="no-referrer-when-downgrade" 
                    title="Gofamint PS Ogba, Ikeja Lagos google map"
                    width="100%" 
                    height={snSize} 
                    //frameBorder="0" 
                    style={{border:0}} 
                    allowFullScreen="" 
                    aria-hidden="false" 
                    tabIndex="0"
                    defer
                    >
                </iframe>
            </div>
        </div>
    );
}

export default FindMap;