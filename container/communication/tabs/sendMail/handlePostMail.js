import composeClientEmail from "@/constants/formFields/emailTemplate/composeClientEmail";
import { postEmailRequest } from "@/lib/apiRequest/postRequest";
import { truncateString } from "@/lib/string/truncateString";



export const handlePostMail = async ({emailContent, companyDetails, companyLogo, user, 
  notify, pdfData, fileName}) => {

    if(!emailContent.holder || !emailContent.title || !emailContent.email || !emailContent.senderTeam || !emailContent.body){
        const emptyFld =  !emailContent.holder?  "Recipient name" : !emailContent.title? "Mail Subject" :  !emailContent.email? "Recipient email" : !emailContent.senderTeam? "Sender team"  : "Mail Body";
        return  notify('error', 'Please, enter '+emptyFld+' before sending!');
    }

    const html = composeClientEmail(emailContent.holder, emailContent.title, emailContent.body, emailContent.email, emailContent.senderTeam, companyDetails, companyLogo);
      const senderName = truncateString(companyDetails?.name || user?.companyId?.toUpperCase(), 45);

        const postBody = {
          act: "EMAILPDF",
          pdfData:pdfData? pdfData : "",
          toEmail:emailContent.email,
          senderName:senderName,
          subject:emailContent.title,
          //fileName:"", //Set it as null if you want to send mail without attachment
          mailBody:`${html}`,
          plainText:"We are preparing to send your statement"
        };
        if(fileName){ //For attachment
          postBody['fileName'] = fileName;
        }
        if(emailContent?.copyMail){
          postBody['cc'] = emailContent?.copyMail;
        }
        if(emailContent?.bcc){
          postBody['bcc'] = emailContent?.bcc;
        }
       return postEmailRequest(user, postBody)
              .catch(error => console.error('Error fetching PDF:', error))
    };