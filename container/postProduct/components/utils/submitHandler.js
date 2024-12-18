import { getErrorMessage } from '@/lib/validation/getErrorMessage';
import {validateProductPurchaseAndAdj } from "./validation/validateProductPurchaseAndAdj";
import { validateProductSale } from "./validation/validateProductSale";
import { prepareQueryTrans, prepareQueryTransDetails } from './prepareQueryTransactions';
import { postRequest } from '@/lib/apiRequest/postRequest';
import { generateUniqueDigits } from '@/lib/radomNos/generateUniqueDigits';
import { patchRequest } from '@/lib/apiRequest/patchRequest';
import { getLinkDeleteTran, getLinkPostTrans } from "@/lib/apiRequest/urlLinks";
import { activities, postActivity } from '@/lib/apiRequest/postActivity';
import { getPermissions, pmsActs } from '@/lib/permissions/permissions';

//Note: transSheet is an array []

export const submitHandler = async ({transSheet, controlAcctsCode, activeTab, chartOfAccounts, setPostError, 
    toastNotify, user, personalAccounts, runDispatchClientDataCall, transSheetReset, recordTransaction, router, 
    postByUpload, setRecordingProduct, resetCall, setResetCall, saleLastRow, productReturns,  transactionsdetails})=>{
    const {customers, vendors, products} = personalAccounts;
    let validateRes = {};
    if(activeTab === "TAB1"){
         validateRes = await validateProductPurchaseAndAdj(transSheet, controlAcctsCode, activeTab, user, productReturns, transactionsdetails);
    }else if(activeTab === "TAB2"){
        validateRes = await validateProductSale(transSheet, controlAcctsCode, activeTab, user,  transactionsdetails, productReturns);
    }else if(activeTab === "TAB3"){
        validateRes = await validateProductPurchaseAndAdj(transSheet, controlAcctsCode, activeTab, user, productReturns, transactionsdetails);
    }
    
    const perms = await getPermissions({user, act:pmsActs.POST_TRAN, form:transSheet});
    if(!perms.permit) return toastNotify("error", perms.msg);

    //return console.log(validateRes, transSheet)
    if(validateRes?.error){
     const errorMsg = getErrorMessage(validateRes?.errorType, validateRes?.key, validateRes?.rowIndex, validateRes?.title);
     setPostError({msg:errorMsg, error:validateRes?.error});
     toastNotify('error', errorMsg);
     setRecordingProduct(false);
    }else{
        const TAB = activeTab;
        const tranType = recordTransaction?.editTran? 'UPDATE' :'CREATE';
        const postingNote = `${transSheet?.length > 1? 'Multiple Products' : 'Product'} ${TAB=="TAB1"? 'PURCHASE': TAB=="TAB2"? 'SALE': 'ADJUSTMENT '} ${tranType==="CREATE"? "CREATE" : "EDIT"} with transaction reference ${transSheet[0].reference}`;
        postActivity(user, activities[tranType], postingNote);

        if(activeTab === "TAB1"){
            /************ FOR PRODUCT PURCHASE*****************/
            processTransForPosting({transSheet, user, chartOfAccounts, controlAcctsCode, vendors, customers, products, recordTransaction,
                transSheetReset, runDispatchClientDataCall, toastNotify, TAB, router, postByUpload, setRecordingProduct, resetCall, setResetCall, productReturns});
        }else if(activeTab === "TAB2"){
            if(recordTransaction?.editTran){
                processUpdateSalesTrans({transSheet, user, chartOfAccounts, controlAcctsCode, vendors, customers, products, recordTransaction,
                    transSheetReset, runDispatchClientDataCall, toastNotify, TAB, router, postByUpload, resetCall, setResetCall, setRecordingProduct, productReturns});
            }else{
                /******************************
                        For Product Sale; two entries will be posted: Main Entry (Entry 1) & COS Entry (Entry 2)
                        1.  Dr Receivables/Bank (with the sales amount)
                            Cr Sales 
                        2.  Dr Cost of Sale (with the cost of sale)
                            Cr Inventory 
                        NB: The amount for the entry 2 should be the cost price and not the sales price as in entry 1
                */
                    //For Main Entry
                    const res = await processTransForPosting({transSheet, user, chartOfAccounts, controlAcctsCode, vendors, customers, products, recordTransaction,
                        transSheetReset, runDispatchClientDataCall, toastNotify, TAB, router, postByUpload, setRecordingProduct, resetCall, setResetCall, productReturns});
                    
                    //For COS Entry
                    const transSheetArr = [];
                    const doubleEntryIdArr = [];
                    const insertedTransArr = [];
                    if(res?.ok){
                        for (let j = 0; j < transSheet.length; j++) {
                            const tranSht = transSheet[j];
                            const {
                                accountCodeProduct,
                                subCodeProduct,
                                quantityProduct,
                                amount,
                                accountCodeCOS
                            } = tranSht;

                            //Format params to align with prepareQuerySaleTransDetails function arguments
                            /*const transSheetFmt = {
                                amount,
                                accountCodeDr:accountCodeCOS,
                                subCodeDr:"",
                                quantityDr:'',
                                accountCodeCr:accountCodeProduct,
                                subCodeCr:subCodeProduct,
                                quantityCr:quantityProduct
                            }*/
                            const transSheetFmt = {
                                amount,
                                accountCodeDr:productReturns? accountCodeProduct : accountCodeCOS, //Product account is debited for Sales return & COS credited
                                subCodeDr:productReturns? subCodeProduct : "",
                                quantityDr:productReturns? quantityProduct : "",
                                accountCodeCr:productReturns? accountCodeCOS : accountCodeProduct,
                                subCodeCr:productReturns? "" : subCodeProduct,
                                quantityCr:productReturns? "" : quantityProduct,
                                tranNoRef:tranSht?.tranNoRef,
                            }
                            let doubleEntryId = generateUniqueDigits('string', 100567039004701);
                            const insertedTrans = {id:res.data[j].transactionID}; 
                            
                            transSheetArr.push(transSheetFmt);
                            doubleEntryIdArr.push(doubleEntryId);
                            insertedTransArr.push(insertedTrans);
                        }
                        const {url, body} = prepareQueryTransDetails({transSheetArr, chartOfAccounts, controlAcctsCode, user, vendors, customers, products, insertedTransArr, doubleEntryIdArr});
                        
                        await postRequest(url, body).then((result)=>{
                            if(result?.ok){
                                if(postByUpload){
                                    if(saleLastRow){
                                        notifySuccess()
                                        if(setResetCall){
                                            setResetCall(resetCall + 1);
                                        }
                                    }
                                }else{notifySuccess()}
                            }else{
                            toastNotify('error', res?.error || "Error in posting transaction");
                            setRecordingProduct(false);
                            }   
                        });
                        
                    }else{
                        toastNotify('error', res?.error || "Error in posting transaction");
                        setRecordingProduct(false);
                    }
             }
             function notifySuccess(){
                transSheetReset("TAB2"); 
                runDispatchClientDataCall()
                toastNotify('success', 'Posting successfull');
                setRecordingProduct(false);
             }
        }else if(activeTab === "TAB3"){
            const transSheetFmtArr = [];
            for (let i = 0; i < transSheet.length; i++) {
                const tranSht = transSheet[i];            
            
                //TAB3- Product Adjustment Tab
                //transSheet properties has to be reformatted
                const  {accountCodeDr, accountCodeCr, subCodeDr, subCodeCr, quantityDr, quantityCr, amount, unitsDr, 
                    unitsCr, entry1Sel, entry2Sel, adjustProductChecked } = tranSht;
                let quantityDrFmt = 0; let quantityCrFmt = 0;
                if(entry1Sel==1){ //Debit inventory
                    if(adjustProductChecked !="BYCOST"){
                        quantityDrFmt = amount;
                    }    
                }else{ //Credit inventory
                    if(adjustProductChecked !="BYCOST"){
                        quantityCrFmt = amount;
                    }
                }
                const transSheetFmt = {...tranSht, accountCodeDr:entry1Sel==1? accountCodeDr : accountCodeCr, accountCodeCr:entry2Sel==2? accountCodeCr : accountCodeDr, 
                    subCodeDr:entry1Sel==1? subCodeDr : subCodeCr, subCodeCr:entry2Sel==2? subCodeCr : subCodeDr, 
                    amount: adjustProductChecked=="BYCOST"? amount : 0, quantityDr:quantityDrFmt, quantityCr:quantityCrFmt,}
                transSheetFmtArr.push(transSheetFmt);
            }    
            //return console.log(transSheetFmt);
            processTransForPosting({transSheet:transSheetFmtArr, user, chartOfAccounts, controlAcctsCode, vendors, customers, products, recordTransaction,
                transSheetReset, runDispatchClientDataCall, toastNotify, TAB, router, postByUpload, resetCall, setResetCall, setRecordingProduct});
        }
    }  
  }



