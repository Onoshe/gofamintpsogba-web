import PageWrapper from '@/navigation/pageWrapper.js/PageWrapper';
import IndexAuditTrail from '@/container/auditTrail/_IndexAuditTrail';
import { getUserSession } from '@/lib/authActions/getUserSession';


const AuditTrail = () => {
  const user = getUserSession();

  return (
    <PageWrapper>
      <>
        <IndexAuditTrail ssUser={user}/>
      </>
    </PageWrapper>
  )
}

export default AuditTrail