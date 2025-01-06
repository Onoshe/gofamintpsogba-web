'use client'
import React from 'react';
import HorizontalLine from '@/components/misc/HorizontalLine';
import { validateEmail } from '@/lib/validation/validateEmail';
import { sortByDate } from '@/lib/date/dates';
//import { generateGenLedger } from '@/pagesContainer/company/reportsModule/generalLedger/_IndexGenerateGenLedger';
//import useStoreReports from '@/context/storeReports';
//import PersonalLedgerBalances from '@/pagesContainer/company/reports/components/personalLedger/PersonalLedgerBalances';
//import { getExcelDataFromPersonalLedger } from '@/pagesContainer/company/modules/generalExcelData/getExcelDataFromPersonalLedger';
//import { generateReportData } from '@/pagesContainer/company/reports/components/modules_Clients/generateReportData';
//import { getLoanDetails } from '@/pagesContainer/company/reports/components/modules_Clients/getLoanDetails';
//import accountStatementTemplate from '@/contants/htmlTemplate/accountStatement/accountStatementTemplate';
//import { generateAndEmailStatementFromPhpServer, getStatementParams, generateAndEmailStatementFromPhpServerWithCustomeEmailBody } from '@/pagesContainer/company/reports/components/modules_Clients/phpServerModules/phpServerCalls';
import useStoreTransactions from '@/context/storeTransactions';
import PersonalLedgerBalances from './PersonalLedgerBalances';