async function postTrans({transSheet, user, chartOfAccounts, controlAcctsCode, vendors, customers, products, url, body, postingPlat}){
    //const {url, body} = prepareQueryTrans({transSheet, user, chartOfAccounts, postingPlat});
    const transRes = await postRequest(url, body);
    if(transRes?.data?.length){
     const insertedTransArr = transRes.data;
     const doubleEntryIdArr = [...transRes.data]?.map(()=> generateUniqueDigits('string', 100567039004701)); //generateUniqueDigits('string');
     const {url, body} = prepareQueryTransDetails({transSheetArr:transSheet, chartOfAccounts, controlAcctsCode, user, vendors, customers, products, insertedTransArr, 
        doubleEntryIdArr, postingPlat});
     //console.log([body, transSheet])
     return await postRequest(url, body);
    }
}
async function postTransAndNotify({transSheet, user, chartOfAccounts, controlAcctsCode, vendors, customers, products, url, body,
    TAB, transSheetReset, runDispatchClientDataCall, toastNotify, postByUpload, resetCall, setResetCall, setRecordingProduct, postingPlat}){

    await postTrans({transSheet, user, chartOfAccounts, controlAcctsCode, vendors, customers, products, url, body,postingPlat
    }).then((res)=>{
        if(res?.ok){
            //const postingNote = `Product ${TAB=="TAB1"? 'PURCHASE': TAB=="TAB2"? 'SALE': 'ADJUSTMENT '} transaction with reference ${transSheet.reference}`;
            //postActivity(user, activities.CREATE, postingNote);
            transSheetReset(TAB); 
            runDispatchClientDataCall()
            toastNotify('success', 'Posting successfull');
            setRecordingProduct(false);
            if(postByUpload && setResetCall){
                setResetCall(resetCall + 1);
            }
        }else{
        toastNotify('error', res?.error || "Error in updating user record");
        setRecordingProduct(false);
        }
    });
}

