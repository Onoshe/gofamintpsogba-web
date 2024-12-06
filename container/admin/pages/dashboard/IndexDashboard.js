'use client'
import React, { useState } from 'react'
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
import { getLinkFetchTable, getLinksAdmin } from '@/lib/apiRequest/urlLinks';
import CreateAccount from './tabs/CreateAccount';
import Backup from './tabs/Backup';
import { useAuthCustom } from '@/lib/hooks/useAuthCustom';
import { ClientsDatabase } from './cards/DashboardCards_More';
import { sortArrayByKey } from '@/lib/sort/sortArrayByKey';
import { getRequest } from '@/lib/apiRequest/getRequest';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DashboardCard from '../../components/reusableComponents/DashboardCard';
import { MdClose } from 'react-icons/md';



const IndexDashboard = ({ssUser}) => {
    const {user} = useAuthCustom(ssUser);
    const domain = user.companyId?.split('@')[0]?.toLowerCase();
    const {usersAccountUrl, clientsDataUr, accessDataUrl, dbTablesUrl, accessUrl, backupUrl, backupUrlBase, databasesUrl, subscriptionsUrl, settingsUrl} = getLinksAdmin(domain);
    const usersAccount = useSWRFetcher(usersAccountUrl);
    const clientsData = useSWRFetcher(clientsDataUr);
    const accessData = useSWRFetcher(accessDataUrl);
    const databases = useSWRFetcher(databasesUrl);
    const dbTables = useSWRFetcher(dbTablesUrl); //t must be a valid table in the db
    //const dbSubscriptions = useSWRFetcher(subscriptionsUrl);
    //const dbSettings = useSWRFetcher(settingsUrl);
    const access = useSWRFetcher(accessUrl);
    const {tabsArrHome, activeTabHome, dispatchActiveTabHome} = useStoreHome((state) => state);

   const clientsDataFmt = clientsData?.data?.data || [];
   const accessDataFmt = accessData?.data?.data || [];
    const generalTables = dbTables?.data?.data?.filter((tb=> {return tb.TABLE_NAME.slice(0,1) == "_" || tb.TABLE_NAME.split("_")[0] !== "demo"}));
    const demoTables = dbTables?.data?.data?.filter((tb=> {return tb.TABLE_NAME.split('_')[0] === "demo"}));
    const clientTables = dbTables?.data?.data?.filter((tb=> {return tb.TABLE_NAME.slice(0,1) != "_"}));
    const clientTablesGroup = groupByPrefix(clientTables, 'TABLE_NAME');
    const clientsKeys = Object.keys(clientTablesGroup);
    const usersAccountKeys = usersAccount?.data?.data? Object.keys(usersAccount?.data?.data) : [];
    const databases_clients = databases.data;
    sortArrayByKey(demoTables);
    const companyDomains = clientsDataFmt?.reduce((cum, dt)=>{return [...cum, dt.companyDomain.toLowerCase()]},[]);
    const companyDomainsOthers = companyDomains?.filter((dt)=> dt !== "demo" && dt !== "admin");
    //const [clientTableExist, setClientTableExist] = React.useState(false);   
    const [usersAccountOthers, setUsersAccountOthers] = useState([]);
    const [selectedClient, setSelectedClient] = useState({});
    const selClientKeys = selectedClient?.row?.companyName? Object.keys(selectedClient.row) : [];
    
    //console.log(generalTables, demoTables)
    const fetchUsersAccounts = async ()=>{
        const accts = [];
        for (let i = 0; i < companyDomainsOthers.length; i++) {
            const dm = companyDomainsOthers[i];
            const url =  getLinkFetchTable({table:dm+"_usersaccount", domain:dm, select:'userId,firstname,lastname,email,companyId,companyDomain,role'});
            const dt = await getRequest(url);
            accts.push(dt.data);
            setUsersAccountOthers(accts)
        }
      };


      const notify = (type, msg) => toast[type](msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        theme: "colored",
      //transition: 'Bounce',
      });

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
            case table = 'DBS':
                dbTables.mutate({ revalidate: true });
            break;
            default:
                break;
        }
        fetchUsersAccounts();
  };


  React.useEffect(()=>{
    if(companyDomainsOthers?.length && !usersAccountOthers.length)
        fetchUsersAccounts();
  },[companyDomainsOthers]);
  
 const displayTabMain = {
    DASHBOARD:<Dashboard databases_clients={databases_clients?.db} clientsDataFmt={clientsDataFmt} selectedClient={selectedClient} setSelectedClient={setSelectedClient}/>,
    MANAGECLIENTS:<ManageClients databases_clients={databases_clients?.db} clientsData={clientsDataFmt} handleRevalidate={handleRevalidate} clientTables={clientTables}/>,
    SQLQUERY:<SQLQuery user={user} clientsData={clientsDataFmt} handleRevalidate={handleRevalidate}/>,
    CREATECLIENT:<CreateClient clientsData={clientsDataFmt} handleRevalidate={handleRevalidate}/>,
    CREATEACCOUNT:<CreateAccount clientsData={clientsDataFmt} handleRevalidate={handleRevalidate}/>,
    CREATEUSER:<CreateUser clientsData={clientsDataFmt} handleRevalidate={handleRevalidate}/>,
    ACCESS:<Access clientsData={clientsDataFmt} handleRevalidate={handleRevalidate} access={access}/>,
    BACKUP:<Backup clientsData={clientsDataFmt} notify={notify} backupUrlBase={backupUrlBase} backupUrl={backupUrl} handleRevalidate={handleRevalidate} access={access}/>,
 } 

  const fullTabs = ['BACKUP']; 
  const hideSideCards = fullTabs.includes(activeTabHome?.tab?.name);
  return (
    <div className='p-4'>
        <div className='flex w-full flex-col lg:flex-row'>
        <div className={`flex justify-center ${hideSideCards? 'lg:w-[100%]' : 'lg:w-[70%]'}`}>
        {displayTabMain[activeTabHome?.tab?.name]}
        </div>
            <div className={`flex flex-col  lg:w-[30%] items-center ${hideSideCards? 'hidden' : ''}`}>
                
                {selectedClient?.row?.companyName && 
                    <DashboardCard style={`flex-col relative gap-3 ${activeTabHome?.tab?.name === 'DASHBOARD'? 'flex' :'hidden'}`}
                    title={"Client Info"}>
                 <MdClose size={22} className='absolute right-3 top-1 cursor-pointer text-red-500 hover:text-red-800 active:text-red-300'
                  onClick={()=>setSelectedClient({})}/>

                  <p className='text-blue-800 font-[500] underline'>{selectedClient?.row?.companyName}</p>
                  <div>
                        {selClientKeys?.map((key, i)=>{
                            return(
                                <p key={`${i}selCl`}><span className='text-blue-500 underline'>{key}:</span> <span>{selectedClient.row[key]}</span></p>
                            )
                        })}
                  </div>  
                </DashboardCard>}
                <ClientsCard
                    activeTab={activeTabHome?.tab?.name}
                    clientsData={clientsData}
                    handleRevalidate={handleRevalidate}
                />
                <ExistingUsersCard
                    title="Users Account"
                    handleRevalidate={handleRevalidate}
                    clientsKeys={usersAccountKeys}
                    clientTablesGroup={usersAccount?.data?.data}
                    activeTab={activeTabHome?.tab?.name}
                    data={usersAccountOthers}
                />
                <GeneralTablesCard
                    title="Demo Database"
                    activeTab={activeTabHome?.tab?.name}
                    handleRevalidate={handleRevalidate}
                    generalTables={generalTables}
                    data={demoTables}
                />
                <ClientsTablesCard
                    contStyle="hidden"
                    handleRevalidate={handleRevalidate}
                    clientsKeys={clientsKeys}
                    clientTablesGroup={clientTablesGroup}
                    activeTab={activeTabHome?.tab?.name}
                />
                <ClientsDatabase
                    title="Clients Databases"
                    handleRevalidate={handleRevalidate}
                    clientsKeys={clientsKeys}
                    clientTablesGroup={clientTablesGroup}
                    activeTab={activeTabHome?.tab?.name}
                    data={databases_clients}
                />
                <AccessCard
                    activeTab={activeTabHome?.tab?.name}
                    clientsData={accessDataFmt}
                    handleRevalidate={handleRevalidate}
                />
                <ToastContainer 
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={true}
                    newestOnTop={false}
                    closeOnClick={true}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
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