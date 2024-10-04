'use client'
import React, { useEffect, useState } from 'react'
import { getLinksAdmin } from '@/lib/apiRequest/urlLinks';
import useStoreTransactions from '@/context/storeTransactions';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useStoreHeader from '@/context/storeHeader';
import ReconciliationSelect from './components/ReconciliationSelect';
import useStoreRecordTransaction from '@/context/storeRecordTransaction';
import { mapPersonalAccounts } from '@/lib/transactionsManager/mapPersonalAccounts';
import { mapChartOfAccount } from '@/lib/transactionsManager/mapChartOfAccount';
import { mapProducts } from '@/lib/transactionsManager/mapProducts';
import { LedgersManager } from '../reports/utils/ledgers/ledgersManger';
import { getStartAndEndDate } from '@/lib/dummyData/getStartAndEndDate';
import ReconReportTable from './components/ReconReportTable';
import { sortArrayByDate } from '@/lib/sort/sortArrayByDate';
import { getReconDataForDisplay } from './getReconDataForDisplay';
import { getReconReportData } from './getReconReportData';
import ReconOthersEntry from './components/ReconOthersEntry';
import { getLongMonth } from '@/lib/date/shortLongDate';
import { handleExcelExport } from '../reports/utils/others/handleExcelExport';
import { getStyleRows, objectToArray } from '../auditTrail/_IndexAuditTrail';
import { extractKeysFomObject } from '../reports/_IndexReports';
import { handleExport2Pdf } from './utils/handleExport2Pdf';
import { getSlug } from '@/lib/string/getSlug';
import { handleSaveReport } from './utils/handleSaveReport';
import { useAuthCustom } from '@/lib/hooks/useAuthCustom';


const keys = ['transactionDate', 'description', 'transactionNo', 'debit', 'credit'];
const keyTitles = {transactionDate:{name:'transactionDate', title:'Date'}, description:{name:'description', title:'Description'}, transactionNo:{name:'transactionNo', title:'Tran No'},
        reference:{name:'reference', title:'Reference'}, voucher:{name:'voucher', title:'Voucher'}, amount:{name:'amount', title:'Amount'},
        checkbox:{name:'checkbox', title:''}, debit:{name:'debit', title:'Debit'}, credit:{name:'credit', title:'Credit'},};


