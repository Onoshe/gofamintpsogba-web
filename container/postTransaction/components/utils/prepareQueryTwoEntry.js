import { getLinkPostAndRetrieve } from "@/lib/apiRequest/urlLinks";
import { dateFmtISO } from "@/lib/date/dateFormats";


export const transFields = [
    "transactionDate",
    "description",
    "reference",
    "entriesCount",
    "postingPlat",
    "amount",
    "accountDr",
    "accountCr",
    //"inactive",
    //"deleted",
    "createdBy",
    "createdAt",
    "updatedBy",
    "updatedAt"
];

export const transTypes = [
    "VARCHAR",
    "VARCHAR",
    "VARCHAR",
    "INT",
    "VARCHAR",
    "DECIMAL",
    "VARCHAR",
    "VARCHAR",

    "VARCHAR",
    "VARCHAR",
    "VARCHAR",
    "VARCHAR"
];

export const transDetailsFields = [
    "transactionID",
    "entryType",
    "entryDimen",
    "accountCode",
    "accountCodeSub",
    "accountCodeSubAcct",
    "amount",
    "dueDate",
    //"quantity",
    //"unitPrice",
    "voucher",
    "createdBy",
    "createdAt",
    "updatedBy",
    "updatedAt",
]

export const transDetailsTypes = [
    "INT",
    "VARCHAR",
    "INT",
    "VARCHAR",
    "VARCHAR",
    "VARCHAR",
    "DECIMAL",
    "INT",

    "VARCHAR",
    "VARCHAR",
    "VARCHAR",
    "VARCHAR",
    "VARCHAR"
];

function getVoucher(typeCodeDr, typeCodeCr, tranSheet){
    const {debitAccount, creditAccount, debitSub, creditSub, date, description, reference, amount} = tranSheet;
    const bankCode = 131; 
    const cashCode = 132;
    const clearingCode = 133;
    const recCode = 141;
    const recCtrCode = 142;
    const payCode = 231;
    const payCtrCode = 232;
    

    if([bankCode, cashCode, clearingCode].includes(typeCodeDr)){
        return "Receipt"
    }
    if([bankCode, cashCode, clearingCode].includes(typeCodeCr)){
        return "Payment"
    }
    if([recCode, recCtrCode, payCode, payCtrCode].includes(typeCodeDr) && ![bankCode, cashCode, clearingCode].includes(typeCodeCr)){
        return "Debit Note"
    }
    if([recCode, recCtrCode, payCode, payCtrCode].includes(typeCodeCr) && ![bankCode, cashCode, clearingCode].includes(typeCodeDr)){
        return "Credit Note"
    }
    return "Journal"
}


export function prepareQueryTwoEntryTrans({transSheetForm, user, postingFrom, chartOfAccounts}) {
    const url =  getLinkPostAndRetrieve(user.companyId);
    const transactions = [];
    const transactionsDetails = [];
    
    for (let i = 0; i < transSheetForm.length; i++) {
        const tranSheet = transSheetForm[i];
        const {date, description, reference, debitAccount, creditAccount, amount} = tranSheet;
        const debitAcctChart = chartOfAccounts.find((dt)=> dt.accountCode == debitAccount);
        const creditAcctChart = chartOfAccounts.find((dt)=> dt.accountCode == creditAccount);
            
        const transVals = [
            date,
            description,
            reference,
            2,
            postingFrom,
            amount,
            debitAcctChart.id,
            creditAcctChart.id,

            user.userId,
            dateFmtISO(), 
            user.userId,
            dateFmtISO()
        ];
        transactions.push(transVals);
    };
    
    let body = {
        act:"INSERT",
        table:user.companyId+"_transactions",
        fields:transFields,
        values:transactions,
        types:transTypes
    }
    return {body, url}
}

    
export function prepareQueryTwoEntryTransDetails({transSheetForm, chartOfAccounts, user, vendors, customers, insertedTrans, jVoucher=''}) {
    const url =  getLinkPostAndRetrieve(user.companyId);


    const transactionsDetails = [];
    for (let i = 0; i < transSheetForm.length; i++) {
        const tranSheet = transSheetForm[i];
        const {debitAccount, creditAccount, debitSub, creditSub, date, description, reference, amount} = tranSheet;
        const insertedTran = insertedTrans[i];
        
        const debitAcctChart = chartOfAccounts.find((dt)=> dt.accountCode == debitAccount);
        const creditAcctChart = chartOfAccounts.find((dt)=> dt.accountCode == creditAccount);
        
        let debitSubs = debitSub?.includes("C")? customers : debitSub?.includes("V")? vendors : [];
        let creditSubs = creditSub?.includes("C")? customers : creditSub?.includes("V")? vendors : []; 
        
        const debitSubAcctChart = debitSubs.find((dt)=> dt.accountCode == debitSub);
        const creditSubAcctChart = creditSubs.find((dt)=> dt.accountCode == creditSub);
        const voucher = jVoucher === "JOURNAL"? "Journal" : getVoucher(parseInt(debitAcctChart.typeCode),parseInt(creditAcctChart.typeCode), tranSheet);

        const transDetailsFieldsDr = [
            insertedTran.id,
            "DR",
            "1",
            debitAcctChart?.id,
            debitSubAcctChart?.id? debitSubAcctChart?.id : "",
            debitSubAcctChart?.id? debitSub?.includes("C")? "CUSTOMERS" : debitSub?.includes("V")? "VENDORS" : "PRODUCT" : "COA",
            amount,
            tranSheet?.dueDate && tranSheet?.dueDateType === "REC"? parseInt(tranSheet.dueDate) : null,
            voucher,
            user.userId,
            dateFmtISO(), 
            user.userId,
            dateFmtISO()
        ];
        transactionsDetails.push(transDetailsFieldsDr);
        
        const transDetailsFieldsCr = [
            insertedTran.id,
            "CR",
            "-1",
            creditAcctChart?.id,
            creditSubAcctChart?.id? creditSubAcctChart?.id : "",
            creditSubAcctChart?.id? creditSub?.includes("C")? "CUSTOMERS" : creditSub?.includes("V")? "VENDORS" : "PRODUCT" : "COA",
            amount,
            tranSheet?.dueDate && tranSheet?.dueDateType === "PAY"? parseInt(tranSheet.dueDate) : null,
            voucher,
            user.userId,
            dateFmtISO(), 
            user.userId,
            dateFmtISO()
        ];
        transactionsDetails.push(transDetailsFieldsCr);
    };
    let body = {
        act:"INSERT",
        table:user.companyId+"_transactionsdetails",
        fields:transDetailsFields,
        values:transactionsDetails,
        types:transDetailsTypes
    }
    return {body, url}
}