const StatementBuilder = ({postStatementHandler, selectedLedger, setSelectedLedger, emailValueInfo, 
    setEmailValueInfo, b64LogoPath, setB64LogoPath, statementDate, handleStatementDate, transProcessor, 
    checkedLedger, setCheckedLedger, handleViewStatement, emailContent, setEmailContent, accountType, customersLedgerArr, vendorsLedgerArr}) => {
    //const {transEntries, transactions, allAccountCodes} = useStoreReports((state) => state);
    const {coaStructure, transactions, transactionsDetails,controlAcctsCode, chartOfAccounts, customers, vendors, products, clientAccount, 
        dispatchReportDate, runDispatchClientDataCall, currencySymbol} = useStoreTransactions((state) => state);

    const [showSelectedLedger, setShowSelectedLedger] = React.useState(false);
    //const customersLedgerObj = transProcessor.getPersonalAccounts("customersLedger", {startDate:'2022-01-01', endDate:statementDate});
    //const vendorsLedgerObj = transProcessor.getPersonalAccounts("vendorsLedger", {startDate:'2022-01-01', endDate:statementDate});
    //const customersLedgerArr = Object.values(customersLedgerObj);
    //const vendorsLedgerArr = Object.values(vendorsLedgerObj);

    const [emailValue, setEmailValue] = React.useState('');
    const [displayedLedger, setDisplayedLedger] = React.useState({name:'Vendors Personal Ledgers', ledger:vendorsLedgerArr});
    const [toggleTable, setToggleTable] = React.useState(false);
    
    //const personalLedgers = transProcessor.getPersonalAccounts("customersLedger", {startDate:'2022-01-01', endDate:'2025-01-01'});

    //console.log(selectedLedger)
    const excelData = []; //getExcelDataFromPersonalLedger(genLedgerCustomers, allAccountCodes, `Creditors Personal Ledger Accounts`);

    const handleSelectedLedger =(ledger)=>{
        setSelectedLedger(ledger);
        setShowSelectedLedger(true);
        const personalAccts = ledger?.accountType === "CUSTOMERS"? customers : vendors;
        const personalAcct =  personalAccts?.find((acct)=> acct.accountCode === ledger.accountCodeSub);
        const title = selectedLedger?.accountType === "VENDORS"? "Savings Account Statement as at "+new Date(statementDate || '').toDateString() : "Loan Account Statement as at "+new Date(statementDate || '').toDateString();
        setEmailContent({...emailContent, title, holder:personalAcct?.firstname+' '+personalAcct.lastname,  email:personalAcct?.email});
    };
   sortByDate(transactions, 'transDate')
   
   // console.log([customersLedgerArr, vendorssLedgerArr])
   /*const postStatementHandler99 = async (act)=>{
    if(!selectedLedger?.accountCode) return setEmailValueInfo({msg:'No ledger selected!', show:true})
    const reportType = selectedLedger?.accountCode?.includes('C')? "LOANS" : "SAVINGS";
    const targetDate = new Date().toISOString().split('T')[0];
    const user_Id = selectedLedger?._id;
   if(reportType === 'LOANS'){
   await getLoanDetails('KOSOFE-COOPERATIVE', reportType, {targetDate, _id:user_Id}).then((res)=>{
    const selectedLedgerFound = res?.find((dt)=> dt.reportParams.accountCode === selectedLedger.accountCode);
    if(selectedLedgerFound?.reportParams?.accountCode && act === "EMAIL"){
        const isValid = validateEmail(emailValue)
        if(!emailValue || !isValid) return setEmailValueInfo({show:true, msg:'Invalid email! Please, check the email'})
        setEmailValueInfo({msg:'Sending message, please wait...', show:true})
        const params = getStatementParams(selectedLedgerFound, b64LogoPath);
        const mailOpts = {
            email: emailValue
        };
        generateAndEmailStatementFromPhpServer(params, mailOpts).then((dt)=> setEmailValueInfo({msg:'Message sent successful, congratulation', show:true}));//Message sent failed!
        //generateAndEmailStatementFromPhpServerWithCustomeEmailBody = async (params, mailOpts, bodyHtml, bodyPlainText) 
    }
   })}
}*/

const handleCheckedLedger =(e)=>{
    const {name} = e.target;
    setCheckedLedger(name);
    setDisplayedLedger({name:name==="VENDORS"? 'Vendors Personal Ledgers' : 'Customers Personal Ledgers', 
        ledger:name==="VENDORS"? vendorsLedgerArr : customersLedgerArr});
}

//transProcessor.getPersonalAccounts("customersLedger", {startDate:'2022-01-01', endDate:'2025-01-01'});

/*React.useEffect(()=>{
    const toDataURL = url => fetch(url)
        .then(response => response.blob())
        .then(blob => new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onloadend = () => resolve(reader.result)
            reader.onerror = reject
            reader.readAsDataURL(blob)
        }))

        toDataURL('https://cdn.sanity.io/images/prvpom28/counting_xpress_db/7412601199ad5a79fc7b7edea436df3b9ac81904-505x501.png')
        .then(dataUrl => {
            setB64LogoPath(dataUrl)
        })
},[]);
  */

const emailValueHandler =(e)=>{
    setEmailValue(e.target.value);
    setEmailValueInfo({show:false, msg:''})
}

   
    return (
        <div className=''>
            
            <div className={`${toggleTable? '':'hidden'} bg-sky-50`}>
                <div className='px-4 py-2'>
                    <p className='font-bold'>Select Ledger</p>
                    <div className='flex flow-row flex-wrap gap-3'>
                        <div className='flex items-center gap-2'><input className='h-4 w-4' type='checkbox' checked={checkedLedger==="VENDORS"} name='VENDORS' onChange={handleCheckedLedger}/> Vendors</div>
                        <div className='flex items-center gap-2'><input className='h-4 w-4' type='checkbox' checked={checkedLedger==="CUSTOMERS"} name="CUSTOMERS" onChange={handleCheckedLedger}/> Customers</div>
                    </div>
                    
                </div>
            
                <PersonalLedgerBalances 
                    personalLedgerArr={displayedLedger?.ledger}
                    handleSelectedLedger={handleSelectedLedger}
                    allAccountCodes={'allAccountCodes'}
                    excelData={excelData}
                    hideExport
                    title={displayedLedger.name}

                />
            </div>
            <div className='bg-sky-100 shadow-lg pt-3'>
                <button className='btn btn-info btn-sm mx-3 px-5 py-2 cursor-pointer shadow-lg   w-fit rounded-md'
                    onClick={()=>setToggleTable(!toggleTable)}>
                    {`${toggleTable? 'Hide Table' :'Show Table'}`}
                </button>
                <div className={`p-3 ${toggleTable? '':'hidden'}`}>
                    <HorizontalLine widths={100} margBot={0} margTop={2} bColor="#ccc"/>
                </div>
                <div className='px-3 text-[13px] pt-2'>
                    <p><span className='font-bold text-teal-900 underline'>Email Statement To: </span><span className={`${selectedLedger?.accountCodeSub? '' :'hidden'}`}>{selectedLedger?.accountCodeSub + " "+selectedLedger?.name}</span></p>
                </div>
                <div className='p-3'>
                    <div className={`${showSelectedLedger? '' :'hidden'}`}>
                        <div className='flex flex-row  flex-wrap gap-2  pr-5 items-center justify-between'>
                            <div className='flex flex-row gap-2 items-center'>
                                <p>Statement date</p>
                                <input type='date' value={statementDate} name='statementDate' onChange={handleStatementDate}/>
                            </div>
                            <button className='btn btn-sm btn-info'
                             onClick={()=>handleViewStatement('PRINT')}>View Statement</button>
                        </div> 

                       <div className='hidden'>
                            <div className='flex flex-row flex-wrap my-2 gap-2 items-center'>
                                <input type='email'
                                    className='px-2 py-1 outline-none border border-blue-600' 
                                    placeholder='Enter your email'
                                    value={emailValue}
                                    onChange={emailValueHandler}
                                    />
                                <p className='bg-[teal] rounded-md text-white font-bold p-2 cursor-pointer w-fit active:bg-teal-500'
                                    onClick={()=>postStatementHandler}>Email Statement
                                </p>
                            </div>
                            <div>
                                <p className={`text-red-600`}>{emailValueInfo?.show && emailValueInfo?.msg}</p>
                            </div>
                        </div>
                        
                    </div>
                    
                    
                </div>
            </div>
        </div>
  )
}

export default StatementBuilder;