//Insert entries on transactionsdetails table. This is done after transaction table insertion.
async function updateTransDetails({transSheet, user, chartOfAccounts, controlAcctsCode, vendors, customers, products, insertedTrans,
    transListingPage, transSheetReset, runDispatchClientDataCall, toastNotify, router, TAB, setRecordingProduct, postingPlat }){
     const doubleEntryIdArr = [...transSheet]?.map(()=> generateUniqueDigits('string', 100567039004701));
     const {url, body} = prepareQueryTransDetails({transSheetArr:transSheet, chartOfAccounts, controlAcctsCode, user, vendors, customers, products, insertedTransArr:insertedTrans, doubleEntryIdArr, postingPlat});
     postRequest(url, body)
     .then((res)=>{
        if(res?.ok){
            //const postingNote = `Product ${TAB=="TAB1"? 'PURCHASE': TAB=="TAB2"? 'SALE': 'ADJUSTMENT '} transaction with reference ${transSheet.reference}`;
            //postActivity(user, activities.CREATE, postingNote);
            transSheetReset(TAB); 
            runDispatchClientDataCall()
            toastNotify('success', 'Posting successfull');
        }else{
        toastNotify('error', res?.error || "Error in updating user record");
        }
    }).then(()=> { 
        setRecordingProduct(false);
        if(transListingPage){
            setTimeout(()=>router.push(transListingPage), 1000)
        }
    })
}


