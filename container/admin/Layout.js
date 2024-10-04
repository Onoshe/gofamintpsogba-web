'use client'
import React, {useState, useEffect} from 'react'
import Header from './components/header/Header';
import TabsApp from './components/header/tab/TabsApp';
import Drawer from './components/header/sidedrawer/Drawer';
import { usePathname, useRouter } from 'next/navigation';
import useStoreHome from '@/context/storeHome';
import { useAuthCustom } from '@/lib/hooks/useAuthCustom';



//Used to wrapp IndexAdmin

const Layout = ({children, tabsArr, activeTab, handleSelectedTab, handleHideDropdown, ssUser, dispatchCoy}) => {
  const {pages, selectedPage, dispatchSelectedPage} = useStoreHome((state) => state);
  const [hideDrawer, setHideDrawer] = useState(true);
  const [adminPage, setAdminPage] = useState(false);
  //const { data: session, status } = useSession();
  const { signOut, session, user,  status} = useAuthCustom(ssUser);

  const activePage = usePathname();
  const tabContStyle = `z-50 mt-[80px] fixed`;
  const router = useRouter();

  const handleMenu =()=>{
    setHideDrawer(!hideDrawer);
  }
  
  
  const handleSelectedPage=(selPage)=>{
    dispatchSelectedPage(selPage);
    if(selPage?.name === "LOGOUT"){
      signOut({dispatchCoy});
    }
  }
  
  React.useEffect(()=>{
    if(status === "authenticated"){
        setAdminPage(true);
    }else if(status === "unauthenticated"){
        //router.push("/");
    }else{
      setAdminPage(false);
    }
  },[session, status, router]);
  //console.log(session, status)
  
  //if(!adminPage) return <PageLoadingInnerControl pageLoading={!adminPage}/>;
  
  return (
    <div data-theme="light" className='bg-white'>
        <Drawer
            hideDrawer={hideDrawer}
            setHideDrawer={setHideDrawer}
            pages={pages}
            activePage={activePage}
            handleSelectedPage={handleSelectedPage}
        /> 
        <>
            <Header
                handleMenu={handleMenu}
                pages={pages}
                activePage={activePage}
                handleSelectedPage={handleSelectedPage}
                activeTab={activeTab}
                userId={session?.user?.userId}
            />
            <TabsApp
                tabContStyle={tabContStyle}
                activePage={activePage}
                pages={pages}
                handleSelected={handleSelectedTab}
                tabsArr={tabsArr}
                activeTab={activeTab}
                handleHideDropdown={handleHideDropdown}
            />
            <div className='w-full pt-[150px]'>
                {children}
            </div>          

            <footer className="py-5 bg-gray-700  text-center text-white">
                Tailwind is Awesome 😎{activePage}
            </footer>   
        </>
        
    </div>
  )
}


export default Layout;