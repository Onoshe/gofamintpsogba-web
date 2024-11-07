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
    "quantity",
    "doubleEntryId",
    "dueDate",
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
    "FLOAT",
    "VARCHAR",
    "INT",

    "VARCHAR",
    "VARCHAR",
    "VARCHAR",
    "VARCHAR",
    "VARCHAR"
];

function getVoucher(typeCode, entry){
    let voucher;

    const type = entry === "DR"? "Receipt" : "Payment";
    switch (parseInt(typeCode)) {
        case 131:
            voucher = type
            break;
            
        case 132:
            voucher = type
            break;
        default:
            voucher = ""
            break;
    }
    return voucher;
}


export function prepareQueryTrans({transSheet, user, chartOfAccounts, postingPlat}) {
    const url =  getLinkPostAndRetrieve();
    const transactionsArr = [];
    for (let i = 0; i < transSheet.length; i++) {
        const transSht = transSheet[i]; 
        let {
            date,
            amount,
            description,
            reference,
            accountCodeDr,
            accountCodeCr
        } =  transSht;

        const debitAcctChart = chartOfAccounts.find((dt)=> dt.accountCode == accountCodeDr);
        const creditAcctChart = chartOfAccounts.find((dt)=> dt.accountCode == accountCodeCr);

        const transactions = [
            date,
            description,
            reference,
            2,              //entries count
            postingPlat,
            amount,
            debitAcctChart.id,
            creditAcctChart.id,

            user.userId,
            dateFmtISO(), 
            user.userId,
            dateFmtISO()
        ];
        transactionsArr.push(transactions)
    }
    let body = {
        act:"INSERT",
        table:user.companyId+"_transactions",
        fields:transFields,
        values:transactionsArr,
        types:transTypes
    }
    return {body, url}
}

export function prepareQueryTransDetails({transSheetArr, chartOfAccounts, controlAcctsCode, user, vendors, customers, products, insertedTransArr, doubleEntryIdArr}) {
    const url =  getLinkPostAndRetrieve();
    const {receivables, payables, inventoryControl, inventoryAdj} = controlAcctsCode;
    
    const transactionsDetails = [];
    for (let i = 0; i < transSheetArr.length; i++) {
        const transSheet = transSheetArr[i];
    
        let {
            date,
            description,
            reference,
            accountCodeDr,
            accountCodeCr,
            subCodeDr,
            subCodeCr,
            quantityDr,
            quantityCr,
            amount,
            quantityProduct,
            } =  transSheet;

        const insertedTran = insertedTransArr[i];
        const doubleEntryId = doubleEntryIdArr[i]; //Error?
        
            const debitAcctChart = chartOfAccounts.find((dt)=> dt.accountCode == accountCodeDr);
            const creditAcctChart = chartOfAccounts.find((dt)=> dt.accountCode == accountCodeCr);
            
            //Get the personalAccount of subAccount
            let debitSubs = debitAcctChart.typeCode == receivables? 'customers' : debitAcctChart.typeCode == payables? 'vendors' : debitAcctChart.typeCode == inventoryControl? 'products' : 'nil';
            let creditSubs = creditAcctChart.typeCode == receivables? 'customers' : creditAcctChart.typeCode == payables? 'vendors' : creditAcctChart.typeCode == inventoryControl? 'products' : 'nil';
            
            const personalAcctType = {
                customers:{acct:customers, acctCode:'accountCode'},
                vendors:{acct:vendors, acctCode:'accountCode'},
                products:{acct:products, acctCode:'productCode'},
                nil:{acct:[], acctCode:'nil'}
            };

            //Get id of sub Account
            const debitSubAcctChart = personalAcctType[debitSubs].acct?.find((dt)=> dt[personalAcctType[debitSubs].acctCode] == subCodeDr);
            const creditSubAcctChart = personalAcctType[creditSubs].acct?.find((dt)=> dt[personalAcctType[creditSubs].acctCode] == subCodeCr);

            const qtyDr = parseInt(quantityDr)? quantityDr : parseInt(quantityProduct)? quantityProduct : "";
            const transDetailsFieldsDr = [
                insertedTran.id,
                "DR",
                "1",
                debitAcctChart?.id,
                debitSubAcctChart?.id? debitSubAcctChart?.id : "",
                debitSubAcctChart?.id? debitSubs.toUpperCase() : 'COA',
                amount,
                qtyDr,
                doubleEntryId,
                debitAcctChart?.dueDate && debitAcctChart?.dueDateType === "REC"? debitAcctChart.dueDate : "",

                "Payment",
                user.userId,
                dateFmtISO(), 
                user.userId,
                dateFmtISO()
            ];
            transactionsDetails.push(transDetailsFieldsDr);
            
            const qtyCr = parseInt(quantityCr)? quantityCr : parseInt(quantityProduct)? quantityProduct : "";
            const transDetailsFieldsCr = [
                insertedTran.id,
                "CR",
                "-1",
                creditAcctChart?.id,
                creditSubAcctChart?.id? creditSubAcctChart?.id : "",
                creditSubAcctChart?.id?  creditSubs.toUpperCase() : 'COA',
                amount,
                qtyCr,
                doubleEntryId,
                creditAcctChart?.dueDate && creditAcctChart?.dueDateType === "REC"? creditAcctChart.dueDate : "",

                "Payment",
                user.userId,
                dateFmtISO(), 
                user.userId,
                dateFmtISO()
            ];
            transactionsDetails.push(transDetailsFieldsCr);
    }
    let body = {
        act:"INSERT",
        table:user.companyId+"_transactionsdetails",
        fields:transDetailsFields,
        values:transactionsDetails,
        types:transDetailsTypes
    }
    return {body, url}
}