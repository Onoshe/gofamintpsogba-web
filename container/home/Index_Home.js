'use client'
import React, {useState, useEffect} from "react";
import AboutPS from './aboutPS/AboutPS';
import SalvationIndex from "./salavtion/_Index";
import FindMap from "./findMap/FindMap";
import PCorner from "./pastorCorner/_Index";
import SlideShowIndex from "./slideShow/_Index";
import LogoCarousel from "./scrollGallery/LogoCarousal";
import UpcomingProgramsIndex from "./upcomingProgram/Index";
import { exportToCSV } from "@/lib/csvFile";
import getPastorCornerMessages from "@/assets/data/pastorCorner";
import ResourcesIndex from "./materialDownloads/Index";
import { getDataLink } from "@/lib/apis/urlLinks";
import { useSWRFetcher } from "@/lib/hooks/useSWRFetcher";
import { useAuthCustom } from "@/lib/authActions/useAuthCustom";
//import GoogleMap from "./findMap/GoogleMap";



export default function Index_Home({siteData,ssUser, siteResources, dataRes, fiveStarsPhotos, salvationPhotos, mapUrl, anchorPhoto,slidesImages, 
  upcomingPrograme, pastorCornerPhotos, salVideos}) {
  const dataLink = getDataLink({table:'official_site_comments'});
  const pstCornerCmments = useSWRFetcher(dataLink);
  const likesLink = getDataLink({table:'official_site_likes'});
  const pstCornerLikes = useSWRFetcher(likesLink);
  const { signIn, signOut, user, status} = useAuthCustom(ssUser);

 // console.log(user, status)

const dataArr =  getPastorCornerMessages();
 const handleExport =()=>{
  exportToCSV(dataArr)
 }
const salVideoUrl = salVideos[0];

  //console.log(pstCornerCmments.data)
  return (
    <div data-theme="light"  className="bg-white flex flex-col overflow-y-hidden">
     <SlideShowIndex slidesImages={slidesImages}/>
     <button className="btn btn-primary m-5 w-fit hidden"
       onClick={handleExport}>Export To CSV</button>
     <AboutPS 
        anchor={dataRes?.anchorAndFaith[0]?.textShort2}
        sequence={['faithDeclaration']}
        anchorBgImages={anchorPhoto}
        dataRes={dataRes}
        latestAnchorAndFaith={dataRes?.latestAnchorAndFaith}
      />
      <LogoCarousel photos={fiveStarsPhotos}/>
      <div style={{
        backgroundImage:`url(${'/bgImage.jpg'})`,
        backgroundSize:'auto',
        //backgroundSize: 200%; 
        backgroundRepeat: 'round',
        //opacity: 0.3
      }}>
          <UpcomingProgramsIndex 
            upcomingProgSettings={dataRes?.upcomingProgSettings}
            upcomingPrograme={upcomingPrograme}  
          />
          <br/><br/><br/>
          <SalvationIndex salavtionPhotos={salvationPhotos} salVideoUrl={salVideoUrl}/>
          <PCorner pastorCornerPhotos={pastorCornerPhotos} 
            pstCornerCmments={pstCornerCmments?.data}
            pstCornerLikes={pstCornerLikes?.data}
            />
          <ResourcesIndex siteResources={siteResources}/>
          <FindMap mapUrl={mapUrl}/>
      </div>
    </div>
  );
}
