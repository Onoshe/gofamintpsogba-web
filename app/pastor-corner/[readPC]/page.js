import ReadPastorCornerIndex from "@/container/pastorcorner/readPastorCorner/ReadPastorCornerIndex";
import { getRequest } from "@/lib/apis/getRequest";
import { getImgLink, getUrl } from "@/lib/apis/urlLinks";
import { getUserSession } from "@/lib/authActions/getUserSession";
//https://nextjs.org/docs/app/api-reference/functions/generate-static-params
//https://stackoverflow.com/questions/77514037/nextjs-isnt-building-with-output-export-because-of-missing-generatestaticpara



export default async function ReadPastorCorner({ params }) {
   const imgLink = getImgLink();
    const siteImgs = await getRequest(imgLink);
     const user = getUserSession();
  
    const pastorCornerPhotos = getUrl(siteImgs?.data, 'pastor_corner', 'url');
    const pastorCornerSharePhotos = getUrl(siteImgs?.data, 'pastor_corner_sharephoto', 'url');
  

  return (
    <ReadPastorCornerIndex
      pastorCornerPhotos={pastorCornerPhotos}
      pastorCornerSharePhotos={pastorCornerSharePhotos}
      ssUser={user}
    />
  );
}