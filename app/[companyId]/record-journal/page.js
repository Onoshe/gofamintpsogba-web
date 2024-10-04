import IndexPostJournal from '@/container/postJournal/_PostJournal'
import { getUserSession } from '@/lib/authActions/getUserSession';
import PageWrapper from '@/navigation/pageWrapper.js/PageWrapper'
import React from 'react'

const RecordJournal = ({params}) => {
  const user = getUserSession();

  return (
    <PageWrapper>
        <IndexPostJournal ssUser={user}/>
    </PageWrapper>
  )
}

export default RecordJournal