import PastorCornerIndex from "@/container/pastorcorner/PastorCornerIndex";
import { getRequest } from "@/lib/apis/getRequest";
import { getImgLink, getUrl } from "@/lib/apis/urlLinks";


export default async function PastorCorner() {
    const imgLink = getImgLink();
      const siteImgs = await getRequest(imgLink);
    
      const pastorCornerPhotos = getUrl(siteImgs?.data, 'pastor_corner', 'url');
  
  return (
    <PastorCornerIndex pastorCornerPhotos={pastorCornerPhotos}/>
  );
}