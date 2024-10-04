import PageWrapper from '@/navigation/pageWrapper.js/PageWrapper'
import ProductsIndex from '@/container/products/_Products';
import { getUserSession } from '@/lib/authActions/getUserSession';



const Products = () => {
  const user = getUserSession();

  return (
    <PageWrapper>
        <ProductsIndex ssUser={user}/>
    </PageWrapper>
  )
}

export default Products