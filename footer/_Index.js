import React from 'react';
import { getRequest } from '@/lib/apis/getRequest';
import { getDataLink, getExtractInfo } from '@/lib/apis/urlLinks';
import Container from './Container';

const FooterIndex = async ({mapUrl}) => {
      const dataLink = getDataLink();
      const siteData = await getRequest(dataLink);    
      const dataRes = getExtractInfo(siteData?.data);
      
  
  return (
    <Container dataRes ={dataRes} mapUrl={mapUrl}/>
  )
}

export default FooterIndex