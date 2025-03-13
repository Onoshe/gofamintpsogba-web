import ReadPastorCornerIndex from "@/container/pastorcorner/readPastorCorner/ReadPastorCornerIndex";
import { getRequest } from "@/lib/apis/getRequest";
import { getImgLink, getUrl } from "@/lib/apis/urlLinks";
import { getUserSession } from "@/lib/authActions/getUserSession";
import Head from "next/head";
//https://nextjs.org/docs/app/api-reference/functions/generate-static-params
//https://stackoverflow.com/questions/77514037/nextjs-isnt-building-with-output-export-because-of-missing-generatestaticpara



export default async function ReadPastorCorner({ params }) {
   const imgLink = getImgLink();
    const siteImgs = await getRequest(imgLink);
     const user = getUserSession();
  
    const pastorCornerPhotos = getUrl(siteImgs?.data, 'pastor_corner', 'url');
    const pastorCornerSharePhotos = getUrl(siteImgs?.data, 'pastor_corner_sharephoto', 'url');
  
    //console.log(pastorCornerPhotos);
    const url = "https://psogbaasset.gofamintpsogba.org/official_website/pastor_corner/pastorCornerSharePhoto.png";

  return (
    <>
        <Head>
          {/* Required Open Graph tags */}
          <meta property="og:title" content="Your Page Title" />
          <meta property="og:description" content="Your page description goes here." />
          <meta property="og:image" content={url} />
          <meta property="og:url" content="https://yourwebsite.com/page-url" />
          <meta property="og:type" content="website" />

          {/* Twitter meta tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Your Page Title" />
          <meta name="twitter:description" content="Your page description goes here." />
          <meta name="twitter:image" content={url} />
      </Head>
      <ReadPastorCornerIndex
        pastorCornerPhotos={pastorCornerPhotos}
        pastorCornerSharePhotos={pastorCornerSharePhotos}
        ssUser={user}
      />
    </>
  );
}