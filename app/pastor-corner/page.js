import PastorCornerIndex from "@/container/pastorcorner/PastorCornerIndex";
import { getRequest } from "@/lib/apis/getRequest";
import { getImgLink, getUrl } from "@/lib/apis/urlLinks";

export const metadata = {
  title: 'Pastor Corner',
  description:"Enrich your life each week with transforming words of life from the Pastor's Corner"
}

export default async function PastorCorner() {
    const imgLink = getImgLink();
      const siteImgs = await getRequest(imgLink);
    
      const pastorCornerPhotos = getUrl(siteImgs?.data, 'pastor_corner', 'url');
  
  return (
    <PastorCornerIndex pastorCornerPhotos={pastorCornerPhotos}/>
  );
}