'use client'
import React from "react";
import useWindowDimensions from "@/lib/hooks/useWindowDimension";
import { GoogleMapsEmbed } from '@next/third-parties/google'



const GoogleMap=({mapUrl})=>{
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
            <GoogleMapsEmbed
                apiKey=""
                height={200}
                width="100%"
                mode="place"
                q="Brooklyn+Bridge,New+York,NY"
                />
            </div>
        </div>
    );
}

export default GoogleMap;