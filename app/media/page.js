import MediaIndex from "@/container/media/MediaIndex";
import { getRequest } from "@/lib/apis/getRequest";
import {getImgLink, getUrlMediaPage } from "@/lib/apis/urlLinks";
import { sortArrayByKey } from "@/lib/sortArrayByKey";


export default async function MediaPage(){
  const imgLink = getImgLink({table:'official_site_media_page'});
  const siteImgs = await getRequest(imgLink);

  let mediaPhotos = getUrlMediaPage(siteImgs?.data);

  return (
    <MediaIndex
      mediaPhotos={mediaPhotos}
    />
  );
};