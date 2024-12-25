import { formatToCurrency } from "@/lib/currency";

const style1 = {halign:"left", cellPadding:{bottom:3, top:2, left:2}};
const style2 = {halign:"left", cellPadding:{bottom:3, top:2, left:2}, cellWidth: 100, overflow:'linebreak'};
const style3 = {halign:"left", cellPadding:{bottom:3, top:2, left:10}};
const styleBlank = {halign:'center', textColor:'white', cellPadding:{bottom:3, top:2, left:2}};


//    [{content: "Account Name", styles:style1}, {content: pdfData.accountName, styles:style1},


export const getAccountStatement =({name, reportName, reportDate, personalAcct, rows, clientData, accountType, currencySymbol})=>{
    const stmtRows = [];
    const openingBal = rows[0]?.description?.toLowerCase().includes('opening balance')? parseFloat(rows[0]?.amount) : 0;
    let totalDebits = 0;
    let totalCredits = 0;

    for (let i = 0; i < rows?.length; i++) {
        const row = rows[i];
        if(row.entryType === "DR"){
            if(row.description.toLowerCase() !== "opening balance")
            totalDebits += parseFloat(row.amount);
            const stmtRow = [
                {content: i+1, styles:style1},
                {content: row.transactionDate, styles:style1},
                {content: row.description, styles:style2},
                {content: formatToCurrency(parseFloat(row.amount)), styles:style3},
                {content: formatToCurrency(parseFloat(row.amount)), styles:styleBlank},
                {content: formatToCurrency(parseFloat(row.balance)), styles:style1},
                ];
            stmtRows.push(stmtRow);
        }else{
            if(row.description.toLowerCase() !== "opening balance")
            totalCredits += -parseFloat(Math.abs(row.amount));
            //const stmtRow = [i+1, row.transactionDate, row.description, row.reference, "-", parseFloat(row.amount), parseFloat(row.balance)];
            const stmtRow = [
                {content: i+1, styles:style1},
                {content: row.transactionDate, styles:style1},
                {content: row.description, styles:style2},
                {content: formatToCurrency(parseFloat(row.amount)), styles:styleBlank},
                {content: formatToCurrency(parseFloat(row.amount)), styles:style1},
                {content: formatToCurrency(parseFloat(row.balance)), styles:style1},
                ];
            stmtRows.push(stmtRow);
        }
    }
    stmtRows.push([], []) //Empty rows
    const closingBal = openingBal + totalDebits + totalCredits;

    var pdfData = {
        docName:"Sample Statement",
        accountName:personalAcct?.lastname+' '+personalAcct.firstname,
        formNo:personalAcct?.formNo,
        address:personalAcct?.residentialAddress,
        accountNo: personalAcct?.accountCode,
        accountType:reportName === "vendors"? "Savings" : "Loan",
        currency:"NGN",
        openingBalance: openingBal <0? '-'+currencySymbol+formatToCurrency(Math.abs(openingBal)) : currencySymbol+formatToCurrency(Math.abs(openingBal)),
        totalDebits:totalDebits<0?  '-'+currencySymbol+formatToCurrency(Math.abs(totalDebits)) : currencySymbol+formatToCurrency(Math.abs(totalDebits)),
        totalCredits: totalCredits <0? '-'+currencySymbol+formatToCurrency(Math.abs(totalCredits)) : currencySymbol+formatToCurrency(Math.abs(totalCredits)),
        closingBalance:closingBal < 0? '-'+currencySymbol+formatToCurrency(Math.abs(closingBal)) : currencySymbol+formatToCurrency(Math.abs(closingBal)),
        period:`From ${new Date(reportDate.startDate).toDateString()} to ${new Date(reportDate.endDate).toDateString()}`,
        email:personalAcct.email,
        company:clientData.companyName,
        companyEmail:clientData.email,
        companyContact:clientData.address,
        genDate:new Date().toString(),
        title:clientData.companyName,
        subject:clientData.companyName+' Statement',
        accountType:accountType==="customers"? "Loan" : "Savings",
        startDate:reportDate.startDate,
        endDate:reportDate.endDate,
        author:'Ozitech Studio',
        keywords:'ozitech, studio, technology, statement, account, pdf',
      };
      //console.log(pdfData, stmtRows, rows)
      return {pdfData, reportData:stmtRows}
}