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
    "tranNoRef",
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
    const url =  getLinkPostAndRetrieve(user.companyId);
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
        
        //For Purchase return PRODUCT-PCH-RT, reverse is the case, ie, accountCodeDr in transSht is the creditedAcct, while accountCodeCr is the debitedAcct
        let accountDr = debitAcctChart.id; 
        let accountCr = creditAcctChart.id; 
        if(postingPlat === "PRODUCT-PCH-RT"){       
            accountDr = creditAcctChart.id;
            accountCr = debitAcctChart.id;
            //For PRODUCT-SAL-RT, swapping of accountDr and accountCr is not required. The User can select account to debit or credit from the platform
        }

        const transactions = [
            date,
            description,
            reference,
            2,              //entries count
            postingPlat,
            amount,
            accountDr,
            accountCr,

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

export function prepareQueryTransDetails({transSheetArr, chartOfAccounts, controlAcctsCode, user, vendors, customers, products, insertedTransArr, doubleEntryIdArr, postingPlat}) {
    const url =  getLinkPostAndRetrieve(user.companyId);
    const {receivables, payables, inventoryControl, inventoryAdj} = controlAcctsCode;
    
    const transactionsDetails = [];
    for (let i = 0; i < transSheetArr.length; i++) {
        const transSheet = transSheetArr[i];
        const isRtns = postingPlat === "PRODUCT-PCH-RT";
        let {
            date,
            description,
            reference,
            //accountCodeDr,
            //accountCodeCr,
            //subCodeDr,
            //subCodeCr,
            quantityDr,
            quantityCr,
            amount,
            quantityProduct,
            } =  transSheet;
            let accountCodeDr = transSheet.accountCodeDr;
            let subCodeDr = transSheet.subCodeDr;
            let accountCodeCr = transSheet.accountCodeCr;
            let subCodeCr = transSheet.subCodeCr;
            
            if(isRtns){
                accountCodeDr = transSheet.accountCodeCr;
                subCodeDr = transSheet.subCodeCr;
                accountCodeCr = transSheet.accountCodeDr;
                subCodeCr = transSheet.subCodeDr;
            }

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
            const qtyCr = parseInt(quantityCr)? quantityCr : parseInt(quantityProduct)? quantityProduct : "";
            const tranNoRef = transSheet?.tranNoRef;
            const transDetailsFieldsDr = [
                insertedTran.id,
                "DR",
                "1",
                debitAcctChart?.id,
                debitSubAcctChart?.id? debitSubAcctChart?.id : "",
                debitSubAcctChart?.id? debitSubs.toUpperCase() : 'COA',
                amount,
                isRtns? qtyCr : qtyDr,
                doubleEntryId,
                debitAcctChart?.dueDate && debitAcctChart?.dueDateType === "REC"? debitAcctChart.dueDate : "",

                "Payment",
                tranNoRef,
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
                creditSubAcctChart?.id?  creditSubs.toUpperCase() : 'COA',
                amount,
                isRtns? qtyDr : qtyCr,
                doubleEntryId,
                creditAcctChart?.dueDate && creditAcctChart?.dueDateType === "REC"? creditAcctChart.dueDate : "",

                "Payment",
                tranNoRef,
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