import { activities } from "@/lib/apiRequest/postActivity";
import { convertToTitleCase } from "@/lib/capitalize/capitalizeString";
import { sortArrayByKey } from "@/lib/sort/sortArrayByKey";
import { groupTransactionsByKey } from "@/lib/transactionsManager/groupTransactionsByKey";



export function groupTransToLedgersNew(caceLedgersArr, coaSMapped, transactionsDetails){
    /** Group transactions in cash & cash equivalent (caceLedgersArr) to their offsetaccount. 
     *  Reseult = {200111:{name:'', dr:{trans:[], sum:[]}, cr:{trans:[], sum:[]}}, ...}. 200111 is the offsetaccount code
     */
     
    const fmtRowsOpAct = {
        header:{sortNo:1, classTitle:"Operating Activities", title:"", closingBal:"", subClass:"OPACT", rowStyle:"font-bold", emptyRow:true, classNameTD:true},
        activities:['cashFromCus', 'cashToVed','otherCashRecvd','otherCashPaid','otherOpIncome','otherOpExpenses'],
        titles:["Cash received from Customers","Cash paid to Vendors","Other Cash received from Customers","Other Cash paid to Vendors","Other Operating Income","Other Operating Expenses",],
        cashFromCus:{total:0, trans:[]},
        cashToVed:{total:0, trans:[]},
        otherCashRecvd:{total:0, trans:[]},
        otherCashPaid:{total:0, trans:[]},
        otherOpIncome:{total:0, trans:[]},
        otherOpExpenses:{total:0, trans:[]},
    };
    const fmtRowsInvAct = {
       header: {sortNo:1, classTitle:"Investing Activities", title:"", closingBal:"", subClass:"INVACT", rowStyle:"font-bold", emptyRow:true, classNameTD:true},
       activities:['assetPurch','assetSold'],
       titles:["Purchase of Property, Plants & Equipments","Sale of Property, Plants & Equipments",],
       assetPurch:{total:0, trans:[]},
       assetSold:{total:0, trans:[]},
    };
    const fmtRowsFinAct = {
       header: {sortNo:1, classTitle:"Financing Activities", title:"", closingBal:"", subClass:"FINACT", rowStyle:"font-bold", emptyRow:true, classNameTD:true},
       activities:['loanRcvd','loanPaid','financing'],
       titles:["Long term loan received","Long term loan payment","Equity financing"],
       loanRcvd:{total:0, trans:[]},
       loanPaid:{total:0, trans:[]},
       financing:{total:0, trans:[]},
    };

    const emptyRow = {classTitle:"", title:"", closingBal:"", subClass:"", emptyRow:true, rowStyle:"font-bold"};
    let classSums = {
        opAct: 0,
        invAct:0,
        finAct:0
    };

    const caceLedgersInfo = {openingBals:{total:0, trans:[]}, totalTrans:0, totalTransSplit:0, acctCodes:[], splitTrans:[]};
    for (let i = 0; i < caceLedgersArr.length; i++) {
        const ledger = caceLedgersArr[i];
        const trans = ledger.trans || [];
        for (let j = 0; j < trans.length; j++) {
            const tran = trans[j];
            ///const acctCode = tran?.accountCode?.toString();
            //const acctNm = tran?.accountName?.toString();
            const offsetAcctCode = tran?.offsetAccountCode?.toString();
            const validOffsetAccountCode = offsetAcctCode && offsetAcctCode !== "" && offsetAcctCode !== undefined && offsetAcctCode !== null;
                if(tran?.isOB){
                    caceLedgersInfo.openingBals.trans.push(tran);
                    caceLedgersInfo.openingBals.total += parseFloat(tran.amount);
                }else{
                    if(validOffsetAccountCode){
                        const typeCode = tran.offsetAccountTypeCode;
                        const coas = coaSMapped[typeCode];
                        if(!caceLedgersInfo[offsetAcctCode]){
                            //Initialize
                            caceLedgersInfo[offsetAcctCode] = {
                                typeCode,
                                class:coas?.class,
                                subClass:coas?.subClass,
                                typeName:coas?.name,
                            }
                        }
                        caceLedgersInfo.totalTrans += parseFloat(tran.amount);
                        getCashFlowStatement({ledgerEntry:tran, coaStrt:coas,fmtRowsOpAct, fmtRowsInvAct, fmtRowsFinAct, classSums})
                    }else{
                        //Invalid offsetAccountCode
                        caceLedgersInfo.splitTrans.push(tran);
                        caceLedgersInfo.totalTransSplit += parseFloat(tran.amount);
                    }
                } 
        }
    };

    //Get double entries for slit transactions
    const splitTransEntries = [];
    const splitTransEntriesFmt = [];
    if(caceLedgersInfo.splitTrans.length){
        for (let j = 0; j < caceLedgersInfo.splitTrans.length; j++) {
            const splitTran = caceLedgersInfo.splitTrans[j];
            const splitTranAmt = parseFloat(splitTran.amount);
            const isDr = splitTran.entryType === "DR";
            let sumAmounts = 0;
            const splitTranEntries = transactionsDetails.filter((dt, i)=>{
                const isEntry =  dt.transId == splitTran.transId && dt.documentNo != splitTran.documentNo;
                if(isEntry){sumAmounts += parseFloat(dt.amount)}
                return isEntry
            });
            //Check if splitTranEntries is perfect double entry. If true, format each splitTranEntries entryType, amount, offsetAccountTypeCode to splitTran.
            if(Math.abs(sumAmounts) == Math.abs(splitTranAmt)){
                splitTranEntries.forEach(tran => {
                    let entryFmt = {...splitTran, 
                        entryType: isDr? "DR" : "CR", 
                        amount:isDr? parseFloat(Math.abs(tran.amount)) : -parseFloat(Math.abs(tran.amount)),
                        offsetAccountTypeCode:tran.typeCode,
                        accountCodeSplit:tran.accountCode,
                        accountNameSplit:tran.accountName,
                        splitEntry:true,
                    }
                    splitTransEntriesFmt.push(entryFmt);

                    //caceLedgersInfo.totalTrans += parseFloat(tran.amount);
                    const coas = coaSMapped[tran.typeCode];
                    getCashFlowStatement({ledgerEntry:entryFmt, coaStrt:coas,fmtRowsOpAct, fmtRowsInvAct, fmtRowsFinAct, classSums})
                });
            }else{
                //Format to Other Cash received or Paid in OperatingActivities
                let entryFmt = {...splitTran, 
                    splitEntryFmt:true,
                }
                splitTransEntriesFmt.push(entryFmt);
                const coaStrt = {class: isDr? 'asset' : 'liability'};
                getCashFlowStatement({ledgerEntry:entryFmt, coaStrt,fmtRowsOpAct, fmtRowsInvAct, fmtRowsFinAct, classSums})
            }
        }
       // console.log(splitTransEntriesFmt)
    };
    caceLedgersInfo['splitTransEntries']= splitTransEntries;

    const result = [fmtRowsOpAct.header];
    fmtRowsOpAct.activities.forEach((act, i) => {
        const titles = fmtRowsOpAct.titles;
        checkAndPush(result,{title:titles[i], cashAmount:fmtRowsOpAct[act]['total'], trans:fmtRowsOpAct[act]['trans']})
    });
    result.push({title:"Net cash from Operating Activities", cashAmount:classSums.opAct, rowStyle:"font-bold", classNameTD:true});
    result.push(emptyRow);

    result.push(fmtRowsInvAct.header);
    fmtRowsInvAct.activities.forEach((act, i) => {
        const titles = fmtRowsInvAct.titles;
        checkAndPush(result,{title:titles[i], cashAmount:fmtRowsInvAct[act]['total'], trans:fmtRowsInvAct[act]['trans']})
    });
    result.push({title:"Net cash from Investing Activities", cashAmount:classSums.invAct, rowStyle:"font-bold", classNameTD:true});
    result.push(emptyRow);

    result.push(fmtRowsFinAct.header);
    fmtRowsFinAct.activities.forEach((act, i) => {
        const titles = fmtRowsFinAct.titles;
        checkAndPush(result,{title:titles[i], cashAmount:fmtRowsFinAct[act]['total'], trans:fmtRowsFinAct[act]['trans']})
    });
    result.push({title:"Net cash from Financing Activities", cashAmount:classSums.finAct, rowStyle:"font-bold", classNameTD:true});
    result.push(emptyRow);
    

    const netCACE = classSums.opAct+classSums.invAct+classSums.finAct;
    const netCACEClosing = netCACE + caceLedgersInfo.openingBals.total;

    result.push({classTitle:"", subClass:"NET", title:"Net Cash & Cash Equivalent", classNameTD:true, cashAmount:netCACE});
    result.push({classTitle:"", subClass:"STARTCASH", title:"Beginning Cash & Cash Equivalent", classNameTD:true, cashAmount:caceLedgersInfo.openingBals.total});
    result.push({classTitle:"", subClass:"ENDCASH", title:"Ending Cash & Cash Equivalent",classNameTD:true,  cashAmount:netCACEClosing, rowStyle:"font-bold"});    
    
    return {caceLedgersInfo, result}
}


