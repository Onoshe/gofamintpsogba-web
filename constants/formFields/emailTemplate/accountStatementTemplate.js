import { formatToCurrency } from "@/lib/currency";


function getAccountStatementTemplate(data, personalInfo, company, companyLogo) {
    const acctName = personalInfo['acctName']? personalInfo['acctName'] : "";
    const address = personalInfo['residentialAddress']? personalInfo['residentialAddress'] : "Address:";
    const acctNo = personalInfo['acctCode']? personalInfo['acctCode'] : "";
    const acctType = personalInfo['acctType']? personalInfo['acctType'] : "";;
    const monthTotal = personalInfo['monthTotal']? personalInfo['monthTotal'] : "0.00";
    const closingBal = personalInfo['closingBal']? personalInfo['closingBal'] : "0.00";
    const openingBal = personalInfo['openingBal']? personalInfo['openingBal'] : "0.00";
    const startDate = personalInfo['startDate']? personalInfo['startDate'] : "";
    const endDate = personalInfo['endDate']? personalInfo['endDate'] : "";
    const statementType = personalInfo['statementType']? personalInfo['statementType'] : "Savings";
    const formNo = personalInfo['formNumber']? personalInfo['formNumber'] : "";
    const accountNo = personalInfo['accountNo']? personalInfo['accountNo'] : "";
    const genDate = new Date().toString();
    //const imageUrl = convertImageUrlToBase64("https://cdn.sanity.io/images/prvpom28/counting_xpress_db/7412601199ad5a79fc7b7edea436df3b9ac81904-505x501.png");
    
    var message = `
        <!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>
        <!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>
        <html lang='en'>

        <head>
        <meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
        <title>Account Statement</title>

        <style>
        body {
            counter-reset: pageCount;
            font-family: Times New Roman, Times, serif;
        }
        #footer::before {
            counter-increment: pageCount;
            content: 'Page ' counter(pageCount);
        }
        
        @page {
            margin: 30px 30px 100px 30px;
        }
        #footer {
            position: fixed;
            left: -50px; 
            bottom: -105px; 
            right: -50px; 
            height: 85px;
            background-color: #fa9393;
            padding:10px 50px;
        }
        #trans-header{
            margin: 4px 0; 
            background-color:#2468a0;
            color:white
        }
        </style>
        </head>

        <body style='font-size: 14px; background-color:white; padding: 0.5em 1em 1em 1em; color:#24292e;'>
        <div id='footer'>
            <p style='text-align:center;  margin-top:-15px'>This is a confidential information that is meant solely for ${acctName}.</p>
            <p style='text-align:center; margin-top:-7px';>For complaints and equiries, please contact our office:</p>
            <p style='text-align:center; margin-top:-7px; font-weight:bold'>${company?.name}</p>
            <p style='text-align:center; margin-top:-13px; font-weight:bold'>${company?.address}</p>
        </div>
        <div>
            <div style='display: inline-block;'>
                <div style='color: red; font-size: 18px; font-weight: bold;'>${statementType} Account Statement</div>
                <div style='font-size: 14px; padding-top: 3px;'>Printed date: ${genDate}</div>
            </div>
            <div style='float: right;'>
                <img alt='logo' src='data:image/png;base64,${companyLogo?.file}' width='150' height='120' style='display:none;outline:none;border:none;text-decoration:none' />
            </div>
        </div>
        <div style='margin: 10px 0; font-size: 14px; padding: 10px; margin-top: 2em; border: 2px red solid; width:300px !important; height:90px; border-radius: 10px;'>
            <div style='font-weight: bold; padding-bottom:10px'>${acctName}</div>
            <div>Form No: ${formNo}</div>
            <div style='padding-top: 5px;'>${address}</div>
        </div>

        <div style='font-size: 14px; margin-top: 35px;'>
            <div>
                <div style='color: red; font-weight: bold; border-bottom: 2px red solid;'>
                    <span style='padding-left: 5px;'>Account details</span>
                </div>
            </div>
        </div>
        <div style='padding: 5px 0; margin-bottom: 50px; font-size: 14px;
            border-bottom: 2px red solid; text-align: justify;'>
            <div style='width: 55% !important; padding-left: 5px; display: inline-block; padding-top:15px;'>
                <div style='padding-bottom:5px'><span style='padding-right: 50px; font-weight: bold;'>Account Name:</span> <span style=''>${acctName}</span></div>
                <div style='padding-bottom:5px'><span style='padding-right: 40px; font-weight: bold;'>Account Number:</span><span style=''>${accountNo}</span></div>
                <div style='padding-bottom:5px'><span style='padding-right: 57px; font-weight: bold;'>Account Type:</span><span style=''>${acctType}</span></div>
                <div style='padding-bottom:5px'><span style='padding-right: 33px; font-weight: bold;'>Account Currency:</span><span style=''>NGN</span></div>
                
            </div>
            <div style='display: inline-block; padding-top:15px;'>
                <div style='padding-bottom:5px'><span style='padding-right: 70px; font-weight: bold;'>Opening balance:</span><span style=''>${openingBal}</span></div>
                <div style='padding-bottom:5px'><span style='padding-right: 95px; font-weight: bold;'>Withdrawal:</span><span style=''>0.00</span></div>
                <div style='padding-bottom:5px'><span style='padding-right: 30px; font-weight: bold;'>${statementType.toUpperCase()==='SAVINGS'? 'Savings this month' : 'Repayment this month'}:</span><span style=''>${monthTotal}</span></div>
                <div style='padding-bottom:5px'><span style='padding-right: 70px; font-weight: bold;'>Closing balance:</span><span style=''>${closingBal}</span></div>
            </div>
        </div>
        <div style='color: red; padding-left:5px; padding-right:5px; margin-bottom:20px; font-weight: bold; font-size: 12px; padding-left: 5px; position:relative; width:100% !important;'>    
            <div style='position:absolute; left:5px'>Transactions</div>
            <div style='position:absolute; right:30px'>Account Statement as at ${new Date(endDate).toDateString()}</div>
        </div>
        <div id='trans-header'>
            <div style='padding: 6px 0 6px 10px; font-weight: bold; font-size: 12px;'>
                <div style='width: 5%; display: inline-block;'>SN</div>
                <div style='width: 13%; display: inline-block'>Date</div>
                <div style='width: 43%; display: inline-block'>Transaction details</div>
                <div style='width: 10%; display: inline-block; padding-left:50px;'>Debit</div>
                <div style='width: 10%; display: inline-block;'>Credit</div>
                <div style='; display: inline-block'>Balance</div>
            </div>
        </div>`; 
        
        data.forEach(item => {
            const intValue = item['sn'];
            const isEven = parseInt(intValue) % 2 === 0;
            const col = isEven? 'aliceblue' : 'white';
            const amountDebit = item?.entryType === "DR"? formatToCurrency(parseFloat(item.amount), 2) : "";
            const amountCredit = item?.entryType === "DR"? "" : formatToCurrency(parseFloat(item.amount), 2);
            const balance = item?.balance? formatToCurrency(parseFloat(item.balance), 2) : 0;
            message += `
                <div style='padding: 6px 0 6px 10px; font-weight: bold; font-size: 11px; background-color:${col}'>
                    <div style='width: 5%; display: inline-block;'>${item['sn']}</div>
                    <div style='width: 13%; display: inline-block'>${item['transactionDate']}</div>
                    <div style='width: 43%; display: inline-block'>${item['description']}</div>
                    <div style='width: 10%; display: inline-block; padding-left:50px;'>${amountDebit}</div>
                    <div style='width: 10%; display: inline-block; '>${amountCredit}</div>
                    <div style='display: inline-block'>${balance}</div>
                </div>
            `;      
        });

        message += `
            </body>
            </html>
        `;

    return message;
};

export default getAccountStatementTemplate;