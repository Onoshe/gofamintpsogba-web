import IndexCommunication from '@/container/communication/_IndexCommunication';
import { getUserSession } from '@/lib/authActions/getUserSession';
import PageWrapper from '@/navigation/pageWrapper.js/PageWrapper'
import React from 'react'




const Communication = () => {
  const user = getUserSession();


  return (
    <PageWrapper>
        <IndexCommunication ssUser={user}/>
    </PageWrapper>
  )
}

export default Communication