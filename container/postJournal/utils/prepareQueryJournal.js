import { dateFmtISO } from "@/lib/date/dateFormats";
import { transFields, transTypes } from "@/container/postTransaction/components/utils/prepareQueryTwoEntry";
import { getLinkPostAndRetrieve } from "@/lib/apiRequest/urlLinks";


const transDetailsFields = [
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

const transDetailsTypes = [
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


export function prepareQueryJournalTrans({transSheetForm, user, postingFrom, chartOfAccounts}) {
    const url =  getLinkPostAndRetrieve(user.companyId);
    const {accountCode, amount, debitCredit, date, description, reference} = transSheetForm[0];

    let debitAcctChart, creditAcctChart;
    if(transSheetForm.length == 2){
       const debitAccount = transSheetForm.find((dt)=> dt.debitCredit == 1);
       const creditAccount = transSheetForm.find((dt)=> dt.debitCredit == 2); 
       debitAcctChart = chartOfAccounts.find((dt)=> dt.accountCode == debitAccount.accountCode);
       creditAcctChart = chartOfAccounts.find((dt)=> dt.accountCode == creditAccount.accountCode);
    }

    const transactions = [
        date,
        description,
        reference,
        transSheetForm.length,
        postingFrom,
        amount,
        debitAcctChart?.id || 0,
        creditAcctChart?.id || 0,

        user.userId,
        dateFmtISO(), 
        user.userId,
        dateFmtISO()
    ];
    
    let body = {
        act:"INSERT",
        table:user.companyId+"_transactions",
        fields:transFields,
        values:[transactions],
        types:transTypes
    }
    return {body, url}
}

export function prepareQueryJournalTransDetails({transSheetForm, chartOfAccounts, user, vendors, customers, insertedTrans}) {
    const url =  getLinkPostAndRetrieve(user.companyId);

    const transactionsDetails = [];
    const insertedTran = insertedTrans[0];
    const voucherType = "Journal"; 
     for (let i = 0; i < transSheetForm.length; i++) {
        const tranSheet = transSheetForm[i];
        const {accountCode, amount, debitCredit, subCode} = tranSheet;

        if(debitCredit == 1){
            const debitAcctChart = chartOfAccounts.find((dt)=> dt.accountCode == accountCode);
            let debitSubs = subCode?.includes("C")? customers : subCode?.includes("V")? vendors : [];
            const debitSubAcctChart = debitSubs.find((dt)=> dt.accountCode == subCode);
            const transDetailsFieldsDr = [
                insertedTran.id,
                "DR",
                "1",
                debitAcctChart?.id,
                debitSubAcctChart?.id? debitSubAcctChart?.id : "",
                debitSubAcctChart?.id? subCode?.includes("C")? "CUSTOMERS" : subCode?.includes("V")? "VENDORS" : "PRODUCT" : "COA",
                amount,
                tranSheet?.dueDate && tranSheet?.dueDateType === "REC"? tranSheet.dueDate : "",
                voucherType,
                user.userId,
                dateFmtISO(), 
                user.userId,
                dateFmtISO()
            ];
            transactionsDetails.push(transDetailsFieldsDr);
        }else if(debitCredit == 2){
            const creditAcctChart = chartOfAccounts.find((dt)=> dt.accountCode == accountCode);
            let creditSubs = subCode?.includes("C")? customers : subCode?.includes("V")? vendors : []; 
            const creditSubAcctChart = creditSubs.find((dt)=> dt.accountCode == subCode);
            const transDetailsFieldsCr = [
                insertedTran.id,
                "CR",
                "-1",
                creditAcctChart?.id,
                creditSubAcctChart?.id? creditSubAcctChart?.id : "",
                creditSubAcctChart?.id? subCode?.includes("C")? "CUSTOMERS" : subCode?.includes("V")? "VENDORS" : "PRODUCT" : "COA",
                amount,
                tranSheet?.dueDate && tranSheet?.dueDateType === "PAY"? tranSheet.dueDate : "",
                voucherType,
                user.userId,
                dateFmtISO(), 
                user.userId,
                dateFmtISO()
            ];
            transactionsDetails.push(transDetailsFieldsCr);
        }
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