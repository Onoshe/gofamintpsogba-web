/* eslint-disable @next/next/no-img-element */
import React from 'react'
import CustomLoader from '@/components/loader/CustomLoader';
import Image from 'next/image';



const AlbumPhotosCustomised = ({handleSelectedPhoto, photosGal}) => {
 
 return (
    <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 m-2 gap-1 p-0'>
        {photosGal?.map((photo, i)=>{

            return(

                <PhotoFrame photoSrc={photo?.imgPath} index={i}
                    key={`${i}+photo`}
                    handleSelectedPhoto={handleSelectedPhoto}/>
            );
        })}
    </div>
    );
 }
 

 const PhotoFrame = ({photoSrc, index, handleSelectedPhoto}) => {
    const isLoading = !photoSrc;
    

        if(isLoading){
        return <CustomLoader loadingMsg="Loading Photo galleries, please wait!" color="blue" 
                    loading={photoSrc? true : false}/>
        }    
    return (
       <div  className={`flex overflow-hidden cursor-pointer`}
            onClick={()=>handleSelectedPhoto(index)}>
            <Image  
             src={photoSrc} 
             alt="PS Ogba Album" 
             width={500} 
             height={500}
             className={`w-full hover:scale-[1.15] transition-all duration-500
                    h-[70px] sm:h-[100px] md:h-[150px]`}/>
       </div>
       );
    }


 export default AlbumPhotosCustomised;



 //