

//import generateTitheStatementTemplate from "../titheTemplates/generateTitheStatementTemplate";

import postStatementTemplate from "@/constants/formFields/emailTemplate/postStatementSingle";
import { getPdfServer } from "../apiRequest/urlLinks";
import basicTemplate from "../templates/notification/basicTemplate";

const postUrl = getPdfServer('qr_kosofe');
const authTokenPhp = process.env.NEXT_PUBLIC_DBTOKEN;


const generateStatementFromPhpServer = async (pdfData) =>{
   const getPdf = {
    act: "FETCHPDF",
    pdfData,
    }
    const emailPdf = {
      act: "EMAILPDF",
      pdfData,
      toEmail:"ozitechstudio@gmail.com",
      senderName:"The Profitable Way (Kosofe) Cooperative",
      subject:"Email Subject",
      fileName:"Offering Report", //Set it as null if you want to send mail without attachment
      mailBody:postStatementTemplate("Mr Adebayo", "Account Statement for the year ended 31 December, 2024"),
      plainText:"I hope this email finds you well. Please find attached your latest account statement for your review. If you have any questions or need further clarification about your account or the details in the statement, please don't hesitate to contact us. We sincerely appreciate your continued support and trust in our services.",  
    }
   return fetch(postUrl, {     
          method: "POST",
          body: JSON.stringify(getPdf),
          headers: {
              "Authorization": `Bearer ${authTokenPhp}`,
              "Content-type": "application/json; charset=UTF-8"
          }
      })
        .then(response => response.blob())
        .then(blob => {
         const url = URL.createObjectURL(blob);
         window.open(url); // This will open the PDF in a new tab
         })
        .then(()=> {return {ok:true}})
      .catch(error => console.error('Error fetching PDF:', error));
}

const generateAndEmailStatementFromPhpServer = async (params, mailOpts) =>{    
    try{
        const mailFrom = `"The Profitable Way (Kosofe) Cooperative" <${'feedback@kosofe-cooperative.gofamintpsogba.org'}>`;
        const {text, html} = createPostStatementSingle(params.ledgerName, `${params.stmtType} Statement for ${params.ledgerName} from ${params.startDate} to ${params.endDate}`);
        const bcc = "no-reply@gofamintpsogba.org";
        const mailSubject = `The Profitable Way (Kosofe) Cooperative : Statement of ${params.stmtType} for ${params.ledgerName}`;
        //console.log(text, html);

      const response = await fetch(postUrl, {     
            method: "POST",
            body: JSON.stringify({
                act: "EMAILPDF",
                email:mailOpts.email,
                mailSubject,
                mailDataHtml:html,
                mailDataText:text,
                pdfData:accountStatementTemplate(params) //As Attachment
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        if (!response.ok) {
          //throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
    }catch (error) {
      console.error('Error fetching PDF:', error);
    }
 }

function getStatementParams(res, logoPath){
    const {reportData, stmtType, ledgerName, startDate, endDate, openingBal, closingBal, endMonth, monthTotal} = res?.reportStatement;
    const {accountCode, residentialAddress, formNumber} = res?.reportParams;
    const formNoLen = parseInt(formNumber).toString().length;
    const formNum = formNoLen === 1? `0000${formNumber}` : formNoLen === 2? `000${formNumber}` : formNoLen === 3? `00${formNumber}` : formNoLen === 4? `0${formNumber}` : formNumber;
    const genDate = new Date().toString();

    const stmtData = reportData?.reduce((accum, dt, i)=>{
        const {sn, date, details, amount, bal} = dt;
        const bgCol = i%2? 'aliceblue': 'white';
        let row = `<div style="padding: 6px 0 6px 10px; font-weight: bold; font-size: 12px; background-color:${bgCol};">
                    <div style='width: 5%; display: inline-block;'>${sn}</div>
                    <div style='width: 13%; display: inline-block'>${date}</div>
                    <div style='width: 50%; display: inline-block'>${details}</div>
                    <div style='width: 13%; display: inline-block; padding-left:20px;'>${amount}</div>
                    <div style='width: 13%; display: inline-block'>${bal}</div>
                  </div>`;

        return accum += row;
    },'');
    return {stmtType, ledgerName, startDate, endDate, openingBal, closingBal, endMonth, monthTotal, accountCode, residentialAddress, 
            formNumber:formNum, stmtData, genDate, imgPath:logoPath}
}

export {generateStatementFromPhpServer, getStatementParams, generateAndEmailStatementFromPhpServer}