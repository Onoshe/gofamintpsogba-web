'use client'
import AccordionClientsTables, { AccordionClientsTables_Str } from '@/container/admin/components/reusableComponents/AccordionClientsTables';
import BackgroundCard from '@/container/admin/components/reusableComponents/BackgroundCard';
import ReportTable from '@/container/reports/components/dynamicPageDisplay/ReportTable';
import React from 'react';

var rowKeys = ['companyName', 'companyDomain', 'plan', 'expiryDate'];
var rowTitles = ['Companies', 'Domain', 'Plan', 'Expiry-Date'];
var headerRows = rowKeys.map((key, i)=>{
  return {className:'py-5',name:key, title:rowTitles[i]}
});


const Dashboard = ({databases_clients, clientsDataFmt, selectedClient, setSelectedClient}) => {
  const [clickedHeader, setClickedHeader] = React.useState({clickable:['companyName']});

  let databases = databases_clients? Object?.keys(databases_clients) : []; 
  
  const handleClickCell =(e)=>{
    setSelectedClient(e)
  }
  return (
    <div className='p-4 w-full'>
        <div className='flex w-full flex-col lg:flex-row'>
                <BackgroundCard
                    title={'Dashboard'}
                    style={'flex flex-col gap-3 mr-5 h-fit'}
                >   
                    <div className='bg-green-50 mb-2 p-3 shadow-md'>
                      <p className='text-teal-900 text-base font-[600]'>Clients</p>
                      <ReportTable
                            classNameTable={"overflow-x-auto overflow-y-auto max-h-[calc(100vh_-_200px)]"}
                            header={[{className:'bg-blue-50 py-5', name:'', title:''}, ...headerRows]}
                            rowKeys={rowKeys}
                            rows={clientsDataFmt}
                            classNameHeaderTR="bg-gray-200" 
                            classNameRowsTR={`border border-gray-200 hover:bg-blue-50 hover:text-[blue] cursor-pointer`}
                            clickableHeader={clickedHeader?.clickable}
                            onClickHeader={(e)=>setClickedHeader({...clickedHeader, ...e})}
                            clickedHeader={clickedHeader}
                            setClickedHeader={setClickedHeader}
                            //clickableRowCell={clickables?.length}
                            clickableRowCellKeys ="ALL"
                            onClickRowCell={handleClickCell}
                            //windowDimen={windowDimen}
                            pinRow
                          />
                    </div>
                    <div className='bg-white p-3 shadow-md'>
                        <p className='text-blue-700 font-[600] text-base'>Existing Databases</p>
                            {databases?.map((database, i)=>{
                              return(
                                <dviv key={`${i}key`}>
                                  <p className='text-sm break-words text-[maroon]'>
                                    {i+1}. {database} <span className='text-[12px] text-gray-600'>{`Tables - ${databases_clients[database]?.length}`}</span>
                                  </p>
                                  
                                  {/*
                                  <AccordionClientsTables_Str key={`${i}`}
                                        title={`No of Tables - ${databases_clients[database]?.length}`}
                                        titleStyle="" 
                                        clientTab={databases_clients[database]} 
                                        contentsStyle="" 
                                        contStyle=""
                                        table="USERS"
                                    />
                                  backupSQLFiles?.[databases]?.map((database, i)=>{
                                    return(
                                      <p key={`${i}key`} className='pl-3 text-[12px] md:text-base break-words'
                                        >
                                        {i+1}. {database}
                                      </p>
                                    )
                                  })*/}
                                </dviv>
                              )
                            })}
                      </div>
                </BackgroundCard>
        </div>
    </div>
  )
}

export default Dashboard;