//Product Sale Update
async function processUpdateSalesTrans({transSheet, user, chartOfAccounts, controlAcctsCode, vendors, customers, products, recordTransaction,
    transSheetReset, runDispatchClientDataCall, toastNotify,setRecordingProduct, TAB, router, productReturns}){
     //For Main Entry 
     const postingPlat = productReturns? 'PRODUCT-SAL-RT':'PRODUCT-SAL';
    const {url, body} = prepareQueryTrans({transSheet, user, chartOfAccounts, postingPlat});
    
    if(recordTransaction?.editTran){
        const transListingPage = recordTransaction.transListingPage;
        const url = getLinkPostTrans(user.companyId).patch;
        const transId = recordTransaction.editDetails.id;
        const updateParams  ={
        act: "UPDATE",
        whereField:"id",
        whereValue:transId,
        whereType: "INT"};
        const updatedBody = {...body, values:body.values[0], ...updateParams};
        
        //Update transactions table row
        const transRes = await patchRequest(url, updatedBody);
        //console.log(transRes)
        if(transRes?.data?.length){ 

            //Delete affected rows from transactionsdetails using transactionID reference
            const deleteBody  = {
            table:user.companyId+"_transactionsdetails",
            act: "DELETE",
            whereField:"transactionID",
            whereValue:transId,
            whereType: "INT"
            };
            const urlDelete = getLinkDeleteTran(user.companyId);
            const deleteRes = await patchRequest(urlDelete, deleteBody);

            if(deleteRes.ok){
                //Insert updated data in transactiondetails table
                //Dont use updateTransDetails Function to insert. It creates problem
                const insertedTransArr = [{id:transId}];
                const doubleEntryId = generateUniqueDigits('string', 100567039004701);
                const {url, body} = prepareQueryTransDetails({transSheetArr:transSheet, chartOfAccounts, controlAcctsCode, user, vendors, customers, products, insertedTransArr, doubleEntryIdArr:[doubleEntryId], postingPlat});
                await postRequest(url, body)
                .then((res)=>{
                     //For COS Entry: Entries for COS and Product Account
                    if(res?.ok){
                            const {
                                accountCodeProduct,
                                subCodeProduct,
                                quantityProduct,
                                amount,
                                accountCodeCOS,
                                tranNoRef
                            } = transSheet[0];

                            //Format params to align with prepareQuerySaleTransDetails function arguments
                            const transSheetFmt = {
                                amount,
                                accountCodeDr:productReturns? accountCodeProduct : accountCodeCOS, //Product account is debited for Sales return & COS credited
                                subCodeDr:productReturns? subCodeProduct : "",
                                quantityDr:productReturns? quantityProduct : "",
                                accountCodeCr:productReturns? accountCodeCOS : accountCodeProduct,
                                subCodeCr:productReturns? "" : subCodeProduct,
                                quantityCr:productReturns? "" : quantityProduct,
                                tranNoRef,
                            }
                            let doubleEntryId = generateUniqueDigits('string', 10000000001);
                            const insertedTransArr = [{id:res.data[0].transactionID}];
                            const {url, body} = prepareQueryTransDetails({transSheetArr:[transSheetFmt], chartOfAccounts, controlAcctsCode, user, vendors, customers, products, insertedTransArr, doubleEntryIdArr:[doubleEntryId]});
                            postRequest(url, body).then((result)=>{
                            if(result?.ok){
                                //const postingNote = `Product SALE transaction with reference ${transSheet.reference}`;
                                //postActivity(user, activities.UPDATE, postingNote);
                                transSheetReset("TAB2"); 
                                runDispatchClientDataCall()
                                toastNotify('success', 'Posting successfull');
                                setRecordingProduct(false);
                            }else{
                                toastNotify('error', res?.error || "Error in posting transaction");
                                setRecordingProduct(false);
                            }   
                        });
                    }else{
                        toastNotify('error', res?.error || "Error in updating transaction");
                        setRecordingProduct(false);
                    }
                });
            }
        }
     }       
}


