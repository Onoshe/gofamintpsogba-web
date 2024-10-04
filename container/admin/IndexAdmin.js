'use client'
import React, {useState, useEffect} from 'react'
import Layout from './Layout';
import IndexDashboard from './pages/dashboard/IndexDashboard';
import useStoreHome from '@/context/storeHome';



const IndexAdmin = ({ssUser}) => {
  const {tabsArrHome, activeTabHome, dispatchActiveTabHome, dispatchCoy} = useStoreHome((state) => state);
  const handleSelectedTab =(i, tab, hide)=>{
    dispatchActiveTabHome({index:i, tab, hideDropdown:hide})
  }
  const [loginAdmin, setLoginAdmin] = useState(false)

  const handleHideDropdown =(act)=>{
    dispatchActiveTabHome({...activeTabHome, hideDropdown:act})
  }
  
  if(!loginAdmin){
    //return <AdminLogin setAdmin={setLoginAdmin}/>
  }
  return (
    <Layout tabsArr={tabsArrHome} 
      activeTab={activeTabHome}
      handleSelectedTab={handleSelectedTab}
      handleHideDropdown={handleHideDropdown}
      ssUser={ssUser}
      dispatchCoy={dispatchCoy}
      >
      <IndexDashboard/>
    </Layout>
  )
}


export default IndexAdmin;