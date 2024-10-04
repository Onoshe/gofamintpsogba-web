

const convertTransRowToTransSheet = (transRow)=>{
    //return console.log(transRow)
    const tranRowDr = transRow.find((dt)=> dt.entryType === "DR");
    const tranRowCr = transRow.find((dt)=> dt.entryType === "CR");
    const {transactionDate, description, reference, amount} = tranRowDr;
    let transSheet = {
        date:transactionDate,
        description,
        reference,
        amount:parseFloat(amount),
        debitAccount:tranRowDr.accountCode,
        creditAccount:tranRowCr.accountCode,
        debitSub:tranRowDr?.accountCodeSub? getSubAcct(tranRowDr.accountCodeSub, tranRowDr.accountCodeSubName) : '',
        creditSub:tranRowCr?.accountCodeSub? getSubAcct(tranRowCr.accountCodeSub, tranRowCr.accountCodeSubName) : '',
        idDr:tranRowDr.transDetailsId,
        idCr:tranRowCr.transDetailsId,
        dueDate:parseInt(tranRowDr?.dueDate)? tranRowDr?.dueDate : parseInt(tranRowCr?.dueDate)? tranRowCr?.dueDate : ""
    };
    return [transSheet]
 }

 const convertTransRowToTransSheetMulti = (transRow)=>{
    const transSheet = [];
    //return console.log(transRow)
    const debitEntry = transRow.find((dt)=> dt.entryType === "DR");
    for (let i = 0; i < transRow.length; i++) {
        const tranRow = transRow[i];
        const {transId, transDetailsId, transactionDate, description, reference, amount, entryType, accountCode, accountCodeSub, accountCodeSubName} = tranRow;
        const isDebit = entryType === "DR"? '1' : '2';
        let tranSheet ={
            amount:parseFloat(Math.abs(amount)),
            debitCredit:isDebit,
            accountCode,
            subCode:accountCodeSub? getSubAcct(accountCodeSub, accountCodeSubName) : "",
            id:transId,
            dueDate:parseInt(tranRow?.dueDate)? tranRow.dueDate : "",
        }
        if(transDetailsId == debitEntry.transDetailsId){ //First row has date, description, and referece. Make first row to be debit
            tranSheet.reference = reference,
            tranSheet.description = description,
            tranSheet.date = transactionDate,
            tranSheet.dueDate = parseInt(tranRow?.dueDate)? tranRow.dueDate : "",
            transSheet.unshift(tranSheet);
        }else{
            transSheet.push(tranSheet)
        }
    }
    //return console.log(transSheet)
    return transSheet
 }
 
 function getSubAcct(accountCodeSub, accountCodeSubName){
    let res = "";
    if(accountCodeSub){
        res = `${accountCodeSub} ${accountCodeSubName?.split(' ')[0]}`
    }
    return res
}
const convertTransRowToTransSheetProductTwo = (transRow)=>{
    const tab1AndTab3Sheet = {date:"", description:'', reference:'', amount:'', accountCodeDr:'', subCodeDr:'', quantityDr:'',unitsDr:'',accountCodeCr:'', subCodeCr:'', quantityCr:'',unitsCr:'',};
    const tab2SheetExtra = {accountCodeProduct:'', subCodeProduct:'', quantityProduct:'',unitsProduct:'', accountCodeCOS:'', quantityBal:''};
    //return console.log(transRow):  entry1Sel:1, entry2Sel:2,adjustProductChecked:"BYQTY"
    const tranRowDr = transRow.find((dt)=> dt.entryType === "DR");
    const tranRowCr = transRow.find((dt)=> dt.entryType === "CR");
    const {transactionDate, description, reference, amount} = tranRowDr;
        let transSheet = {
            date:transactionDate,
            description,
            reference,
            amount:parseFloat(amount),
            accountCodeDr:tranRowDr.accountCode,
            accountCodeCr:tranRowCr.accountCode,
            subCodeDr:tranRowDr?.accountCodeSub? getSubAcct(tranRowDr.accountCodeSub, tranRowDr.accountCodeSubName) : '',
            subCodeCr:tranRowCr?.accountCodeSub? getSubAcct(tranRowCr.accountCodeSub, tranRowCr.accountCodeSubName) : '',
            quantityDr:parseFloat(tranRowDr?.quantity)? tranRowDr?.quantity : '',
            quantityCr:parseFloat(Math.abs(tranRowCr?.quantity))? Math.abs(tranRowCr?.quantity) : '',
            unitsDr:tranRowDr?.units,
            unitsCr:tranRowCr?.units
        };
    //return console.log(transSheet)
    return transSheet
 }

 const convertTransRowToTransSheetProductAdj = (transRow, prodTypeCode)=>{
    //Pls resolve:  What if the double entry adjustment is on product also?
    //return console.log(transRow):  entry1Sel:1, entry2Sel:2,adjustProductChecked:"BYQTY"
    const tranRowDr = transRow.find((dt)=> dt.entryType === "DR");
    const tranRowCr = transRow.find((dt)=> dt.entryType === "CR");
    const tranRowProd1 = transRow.find((dt)=> {return dt.typeCode == prodTypeCode && dt.productAdj}); //Inventory Account
    const tranRowProd2 = transRow.find((dt)=> dt.typeCode == prodTypeCode);
    const tranRowProd = tranRowProd1? tranRowProd1 : tranRowProd2;
    const tranRowNonProd = transRow.find((dt)=> dt.typeCode != prodTypeCode);
    const entry1Sel = tranRowProd.entryType === "DR"? 1 : 2;
    //const absQty = parseFloat(Math.abs(tranRowNonProd?.quantity))? Math.abs(tranRowNonProd?.quantity) : '';
    const subCodeDr = tranRowProd?.accountCodeSub? getSubAcct(tranRowProd.accountCodeSub, tranRowProd.accountCodeSubName)?.split(" ")[0] : '';
    const subCodeCr = tranRowNonProd?.accountCodeSub? getSubAcct(tranRowNonProd.accountCodeSub, tranRowNonProd.accountCodeSubName)?.split(" ")[0] : '';
    const {transactionDate, description, reference, amount} = tranRowProd;
        let transSheet = {
            date:transactionDate,
            description,
            reference,
            amount:tranRowProd?.productAdj === "BYCOST"? Math.abs(amount) : Math.abs(tranRowProd.quantity),
            accountCodeDr:tranRowProd.accountCode,
            accountCodeCr:tranRowNonProd.accountCode,
            subCodeDr,
            subCodeCr,
            //quantityDr:parseFloat(tranRowProd?.quantity)? tranRowProd?.quantity : '',
            //quantityCr:parseFloat(Math.abs(tranRowNonProd?.quantity))? Math.abs(tranRowNonProd?.quantity) : '',
            //unitsDr:tranRowProd?.units,
            //unitsCr:tranRowNonProd?.units,
            adjustProductChecked:tranRowProd?.productAdj,
            entry1Sel,
            entry2Sel:entry1Sel == 1? 2 : 1,
        };
    //return console.log(transSheet)
    return transSheet
 }

 const convertTransRowToTransSheetProductMulti = (transRow, cosTypeCode)=>{ //For Product Sale
    /*transRow has four entries: [{accountCode:'Bank or Receivable Acct, doube entry for Sales', entryType:'Dr', doubleEntryId:0001}, {accountCode:'Sales Account', entryType:'Cr', doubleEntryId:0001}, 
    {accountCode:'Cost of Sale', entryType:'Dr', doubleEntryId:0002}, {accountCode:'Product Acct', entryType:'Cr', doubleEntryId:0002}]
    */
    const drAndCrAccount = []; //Bank or Sales Acct
    const entryTwoCOSDrAcct = transRow.find((dt)=> dt.typeCode == cosTypeCode);
    const entryTwoProductCrAcct = transRow.find((dt)=> {
       return dt?.doubleEntryId == entryTwoCOSDrAcct?.doubleEntryId && dt?.transDetailsId != entryTwoCOSDrAcct?.transDetailsId
    });

    for (let i = 0; i < transRow.length; i++) {
        const tran = transRow[i];
        if(tran.doubleEntryId !== entryTwoCOSDrAcct?.doubleEntryId){
            drAndCrAccount.push(tran);
        }   
    }
    //Bank or Receivable Acct (DR) & Sales Account (CR)
    const tranRowDr = drAndCrAccount.find((dt)=> dt.entryType === "DR");
    const tranRowCr = drAndCrAccount.find((dt)=> dt.entryType === "CR");
    const absQty = parseFloat(Math.abs(entryTwoProductCrAcct?.quantity))? Math.abs(entryTwoProductCrAcct?.quantity) : '';
    const {transactionDate, description, reference, amount} = tranRowDr;
        let transSheet = {
            date:transactionDate,
            description,
            reference,
            amount:parseFloat(amount),
            accountCodeDr:tranRowDr.accountCode,
            accountCodeCr:tranRowCr.accountCode,
            subCodeDr:tranRowDr?.accountCodeSub? tranRowDr.accountCodeSub : '',
            subCodeCr:tranRowCr?.accountCodeSub? tranRowCr.accountCodeSub : '',

            //Quantity is in product entry. 
            quantityDr:absQty,
            quantityCr: absQty,
            unitsDr:tranRowDr?.units,
            unitsCr:tranRowCr?.units,

            accountCodeProduct:entryTwoProductCrAcct.accountCode, 
            subCodeProduct:entryTwoProductCrAcct?.accountCodeSub? entryTwoProductCrAcct.accountCodeSub : '', 
            quantityProduct:Math.abs(entryTwoProductCrAcct.quantity),
            unitsProduct:Math.abs(entryTwoProductCrAcct.units), 
            accountCodeCOS:entryTwoCOSDrAcct.accountCode, 
            quantityBal:''
        };
    //return console.log(transSheet)
    return transSheet
 }

