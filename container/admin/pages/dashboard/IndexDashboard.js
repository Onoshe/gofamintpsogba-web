'use client'
import React, { useState } from 'react'
import DashboardCard from '../../components/reusableComponents/DashboardCard'
import { useSWRFetcher } from '@/lib/hooks/useSWRFetcher';
import ManageClients from './tabs/ManageClients';
import useStoreHome from '@/context/storeHome';
import Dashboard from './tabs/Dashboard';
import SQLQuery from './tabs/SqlQueryPanel';
import CreateClient from './tabs/CreateClient';
import { groupByPrefix } from '../../utils/groupArrays';
import Access from './tabs/Access';
import { ClientsCard, ClientsTablesCard, ExistingUsers, ExistingUsersCard, GeneralTablesCard } from './cards/DashboardCards';
import { AccessCard } from './cards/DashboardAccess';
import CreateUser from './tabs/CreateUser';
import { getLinksAdmin } from '@/lib/apiRequest/urlLinks';




const IndexDashboard = ({}) => {
    const {usersAccountUrl, clientsDataUr, accessDataUrl, dbTablesUrl, accessUrl} = getLinksAdmin();
    const usersAccount = useSWRFetcher(usersAccountUrl);
    const clientsData = useSWRFetcher(clientsDataUr);
    const accessData = useSWRFetcher(accessDataUrl);
    const dbTables = useSWRFetcher(dbTablesUrl); //t must be a valid table in the db
    const access = useSWRFetcher(accessUrl);
    const {tabsArrHome, activeTabHome, dispatchActiveTabHome} = useStoreHome((state) => state);

   const clientsDataFmt = clientsData?.data?.data || [];
   const accessDataFmt = accessData?.data?.data || [];
    const generalTables = dbTables?.data?.data?.filter((tb=> {return tb.TABLE_NAME.slice(0,1) == "_"}));
    const clientTables = dbTables?.data?.data?.filter((tb=> {return tb.TABLE_NAME.slice(0,1) != "_"}));
    const clientTablesGroup = groupByPrefix(clientTables, 'TABLE_NAME');
    const clientsKeys = Object.keys(clientTablesGroup);
    const usersAccountKeys = usersAccount?.data?.data? Object.keys(usersAccount?.data?.data) : [];
    //const [clientTableExist, setClientTableExist] = React.useState(false);   
    
    
   const handleRevalidate = (table) => {
        switch (table) {
            case table = 'USERSACCOUNT':
                    usersAccount.mutate({ revalidate: true });
                break;
            case table = 'CLIENTS':
                clientsData.mutate({ revalidate: true });
            break;
            case table = 'DBTABLES':
                dbTables.mutate({ revalidate: true });
            break;
            case table = 'ACCESS':
                accessData.mutate({ revalidate: true });
            break;
            default:
                break;
        }
  };

  

 const displayTabMain = {
    DASHBOARD:<Dashboard/>,
    MANAGECLIENTS:<ManageClients clientsData={clientsDataFmt} handleRevalidate={handleRevalidate} clientTables={clientTables}/>,
    SQLQUERY:<SQLQuery clientsData={clientsDataFmt} handleRevalidate={handleRevalidate}/>,
    CREATECLIENT:<CreateClient clientsData={clientsDataFmt} handleRevalidate={handleRevalidate}/>,
    CREATEUSER:<CreateUser clientsData={clientsDataFmt} handleRevalidate={handleRevalidate}/>,
    ACCESS:<Access clientsData={clientsDataFmt} handleRevalidate={handleRevalidate} access={access}/>,
 } 
 
  return (
    <div className='p-4'>
        <div className='flex w-full flex-col lg:flex-row'>
        <div className='flex justify-center  lg:w-[70%]'>
        {displayTabMain[activeTabHome?.tab?.name]}
        </div>
            <div className='flex flex-col  lg:w-[30%] items-center'>
                <ClientsCard
                    activeTab={activeTabHome?.tab?.name}
                    clientsData={clientsData}
                    handleRevalidate={handleRevalidate}
                />
                <ExistingUsersCard
                    handleRevalidate={handleRevalidate}
                    clientsKeys={usersAccountKeys}
                    clientTablesGroup={usersAccount?.data?.data}
                    activeTab={activeTabHome?.tab?.name}
                />
                <GeneralTablesCard
                    activeTab={activeTabHome?.tab?.name}
                    handleRevalidate={handleRevalidate}
                    generalTables={generalTables}
                />
                <ClientsTablesCard
                    handleRevalidate={handleRevalidate}
                    clientsKeys={clientsKeys}
                    clientTablesGroup={clientTablesGroup}
                    activeTab={activeTabHome?.tab?.name}
                />
                <AccessCard
                    activeTab={activeTabHome?.tab?.name}
                    clientsData={accessDataFmt}
                    handleRevalidate={handleRevalidate}
                />
            </div>
        </div>
    </div>
  )
}

