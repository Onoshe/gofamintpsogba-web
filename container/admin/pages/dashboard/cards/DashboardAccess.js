
import DashboardCard from '../../../components/reusableComponents/DashboardCard'




export const AccessCard = ({clientsData, handleRevalidate, activeTab}) => {
    
    const tabs = ["DASHBOARD", "DBTABLES", "MANAGECLIENTS", "CREATECLIENT", "SQLQUERY","ACCESS" ];
    const displayOnTabs = ["DASHBOARD", "ACCESS"];

    return (    
        <DashboardCard style={`flex-col gap-3 ${displayOnTabs.includes(activeTab)? 'flex' :'hidden'}`}
            title="Access">
            <p>AccessId - Name - Description - Slug</p>
            {clientsData?.map((el, i)=>{
                return(
                    <div key={`${i}key`} className={``}>
                    {el.id} - {el.name} - {el.description} - [{el.slug}]
                    </div>
                )
            })}
            <div className='flex justify-start mt-5'> 
                <p className='bg-gray-200  active:bg-gray-100 hover:border-gray-500 hover:shadow-md cursor-pointer text-gray-800 py-2 px-5 w-fit border 
                    border-gray-400 rounded-md'
                    onClick={()=>handleRevalidate('CLIENTS')}>Revalidate</p>
            </div>
        </DashboardCard> 

    )
  }



