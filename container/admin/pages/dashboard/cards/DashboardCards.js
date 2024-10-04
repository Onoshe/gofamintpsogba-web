
import DashboardCard from '../../../components/reusableComponents/DashboardCard'
import AccordionClientsTables from '../../../components/reusableComponents/AccordionClientsTables';



export const ClientsCard = ({clientsData, handleRevalidate, activeTab}) => {
    
    const tabs = ["DASHBOARD", "DBTABLES", "MANAGECLIENTS", "CREATECLIENT", "SQLQUERY","ACCESS" ];
    const displayOnTabs = ["DASHBOARD", "MANAGECLIENTS", "CREATECLIENT",];

    return (    
        <DashboardCard style={`flex-col gap-3 ${displayOnTabs.includes(activeTab)? 'flex' :'hidden'}`}
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
                    onClick={()=>handleRevalidate('CLIENTS')}>Refresh</p>
            </div>
        </DashboardCard> 

    )
  }

 export const ExistingUsers = ({handleRevalidate,data, activeTab}) => {
   
    const displayOnTabs = ["DASHBOARD", "MANAGECLIENTS", "CREATECLIENT",];

    return (    
        <DashboardCard style={`flex-col gap-3 ${displayOnTabs.includes(activeTab)? 'flex' :'hidden'}`}
              title="Existing Users">
              <p>List of Existing Users: Firstname Lastname - Username</p>
              <div className='flex flex-col gap-3 max-h-[40vh] overflow-y-auto'>
                {data?.demo.map((el, i)=>{
                    return(
                        <div key={`${i}key`}>
                        {i+1}. {el.firstname} {el.lastname} - {el.userId}
                        </div>
                    )
                })}
              </div>
              <div className='flex justify-start mt-5'> 
                  <p className='bg-gray-200  active:bg-gray-100 hover:border-gray-500 hover:shadow-md cursor-pointer text-gray-800 py-2 px-5 w-fit border 
                      border-gray-400 rounded-md'
                      onClick={()=>handleRevalidate('USERSACCOUNT')}>Refresh</p>
              </div>
          </DashboardCard>
          
    )
  }

 export const GeneralTablesCard = ({handleRevalidate, generalTables, activeTab}) => {
   
    const displayOnTabs = ["DASHBOARD", "MANAGECLIENTS", "CREATECLIENT",];

    return (    
        <DashboardCard style={`flex-col gap-3 ${displayOnTabs.includes(activeTab)? 'flex' :'hidden'}`}
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
                      onClick={()=>handleRefresh('DBTABLES')}>Refresh</p>
              </div>
          </DashboardCard>
      
    )
  }


 export const ClientsTablesCard = ({handleRevalidate, clientsKeys, clientTablesGroup, activeTab}) => {
   

    const displayOnTabs = ["DASHBOARD", "MANAGECLIENTS", "CREATECLIENT",];

    return (    
        <DashboardCard style={`flex-col gap-3 ${displayOnTabs.includes(activeTab)? 'flex' :'hidden'}`}
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
                      onClick={()=>handleRevalidate('DBTABLES')}>Refresh</p>
              </div>
        </DashboardCard>
    )
  }


  export const ExistingUsersCard = ({handleRevalidate, clientsKeys, clientTablesGroup, activeTab}) => {
   
    const displayOnTabs = ["DASHBOARD", "MANAGECLIENTS", "CREATECLIENT",];

    return (    
        <DashboardCard style={`flex-col gap-3 ${displayOnTabs.includes(activeTab)? 'flex' :'hidden'}`}
              title="Users Account">
              <p>List of Users Account: Table Name - Rows count</p>
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
                                  table="USERS"
                              />
                          )
                      })
                  }
              </div>
              <div className='flex justify-start mt-1'> 
                  <p className='bg-gray-200  active:bg-gray-100 hover:border-gray-500 hover:shadow-md cursor-pointer text-gray-800 py-2 px-5 w-fit border 
                      border-gray-400 rounded-md'
                      onClick={()=>handleRevalidate('DBTABLES')}>Refresh</p>
              </div>
        </DashboardCard>
    )
  }
