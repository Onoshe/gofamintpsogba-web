import React from 'react'
import PhotoAlbum from "react-photo-album";
import { photos } from './photos';



const AlbumPhotos = ({handleSelectedPhoto}) => {
 const layout = ['columns', 'rows', 'masonry'];   
    
    
 return (
    <PhotoAlbum layout={layout[0]} photos={photos}
        spacing={5}  
        padding={0}
        onClick={(event, photo, index) => handleSelectedPhoto(photo, index)}
        columns={(containerWidth) => {
            if (containerWidth < 400) return 2;
            if (containerWidth < 800) return 3;
            return 4;
        }}
    />
    );
 }
 




 export default AlbumPhotos;