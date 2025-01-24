'use client'
import { PulseLoader } from "react-spinners";
import CustomizeModal from "@/components/modals/CustomizeModal";
import PhotoViewerForPhone from "./PhotoViewerForPhone";
import EnlargeView from "./EnlargeView";
import AlbumPhotosCustomised from "./PhotoAlbumCustomised";


const ModalView =({photos, loading, details, show, photo,showPhoneModal, photosArr, photoIsClicked, isBigScreen,
    seltdIndex, setPhotoIsClicked, setShowPhoneModal, handleSelectedPhoto})=>{
    
        
    return(
        <>
            { loading?
             <PulseLoader loading={loading} size={80} color="#36d7b7" />
             :<AlbumPhotosCustomised photosGal={photos}  handleSelectedPhoto={handleSelectedPhoto}/>
            }
              {isBigScreen?
                <CustomizeModal show={show}>
                    <EnlargeView closeModal={()=>{setShow(false); setPhotoIsClicked(false)}}  
                        photoSrc={photo?.src} photosGal={photos} seltdIndex={seltdIndex}
                        handleSelectedPhoto={handleSelectedPhoto}
                        title={details}/>
                </CustomizeModal>
                :                
                <PhotoViewerForPhone show={showPhoneModal} photosGal={photosArr}
                    closeModal={()=>{setShowPhoneModal(false); setPhotoIsClicked(false)}}
                    photoIsClicked={photoIsClicked}
                    details={details}/>
                    }
        </>
    );
}


export default ModalView;