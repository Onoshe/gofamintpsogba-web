import IndexReports from '@/container/reports/_IndexReports'
import { getUserSession } from '@/lib/authActions/getUserSession';
import PageWrapper from '@/navigation/pageWrapper.js/PageWrapper'


const Reports = () => {
  const user = getUserSession();

  return (
    <PageWrapper>
        <IndexReports ssUser={user}/>
    </PageWrapper>
  )
}

export default Reports