//clientsData, handleRevalidate,data, generalTables, clientsKeys, clientTablesGroup

export default IndexDashboard;

/*
<DashboardCard style={'flex flex-col gap-3'}
                    title="Clients">
                    <p>List of Clients: <span className='text-[#34a734] font-bold'>Active</span> | <span className='text-[maroon] font-bold'>Inactive</span></p>
                    <p>ClientId - Name - Domain - Expired date</p>
                    {clientsData?.data?.data?.map((el, i)=>{
                        return(
                            <div key={`${i}key`} className={`${el.inactive==1? 'text-[maroon]' : 'text-[#34a734]'}`}>
                            {el.id} - {el.companyName} - {el.companyDomain} - {el.subscriptionExpirationDate}
                            </div>
                        )
                    })}
                    <div className='flex justify-start mt-5'> 
                        <p className='bg-gray-200  active:bg-gray-100 hover:border-gray-500 hover:shadow-md cursor-pointer text-gray-800 py-2 px-5 w-fit border 
                            border-gray-400 rounded-md'
                         onClick={()=>handleRevalidate('CLIENTS')}>Revalidate</p>
                    </div>
                </DashboardCard>
                <DashboardCard style={'flex flex-col gap-3'}
                    title="Existing Users">
                    <p>List of Existing Users: Firstname Lastname - Username</p>
                    {data?.data?.map((el, i)=>{
                        return(
                            <div key={`${i}key`}>
                            {i+1}. {el.firstname} {el.lastname} - {el.userId}
                            </div>
                        )
                    })}
                    <div className='flex justify-start mt-5'> 
                        <p className='bg-gray-200  active:bg-gray-100 hover:border-gray-500 hover:shadow-md cursor-pointer text-gray-800 py-2 px-5 w-fit border 
                            border-gray-400 rounded-md'
                         onClick={()=>handleRevalidate('USERSACCOUNT')}>Revalidate</p>
                    </div>
                </DashboardCard>
                <DashboardCard style={'flex flex-col gap-3'}
                    title="General Tables">
                    <p>List of Database General Tables: Table Name - Rows count</p>
                    {generalTables?.map((el, i)=>{
                        //const key = Object.keys(el);
                        //console.log(key)
                        return(
                            <div key={`${i}key`}>
                            {i+1}. {el.TABLE_NAME} - {el.TABLE_ROWS}
                            </div>
                        )
                    })}
                    <div className='flex justify-start mt-5'> 
                        <p className='bg-gray-200  active:bg-gray-100 hover:border-gray-500 hover:shadow-md cursor-pointer text-gray-800 py-2 px-5 w-fit border 
                            border-gray-400 rounded-md'
                         onClick={()=>handleRevalidate('DBTABLES')}>Revalidate</p>
                    </div>
                </DashboardCard>
                <DashboardCard style={'flex flex-col gap-3'}
                    title="Clients Tables">
                    <p>List of Database Clients Tables: Table Name - Rows count</p>
                    <div className='max-h-[600px] overflow-auto bg-slate-50 p-3'>
                        {
                            clientsKeys?.map((client, i)=>{
                                return(
                                    <AccordionClientsTables key={`${i}`}
                                        title={`${client?.toUpperCase()} Tables - ${clientTablesGroup[client].length} [${client}.] `}
                                        titleStyle="" 
                                        clientTab={clientTablesGroup[client]} 
                                        contentsStyle="" 
                                        contStyle=""
                                    />
                                )
                            })
                        }
                    </div>
                    <div className='flex justify-start mt-1'> 
                        <p className='bg-gray-200  active:bg-gray-100 hover:border-gray-500 hover:shadow-md cursor-pointer text-gray-800 py-2 px-5 w-fit border 
                            border-gray-400 rounded-md'
                         onClick={()=>handleRevalidate('DBTABLES')}>Revalidate</p>
                    </div>
                </DashboardCard>
*/