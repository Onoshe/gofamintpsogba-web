'use client'
import React, {useState, useEffect, Suspense} from 'react'
import IndexHeaderTabs from './components/headerTab/_IndexHeaderTabs'
import useStoreReports from '@/context/storeReports';
import DynamicPageDisplay from './components/dynamicPageDisplay/DynamicPageDisplay';
import useStoreTransactions from '@/context/storeTransactions';
import { LedgersManager } from './utils/ledgers/ledgersManger';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { getDisplayReport, } from './utils/getDisplayReport';
import LedgerSelect from './components/LedgerSelect';
import { getDisplayPersonalLedgers } from './utils/reportUtils/getDisplayPersonalLedgers';
import { handleExcelExport } from './utils/others/handleExcelExport';
import useStoreRecordTransaction from '@/context/storeRecordTransaction';
import { handleEditTranListing } from './utils/handleEditTranListing';
import MenuBarBar from './components/MenuBar';
import Spinner from '@/components/misc/Spinner';
import { getCurrentReportName, tabsDropdown, tabsDropdownsArr, } from './components/headerTab/getHeaders';
import { activities, postActivity } from '@/lib/apiRequest/postActivity';
import { splitByFirstChar } from '@/lib/capitalize/splitString';
import EditDeleteTransaction from './components/editDeleteTransaction/EditDeleteTransaction';
import { handleClickCellNav } from './utils/others/handleClickCellNav';
import useStoreHeader from '@/context/storeHeader';
import { getCompanyLogo } from '../company/components/utils/getSubscriptionHistory';
import { useAuthCustom } from '@/lib/hooks/useAuthCustom';
import useWindowDimensions from '@/lib/hooks/useWindowDimensions';
import { handleExportStatement } from './utils/others/handleExportStatement';
import { getAccountStatement } from './utils/ledgers/getAccountStatement';



const searchLeadgers = ['general-ledger-accounts','customers-ledger-accounts','vendors-ledger-accounts','products-ledger-accounts'];