const IndexReconciliation = ({ssUser}) => {
    const { session, user,  status} = useAuthCustom(ssUser);
    const [form, setForm] = React.useState({dateFrom:'', dateTo:'', stmtClosingBalance:''});
    const [formOthers, setFormOthers] = React.useState({new:{description:'', amount:''}, forms:[]});
    const reportDate = form.dateFrom && form.dateTo? {startDate:form.dateFrom, endDate:form.dateTo} : getStartAndEndDate("THISMONTH");
    const [reconLedger, setReconLedger] = React.useState([]);
     sortArrayByDate(reconLedger, 'transactionDate');
     const [reconAccount, setReconAccount] = React.useState({coa:{}, ledger:[], openingBalRow:{}});
     const stmtClosingBal = parseFloat(form.stmtClosingBalance); 
     const cbOpeningBal = reconAccount.openingBalRow?.balance || 0;
     const reconDataForDislay = getReconDataForDisplay([...reconLedger], stmtClosingBal, cbOpeningBal);

    const {coy, settings, dispatchRefreshSettingsCount} = useStoreHeader((state) => state); 
    const {clientAccount, coaStructure,customers, vendors, chartOfAccounts, transactions, transactionsDetails, controlAcctsCode, products, runDispatchClientDataCall} = useStoreTransactions((state) => state);
   
    let transProcessor = new LedgersManager({trans:transactions, transactions:transactionsDetails, chartOfAccounts, customers, vendors, products, controlAcctsCode, coaStructure, dateForm:reportDate});
    let ledgers = transProcessor.processTransactions(reportDate?.startDate, reportDate?.endDate);
    const processedLedgers = ledgers?.processedLedgers;
    const [displayReport, setDisplayReport] = React.useState({show:false, name:""});
    const chartOfAccountSelection = mapChartOfAccount(chartOfAccounts, coaStructure);
    //const [reportData, setReportData] = React.useState({show:true, data:[]});
    const [reconOthers, setReconOthers] = React.useState({show:false, amount:0, diff:0, add:0, less:0});
     
    const [selAcctCode, setSelAcctCode] = React.useState("");
    const [resetOthers, setResetOthers] = React.useState(0); 
    const ledgerAccts = processedLedgers[selAcctCode];
    const ledger = ledgerAccts?.trans || [];
    
    let reportDetails = {};
    if(form.dateFrom && form.dateTo && ledgerAccts?.name){
     const reportDt = getLongMonth(form.dateTo)?.fullMonth;
     reportDetails = {companyName:clientAccount.companyName, asAt:"As at "+reportDt, ledgerName:ledgerAccts.name, ledgerCode:ledgerAccts.accountCode,
        title:"Bank Reconciliation", accountTitle:ledgerAccts.accountCode+" "+ledgerAccts.name,
      };
    }
    let reportData = {};
    if(user?.lastname){
     reportData = getReconReportData({...reconDataForDislay}, {forms:formOthers.forms, diff:reconOthers.diff, add:reconOthers.add, less:reconOthers.less}, reportDetails, user);
    }
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
    

  
    const handleReconReport =(type)=>{
    if(reportData?.reportDetails){
        const {title, ledgerName, ledgerCode, accountTitle, asAt, companyName} = reportData.reportDetails;
        let data =  reportData.rows.map(obj => reportData.reportKeys.map(key => obj[key] || "" ));
        const tableRowKeys = ["desc", "descSub", "tranNo", "amount"];
        const rowsHeader = [" ", "", "", "Amount"]; //const {rowsHeader} =extractKeysFomObject(keyTitles, 'title');
        const offsetRows = 3;
        const docHeader = [[companyName],[title], [asAt], [accountTitle],[]];
        const {styleRows} =  getStyleRows(reportData.rows, docHeader.length + offsetRows);
        const excelData = {docName:"BankReconciliation_"+ledgerName, docHeader, 
          data:[rowsHeader, ...data], styleRows, noFmtCols:[], col1WchInDigit:30};
        
        const styledDisplayRows = ["Ending GL Balance", "Ending Bank Balance", "Ending GL balance"];
        const reportRowsStyle = reportData.rows.reduce((arr, dt, i)=>{
          return styledDisplayRows.includes(dt.desc)? [...arr, i] : arr
        },[]);
        //return console.log(styleRowsArr)  
        if(type=== "SAVE"){
          if(!displayReport.name){
            notify("error", "Please, enter the report name")
          }else{
            handleSaveReport({form:reportData, name:displayReport.name, notify, dispatchRefreshSettingsCount});
          }
        }else if(type=== "EXCEL"){
          handleExcelExport(excelData)
        }else if(type=== "PDF"){
          const data4Pdf = {
            reportRows:data, 
            reportHeader:rowsHeader, 
            pdfHeader:docHeader, 
            pdfData:{reportRowKeys:tableRowKeys, reportRowsStyle,headerFSize:[16,14,14,14]},
          };
          //handleExcelExport(excelData);
          handleExport2Pdf(data4Pdf)
        }
    }  
  }

  //console.log(clientAccount, ledgerAccts)
  React.useEffect(()=>{
    //let reportDate = getStartAndEndDate();
    if(form.dateFrom && form.dateTo){
       const startDateVal = new Date(form.startDate).getTime();
       const endDateVal = new Date(form.endDate).getTime();
       if(startDateVal > endDateVal){
        notify("error", "End date cannot be greater than start date!")
       }
       
      //     {startDate:form.dateFrom, endDate:form.dateTo} : 
    }
  },[form]);
  React.useEffect(()=>{
    if(!clientAccount.id){
      runDispatchClientDataCall();
    }
  },[reconDataForDislay.errorAdj]);

  React.useEffect(()=>{
    //console.log(parseInt(reconDataForDislay.errorAdj))
    if(parseInt(reconDataForDislay.errorAdj)){
      setReconOthers({...reconOthers, amount:parseFloat(reconDataForDislay.errorAdj)});
      //console.log(reconOthers, parseFloat(reconDataForDislay.errorAdj))
   }
  },[reconDataForDislay.errorAdj]);

  //console.log(reconDataForDislay)
  React.useEffect(()=>{
    //setReconOthers: add, less, diff calculation
    let add = 0;
    let less = 0;
    if(formOthers.forms.length){
        formOthers.forms.forEach(entry => {
           const amnt = parseFloat(entry.amount);
           add += amnt >0? amnt : 0;
           less += amnt <0? amnt : 0;
           const diff = reconDataForDislay.errorAdj + add +less;
           setReconOthers({...reconOthers, diff, add, less})
        });
    }else{ setReconOthers({...reconOthers, diff:reconDataForDislay.errorAdj + reconOthers.add + reconOthers.less,
      add:0, less:0})
    }
  },[formOthers.forms, resetOthers]);

  //console.log(reconOthers)
  React.useEffect(()=>{
    //resetCalculation();
  },[reconLedger]);

  const resetCalculation =()=>{
    setReconOthers({...reconOthers, diff:parseFloat(reconDataForDislay.errorAdj), add:0, less:0});
      setFormOthers({new:{description:'', amount:''}, forms:[]});
    setResetOthers(resetOthers +1);
  }
  const handleShowReconOthersCont =()=>{
    //Reset on mount if no others
    if(!formOthers.forms.length){
      resetCalculation();
    }setReconOthers({...reconOthers, show:true});
  }

  return (
    <div className='px-4 py-2 flex  flex-col'>
        
          <ReconReportTable
              displayReport={displayReport}
              setDisplayReport={setDisplayReport}
              classNameTable={"overflow-x-auto overflow-y-auto max-h-[calc(100vh_-_230px)]"}
              header={headerArr}
              rowKeys={['desc', 'descSub', 'tranNo', 'amount']}
              rows={reportData?.rows}
              classNameHeaderTR="bg-blue-50" 
              classNameRowsTR="border border-gray-200 hover:bg-blue-50"
              clickableHeader={false}
              reportDetails={reportDetails}
              handleReconReport={handleReconReport}
              pinRow
            />
        <div className={`${displayReport.show? 'hidden' :''}`}>
          <ReconciliationSelect
            form={form}
            setForm={setForm}
            notify={notify}
            chartOfAccountSelection={chartOfAccountSelection}
            controlAcctsCode={controlAcctsCode}
            chartOfAccounts={chartOfAccounts}
            processedLedgers={processedLedgers}
            reconAccount={reconAccount}
            setReconAccount={setReconAccount}
            reconLedger={reconLedger}
            setReconLedger={setReconLedger}
            reconDataForDislay={reconDataForDislay}
            reconOthers={reconOthers}
            handleShowReconOthersCont={handleShowReconOthersCont}
            selAcctCode={selAcctCode}
            setSelAcctCode={setSelAcctCode}
            ledger={ledger}
            reportData={reportData}
            handleReconReport={handleReconReport}
            keys={keys}
            keyTitles={keyTitles}
            formOthers={formOthers}
            setFormOthers={setFormOthers}
            setReconOthers={setReconOthers}
            resetCalculation={resetCalculation}
            displayReport={displayReport}
            setDisplayReport={setDisplayReport}
          />
            {reconOthers.show? <ReconOthersEntry
              formOthers={formOthers}
              reconOthers={reconOthers}
              setReconOthers={setReconOthers}
              setFormOthers={setFormOthers}
              reconDataForDislay={reconDataForDislay}
            /> : <></>}
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

var headerArr =[
  //{className:'bg-blue-50 py-5', title:''},
  {name:'desc', title:''},
  {name:'descSub', title:''},
  {name:'amount', title:'Amount'},
  {name:'tranNo', title:''},
]



const getDummyLedger =(form)=> {
  dummyLedger.filter((dt)=>{
  const tranDate = new Date(dt.transactionDate).getTime();
  const stDt = new Date(form.dateFrom).getTime();
  const endDt = new Date(form.dateTo).getTime();
  const valid = tranDate >= stDt && tranDate < endDt;
  return valid
});
}

var dummyLedger = [
{
  "transactionDate": "2024-01-01",
  "description": "Opening balance",
  "reference": "000001",
  "debit": "",
  "credit": "",
  "amount": 5000,
  "balance": 5000
},
{
  "transactionDate": "2024-01-03",
  "description": "Customer payment",
  "reference": "000002",
  "debit": 2000,
  "credit": "",
  "amount": 2000
},
{
  "transactionDate": "2024-01-05",
  "description": "Supplier payment",
  "reference": "000003",
  "debit": "",
  "credit": 1500,
  "amount": -1500
},
{
  "transactionDate": "2024-01-10",
  "description": "Utility bill",
  "reference": "000004",
  "debit": "",
  "credit": 500,
  "amount": -500
},
{
  "transactionDate": "2024-01-20",
  "description": "Cash deposit at bank",
  "reference": "000005",
  "debit": 3000,
  "credit": "",
  "amount": 3000
},
{
  "transactionDate": "2024-01-30",
  "description": "Payroll",
  "reference": "000006",
  "debit": "",
  "credit": 2500,
  "amount": -2500
},
{
  "transactionDate": "2024-01-30",
  "description": "Bank fees",
  "reference": "000007",
  "debit": "",
  "credit": 50,
  "amount": -50
},
{
  "transactionDate": "2024-02-01",
  "description": "Opening balance",
  "reference": "000001",
  "debit": "",
  "credit": "",
  "amount": 5450,
  "balance": 5450
},
{
  "transactionDate": "2024-02-05",
  "description": "Customer payment",
  "reference": "000008",
  "debit": 1500,
  "credit": "",
  "amount": 1500
},
{
  "transactionDate": "2024-02-10",
  "description": "Supplier payment",
  "reference": "000009",
  "debit": "",
  "credit": 2000,
  "amount": -2000
},
{
  "transactionDate": "2024-02-15",
  "description": "Loan received",
  "reference": "000010",
  "debit": 5000,
  "credit": "",
  "amount": 5000
},
{
  "transactionDate": "2024-02-28",
  "description": "Insurance premium",
  "reference": "000011",
  "debit": "",
  "credit": 500,
  "amount": -500
},
{
  "transactionDate": "2024-02-28",
  "description": "Bank fees",
  "reference": "000012",
  "debit": "",
  "credit": 100,
  "amount": -100
},
{
  "transactionDate": "2024-03-01",
  "description": "Opening balance",
  "reference": "000001",
  "debit": "",
  "credit": "",
  "amount": 9350,
  "balance": 9350
},
{
  "transactionDate": "2024-03-05",
  "description": "Customer payment",
  "reference": "000013",
  "debit": 3000,
  "credit": "",
  "amount": 3000
},
{
  "transactionDate": "2024-03-10",
  "description": "Supplier payment",
  "reference": "000014",
  "debit": "",
  "credit": 4500,
  "amount": -4500
},
{
  "transactionDate": "2024-03-15",
  "description": "Rent",
  "reference": "000015",
  "debit": "",
  "credit": 2000,
  "amount": -2000
},
{
  "transactionDate": "2024-03-25",
  "description": "Dividend income",
  "reference": "000016",
  "debit": 1000,
  "credit": "",
  "amount": 1000
},
{
  "transactionDate": "2024-03-30",
  "description": "Office supplies",
  "reference": "000017",
  "debit": "",
  "credit": 700,
  "amount": -700
}
];

export default IndexReconciliation;

