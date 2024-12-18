'use client'
import React from 'react';
import HorizontalLine from '@/components/misc/HorizontalLine';
import { getRequest } from '@/lib/apiRequest/getRequest';
import { postRequest } from '@/lib/apiRequest/postRequest';
import { putRequest } from '@/lib/apiRequest/putRequest';
import { formatToCurrency } from '@/lib/currency';
import { sortArrayByKey } from '@/lib/sort/sortArrayByKey';
import Spinner from '@/components/misc/Spinner';

import useStoreCompany from '@/context/storeCompany.js';
import TableCustomise from '@/pagesContainer/company/components/table/TableCustomise';
import { getLoanDetails } from '../modules_Clients/getLoanDetails';
import { postMailForm } from '@/lib/postMail/postMailForm';
import { generateGenLedger } from '@/pagesContainer/company/reportsModule/generalLedger/_IndexGenerateGenLedger';
import useStoreReports from '@/context/storeReports';
import { getDataLedger, getDataPersonalLedger } from './tableDataLedger';



const IndexLoans = () => {
    const {transEntries, transactions, allAccountCodes} = useStoreReports((state) => state);
    const {user,} = useStoreCompany((state) => state);
    const genLedgerCustomers = generateGenLedger(transEntries,  allAccountCodes, 'C');
    const tableDataClient = getDataLedger(genLedgerCustomers, allAccountCodes);
    const [tableData, setTableData] = React.useState([]);
    const [emailValue, setEmailValue] = React.useState('');
    const [infoMsg, setInfoMsg] = React.useState({msg:'', show:false});
    const [selectedLedger, setSelectedLedger] = React.useState({});
    const [showEmailCont, setShowEmailCont] = React.useState(false);
    const [loanActivities, setLoanActivities] = React.useState({});


    sortArrayByKey(tableData, 'accountCode');
     //sortByDate(transactions, 'transDate')
   const tableColumns =  [{name:'sn', title:'SN'}, {name:'accountCode', title:'Account Code'}, {name:'accountName', title:'Account Name'}, {name:'loanAmount', title:'Principal Loan'}, {name:'interest', title:'Interest Amount'}, {name:'principalAndInterest', title:'Principal & Interest'},{name:'totalRepayment', title:'Total Repayment'}, {name:'loanBalance', title:'Loan Balance'}, {name:'loanStatus', title:'Loan Status'},{name:'pastDays', title:'Loan past days'}, {name:'daysToDueDate', title:'Days To Due Date'}, {name:'loanDetails', title:'Loan interest & tenor'}, 
        {name:'startDate', title:'Start Date'}, {name:'dueDate', title:'Due Date'}, {name:'lastRepayment', title:'Last Repayment'}, {name:'email', title:'Email'},{name:'lastReminder', title:'Last reminder'},];
  

       // getLoanDetails('KOSOFE-COOPERATIVE', 'LOANS', {targetDate:'2024-03-17'})
       // .then((res)=> console.log(res));
       // console.log(tableData)

    async function  getLoanActivities(){
        const url = "https://countixpress-server.gofamintpsogba.org/server.php?tableName=KOSOFECOOP_LOANACTIVITIES";
        const loanActivities = await getRequest(url).then((dt)=> {
            if(dt.ok && dt.coa.length){
                return dt.coa.reduce((accum, data)=>{
                    return {
                        ...accum,
                        [data.accountCode]:data
                    }
                },{})
            }else{return {}}
        });
        setLoanActivities(loanActivities);
    }   

    async function  getLoanDetailsFunction(acctType, accountCode){
        const targetDate = new Date().toISOString().split('T')[0];
        await getLoanDetails('KOSOFE-COOPERATIVE', acctType, {targetDate}) //SAVINGS - LOANS
           .then((res)=> {
            //console.log(res);

             const loanTabRep = res.map((dt, i)=>{
                const {report, reportParams, reportStatement} = dt;
                const loanDetails =  `${report.loanDetails.split('|')[1]}|${report.loanDetails.split('|')[2]}`
                const todayDate = new Date(reportParams.targetDate);
                todayDate.setDate(todayDate.getDate() - reportParams.pastDays);
                const startDate = todayDate.toISOString().split('T')[0];
                let lastReminder = "";
                if(loanActivities[reportParams.accountCode]){
                    lastReminder = loanActivities[reportParams.accountCode].lastLoanReminder;
                }
                const PAID = !parseInt(reportParams.closingBal);
                const int = parseInt(reportParams.interest)/100;
                const principalAndInt = (parseFloat(reportParams.principal) * (1+int));
                const totalRepaymt = principalAndInt - parseFloat(reportParams.closingBal.replaceAll(",", ""));

                const prosData = {
                sn: i+1,
                startDate,
                accountName: reportParams.acctName,
                accountCode: reportParams.accountCode,
                loanAmount: formatToCurrency(parseFloat(reportParams.principal), 2),
                loanBalance: reportParams.closingBal,
                loanDetails,
                dueDate: reportParams.dueDate,
                loanStatus: !PAID? 'Outstanding' : 'PAID',
                pastDays: PAID? "-" : reportParams.pastDays,
                daysToDueDate: PAID? "-" : reportParams.daysToDueDate,
                lastRepayment: reportParams.lastDepositAmount + " on "+ reportParams.lastDepositDate,
                email:reportParams.email,
                interest: formatToCurrency((parseFloat(reportParams.principal) * int), 2),
                principalAndInterest: formatToCurrency((parseFloat(reportParams.principal) * (1+int)), 2),
                totalRepayment: formatToCurrency(totalRepaymt, 2),
                lastReminder
                };
                const indvData = tableColumns.reduce((accum, col)=>{
                    return {
                        ...accum,
                        [col.name]: prosData[col.name],
                    }
                },{});
                return indvData
             });
             setTableData(loanTabRep)
           });
    }
    const handleEmailValue =(e)=>{
        setEmailValue(e.target.value);
        setInfoMsg({msg:'', show:false})
    }

    const postLoanActivity = async (user, selectedLedger)=>{
        const reminderDate = new Date();
        if(user?.form && selectedLedger?.accountName){
           if(!loanActivities[selectedLedger.accountCode]?.accountName){
             const description = 'Loan reminder forwarded to member by '+user.form.surname;
             const postData = {   
                tableName:"KOSOFECOOP_LOANACTIVITIES",
                insertQuery:"INSERT INTO KOSOFECOOP_LOANACTIVITIES (accountName, accountCode, lastLoanReminder, description) VALUES",
                rows:[
                    [selectedLedger.accountName, selectedLedger.accountCode, reminderDate.toString(), description]
                ] 
            }
            const url = "https://countixpress-server.gofamintpsogba.org/server.php";
            await postRequest(url, postData)
            .then(()=>{getLoanActivities()})
           }else{
                //Update lastReminder
                const updateData = {
                tableName: "KOSOFECOOP_LOANACTIVITIES",
                updateQuery : "UPDATE KOSOFECOOP_LOANACTIVITIES SET lastLoanReminder='"+reminderDate+"' WHERE accountCode='"+selectedLedger.accountCode+"'"
                 };
                const url = "https://countixpress-server.gofamintpsogba.org/server.php";
                await putRequest(url, updateData)
                .then(()=>{getLoanActivities()})
           }
        }
    
      }
    

    const emailLoanReminder = async ()=>{
        if(!emailValue) return  setInfoMsg({msg:'Please, provide the email pass', show:true})
        setInfoMsg({msg:'Please, wait...', show:true})
        const url = "https://countixpress-server.gofamintpsogba.org/server.php?tableName=KOSOFECOOP_SETTINGS";
        await getRequest(url).then((res)=> {
            if(res.ok){
                const email_reminder_pass = res.coa.find((dt)=>dt.slug === "email_reminder_pass");
                if(email_reminder_pass?.key1 === emailValue){
                    const {accountCode, email} = selectedLedger;
                    const targetDate = new Date().toISOString().split('T')[0];
                    const postData = {coySlug:'KOSOFE-COOPERATIVE', accountType:'LOANS', targetDate, email, accountCode};
                    postMail(postData);
                }else{
                    setInfoMsg({msg:'Declined! Wrong email pass', show:true})
                  } 
            }else{ setInfoMsg({msg:'Error getting email pass', show:true})}
        });
    }

    const postMail = async (postData) => {
        try {
        await postMailForm('/api/postMonthlyLoanReminder', postData).then((res)=>{
            setInfoMsg({msg:'Loan reminder message posted successfully', show:true})
         }).then(()=> {postLoanActivity(user, selectedLedger)});
        } catch (error) {
            setInfoMsg({msg:'Error in posting loan reminder', show:true})
        }
    };
    
    //console.log(selectedLedger)
    const handleOnClick =(selLedger, index) =>{
        setShowEmailCont(false);
        setEmailValue('');
        if(selLedger.email){
           if(!parseInt(selLedger.loanBalance)){
                const  msg = `${selLedger.accountName} has no outstanding loan!`;
                setInfoMsg({msg, show:true})
           }else{
            setInfoMsg({msg:'', show:false});
            setShowEmailCont(true);
            //selectedLedger.accountName && selectedLedger.email
         }
        }else{
            const  msg = `${selLedger.accountName} has no email`;
            setInfoMsg({msg, show:true})
        }
        setSelectedLedger(selLedger);
    };
    React.useEffect(()=>{
        getLoanActivities();
    },[]);

    React.useEffect(()=>{
        getLoanDetailsFunction('LOANS', 'C-00001');
    },[loanActivities]);

    //console.log(tableData);

    return (
        <div className='p-3 md:p-5'>
            
             {tableData?.length>0?
                <TableCustomise
                    columns={tableColumns}
                    data={tableData}
                    tableName={`Loan Table`}
                    isClickable
                    handleOnClick={handleOnClick}
                    //onClickClose={()=>setShowSelectedLedger(false)}  
                />
            :
             <div className='w-full justify-center items-center flex'>
                <Spinner
                    showSpinner
                    showMsg
                    msg="Getting loan data, please wait..."
                    contStyle=""
                    spinnerStyle=""
                    textStyle=""
                />
             </div>
            }
            <div className='p-3'>
                <HorizontalLine widths={100} margBot={10} margTop={20} bColor="#ccc"/>
            </div>
            <div className={`${showEmailCont? '' :'hidden'}`}>
                <p className={`mb-5 text-[blue]`}>Send Reminder email to {selectedLedger?.accountName}</p>
    
                <input type='email'
                    className='px-2 py-1 outline-none border border-blue-600' 
                    placeholder='Email Pass'
                    value={emailValue}
                    onChange={handleEmailValue}
                />
                <p className='bg-[teal] my-4 rounded-md text-white font-bold p-2 cursor-pointer w-fit active:bg-teal-500'
                                onClick={emailLoanReminder}>Email Statement
                </p>
                <p className='hidden bg-blue-800 my-4 rounded-md text-white font-bold p-2 cursor-pointer w-fit active:bg-blue-500'
                                onClick={()=>postLoanActivity(user, selectedLedger)}>Post Loan Activity
                </p>
            </div>
            <p className='mb-5 text-[maroon]'>{infoMsg.msg}</p>

            <div className='px-3 text-[13px]'>
                <p  className='font-bold text-blue-800'>Loan Reminder</p>
                <p>All members loan, both those that have been paid and those those outstanding are shown on the table above.</p>
                <p>For outstanding member loan, a gentle reminder message can be sent to their email</p>
                <p className='mt-2'><span className='font-bold text-teal-500'>Forward Reminder Message: </span></p>
                <p>To forward a reminder message to a member, click on a member name from the table above to pop up the email button.</p>
                <p>Note that a reminder message cannot be sent to those that have paid off their loan or those that do not have an email.</p>
                <p>To prevent incessant reminder messages to a member, please check the last date of the reminder message from the table before sending another</p>
                <p>Email pass must be provided before you can send the email</p>
            </div>
            
        </div>
  )
}

export default IndexLoans;