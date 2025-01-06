'use client'
import React,{ useState} from "react";
import EmailBodyBuilder from "./components/EmailBodyBuilder";
import StatementBuilder from "./components/StatementBuilder";
//import { getLoanDetails } from '@/pagesContainer/company/reports/components/modules_Clients/getLoanDetails';
//import { generateAndEmailStatementFromPhpServer, getStatementParams, generateAndEmailStatementFromPhpServerWithCustomeEmailBody } from '@/pagesContainer/company/reports/components/modules_Clients/phpServerModules/phpServerCalls';
//import { validateEmail } from '@/lib/validate/validateEmail';
import composeClientEmail from "@/constants/formFields/emailTemplate/composeClientEmail";
import { getAccountStatement } from "@/container/reports/utils/ledgers/getAccountStatement";
import { handleExportStatement } from "@/container/reports/utils/others/handleExportStatement";
import { handlePostMail } from "../sendMail/handlePostMail";
import jsPDF from 'jspdf';
import getAccountStatementTemplate from "@/constants/formFields/emailTemplate/accountStatementTemplate";
import { formatToCurrency } from "@/lib/currency";

var defMessage = `
  <p>I hope this email finds you well.</p><p>Please find attached your latest account statement for your review. If you have any questions or need further clarification about your account or the details in the statement, please don't hesitate to contact us.</p>
  <p>We sincerely appreciate your continued support and trust in our services.</p>
`;
const IndexSendStatement = ({showPreview, handleClosePreview, transProcessor, reportDate, setReportDate, customers, 
  vendors, clientData, currencySymbol, companyLogoFile, companyDetails, user, notify, coyLogoUrl, customersLedgerArr, vendorsLedgerArr,
  statementDate, setStatementDate}) => {
    const [selectedLedger, setSelectedLedger] = React.useState({});
    const [emailValueInfo, setEmailValueInfo] = React.useState({show:false, msg:""});
    const [content, setContent] = useState(defMessage);
    const [emailContent, setEmailContent] = useState({holder:'', title:'', body:'', email:'', senderTeam:'Mangement'});
    //const emailTemplate = composeClientEmail(emailContent.holder, emailContent.title, emailContent.body, emailContent.email, emailContent.senderTeam, companyDetails, companyLogo);
    const emailTemplate = composeClientEmail(emailContent.holder, emailContent.title, emailContent.body, emailContent.email, emailContent.senderTeam, companyDetails, companyLogoFile);
    const [emailResponse, setEmailResponse] = useState({style:'', msg:''});
    const [b64LogoPath, setB64LogoPath] = React.useState('');
    //const [statementDate, setStatementDate] = React.useState('');
    const [checkedLedger, setCheckedLedger] = React.useState('VENDORS');
    const [sendingMail, setSendingMail] = useState(false);
    
    React.useEffect(()=>{
       if(statementDate){
        const title = selectedLedger?.accountType === "VENDORS"? "Savings Account Statement as at "+new Date(statementDate || '').toDateString() : "Loan Account Statement as at "+new Date(statementDate || '').toDateString();
        setEmailContent({...emailContent, title});
       }
    },[statementDate]);

    const handleStatementDate=(e)=>{
        let endDate = e.target.value;
        const startDateDef = "2022-01-01";
        setStatementDate(endDate);
        let dateForm = {startDate:'2022-01-01', endDate};
        if(new Date(endDate).getTime() < new Date(startDateDef)){
          dateForm = {startDate:endDate, endDate};
        }
        setReportDate(dateForm)
    }

    const reportName = checkedLedger === "VENDORS"? "vendors" : "customers";
    const selectedLedgerCode = selectedLedger?.accountCodeSub;
    let personalAcct = {};
    let transObj = {};
        if(selectedLedgerCode){
          let personalAccts = null;
          if(reportName === 'customers'){
            personalAccts = customers;
          }else if(reportName === 'vendors'){
            personalAccts = vendors;
          }
          const rowsCus = transProcessor.getPersonalAccounts(reportName+'Ledger', reportDate)[selectedLedgerCode]?.trans || [];
          transObj = {rows:rowsCus}; 

         personalAcct = personalAccts?.find(dt=> dt.accountCode == selectedLedgerCode);
    }
    let statementTrans = transObj?.rows || [];
    statementTrans = statementTrans?.map((dt, i)=> {return {...dt, sn:i+1}});
    let creditsThisMn = 0;
    let debitsThisMn = 0; 
    if(selectedLedger?.accountCodeSub){
      const stmtYr = new Date(statementDate).getFullYear();
      const stmtMonth = new Date(statementDate).getMonth();
       const trans = selectedLedger?.trans || [];
       trans.forEach(tran => {
          const tranYr = new Date(tran.transactionDate).getFullYear();
          const tranMn = new Date(tran.transactionDate).getMonth();
          if(stmtYr == tranYr && stmtMonth == tranMn){
             if(tran.entryType === "DR"){
                debitsThisMn += parseFloat(tran.amount);
             }else{creditsThisMn += parseFloat(tran.amount);}
          }
       });
    }
    // console.log(statementTrans);

    const handleViewStatement = async (act)=>{
          if(personalAcct && transObj){
            const {pdfData, reportData} = getAccountStatement({name:reportName, personalAcct, rows:transObj?.rows, reportDate, clientData, accountType:reportName, currencySymbol});
          return await handleExportStatement({imgObj:companyLogoFile, pdfData, data:reportData, docMethod:act}); //'PRINT'
        }
      };
      //console.log(selectedLedger, personalAcct);
    const postStatementHandler = async ()=>{
        if(statementDate){
            const personalInfo = {
            "acctName": personalAcct['firstname']+' '+personalAcct['lastname'],
            "residentialAddress": personalAcct['residentialAddress'],
            "acctCode": personalAcct['accountCode'],
            "acctType": reportName === 'customers'? "Loan" : "Savings",
            "monthTotal": creditsThisMn? formatToCurrency(creditsThisMn) : "0.00",
            "closingBal": formatToCurrency(selectedLedger?.closingBal, 2),
            "openingBal": formatToCurrency(selectedLedger?.openingBal,2),
            "startDate": reportDate?.startDate,
            "endDate": reportDate?.endDate,
            "formNumber": personalAcct?.formNo,
            "accountNo": personalAcct?.accountCode,
            "statementType":reportName === 'customers'? "Loan" : "Savings",
            "genDate": new Date().toString(),
            };
        
            const pdfData = getAccountStatementTemplate(statementTrans, personalInfo, companyDetails, companyLogoFile, coyLogoUrl);
            //console.log(coyLogoUrl);

            setSendingMail(true);
            //const pdfData =  await handleViewStatement('STRING');
            //console.log(pdfData);
            //return;
            //const pdfData = "<p>Hello There. Good job</p>";
            const fileName = "Account_Statement"; 

            await handlePostMail({emailContent, companyDetails, companyLogo:coyLogoUrl, user, pdfData, fileName, notify})
            .then(res=> {
              setSendingMail(false)
              if(res.ok) {
                notify('success', 'Mail sent successfully');
                setEmailResponse({style:'text-[green]', msg:'Congratulations! Your mail was sent successfully'});
                setEmailContent({holder:'', title:'', body:'', email:'', copyMail:'', senderTeam:''});
                setContent("");
              }else{
                setEmailResponse({style:'text-[red]', msg:'Message sent failed!. Please, try again'});
              }
            });
        }else{
          notify('error', 'Please, set the Statement date!');
        }
      }
      
    return (
        <div className='pb-10'>
            <StatementBuilder
                postStatementHandler={postStatementHandler}
                setSelectedLedger={setSelectedLedger}
                selectedLedger={selectedLedger}
                emailValueInfo={emailValueInfo}
                setEmailValueInfo={setEmailValueInfo}
                b64LogoPath={b64LogoPath}
                setB64LogoPath={setB64LogoPath}
                statementDate={statementDate}
                handleStatementDate={handleStatementDate}
                transProcessor={transProcessor}
                reportDate={reportDate}
                setReportDate={setReportDate}
                checkedLedger={checkedLedger}
                setCheckedLedger={setCheckedLedger}
                handleViewStatement={handleViewStatement}
                emailContent={emailContent}
                setEmailContent={setEmailContent}
                customersLedgerArr={customersLedgerArr}
                vendorsLedgerArr={vendorsLedgerArr}
            />
            <EmailBodyBuilder
                content={content}
                setContent={setContent}
                emailContent={emailContent}
                setEmailContent={setEmailContent}
                emailTemplate={emailTemplate}
                handlePostMail={postStatementHandler}
                emailResponse={emailResponse}
                setEmailResponse={setEmailResponse}
                showPreview={showPreview} 
                handleClosePreview={handleClosePreview}
                sendingMail={sendingMail}
            />
            
        </div>
  )
}

export default IndexSendStatement;

//I am pleased to enclose your savings statement for the period. This statement provides a summary of your savings activity, including deposits, withdrawals, and interest earned during this period.
//Please review the statement carefully and contact us if you have any questions or concerns. We are always available to assist you with your savings needs.
//Thank you for choosing Kosofe Cooperative as your trusted savings partner.