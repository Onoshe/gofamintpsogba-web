
import DashboardCard from '../../../components/reusableComponents/DashboardCard'
import AccordionClientsTables, { AccordionClientsTables_Str } from '../../../components/reusableComponents/AccordionClientsTables';





 export const ClientsDatabase = ({handleRevalidate, clientsKeys, clientTablesGroup, activeTab, data, title}) => {
   

    const displayOnTabs = ["DASHBOARD", "MANAGECLIENTS", "CREATECLIENT",];
    let clientsDb = [];
    if(data?.ok && data?.db){
      const dbs = Object.keys(data.db);
      clientsDb = dbs.filter((dt)=> dt !== "gofamint_qr_demo");
    }

    return (    
        <DashboardCard style={`flex-col gap-3 ${displayOnTabs.includes(activeTab)? 'flex' :'hidden'}`}
              title={title}>
              <p>List of Clients Databases: - Tables count [domain]</p>
              <div className='max-h-[600px] overflow-auto bg-slate-50 p-3'>
                  {
                      clientsDb?.map((clientDb, i)=>{
                          return(
                              <AccordionClientsTables_Str key={`${i}`}
                                  title={`${i+1}. ${clientDb} - ${data.db[clientDb].length} tables [${clientDb.split("_")[2]}] `}
                                  titleStyle="" 
                                  clientTab={data.db[clientDb]} 
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
                      onClick={()=>handleRevalidate('DBS')}>Refresh</p>
              </div>
        </DashboardCard>
    )
  }


