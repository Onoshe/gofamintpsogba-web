import AboutIndex from "@/container/about/AboutIndex";
import { getRequest } from "@/lib/apis/getRequest";
import { getDataLink, getExtractInfo } from "@/lib/apis/urlLinks";


export const metadata = {
  title: 'About'
}


export default async function About() {
    const dataLink = getDataLink();
    const siteData = await getRequest(dataLink);    
    const dataRes = getExtractInfo(siteData?.data);
    

  return (
    <AboutIndex dataRes={dataRes}/>
  );
}