export const handleEditTranListing =({name, cell, router, companyId, transactionsDetails, recordTransaction, pathname, 
    dispatchRecordTransaction, dispatchTranSheetTwoEntry, dispatchTranSheetMultiEntry, dispatchTranSheetJournals, dispatchTranSheetProducts,
    dispatchProductPageActiveTab, cosTypeCode, controlAcctsCode})=>{
      //  return console.log(name, cell?.row?.postingPlat)
     if(name === "trial-balance"){
        const {row} = cell;
        router.push(`/${companyId}/reports/gl-${row.trans[0].accountCode}`);
      }else if(name === "transaction-view"){
        const postingPlat = cell?.row?.postingPlat || 'TWOENTRY';
        let platforms = {page:'record-transaction', sheet:'tranSheetTwoEntry', productTab:'TAB1'};
    
        let transSheet = transactionsDetails.filter((dt)=> dt.transactionID == cell.row.id);
        transSheet = transSheet.map((dt)=> { return {...dt, date:dt.transactionDate}});

        //return console.log(transSheet, postingPlat, cosTypeCode)
        switch (postingPlat) {
            case "MULTIENTRY":
            case "JOURNAL":
                platforms.page = postingPlat === "MULTIENTRY"? 'record-transaction' : 'record-journal';
                platforms.sheet = postingPlat === "MULTIENTRY"? 'tranSheetMultiEntry' : 'tranSheetJournals';    
                const convertedMulti = convertTransRowToTransSheetMulti(transSheet);
                //return console.log(convertedMulti)
                if(postingPlat === "MULTIENTRY"){
                    dispatchTranSheetMultiEntry(convertedMulti);
                }else{dispatchTranSheetJournals(convertedMulti);}
                break;
            case "PRODUCT-PCH":
            case "PRODUCT-ADJ":
            case "PRODUCT-SAL":
                    platforms.page = 'record-product';
                    platforms.sheet = 'transSheetProducts'; 
                    platforms.productTab = postingPlat === "PRODUCT-PCH"? "TAB1" : postingPlat === "PRODUCT-SAL"? "TAB2" : "TAB3";
                    let convertedProduct = {}; 
                    if(postingPlat === "PRODUCT-SAL"){
                      convertedProduct  = convertTransRowToTransSheetProductMulti(transSheet, cosTypeCode);
                      //console.log(convertedProduct);
                    }else if(postingPlat === "PRODUCT-ADJ"){
                        const prodTypeCode = controlAcctsCode.inventoryControl;
                        convertedProduct = convertTransRowToTransSheetProductAdj(transSheet, prodTypeCode);
                        //console.log(convertedProduct, prodTypeCode, transSheet)
                    }else{
                        convertedProduct = convertTransRowToTransSheetProductTwo(transSheet);
                    }
                    dispatchTranSheetProducts(convertedProduct);
                    dispatchProductPageActiveTab(platforms.productTab);
                    break;
            default: 
                const convertedTwo = convertTransRowToTransSheet(transSheet);
                //return console.log(transSheet, convertedTwo)
                dispatchTranSheetTwoEntry(convertedTwo);
                break;
        }
        //return
        dispatchRecordTransaction({...recordTransaction,  activeTab:postingPlat, createByEntry:'BYENTRY', editTran:true, editDetails:cell.row, transRow:transSheet, transListingPage:pathname})
        router.push(`/${companyId}/${platforms.page}`);
      }     
}


const transactionRow =['transactionDate', 'description','reference', 'amount', 'entryType', 'accountCode', 'accountCodeSub','accountCodeId',];

const twoEntryRow = ['date', 'description', 'reference', 'amount', 'debitAccount', 'debitSub', 'creditAccount', 'creditSub',]
const multiEntryRow = [
    ['date', 'description', 'reference', 'amount', 'accountCode','debitCredit', 'subCode'],
    ['amount', 'accountCode','debitCredit', 'subCode']
]