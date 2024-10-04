import Header from '@/navigation/header/_Header';
import SideDrawer from '@/navigation/sideDrawer/_SideDrawer';
import PageLoading from '@/loadingPage/PageLoading';
import { getUserSession } from '@/lib/authActions/getUserSession';



export const metadata = {
  title: 'FastRecord',
  description: 'FastRecord is a book keeping app for all your financial records',
}




const RootLayout = ({params, children}) => {
  //SideDrawer width = 250px
  const user = getUserSession();

  return (
    <div>
        <Header ssUser={user}/>
        <PageLoading ssUser={user}/>
          <div className='flex lg:flex-row overflow-x-hidden'>
            <div className='hidden lg:block'>
            <div className='h-screen fixed z-40'>
              <SideDrawer ssUser={user} params={params}/>
            </div>
            </div>
            <div className='lg:ml-[250px] w-full lg:w-[calc(100% - 220px)] overflow-x-hidden'>
              {children}
            </div>
          </div>
    </div>
  )
}

export default RootLayout