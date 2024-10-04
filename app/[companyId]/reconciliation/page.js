import PageWrapper from '@/navigation/pageWrapper.js/PageWrapper'
import React from 'react'
import IndexReconciliation from '@/container/reconciliation/IndexReconciliation'
import { getUserSession } from '@/lib/authActions/getUserSession';



const Reconciliation = () => {
  const user = getUserSession();

  return (
    <PageWrapper>
        <IndexReconciliation ssUser={user}/>
    </PageWrapper>
  )
}

export default Reconciliation