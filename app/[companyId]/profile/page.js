import IndexProfile from '@/container/profile/_IndexProfile'
import { getUserSession } from '@/lib/authActions/getUserSession';
import PageWrapper from '@/navigation/pageWrapper.js/PageWrapper'
import React from 'react'


const Profile = () => {
  const user = getUserSession();

  return (
    <PageWrapper>
        <IndexProfile ssUser={user}/>
    </PageWrapper>
  )
}

export default Profile