async function processTransForPosting({
    transSheet, user, chartOfAccounts, controlAcctsCode, vendors, customers, products, recordTransaction,
    transSheetReset, runDispatchClientDataCall, toastNotify, TAB, router, postByUpload, resetCall, setResetCall, setRecordingProduct,
    productReturns }){
    
    let postingPlat = ""; //= TAB === "TAB1"? 'PRODUCT-PCH' : TAB === "TAB2"? 'PRODUCT-SAL' : 'PRODUCT-ADJ';
    if(TAB === "TAB1"){
        postingPlat = productReturns? 'PRODUCT-PCH-RT' : 'PRODUCT-PCH';
    }else if(TAB === "TAB2"){
        postingPlat =  productReturns? 'PRODUCT-SAL-RT' : 'PRODUCT-SAL';
    }else{
        postingPlat = 'PRODUCT-ADJ';
    }
    
    const {url, body} = prepareQueryTrans({transSheet, user, chartOfAccounts, postingPlat});
    //return console.log(url, body)
    if(recordTransaction?.editTran){
        const transListingPage = recordTransaction.transListingPage;
        const url = getLinkPostTrans(user.companyId).patch;
        const transId = recordTransaction.editDetails.id;
        const updateParams  ={
        act: "UPDATE",
        whereField:"id",
        whereValue:transId,
        whereType: "INT"};
        const updatedBody = {...body, values:body.values[0], ...updateParams};
        
        //Update transactions table row
        const transRes = await patchRequest(url, updatedBody);
        //console.log(transRes)
        if(transRes?.data?.length){ 

            //Delete affected rows from transactionsdetails using transactionID reference
            const deleteBody  = {
            table:user.companyId+"_transactionsdetails",
            act: "DELETE",
            whereField:"transactionID",
            whereValue:transId,
            whereType: "INT"
            };
            const urlDelete = getLinkDeleteTran(user.companyId);
            const deleteRes = await patchRequest(urlDelete, deleteBody);

            //console.log(deleteRes);
            if(deleteRes.ok){
                //Insert updated data in transactiondetails table
                const insertedTrans = [{id:transId}];
                updateTransDetails({transSheet, user, chartOfAccounts, controlAcctsCode, vendors, customers, products, insertedTrans,
                    transListingPage, transSheetReset, runDispatchClientDataCall, toastNotify, setRecordingProduct, router, TAB, postingPlat });
            }
        }
    }else{
        if(TAB === "TAB2"){
            return await postTrans({transSheet, user, chartOfAccounts, controlAcctsCode, vendors, customers, products, url, body, postingPlat})
        }else{
            postTransAndNotify({transSheet, user, chartOfAccounts, controlAcctsCode, vendors, customers, products, url, body,
                TAB, transSheetReset, runDispatchClientDataCall, toastNotify, postByUpload, resetCall, setResetCall, setRecordingProduct,
                postingPlat});
        }
    }
};

const saleTab ={
accountCodeCOS: "511003",
accountCodeCr: "411003",
accountCodeDr: "152000",
accountCodeProduct: "162000",
amount: "70000",
date: "2024-07-31",
description: "Sale of goods",
quantityBal: "",
quantityCr: "",
quantityDr: "",
quantityProduct: "5",
reference: "Ref-004",
subCodeCr: "",
subCodeDr: "C-000010",
subCodeProduct:"TOD0001",
unitsCr: "",
unitsDr: "",
unitsProduct:""}