const IndexReports = ({ssUser}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const viewTransId = searchParams.get('q');
  const ledgerCode = searchParams.get('l');
  const monthlyQuery = searchParams.get('m');
  const router = useRouter();
  const {coaStructure, transactions, transactionsDetails,controlAcctsCode, chartOfAccounts, customers, vendors, products, clientAccount, reportDate, 
          dispatchReportDate, runDispatchClientDataCall, currencySymbol} = useStoreTransactions((state) => state);
  let transProcessor = new LedgersManager({trans:transactions, transactions:transactionsDetails, chartOfAccounts, customers, vendors, products, controlAcctsCode, coaStructure, dateForm:reportDate});
  let ledgers = transProcessor.processTransactions(reportDate?.startDate, reportDate?.endDate);
  const processedLedgers = ledgers.processedLedgers;
  const { session, user, status} = useAuthCustom(ssUser); 
  const {recordTransaction, tranSheetTwoEntry,  tranSheetMultiEntry, tranSheetJournals, tranSheetProducts, 
    dispatchRecordTransaction, dispatchTranSheetTwoEntry, dispatchTranSheetMultiEntry, dispatchTranSheetJournals, dispatchTranSheetProducts,
    dispatchProductPageActiveTab, dispatchProductReturns, dispatchBookLoan, dispatchBookLoanCheckbox} = useStoreRecordTransaction((state) => state);  
  const {settings, toastNotice, dispatchToastNotice, clientData} = useStoreHeader((state) => state);
  const {activeTab, headerTab, headerTabsArr, dispatchActiveTab, dispatchSelTab, selTab,  currentReport, dispatchCurrentReport, selectedTranFromList, dispatchSelectedTranFromList, allAccountCodesInitDb} = useStoreReports((state) => state);
  const [showLedgers, setShowLedgers] = useState(false);
  const [clickedHeader, setClickedHeader] = useState({name:'', title:'', clickable:true});
  let [emptyPath, domainNm, reports, reportName] = pathname?.split("/");
   if(reportName?.includes("=")){ const reportNameSplit = splitByFirstChar(reportName, '='); reportName = reportNameSplit[0]; }
  const companyId = session?.user?.companyId;
  const {name, title, date, rowKeysShow, rowHeaders, rows, moreDocHeader, clickables, col1WchInDigit, pdfData, subTitle, headerRowsColsArr, acctStmt} = getDisplayReport({reportName, pathname, transProcessor, customers, vendors, products, viewTransId, ledgerCode, monthlyQuery, coaStructure, transactionsDetails, user, chartOfAccounts, dateForm:reportDate, clickedHeader});
  const ledgerAcctsDisplay = ["general-ledger-accounts", "customers-ledger-accounts", "vendors-ledger-accounts", "products-ledger-accounts"];
  const isReportPage = !reportName || ledgerAcctsDisplay.includes(reportName) || (pathname === `/${user?.companyId?.toLowerCase()}/reports` || pathname === `/${user?.companyId?.toLowerCase()}/reports/`); 
  //const genLedgerCodes = Object.keys(processedLedgers);
  const {ledgerCodes, ledgerAccts, ledgerTitle} = getDisplayPersonalLedgers(transProcessor, currentReport, reportDate);
  const docHeader = moreDocHeader?.length? [[clientAccount?.companyName], [title], [date],  ...moreDocHeader] : [[clientAccount?.companyName], [title], [date], ['']];
  const currentReportTab = getCurrentReportName(reportName);
  const companyLogoFile = getCompanyLogo(settings);
  const windowDimen = useWindowDimensions();  
  
  //console.log(transProcessor.getTransactions());
  //let productLg = transProcessor.getPersonalAccounts('productsLedger');
  //console.log(currencySymbol)

  const toastNotify =(type, msg)=>{
    dispatchToastNotice({type, msg, count:parseInt(toastNotice.count)+1})
  }

  const handleReport =(report)=>{
      //console.log(report);
  }

   /*
    //console.log(rows)
    //console.log(ledgers.processedLedgers);
    //let ledgersAcct = transProcessor.processTransactions();
    //const prosLedegers = ledgersAcct.processedLedgers;
    //console.log(transProcessor.getPersonalLedgers('productsLedger', reportDate))
    //const res = calculateBalGivenDate({...prosLedegers}, '2024-01-01', '2024-08-14', incomeClassTypeCode, retainedEarningsCode);
    //const res = calculateBalGivenDate({coaStructure, chartOfAccounts, controlAcctsCode, ledgers:{...prosLedegers}, });
    //console.log(res);


    //console.log(transProcessor.getPersonalLedgers('customersLedger'));
    //console.log(transProcessor.getTrialBalance());
    
    //const cusLedgers = ledgersAcct?.customersLedger;
   // const indvLedger = cusLedgers["C-000010"];
   // const indv = {"C-000010":cusLedgers["C-000010"]};
    //const resss = generateAging(cusLedgers, "RECEIVABLES");
    //console.log(resss);
    //console.log(cusLedgers);

    */
    
  const setDateFormHandler =(dt)=>{
    dispatchReportDate({...dt, defaultDate:false});
  }

    const excelExportHandler =()=>{
      let data = objectToArray(rows, rowKeysShow);
      const {rowsHeader} = extractKeysFomObject(rowHeaders, 'title');
      data = [rowsHeader, ...data];
      const offsetRows = 3; //Date row, Table header row & empty row after table header row.
      const {styleRows} =  getStyleRows(rows, docHeader.length + offsetRows);
      //console.log(styleRows, rows)
      //console.log({data, docName:title, docHeader, rowsHeader, styleRows})
      handleExcelExport({data, docName:title, docHeader, rowsHeader, styleRows, col1WchInDigit, noFmtCols:[4]});
      postActivity(user, activities.DOWNLOAD, title+" excel report")
    }

    const handleReportNav =(act)=>{
      if(act==="PREV"){router.back()}
      if(act==="NEXT"){router.forward()}
    }
    const handleClickCell =(cell)=>{
      //console.log(cell, reportName)
      // cell = {key:'edit'||'view', row:{}, i:0}
      const keyWords = ["gl", "trial-balance", "general-ledger", "personal-ledgers", "recorded-transactions", "receipts-and-payments", 
        "products-valuation", "journals"];
      const isMatch = keyWords.some(keyword => reportName.includes(keyword));
      if(isMatch){
        handleClickCellNav({cell, reportName, companyId, router, transactions, dispatchSelectedTranFromList,
           setShowLedgers, customers, vendors, products, viewTransId})
      }else if(["customers", "vendors", "products"].includes(reportName) && ledgerCode){
        //Inside personal ledger account. Eg: demo/reports/vendors?l=V-000009
        handleClickCellNav({cell, reportName, companyId, router, transactions, dispatchSelectedTranFromList,
          setShowLedgers, customers, vendors, products})
      }else if(["fs-balance-sheet-details", "fs-income-statement-details"].includes(reportName)){
          const acctCode = cell?.row?.title?.split(" ")[0];
          if(acctCode){
            const route = `/${companyId}/reports/gl?l=${acctCode}`;
            router.push(route);
          }
      }else{
        if(cell.key === "edit"){
          const cosTypeCode = controlAcctsCode.costOfSale;
          handleEditTranListing({name, cell, router, companyId, transactionsDetails, recordTransaction, pathname,
            dispatchRecordTransaction, dispatchTranSheetTwoEntry, dispatchTranSheetMultiEntry, dispatchTranSheetJournals, dispatchTranSheetProducts,
            dispatchProductPageActiveTab, cosTypeCode, controlAcctsCode, dispatchProductReturns, dispatchBookLoan, dispatchBookLoanCheckbox});
        }else if(cell.key === "view"){
          dispatchSelectedTranFromList(cell);
          router.push(`/${companyId}/reports/${reportName}?q=${cell.row.id}`); //http://localhost:3000/demo/reports/transactions-listing
        }
      }
    }
  
    const handleCloseShowLedgers =()=>{
      setShowLedgers(false)
    }

    const handleSelectedLedger =(ledgerCode)=>{
      const productLdgs = transProcessor.getPersonalAccounts('productsLedger');
      let ldg = ledgerCode?.slice(0,2);
      //console.log(ledgerCode, ldg, productLdgs[ledgerCode])
      ldg = ldg === "C-"? "customers" : ldg === "V-"? "vendors" : productLdgs[ledgerCode]?.name? "products" : "general";
      const ledgerAcct = {
        general:"gl",
        customers:"customers",
        vendors:"vendors",
        products:"products",
      }
      setShowLedgers(false);
      const ledger = ledgerAcct[ldg];
      const route = `/${companyId}/reports/${ledger}?l=${ledgerCode}`;
      router.push(route);
    }
    const handleSelReport =(rep)=>{
      //console.log(rep)
      //rep= {name:'general-ledger-accounts|customers-ledger-accounts|products-ledger-accounts', title:'Products Ledger Accounts', mainReport:'GL|CUSTOMERS|PRODUCTS'}
      if(searchLeadgers.includes(rep.name)){
         setShowLedgers(true);
         dispatchCurrentReport(rep);
         router.push(`/${companyId}/reports/${rep.name}`);
      }else{
        router.push(`/${companyId}/reports/${rep.name}`);
        dispatchCurrentReport(rep);
      }
  }
  
  const handleDetailReport =()=>{

    let report = {name:'fs-balance-sheet', title:'Condensed Balance Sheet', mainReport:'BALANCESHEET'};
    if(reportName === 'fs-balance-sheet'){
      report = {name:'fs-balance-sheet-details', title:'Balance Sheet', mainReport:'BALANCESHEETDETAILS'};
    }else if(reportName === 'fs-balance-sheet-details'){
      report =  {name:'fs-balance-sheet', title:'Condensed Balance Sheet', mainReport:'BALANCESHEET'};
    }else if(reportName === 'fs-income-statement'){
      report = {name:'fs-income-statement-details', title:'Income Statement', mainReport:'INCOMESTATEMENTDETAILS'};
    }else if(reportName === 'fs-income-statement-details'){
      report = {name:'fs-income-statement', title:'Condensed Income Statement', mainReport:'INCOMESTATEMENT'};
    }
    handleSelReport(report)
  }  
  const handleRefresh =()=>{
    runDispatchClientDataCall();
  }
  const handleMonthlySummaryToggle=()=>{ 
      if (monthlyQuery) {
        router.push(`${pathname}?l=${ledgerCode}`);
      } else {
        router.push(`${pathname}?l=${ledgerCode}&m=monthly`);
      }
  }
  const downloadAccountStatement =()=>{
      let personalAccts = null;
      if(reportName === 'customers'){
        personalAccts = customers;
      }else if(reportName === 'vendors'){
        personalAccts = vendors;
      }
      const personalAcct = personalAccts?.find(dt=> dt.accountCode == ledgerCode);
      const {pdfData, reportData} = getAccountStatement({name, personalAcct, rows:acctStmt?.rows, reportDate, clientData, accountType:reportName, currencySymbol});
      //console.log(acctStmt, personalAcct, ledgerCode)
     handleExportStatement({imgObj:companyLogoFile, pdfData, data:reportData})
     //console.log([name, title, date, rowKeysShow, rowHeaders, rows, moreDocHeader, clickables, col1WchInDigit, pdfData, subTitle, headerRowsColsArr])
  }
  //console.log(currentReport)
  useEffect(()=>{
    // Get and dispatch current report on refresh or on mount
    if(currentReportTab){
      const rep = tabsDropdown[currentReportTab.toLocaleLowerCase()]?.find(r=> r.name == reportName);
      if(rep?.name){
        dispatchCurrentReport(rep);
      }else{dispatchCurrentReport(tabsDropdown[currentReportTab.toLocaleLowerCase()][0]);}
    }
    //Refresh upon mount
    handleRefresh();
  },[]);

  useEffect(()=>{
    const sortables = ['personal-ledgers-customers-balances', 'personal-ledgers-vendors-balances',
      'personal-ledgers-products-balances','account-list-customers','account-list-vendors','account-list-products'
    ];
    if(sortables.includes(reportName)){
      setClickedHeader({name:'', title:'', clickable:true})
    }else{setClickedHeader({name:'', title:'', clickable:false})}
  },[reportName]);

  const showReport = typeof rows === "object" || rows?.length ? true : false;
  //  console.log(rows)
  return (
    <div>          
         <IndexHeaderTabs
            selectedTab={activeTab} 
            headerTab={headerTab}
            setSelectedTab={dispatchActiveTab}
            handleSelReport={handleSelReport}
            headersArr={headerTabsArr}
            handleSelected={handleReport}
            companyId={session?.user?.companyId}
            selTab={selTab}
            setSelTab={dispatchSelTab}
            currentReport={currentReport}
          />
          <Suspense>   
            <MenuBarBar
              showBar={showReport}
              handleReportNav={handleReportNav}
              handleExportToExcel={excelExportHandler}
              handleDetailReport={handleDetailReport}
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
              ledgerCode={ledgerCode}
              monthlyQuery={monthlyQuery}
              viewTransId={viewTransId}
              handleMonthlySummaryToggle={handleMonthlySummaryToggle}
              companyLogoFile={companyLogoFile}
              handleRefresh={handleRefresh}
              currentReportTab={currentReportTab}
              downloadAccountStatement={downloadAccountStatement}
            />
        </Suspense>
        <div className={`flex justify-center items-center h-[50vh] ${showReport? 'hidden' : ''}`}>
          <Spinner 
            showSpinner={true} 
            showMsg={true}
            msg="Loading report, please wait..."
            contStyle={`flex flex-col`}
            spinnerStyle={'dark:text-[gray] fill-[silver] h-20 w-20'}
            />
         
        </div>
        <button className='btn btn-primary btn-sm m-4 hidden'>Receivables Aging</button>
        <div className={`${showReport? '' : 'hidden'}`}>
          {isReportPage || showLedgers?
            <LedgerSelect
              showLedgers={showLedgers}
              handleCloseShowLedgers={handleCloseShowLedgers}
              processedLedgers={ledgerAccts}
              genLedgerCodes={ledgerCodes}
              handleSelectedLedger={handleSelectedLedger}
              isReportPage={isReportPage}
              ledgerTitle={ledgerTitle}
          />
          :<Suspense>
            
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
              windowDimen={windowDimen}
              clickedHeader={clickedHeader}
              setClickedHeader={setClickedHeader}
            />
              <EditDeleteTransaction 
                selectedTranFromList={selectedTranFromList}
                reportName={reportName}
                viewTransId={viewTransId}
                transactionsDetails={transactionsDetails}
                handleClickCell={handleClickCell}
                
                recordTransaction={recordTransaction}
                user={user}
                notify={toastNotify}
                runDispatchClientDataCall={runDispatchClientDataCall}
                router={router}
                transactions={transactions}
                settings={settings}
                />
            </Suspense>
            }
          
        </div>
       
    </div>
  )
}

export default IndexReports;


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
  /*classNameTD:true is added on the row that will be styled
   classNameTD:{text-[blue], ...} in some cases. So, there should be control  
  */
  const styleRows = [];
  for (let i = 0; i < arr.length; i++) {
    const el = arr[i];
    const row = (i + offset || 0);

    if((typeof(el?.classNameTD)=== "boolean" && el?.classNameTD) || el?.classNameTD?.includes('font-bold')){
      styleRows.push(row)
    }
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
