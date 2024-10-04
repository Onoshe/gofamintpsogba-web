'use client'
import React, {Suspense, useState, useEffect} from 'react'
import useStoreReports from '@/context/storeReports';
import useStoreTransactions from '@/context/storeTransactions';
import { LedgersManager } from '@/container/reports/utils/ledgers/ledgersManger';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { getDisplayReport, } from './utils/getDisplayReport';
import { handleExcelExport } from '@/container/reports/utils/others/handleExcelExport';
import MenuBarBar from './components/MenuBar';
import Spinner from '@/components/misc/Spinner';
import { activities, postActivity } from '@/lib/apiRequest/postActivity';
import { ToastContainer } from 'react-toastify';
import { toastNotify } from '@/container/postTransaction/components/utils/toastNotify';
import 'react-toastify/dist/ReactToastify.css';
import { splitByFirstChar } from '@/lib/capitalize/splitString';
import useStoreHeader from '@/context/storeHeader';
import { getCompanyLogo } from '../company/components/utils/getSubscriptionHistory';
import DynamicPageDisplay from './components/dynamicPageDisplay/DynamicPageDisplay';
import { sortArrayByDate } from '@/lib/sort/sortArrayByDate';
import { useAuthCustom } from '@/lib/hooks/useAuthCustom';



const IndexAuditTrail = ({ssUser}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const viewTransId = searchParams.get('q');
  const router = useRouter();
  const {coaStructure, transactions, transactionsDetails,controlAcctsCode, chartOfAccounts, customers, vendors, products, clientAccount, reportDate, dispatchReportDate} = useStoreTransactions((state) => state);
  let transProcessor = new LedgersManager({trans:transactions, transactions:transactionsDetails, chartOfAccounts, customers, vendors, products, controlAcctsCode, coaStructure, dateForm:reportDate});
  let ledgers = transProcessor.processTransactions(reportDate?.startDate, reportDate?.endDate);
  const processedLedgers = ledgers.processedLedgers;
  //const { data: session, status } = useSession(); //{user:{companyId:'', email:''}}; 
  const { session, user,  status} = useAuthCustom(ssUser);
  const {settings, activityLog} = useStoreHeader((state) => state);
  const {  dispatchSelectedTranFromList,} = useStoreReports((state) => state);
   let [emptyPath, domainNm, reports, reportName] = pathname?.split("/");
   if(reportName?.includes("=")){ const reportNameSplit = splitByFirstChar(reportName, '='); reportName = reportNameSplit[0]; }
  const companyId = session?.user?.companyId;
  const {name, title, date, rowKeysShow, rowHeaders, rows, moreDocHeader, clickables, col1WchInDigit, pdfData, subTitle, headerRowsColsArr} = getDisplayReport({reportName, transProcessor,  viewTransId, transactionsDetails, user, activityLog, dateForm:reportDate});
  const docHeader = moreDocHeader?.length? [[clientAccount?.companyName], [title], [date],  ...moreDocHeader] : [[clientAccount?.companyName], [title], [date], ['']];
  const companyLogoFile = getCompanyLogo(settings);

  //console.log(viewTransId, transactionsDetails, user,)

  const setDateFormHandler =(dt)=>{
    dispatchReportDate({...dt, defaultDate:false});
  }

    const excelExportHandler =()=>{
      let data = objectToArray(rows, rowKeysShow);
      const {rowsHeader} = extractKeysFomObject(rowHeaders, 'title');
      data = [rowsHeader, ...data];
      const {styleRows} =  getStyleRows(rows, docHeader.length + 3);
      //console.log({data, docName:title, docHeader, rowsHeader, styleRows})
      handleExcelExport({data, docName:title, docHeader, rowsHeader, styleRows, col1WchInDigit, noFmtCols:[4]});
      postActivity(user, activities.DOWNLOAD, title+" report exported to excel")
    }

    const handleReportNav =(act)=>{
      if(act==="PREV"){router.back()}
      if(act==="NEXT"){router.forward()}
    }
    const handleClickCell =(cell)=>{
      //return console.log(cell, reportName)
      // cell = {key:'edit'||'view', row:{}, i:0}
      if(cell.row.transId){
        dispatchSelectedTranFromList(cell);
          router.push(`/${companyId}/audit-trail?q=${cell.row.transId}`);
      }
    }

  const handleActivityToggle =(act)=>{
    if(act==="TRAN"){
      router.push(`/${companyId}/audit-trail`);
    }else if(act==="ACT"){
      router.push(`/${companyId}/audit-trail?q=activities-log`);
    }
  }
    
   const showReport = typeof rows === "object" || rows?.length ? true : false;
  //  console.log(rows)
  return (
    <div>          
        <MenuBarBar
          showBar={showReport}
          handleReportNav={handleReportNav}
          handleExportToExcel={excelExportHandler}
          reportName={reportName}
          reportRows={rows}
          reportRowKeys={rowKeysShow}
          reportHeader={rowHeaders}
          pdfData={pdfData}
          pdfHeader={docHeader}
          user={user}
          toastNotify={toastNotify}
          dateForm={reportDate}
          setDateForm={setDateFormHandler}
          headerRowsColsArr={headerRowsColsArr}
          companyLogoFile={companyLogoFile}
          viewTransId={viewTransId}
          handleActivityToggle={handleActivityToggle}
        />

        <div className={`flex justify-center items-center h-[50vh] ${showReport? 'hidden' : ''}`}>
          <Spinner 
            showSpinner={true} 
            showMsg={true}
            msg="Loading report, please wait..."
            contStyle={`flex flex-col`}
            spinnerStyle={'dark:text-[gray] fill-[silver] h-20 w-20'}
            />
         
        </div>
        <div className={`${showReport? '' : 'hidden'}`}>
          <Suspense>
            <DynamicPageDisplay
              pathname={pathname}
              processedLedgers={processedLedgers}
              transProcessor={transProcessor}
              rowHeaders={rowHeaders}
              currentReport={{name, title}}
              rowKeysShow={rowKeysShow}
              rows={rows}
              reportName={reportName}
              handleClickCell={handleClickCell}
              clickables={clickables}
              companyName={clientAccount?.companyName}
              reportDate={date}
              toastNotify={toastNotify}
              viewTransId={viewTransId}
              transactionsDetails={transactionsDetails}
              subTitle={subTitle}
            />
             
            </Suspense>
          
        </div>
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
  )
}

export default IndexAuditTrail;


export function objectToArray(arr, keys) {
  //return arr.map(obj => keys.map(key => typeof obj[key] == "number"? formatToCurrency(obj[key]) : obj[key] ));
  return arr.map(obj => keys.map(key => obj[key] ));
}

export function extractKeysFomObject(arr, key) {
  const rowsHeader = [];
  for (let i = 0; i < arr.length; i++) {
    const el = arr[i];
     rowsHeader.push(el[key]);
  }
  return {rowsHeader}
}

export function getStyleRows(arr, offset) {
  //classNameTD:true is added on the row that will be styled
  const styleRows = [];
  for (let i = 0; i < arr.length; i++) {
    const el = arr[i];
    const row = (i + offset || 0);
    if(el?.classNameTD){styleRows.push(row)}
  }
  return {styleRows}
}

function filterObjectKeys(arr, keys) {
  return arr.map(obj => {
    const filteredObj = {};
    keys.forEach(key => {
      if (obj.hasOwnProperty(key)) {
        filteredObj[key] = obj[key];
      }
    });
    return filteredObj;
  });
}
