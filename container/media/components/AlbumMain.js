'use client'
import React, { useEffect } from "react";
import CustomizeModal from "@/components/modals/CustomizeModal";
import EnlargeView from "./EnlargeView";
import AlbumPhotosCustomised from "./PhotoAlbumCustomised";
import PhotoViewerForPhone from "./PhotoViewerForPhone";
import useWindowDimensions from "@/lib/hooks/useWindowDimension";



const AlbumMain =({photos, loading, title,details, headerBCol})=>{
    const [mounted, setMounted] = React.useState(false);
    const [show, setShow] = React.useState(false);
    const [showPhoneModal, setShowPhoneModal] = React.useState(false);
    const [seltdIndex, setSeltdIndex] = React.useState(0);
    const [photoIsClicked, setPhotoIsClicked] = React.useState(false);
    const {width, weight} = useWindowDimensions();
    
    const [photo, setPhoto] = React.useState({});
    const [photosArr, setPhotosArr] = React.useState([]);
    const isBigScreen = width > 600;

    function handleSelectedPhoto(i){
        setPhotoIsClicked(true);
        if(isBigScreen){
            setSeltdIndex(i);
            setPhoto(photos[i]);
            setShow(true);
            setShowPhoneModal(false);
        }else{
            setPhotosArr(photos);
            setShowPhoneModal(true);
            setShow(false);
        }
    }
    useEffect(()=>{
        setMounted(true)
    },[]);

    if(!mounted) return <p className="text-red-500">Loading Photos</p>;

    //console.log(photosArr, show, isBigScreen)
    //console.log(show, showPhoneModal, photoIsClicked, isBigScreen);

    return(
        <div className="w-full flex justify-center flex-col items-center mb-5">
            <h1 className={`font-archivo w-[95%] p-1 py-2 text-sm md:text-2xl lg:text-3xl font-bold flex px-3 text-left rounded-t-lg
                    `}
                style={{color:headerBCol || '#07609b'}}
                >
                {title}
            </h1>
            
            <div className="bg-gray-300 min-h-[250px] max-h-[50vw] overflow-y-auto w-[95%]
            ">  
            { loading?
              <p className="text-red-500">Loading</p>:
             <AlbumPhotosCustomised photosGal={photos}  handleSelectedPhoto={handleSelectedPhoto}/>
            }
              {isBigScreen?
                <CustomizeModal show={show}>
                    <EnlargeView closeModal={()=>{setShow(false); setPhotoIsClicked(false)}}  
                        photoSrc={photo?.imgPath} 
                        photosGal={photos} 
                        seltdIndex={seltdIndex}
                        handleSelectedPhoto={handleSelectedPhoto}
                        title={details}/>
                </CustomizeModal>
                : <PhotoViewerForPhone 
                    show={showPhoneModal} 
                    photosGal={photosArr}
                    closeModal={()=>{setShowPhoneModal(false); 
                    setPhotoIsClicked(false)}}
                    photoIsClicked={photoIsClicked}
                    details={details}
                    showPhoneModal={showPhoneModal}
                    setShowPhoneModal={setShowPhoneModal}
                />
                }
            </div>
        </div>
    );
}
//official_website/media_page/pastor_ogundare_installation_2018/InstallationOfPstOgundare2018-19.jpg

export default AlbumMain;


/*

<PhotoViewerForPhone show={showPhoneModal} photosGal={photosArr}
    closeModal={()=>{setShowPhoneModal(false); setPhotoIsClicked(false)}}
    photoIsClicked={photoIsClicked}
    details={details}
    showPhoneModal, setShowPhoneModal,
/>



 {isBigScreen?
    <CustomizeModal show={show}>
        <EnlargeView closeModal={()=>{setShow(false); setPhotoIsClicked(false)}}  
            photoSrc={photo?.imgPath} 
            photosGal={photos} 
            seltdIndex={seltdIndex}
            handleSelectedPhoto={handleSelectedPhoto}
            title={details}/>
    </CustomizeModal>
    :<PhotoViewerForPhone show={showPhoneModal} photosGal={photosArr}
        closeModal={()=>{setShowPhoneModal(false); setPhotoIsClicked(false)}}
        photoIsClicked={photoIsClicked}
        details={details}
    />
    }
    

*/
