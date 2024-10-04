import IndexPostProduct from '@/container/postProduct/_PostProduct'
import { getUserSession } from '@/lib/authActions/getUserSession';
import PageWrapper from '@/navigation/pageWrapper.js/PageWrapper'
import React from 'react'


const RecordProduct = () => {
  const user = getUserSession();

  return (
    <PageWrapper>
        <IndexPostProduct ssUser={user}/>
    </PageWrapper>
  )
}

export default RecordProduct