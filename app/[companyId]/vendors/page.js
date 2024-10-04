import PageWrapper from '@/navigation/pageWrapper.js/PageWrapper'
import IndexVendors from '@/container/vendors/_Vendors'
import { getUserSession } from '@/lib/authActions/getUserSession';


const Vendors = () => {
  const user = getUserSession();

  return (
    <PageWrapper>
        <IndexVendors ssUser={user}/>
    </PageWrapper>
  )
}

export default Vendors