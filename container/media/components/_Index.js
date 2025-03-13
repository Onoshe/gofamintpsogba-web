'use client'
import React, {useEffect, useState} from "react";
import AlbumMain from "./AlbumMain";
import CustomLoader from "@/components/loader/CustomLoader";
import { groupBy } from "@/lib/group/groupBy";
import { sortArrayByKey } from "@/lib/sortArrayByKey";



const GalleryIndex =({mediaPhotos})=>{
   const mediaPhotosGrouped = groupBy(mediaPhotos, 'imgGroup')
   const photosGalArr = sortMediaPhotos(mediaPhotosGrouped);
   sortArrayByKey(photosGalArr, 'date', 'ASC') 

   
    const isLoading = !photosGalArr?.length;
        if(isLoading){
        return <CustomLoader loadingMsg="Loading Photo galleries, please wait!" color="blue" 
                    loading={isLoading? true : false}/>
        }

    return(
        <div >
            {
                photosGalArr?.map((item, i)=>{   
                    return(
                        <AlbumMain key={`${i}+key`}
                            title={item.program}
                            details={item.details}
                            photos={item.programPhotos}
                            loading={item? false : true}
                            headerBCol={item.bgColor}    //{i===1? 'bg-rose-600' : i===2? 'bg-[magenta]' : i===3? 'bg-[gray]' : 'bg-blue-700'}
                        />
                    );
                })
            }
        </div>
    );
}


export default GalleryIndex;


function sortMediaPhotos(groupedPhotos){
    const result = [];
    const programs = Object.keys(groupedPhotos);
    for (let index = 0; index < programs.length; index++) {
        const program = programs[index];
        const programPhotos = groupedPhotos[program];
        const date = programPhotos?.find((dt)=> dt.note);
        const bgColor = programPhotos?.find((dt)=> dt.note2);
        const details = programPhotos?.find((dt)=> dt.details);
        const obj = {
            program,
            date:date?.note || "",
            bgColor:bgColor?.note2 || "",
            details:details?.details || "",
            programPhotos,
        };
        result.push(obj)
    }
    return result
}