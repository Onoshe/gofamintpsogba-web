import ContactUsIndex from "@/container/contactus/ContactUsIndex";
import { getRequest } from "@/lib/apis/getRequest";
import { getDataLink, getExtractInfo } from "@/lib/apis/urlLinks";


export default async function ContactUs() {
    const dataLink = getDataLink();
    const siteData = await getRequest(dataLink);    
    const dataRes = getExtractInfo(siteData?.data);
      

  return (
    <ContactUsIndex dataRes={dataRes}/>
  );
}