import { getShortDate } from "@/lib/date/shortLongDate";
import { sortArrayByKey } from "@/lib/sort/sortArrayByKey";

const keysTransListing = ['view', 'transactionDate', 'transactionNo', 'description', 'debitAccount', 'creditAccount', 'voucher', 'reference', 'postingPlat', 'amount'];



export function getTransactionsListing({transProcessor, viewTransId, keysTranDetails, reportName, pdfData, getHeadersTitle, dateForm, transactionsDetails, moreDocHeader, user}){
    let transListRows = []; //transProcessor.getTransactionsListing(dateForm);
    //console.log(transListRows)
    let result = {};
    if(viewTransId){
        pdfData.reportRowKeys = keysTranDetails;
        pdfData.noFmtCols = [3];
        pdfData.tableColsWch = 'auto';
        const transEntries = transactionsDetails.filter((dt)=> dt.transId == viewTransId);
        //console.log(transEntries)
        const debitTrans = []; 
        const creditTrans = []; 
        let totals = {debit:0, credit:0};
        if(transEntries?.length){sortArrayByKey(transEntries, "doubleEntryId")};
        for (let tran of transEntries) {
            if(tran.entryType === "DR"){
                
                /*For transactions with sub account; Display tranMain, then tranSub
                  Dr  162000 Inventory Control
                      TOD0001 Top Detergent           45,0000
                  Cr  221000 Account Payables          45,000
                */
                if(tran?.accountCodeSub){
                    const tranMain = {...tran, accountName:tran.accountName+":", debit:"", amount:"",};
                    const tranSub = {...tran, accountCode:tran.accountCodeSub, accountName:tran.accountCodeSubName};
                    debitTrans.push(tranMain);
                    debitTrans.push(tranSub);
                }else{
                    debitTrans.push(tran);
                }
                debitTrans.push({});    
                totals.debit += parseFloat(tran.amount);
            }else{
                if(tran?.accountCodeSub){
                    const tranMain = {...tran, accountName:tran.accountName+":", credit:"",  amount:"",};
                    const tranSub = {...tran, accountCode:tran.accountCodeSub, accountName:tran.accountCodeSubName};
                    debitTrans.push(tranMain);
                    debitTrans.push(tranSub);
                }else{
                    debitTrans.push(tran);
                }
                debitTrans.push({});    
                totals.credit += parseFloat(Math.abs(tran.amount));
            }
        }


        const emptyRow = {};
        //Join acountCode and accountName together.
        transListRows = [...debitTrans, emptyRow, emptyRow, ...creditTrans].map((dt)=> {
            const particulars = dt?.description? dt.accountCode + " "+dt.accountName : '';
            return dt.entryType === "DR"? {...dt, particulars, debit:dt?.amount} : {...dt, particulars, credit:dt?.amount?.toString()?.replace("-","")}
        });
        transListRows.push(emptyRow);
        transListRows.push({particulars:"Being: "+debitTrans[0]?.description});
        transListRows.push({particulars:'Total', debit:totals.debit, credit:totals.credit, classNameTD:'font-bold'});
        transListRows.push(emptyRow);
        transListRows.push(emptyRow);
        transListRows.push(emptyRow);
        transListRows.push({particulars:'Prepared by: '+user?.firstname+" "+user?.lastname, debit:"Authorised by:"});

        const tran = debitTrans[0];
        const dateStr  = getShortDate(tran?.transactionDate);
        const subTitle = "Transaction date: "+dateStr?.short+"                                   Reference: "+ tran?.reference;
        moreDocHeader = [[""], [subTitle]];
        result = {name:reportName, title:tran?.voucher +" Voucher", subTitle, rowKeysShow:keysTranDetails, rowHeaders:getHeadersTitle(keysTranDetails), rows:transListRows,
                pdfData, date:'Transaction no: '+viewTransId, moreDocHeader,}
    }else{
        pdfData.reportRowKeys = keysTransListing.slice(1);
        pdfData.noFmtCols = [6];
        pdfData.tableColsWch = [20, 25, "", "", "",  "",];
        transListRows = transListRows.map((dt)=> {
            const debitAccount = dt?.accountCodeDr?  dt.accountCodeDr+" "+dt.accountNameDr : "";
            const creditAccount = dt?.accountCodeCr? dt.accountCodeCr+" "+dt.accountNameCr : "";
            return {...dt, debitAccount, creditAccount}
        });
        result = {name:reportName, title:"Transactions Listing", rowKeysShow:keysTransListing, rowHeaders:getHeadersTitle(keysTransListing), rows:transListRows, clickables:['edit', 'view'],
                pdfData,}
    }
    return result
}