import PostTransaction from '@/container/postTransaction/_PostTransaction'
import { getUserSession } from '@/lib/authActions/getUserSession';
import PageWrapper from '@/navigation/pageWrapper.js/PageWrapper'
import React from 'react'

const RecordTransaction = () => {
  const user = getUserSession();

  return (
    <PageWrapper>
        <PostTransaction ssUser={user}/>
    </PageWrapper>
  )
}

export default RecordTransaction