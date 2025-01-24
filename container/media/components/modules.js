
function processPhotos(arrs){
    const photoArrs = [];
    for (let index = 0; index < arrs.length; index++) {
        const arr = arrs[index];
        const {event, date, description, backgroundColor, photos} = arr; 
        
        const photoArr = [];
        for (let i = 0; i < photos?.length; i++) {
            const photo = photos[i];
            const imgSrc = photo.asset.url;
            const photoObj = { src:imgSrc,title:event, desc:description, 
                                bCol:backgroundColor, date:date};
            photoArr.push({sn:i+1, src:photoObj});
        }
        photoArrs.push(photoArr);
    }
    return photoArrs
}



function getQueryPhotos(){

    const memberData = `
    *[_type == "photoGallery" ] | order(_createdAt desc) {
        event, date, description, backgroundColor,
        photos[]{
            asset->{url}
          },
     }
  `;
    return memberData
}



export {processPhotos, getQueryPhotos}