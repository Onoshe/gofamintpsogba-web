import Index_Home from "@/container/home/Index_Home";
import { getRequest } from "@/lib/apis/getRequest";
import { getDataLink, getExtractInfo, getImgLink, getUrl, getVideoUrl } from "@/lib/apis/urlLinks";
import { getUserSession } from "@/lib/authActions/getUserSession";
import { sortArrayByKey } from "@/lib/sortArrayByKey";
const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.084343144778!2d3.348355449513512!3d6.636447395177593!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b93e8cca0dd7d%3A0x596e77e2296ced9c!2sGOFAMINT%20PACESETTERS%2C%20OGBA%20LAGOS!5e0!3m2!1sen!2sng!4v1677087742110!5m2!1sen!2sng";



export default async function Home(){
  const user = getUserSession();
  const imgLink = getImgLink();
  const dataLink = getDataLink();
  const siteData = await getRequest(dataLink);
  const siteImgs = await getRequest(imgLink);


  const resourcesLink = getDataLink({table:'official_site_resources'});
  const siteResources = await getRequest(resourcesLink);


  let fiveStarsPhotos = getUrl(siteImgs?.data, 'five_star', 'url');
  let salvationPhotos = getUrl(siteImgs?.data, 'salvation', 'url');
  let pastorCornerPhotos = getUrl(siteImgs?.data, 'pastor_corner', 'url');
  const salVideos = getVideoUrl(siteImgs?.data, 'salvationVideo');

  let homeSlides = getUrl(siteImgs?.data, 'home_slides') || [];
    homeSlides = homeSlides?.map((dt)=> {return {...dt, note: parseInt(dt.note)}});
    sortArrayByKey(homeSlides, 'note', 'ASC');
  let homeSlidesUrl = homeSlides?.map((dt)=> dt.imgPath);

  let upcomingProgrames = getUrl(siteImgs?.data, 'upcoming_programs') || [];
  sortArrayByKey(upcomingProgrames, 'note', 'ASC');
  const upcomingPrograme = upcomingProgrames[0];
  

  let anchorPhotos = getUrl(siteImgs?.data, 'anchorBg') || [];
  sortArrayByKey(anchorPhotos, 'note', 'ASC');
  const anchorPhoto = anchorPhotos[0]?.imgPath;

  const dataRes = getExtractInfo(siteData?.data);
  
  
  return (
    <Index_Home 
      fiveStarsPhotos={fiveStarsPhotos}
      salvationPhotos={salvationPhotos}
      slidesImages = {homeSlidesUrl}
      dataRes={dataRes} 
      siteData={siteData} 
      siteImgs = {siteImgs}
      mapUrl={mapUrl}
      anchorPhoto={anchorPhoto}
      upcomingPrograme={upcomingPrograme}
      siteResources={siteResources?.data}
      pastorCornerPhotos={pastorCornerPhotos}
      salVideos={salVideos}
      ssUser={user}
      />
  );
};




/*
export default async function Home(){
  const user = getUserSession();
  const imgLink = getImgLink();
  const dataLink = getDataLink();
  const siteData = await getRequest(dataLink);
  const siteImgs = await getRequest(imgLink);

  const resourcesLink = getDataLink({table:'official_site_resources'});
  const siteResources = await getRequest(resourcesLink);

  let fiveStarsPhotos = getUrl(siteImgs?.data, 'five_star', 'url');
  let salvationPhotos = getUrl(siteImgs?.data, 'salvation', 'url');
  let pastorCornerPhotos = getUrl(siteImgs?.data, 'pastor_corner', 'url');
  const salVideos = getVideoUrl(siteImgs?.data, 'salvationVideo');

  let homeSlides = getUrl(siteImgs?.data, 'home_slides') || [];
    homeSlides = homeSlides?.map((dt)=> {return {...dt, note: parseInt(dt.note)}});
    sortArrayByKey(homeSlides, 'note', 'ASC');
  let homeSlidesUrl = homeSlides?.map((dt)=> dt.imgPath);

  let upcomingProgrames = getUrl(siteImgs?.data, 'upcoming_programs') || [];
  sortArrayByKey(upcomingProgrames, 'note', 'ASC');
  const upcomingPrograme = upcomingProgrames[0];

  let anchorPhotos = getUrl(siteImgs?.data, 'anchorBg') || [];
  sortArrayByKey(anchorPhotos, 'note', 'ASC');
  const anchorPhoto = anchorPhotos[0]?.imgPath;

  const dataRes = getExtractInfo(siteData?.data);
  
  
  return (
    <Index_Home 
      fiveStarsPhotos={fiveStarsPhotos}
      salvationPhotos={salvationPhotos}
      slidesImages = {homeSlidesUrl}
      dataRes={dataRes} 
      siteData={siteData} 
      siteImgs = {siteImgs}
      mapUrl={mapUrl}
      anchorPhoto={anchorPhoto}
      upcomingPrograme={upcomingPrograme}
      siteResources={siteResources?.data}
      pastorCornerPhotos={pastorCornerPhotos}
      salVideos={salVideos}
      ssUser={user}
      />
  );
};



export default async function Home(){
  const user = getUserSession();
  const imgLink = getImgLink();
  const dataLink = getDataLink();
  const siteData = await getRequest(dataLink);
  const siteImgs = await getRequest(imgLink);

  //const resourcesLink = getDataLink({table:'official_site_resources'});
  //console.log(resourcesLink);
  //const siteResources = await getRequest(resourcesLink);

  let fiveStarsPhotos = getUrl(siteImgs?.data, 'five_star', 'url');
  let salvationPhotos = getUrl(siteImgs?.data, 'salvation', 'url');
  let pastorCornerPhotos = getUrl(siteImgs?.data, 'pastor_corner', 'url');
  const salVideos = getVideoUrl(siteImgs?.data, 'salvationVideo');

  let homeSlides = getUrl(siteImgs?.data, 'home_slides') || [];
    homeSlides = homeSlides?.map((dt)=> {return {...dt, note: parseInt(dt.note)}});
    sortArrayByKey(homeSlides, 'note', 'ASC');
  let homeSlidesUrl = homeSlides?.map((dt)=> dt.imgPath);

  let upcomingProgrames = getUrl(siteImgs?.data, 'upcoming_programs') || [];
  sortArrayByKey(upcomingProgrames, 'note', 'ASC');
  const upcomingPrograme = upcomingProgrames[0];

  let anchorPhotos = getUrl(siteImgs?.data, 'anchorBg') || [];
  sortArrayByKey(anchorPhotos, 'note', 'ASC');
  const anchorPhoto = anchorPhotos[0]?.imgPath;

  const dataRes = getExtractInfo(siteData?.data);
  
  return (<div>Home</div>);
}

*/