function checkAndPush(arr, obj, showAll=true){
    const hasValue = parseFloat(obj?.cashAmount);
    const toShow = showAll? true : hasValue;
    if(toShow){
        arr.push(obj)
    }
}

function getCashFlowStatement({ledgerEntry, coaStrt, fmtRowsOpAct, fmtRowsInvAct, fmtRowsFinAct, classSums}){
            //const {typeCode, typeName, acctCode, acctName, dr, cr} = ledgerEntry;
            const amount = parseFloat(ledgerEntry.amount);
            const entryType = ledgerEntry.entryType;
            const isDebit = entryType === "DR";
             const isCredit = entryType === "CR";


            if(coaStrt.class === "asset"){
                if(coaStrt.name === "propertyPlant&Equipment"){
                    if(isCredit){ 
                        fmtRowsInvAct.assetPurch.total += amount; 
                        fmtRowsInvAct.assetPurch.trans.push(ledgerEntry);
                    };
                    if(isDebit){
                        fmtRowsInvAct.assetSold.total += amount; 
                        fmtRowsInvAct.assetSold.trans.push(ledgerEntry);
                    }
                    classSums.invAct += amount;
                }else {
                    if(isCredit){     
                        fmtRowsOpAct.otherCashPaid.total += amount; 
                        fmtRowsOpAct.otherCashPaid.trans.push(ledgerEntry);
                    };
                    if(isDebit){ 
                        fmtRowsOpAct.otherCashRecvd.total += amount; 
                        fmtRowsOpAct.otherCashRecvd.trans.push(ledgerEntry);
                    };
                    classSums.opAct += amount;
                }
            }else if(coaStrt.class === "liability"){    
                if(coaStrt.name === "nonCurrentLiability"){
                    if(isCredit){ 
                        fmtRowsFinAct.loanPaid.total += amount; 
                        fmtRowsFinAct.loanPaid.trans.push(ledgerEntry);
                        classSums.finAct += amount;
                    };
                    if(isDebit){
                        fmtRowsFinAct.loanRcvd.total += amount; 
                        fmtRowsFinAct.loanRcvd.trans.push(ledgerEntry);
                        classSums.opAct += amount;
                    }
                }else {
                    if(isCredit){ 
                        fmtRowsOpAct.otherCashPaid.total += amount; 
                        fmtRowsOpAct.otherCashPaid.trans.push(ledgerEntry);
                        classSums.opAct += amount;
                    };
                    if(isDebit){ 
                        fmtRowsOpAct.otherCashRecvd.total += amount; 
                        fmtRowsOpAct.otherCashRecvd.trans.push(ledgerEntry);
                        classSums.opAct += amount;
                    };
                }
            }else if(coaStrt.class === "income"){    
                    fmtRowsOpAct.cashFromCus.total += amount; 
                    fmtRowsOpAct.cashFromCus.trans.push(ledgerEntry);
                    classSums.opAct += amount;
            }else if(coaStrt.class === "expenses"){     
                    fmtRowsOpAct.cashToVed.total += amount; 
                    fmtRowsOpAct.cashToVed.trans.push(ledgerEntry);
                    classSums.opAct += amount;

            }else if(coaStrt.class === "equity"){
                fmtRowsFinAct.financing.total += amount; 
                fmtRowsFinAct.financing.trans.push(ledgerEntry);
                classSums.finAct += amount;
            }else{    
                if(isCredit){ 
                    fmtRowsOpAct.otherOpExpenses.total += amount; 
                    fmtRowsOpAct.otherOpExpenses.trans.push(ledgerEntry);
                    classSums.opAct += amount;
                };
                if(isDebit){ 
                    fmtRowsOpAct.otherOpIncome.total += amount; 
                    fmtRowsOpAct.otherOpExpenses.trans.push(ledgerEntry);
                    classSums.opAct += amount;
                };
            }
}

