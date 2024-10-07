'use client'
import ReportTable from './ReportTable';
import React, {useState, useEffect} from 'react';





const DynamicPageDisplay = ({ rowHeaders, rowKeysShow, rows,currentReport, clickables, handleClickCell, companyName, reportName, reportDate, viewTransId, subTitle, windowDimen, transactionsDetails, toastNotify }) => {
   let rowsForDisplay = rows;


  //console.log(currentReport)
  
  let currentReportTitle = currentReport?.title;
  if(['GL', 'CUSTOMERS', 'VENDORS', 'PRODUCTS'].includes(currentReport?.title)){
    let personalAccountName = rows[0]?.accountName? ` - ${rows[0].accountCode} ${rows[0].accountName}` : '';
    //let productAccountName = rows[0]?.productAccountName? `- ${rows[0].productCode} ${rows[0].productName}` : '';
    let productAccountName = rows[0]?.accountCodeSubName? `- ${rows[0].accountCodeSub} ${rows[0].accountCodeSubName}` : '';
    const ledgerName = currentReport.title === "PRODUCTS"? productAccountName : personalAccountName;
    //console.log(currentReport, rows);
  }
  let reportDateDisplay = reportDate;
  // const reportDateExcl = ["account-list-customers", "account-list-vendors", "account-list-products"];
  // if(reportDateExcl.includes(reportName)){
  //   reportDateDisplay = "";
  // }
  // console.log(reportDateExcl);


//w-[calc(100% - 200px)]
  return (
    <div className='pt-5 flex w-full flex-col text-sm smc:text-base justify-center items-center p-3  mx-4 text-gray-600'>
      <div className={`mb-3`}>
        <p className='text-center'>{companyName}</p>
        <p className='text-center'>{currentReportTitle}</p>
         <p className='text-center'>{reportDateDisplay}</p>
         <p className='text-center'>{subTitle}</p>
      </div>
      
       <div className='w-[98%] overflow-x-auto mr-10'>
          <ReportTable
                classNameTable={"overflow-x-auto overflow-y-auto max-h-[calc(100vh_-_330px)]"}
                header={[{className:'bg-blue-50 py-5', title:''}, ...rowHeaders]}
                rowKeys={rowKeysShow}
                rows={rowsForDisplay}
                classNameHeaderTR="bg-blue-50" 
                classNameRowsTR="border border-gray-200 hover:bg-blue-50"
                clickableHeader={false}
                //onClickHeader={(e)=>console.log(e)}
                //clickableRowCell={clickables?.length}
                clickableRowCellKeys ={clickables?.length? clickables : clickables === "ALL"? "ALL" : []} //['name']
                onClickRowCell={handleClickCell}
                windowDimen={windowDimen}
                pinRow
              />
       </div>
    </div>
  )
}

export default DynamicPageDisplay