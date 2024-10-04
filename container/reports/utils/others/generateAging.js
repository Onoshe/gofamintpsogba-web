const agingOrder = ["OVER_DAYS_180", "DAYS_90_180", "DAYS_60_90", "DAYS_30_60", "LESS_DAYS_30"];
const keys = ['ACCOUNTCODE', 'ACCOUNTNAME', 'GROUP', "LESS_DAYS_30", "DAYS_30_60", "DAYS_60_90", "DAYS_90_180", "OVER_DAYS_180", 'TOTAL'];
const keysTitle = ['Account Code', 'Account Name', 'Group', '0 - 30', '30 - 60', '60 - 90', '90 - 180', 'Over 180', 'TOTAL'];
const headerKeys = keys.map((key, i)=> {return {name:key, title:keysTitle[i]}});
import { getDaysBetweenDates } from "@/lib/date/getDaysBetweenDates";
import { reduceAgingBalance, updateAging } from "./agingCalculation";



export const getAgingReport = ({reportName,  transProcessor, dateForm})=>{

    const col1WchInDigit= 20;  //First column width in exported excel sheet  
    const pdfData = {
        reportRowKeys:keys,
        noFmtCols:[],
        headerFSize:[14],
        tableColsWch:[], //Empty is auto
        tableColsFSize:10,
        tablePlain:[],
        footerArr:[],
        tableHeaderFSize:10,
        //docHeader:headerPdf,
    }
    let result = {
        name:reportName, 
        title:'Customers Age Analysis', 
        rowKeysShow:keys, 
        rowHeaders:headerKeys, 
        rows:[], 
        col1WchInDigit, 
        pdfData
    }
    let ledgersAcct = transProcessor.processTransactions();
   
    
    switch (reportName) {
        case 'vendors-aging':
            result.title = "Vendors Age Analysis";
            const vedLedgers = ledgersAcct?.vendorsLedger;
            result.rows = generateAging(vedLedgers, "PAYABLES");
            break;   
    default: //customers-aging
        const cusLedgers = ledgersAcct?.customersLedger;
        result.rows = generateAging(cusLedgers, "RECEIVABLES");
        break;
    }
    
    return result
}




export const generateAging =(personalAcctsObj, acctType)=>{
    //const personalAccts = Object.values(personalAcctsObj); 
    
    //console.log(personalAcctsObj)
    const personalAcctsAging = [];
    for (const accountCode in personalAcctsObj) {
        const personalAcct = personalAcctsObj[accountCode];
        let aging = {
            "ACCOUNTNAME":"",
            "ACCOUNTCODE":"",
            "LESS_DAYS_30":0,
            "DAYS_30_60":0,
            "DAYS_60_90":0,
            "DAYS_90_180":0,
            "OVER_DAYS_180":0,
            "TOTAL":0,
        }
        aging.ACCOUNTCODE = accountCode;
        aging.ACCOUNTNAME = personalAcct.name;
        aging.GROUP = personalAcct.group;
        //console.log(personalAcct)
        for (let k = 0; k < personalAcct?.trans?.length; k++) {
            const tran = personalAcct?.trans[k];
            const {transactionDate, amount} = tran;
            //const tranDateVal = new Date(transactionDate).getTime();
            let daysDiff = getDaysBetweenDates(transactionDate);
            daysDiff = Math.max(daysDiff, 0);
            const amountVal = parseFloat(amount);
            
            if(acctType === "PAYABLES"){
                const amountValAbs = parseFloat(Math.abs(amountVal));
                if(amountVal < 0){    //Credit to account: 
                    aging =   updateAging(aging, daysDiff, amountValAbs)
                }else{  //Debit to account: 
                    aging = reduceAgingBalance(aging, amountValAbs, agingOrder)
                }
            }else{
                if(amountVal > 0){    //Debit to account: 
                    aging =   updateAging(aging, daysDiff, amountVal)
                }else{  //Credit to account: 
                    const amountValAbs = parseFloat(Math.abs(amountVal));
                    aging = reduceAgingBalance(aging, amountValAbs, agingOrder)
                }
            }
            
        }
        personalAcctsAging.push(aging);
        
    }

    //Compute total row
    const agingTotalRow = [...agingOrder, "TOTAL"].reduce((cum, el)=> {return {...cum, [el]:0}},{});
    
    agingTotalRow.ACCOUNTNAME = "TOTAL";
    for (let j = 0; j < personalAcctsAging.length; j++) {
        const acct = personalAcctsAging[j];
        for (const due in agingTotalRow) {
            if(!isNaN(acct[due])){
                agingTotalRow[due] += acct[due];
            }
        }    
    }
    personalAcctsAging.push({...agingTotalRow, classNameTD:"font-bold"});

    return personalAcctsAging

}