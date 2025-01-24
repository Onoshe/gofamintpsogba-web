import { getImgLinkBase } from "@/lib/apis/urlLinks";


export function postImagesState(dt, dispatchImgGroup){
    const imgLinkBase = getImgLinkBase();
    //const pastorLogoImg = data?.data?.find((img)=> img?.name?.toLowerCase()?.includes(by?.split('.')[1]?.trim()?.toLowerCase()))?.imgPath;
    //const pastorLogo = imgLinkBase+'/'+pastorLogoImg;

    const imgGroup = {fiveStar:[], pastorCorner:[], salvation:[], pastorCornerBy:{}, }
    if(dt?.length){
        for (let index = 0; index < dt.length; index++) {
            const el = dt[index];
            if(el?.imgGroup === "pastor_corner"){
                imgGroup.pastorCorner.push(imgLinkBase+'/'+el.imgPath);
            }
            if(el?.imgGroup === "five_star"){
                imgGroup.fiveStar.push(imgLinkBase+'/'+el.imgPath);
            }
            if(el?.imgGroup === "salvation"){
                imgGroup.salvation.push(imgLinkBase+'/'+el.imgPath);
            }
            if(el?.imgGroup === "pastor_corner_by"){
                imgGroup.pastorCornerBy[el.name] = imgLinkBase+'/'+el.imgPath;
            }
        }
    }
    dispatchImgGroup(imgGroup)
}