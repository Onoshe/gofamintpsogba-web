import PageWrapper from '@/navigation/pageWrapper.js/PageWrapper'
import IndexCustomers from '@/container/customers/_Customers'
import { getUserSession } from '@/lib/authActions/getUserSession';


const Customers = () => {
  const user = getUserSession();

  return (
    <PageWrapper>
        <IndexCustomers ssUser={user}/>
    </PageWrapper>
  )
}

export default Customers