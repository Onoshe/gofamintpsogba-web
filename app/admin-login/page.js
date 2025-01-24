import AdminLogin from "@/container/adminLogin/Container";
import { getRequest } from "@/lib/apis/getRequest";
import { getDataLink, getExtractInfo } from "@/lib/apis/urlLinks";


export default async function AdminLoginIndex() {
    const dataLink = getDataLink();
    const siteData = await getRequest(dataLink);    
    const dataRes = getExtractInfo(siteData?.data);
      

  return (
    <AdminLogin dataRes={dataRes}/>
  );
}