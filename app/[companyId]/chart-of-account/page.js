import PageWrapper from '@/navigation/pageWrapper.js/PageWrapper'
import ChartOfAccountIndex from '@/container/chartOfAccount/_ChartOfAccount'
import { getUserSession } from '@/lib/authActions/getUserSession';



const ChartOfAccount = () => {
  const user = getUserSession();

  return (
    <PageWrapper>
        <ChartOfAccountIndex ssUser={user}/>
    </PageWrapper>
  )
}

export default ChartOfAccount