'use client'
import React from 'react';
import SendMonthlyStatementBody from './components/SendMonthlyStatementBody';
import { postRequest } from '@/lib/apiRequest/postRequest';
import { getRequest } from '@/lib/apiRequest/getRequest';
import { getLinkFetchTableWithConds } from '@/lib/apiRequest/urlLinks';
import getAccountStatementTemplate from '@/constants/formFields/emailTemplate/accountStatementTemplate';
import { handlePostMail } from '../sendMail/handlePostMail';
import { formatToCurrency } from '@/lib/currency';
import { activities, postActivity } from '@/lib/apiRequest/postActivity';

//"Accept": "*/*",
//"User-Agent": "Thunder Client (https://www.thunderclient.com)",
let headersList = {
    "Content-Type": "application/json"
   }


   
export const IndexSendMonthlyStatement = ({user, customers, vendors, customersLedgerArr, vendorsLedgerArr, companyLogoFile, companyDetails, notify}) => {
    //const {user,} = useStoreCompany((state) => state);
    const [apibody, setApibody] = React.useState({accountType:'', targetDate:'', email:'', sendTo:'', bcc:'', coySlug:"KOSOFE-COOPERATIVE" });
    const [checked, setChecked] = React.useState("DATE");
    const [error, setError] = React.useState("");
    const [postAccess, setPostAccess] = React.useState("");
    const domain = user?.companyId?.toLowerCase();
    const [sendingMail, setSendingMail] = React.useState(false);
    const [mailSentTo, setMailSentTo] = React.useState([]);

    const handleOnChange =(e)=>{
        const {name, value} = e.target;
        setApibody({...apibody, [name]:value});
        setError('')
    }
    const handlePostAccess =(e)=>{
        const {name, value} = e.target;
        setPostAccess(value);
        setError('')
    }
    const handleTargetDate =(act)=>{
        setChecked(act);
        if(act ==="DATE"){
            setApibody({...apibody, targetDate:''})
        }else{
            setApibody({...apibody, targetDate:'LASTMONTHEND'})
        }
        setError('')
    }
    const time = {STARTTIME:'', ENDTIME:''};
    const getTime =(act)=>{
        if(act === 'STARTTIME'){
            time.STARTTIME = new Date().toISOString();
            return new Date().toString().split('G')[0];
        }
        if(act === 'ENDTIME'){
            time.ENDTIME = new Date().toISOString();
            return new Date().toString().split('G')[0];
        }
        if(act === 'DIFF'){
            time.ENDTIME = new Date().toISOString();
            const sTime = new Date(time.STARTTIME);
            const eTime = new Date(time.ENDTIME);
            return (eTime - sTime) / 1000;
        }
    }


    const handlePost = async ()=>{
        if(!apibody.accountType || !apibody.targetDate || !apibody.email || !apibody.sendTo){
           return setError("Please, set the required fields!");  
        }
        if(!["MEMBERS", "PROVIDED-EMAIL"].includes(apibody.sendTo.trim())){
        //    console.log(apibody.sendTo)
          //  return setError("SendTo is either of the two: MEMBERS or PROVIDED-EMAIL");
        }
        apibody.accountType = apibody.accountType.trim();
        apibody.email = apibody.email.trim();
        apibody.sendTo = apibody.sendTo.trim();

        if(!["LOANS", "SAVINGS"].includes(apibody.accountType)){
            return setError("Account type must be either LOANS or SAVINGS!");  
        }
        if(apibody.sendTo !== "MEMBERS" && apibody.sendTo !== "PROVIDED-EMAIL"){
            return setError("SendTo is either of the two: MEMBERS or PROVIDED-EMAIL");
        }       
        if(!postAccess){return setError("Please enter post access!");}
        
        const personalLedgers = apibody.accountType === "SAVINGS"? vendorsLedgerArr : customersLedgerArr
        const personalAccts = apibody.accountType === "SAVINGS"? vendors : customers;
        const reportName = apibody.accountType === "SAVINGS"? 'vendors' : 'customers';
        
    
        const slug = "monthly-statement-accessCode,"+postAccess;
        const url = getLinkFetchTableWithConds({table:domain+'_settings', conds:'slug,smallText', values:slug, useOnline:true});

        const verificationRes = await getRequest(url);
        if(verificationRes?.ok && verificationRes?.data?.length){
            setError(`Sending messages at ${getTime('STARTTIME')}, please wait...`);
            //setSendingMail(true);
            let lastItem = false;
            let sentMail = [];
            for (let index = 0; index < personalLedgers.length; index++) {
                const ledger = personalLedgers[index];
                const personalAcct =  personalAccts?.find((acct)=> acct.accountCode === ledger.accountCodeSub);
                let statementTrans = ledger?.trans;
                statementTrans = statementTrans?.map((dt, i)=> {return {...dt, sn:i+1}});
                const emailDef = apibody?.email? apibody.email : 'ozitechstudio@gmail.com';
                const emailContent = {
                    holder: personalAcct['firstname']+' '+personalAcct['lastname'], 
                    title:reportName === 'customers'? "Loan Account Statement as at "+new Date(apibody.targetDate).toDateString() : "Savings Account Statement as at "+new Date(apibody.targetDate).toDateString(), 
                    body:`
                            <p>I hope this email finds you well.</p>
                            <p>Please find attached your latest account statement for your review. If you have any questions or need further clarification about your account or the details in the statement, please don't hesitate to contact us.</p>
                            <p>We sincerely appreciate your continued support and trust in our services.</p>
                            `, 
                    email: apibody.sendTo === "MEMBERS"? personalAcct?.email: emailDef, 
                    copyMail:'', 
                    bcc: apibody.sendTo === "MEMBERS"? apibody?.bcc : "",
                    senderTeam:'Mangement'
                };
                setError(`Sending ${(index+1)+"/"+personalLedgers.length}: ${personalAcct['firstname']+' '+personalAcct['lastname']} Statement to ${emailContent.email}`);
                if(parseFloat(Math.abs(ledger.closingBal)) && personalAcct?.email){
                    const newMail = `${index+1}. ${personalAcct['firstname']}_${personalAcct['lastname']}_${emailContent.email}`;
                    sentMail.push(newMail);
                    setMailSentTo(sentMail);
                    await postStatements({personalAcct, reportName, statementTrans, companyDetails, companyLogoFile,
                        user, notify, emailContent, ledger})
                    .then(()=>{
                        if(personalLedgers.length == index +1){
                            lastItem = true;
                            mailSentSuccessful();
                        }
                    })
                }
                  
            }
            function mailSentSuccessful() {
                notify('success', 'Mail sent successfully');
                setError(`Congratulations! Messages were sent successfully. Duration: ${getTime('DIFF')}s`);
                setSendingMail(false);
                setApibody({accountType:'', targetDate:'', email:'', sendTo:'', bcc:'', coySlug:"KOSOFE-COOPERATIVE" });
                setPostAccess("");
                postActivity(user, activities.MAILSENT, apibody.accountType+" Statement sent to members");
            }
            //postActivity(user);    
        }else{
            return setError("Wrong access provided");
        }
        
    };
    
    const postStatements = async ({personalAcct, reportName, statementTrans, companyDetails, companyLogoFile,
         user, notify, emailContent, ledger}) => {
        try {            
            const bodyContent = JSON.stringify({
                "accountType": apibody.accountType.trim(),
                "targetDate": apibody.targetDate, // === "LASTMONTHEND" ? "LASTMONTHEND" : {"targetDate": apibody.targetDate},
                "email": apibody.email.trim(),
                "sendTo": apibody.sendTo.trim()
            });
                let statementTransFmt = statementTrans;
                statementTransFmt = statementTransFmt?.map((dt, i)=> {return {...dt, sn:i+1}});
                let creditsThisMn = 0;
                let debitsThisMn = 0; 
                if(ledger?.accountCodeSub){
                    const stmtYr = new Date(apibody.targetDate).getFullYear();
                    const stmtMonth = new Date(apibody.targetDate).getMonth();
                    const trans = statementTransFmt;
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
            const reportDate = {startDate:'2022-01-01', endDate:apibody.targetDate};
            const personalInfo = {
                "acctName": personalAcct['firstname']+' '+personalAcct['lastname'],
                "residentialAddress": personalAcct['residentialAddress'],
                "acctCode": personalAcct['accountCode'],
                "acctType": reportName === 'customers'? "Loan" : "Savings",
                "monthTotal": creditsThisMn? formatToCurrency(creditsThisMn) : "0.00",
                "closingBal": formatToCurrency(ledger?.closingBal, 2),
                "openingBal": formatToCurrency(ledger?.openingBal,2),
                "startDate": reportDate?.startDate,
                "endDate": reportDate?.endDate,
                "formNumber": personalAcct?.formNo,
                "accountNo": personalAcct?.accountCode,
                "statementType":reportName === 'customers'? "Loan" : "Savings",
                "genDate": new Date().toString(),
                };
            
                const pdfData = getAccountStatementTemplate(statementTrans, personalInfo, companyDetails, companyLogoFile);
                const fileName = reportName==="customers"? "Loan_Account_Statement" : "Savings_Account_Statement";  
                const coyDomain = user?.companyId?.toUpperCase();
                const companyLogo = `https://quickrecords.gofamintpsogba.org/image_server.php?image=${coyDomain}@LOGO&isLogo=TRUE`;
                await handlePostMail({emailContent, companyDetails, companyLogo, user, pdfData, fileName, notify})
    
        } catch (error) {
            setError('Message send failed! Please, try again.');
            console.error('Error:', error);
        }
    };    


  return (
    <div className='pb-10'>
        <SendMonthlyStatementBody
            apibody={apibody}
            handleOnChange={handleOnChange}
            handlePost={handlePost}
            handleTargetDate={handleTargetDate}
            error={error}
            handlePostAccess={handlePostAccess}
            postAccess={postAccess}
            checked={checked}
            sendingMail={sendingMail}
            mailSentTo={mailSentTo}
            handleResetList={()=>setMailSentTo([])}
        />
    </div>
  )
}

export default IndexSendMonthlyStatement;
