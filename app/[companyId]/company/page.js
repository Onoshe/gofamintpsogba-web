import IndexCompany from '@/container/company/_IndexCompany'
import { getUserSession } from '@/lib/authActions/getUserSession';
import PageWrapper from '@/navigation/pageWrapper.js/PageWrapper'
import React from 'react'




const Company = () => {
  const user = getUserSession();


  return (
    <PageWrapper>
        <IndexCompany ssUser={user}/>
    </PageWrapper>
  )
}

export default Company