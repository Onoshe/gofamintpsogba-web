import { getErrorMessage } from '@/lib/validation/getErrorMessage';
import {validateTransactionsProductPurchaseAndAdj } from "./validation/validateTransactionProductPurchaseAndAdj";
import { validateTransactionsMultiProductSale } from "./validation/validateTransactionMultiProductSale";
import { prepareQueryTrans, prepareQueryTransDetails } from './prepareQueryTransactions';
import { postRequest } from '@/lib/apiRequest/postRequest';
import { generateUniqueDigits } from '@/lib/radomNos/generateUniqueDigits';
import { patchRequest } from '@/lib/apiRequest/patchRequest';
import { getLinkDeleteTran, getLinkPostTrans } from "@/lib/apiRequest/urlLinks";


export const submitHandler = async ({transSheet, controlAcctsCode, activeTab, chartOfAccounts, setPostError, 
    toastNotify, user, personalAccounts, runDispatchClientDataCall, transSheetReset, recordTransaction, router})=>{
    const {customers, vendors, products} = personalAccounts;
    let validateRes = {};
    if(activeTab === "TAB1"){
         validateRes = validateTransactionsProductPurchaseAndAdj(transSheet, controlAcctsCode, activeTab, chartOfAccounts);
    }else if(activeTab === "TAB2"){
        validateRes = validateTransactionsMultiProductSale(transSheet, controlAcctsCode, activeTab, chartOfAccounts);
    }else if(activeTab === "TAB3"){
        validateRes = validateTransactionsProductPurchaseAndAdj(transSheet, controlAcctsCode, activeTab, chartOfAccounts);
    }
    
    //return console.log(validateRes, transSheet)
    if(validateRes?.error){
     const errorMsg = getErrorMessage(validateRes?.errorType, validateRes?.key, validateRes?.rowIndex, validateRes?.title);
     setPostError({msg:errorMsg, error:validateRes?.error});
     toastNotify('error', errorMsg);
    }else{
        const TAB = activeTab;
        if(activeTab === "TAB1"){
            /************ FOR PRODUCT PURCHASE**************** */
            processTransForPosting({transSheet, user, chartOfAccounts, controlAcctsCode, vendors, customers, products, recordTransaction,
                transSheetReset, runDispatchClientDataCall, toastNotify, TAB, router});
        }else if(activeTab === "TAB2"){
            if(recordTransaction?.editTran){
                processUpdateSalesTrans({transSheet, user, chartOfAccounts, controlAcctsCode, vendors, customers, products, recordTransaction,
                    transSheetReset, runDispatchClientDataCall, toastNotify, TAB, router});
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
                        transSheetReset, runDispatchClientDataCall, toastNotify, TAB, router});
                    
                    //For COS Entry
                    if(res?.ok){
                        const {
                            accountCodeProduct,
                            subCodeProduct,
                            quantityProduct,
                            amount,
                            accountCodeCOS
                        } = transSheet;

                        //Format params to align with prepareQuerySaleTransDetails function arguments
                        const transSheetFmt = {
                            amount,
                            accountCodeDr:accountCodeCOS,
                            subCodeDr:"",
                            quantityDr:'',
                            accountCodeCr:accountCodeProduct,
                            subCodeCr:subCodeProduct,
                            quantityCr:quantityProduct
                        }
                        let doubleEntryId = generateUniqueDigits('string', 10000000001);
                        const insertedTrans = [{id:res.data[0].transactionID}];    
                        const {url, body} = prepareQueryTransDetails({transSheet:transSheetFmt, chartOfAccounts, controlAcctsCode, user, vendors, customers, products, insertedTrans, doubleEntryId});
                        
                        await postRequest(url, body).then((result)=>{
                            if(result?.ok){
                                transSheetReset("TAB2"); 
                                runDispatchClientDataCall()
                                toastNotify('success', 'Posting successfull');
                            }else{
                            toastNotify('error', res?.error || "Error in posting transaction");
                            }   
                        });
                        
                    }else{
                    toastNotify('error', res?.error || "Error in posting transaction");
                    }
             }
        }else if(activeTab === "TAB3"){
            //TAB3- Product Adjustment Tab
            //trsnaSheet properties has to be reformatted
            const  {accountCodeDr, accountCodeCr, subCodeDr, subCodeCr, quantityDr, quantityCr, amount, unitsDr, unitsCr, entry1Sel, entry2Sel, adjustProductChecked } = transSheet;
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
            const transSheetFmt = {...transSheet, accountCodeDr:entry1Sel==1? accountCodeDr : accountCodeCr, accountCodeCr:entry2Sel==2? accountCodeCr : accountCodeDr, 
                subCodeDr:entry1Sel==1? subCodeDr : subCodeCr, subCodeCr:entry2Sel==2? subCodeCr : subCodeDr, 
                amount: adjustProductChecked=="BYCOST"? amount : 0, quantityDr:quantityDrFmt, quantityCr:quantityCrFmt,}
            //return console.log(transSheetFmt);
            processTransForPosting({transSheet:transSheetFmt, user, chartOfAccounts, controlAcctsCode, vendors, customers, products, recordTransaction,
                transSheetReset, runDispatchClientDataCall, toastNotify, TAB, router});
        }
    }  
  }



async function postTrans({transSheet, user, chartOfAccounts, controlAcctsCode, vendors, customers, products, url, body}){
    //const {url, body} = prepareQueryTrans({transSheet, user, chartOfAccounts, postingPlat});
    const transRes = await postRequest(url, body);
    if(transRes?.data?.length){
     const insertedTrans = transRes.data;
     const doubleEntryId = generateUniqueDigits('string');
     const {url, body} = prepareQueryTransDetails({transSheet, chartOfAccounts, controlAcctsCode, user, vendors, customers, products, insertedTrans, doubleEntryId});
     return await postRequest(url, body);
    }
}
async function postTransAndNotify({transSheet, user, chartOfAccounts, controlAcctsCode, vendors, customers, products, url, body,
    TAB, transSheetReset, runDispatchClientDataCall, toastNotify}){

    await postTrans({transSheet, user, chartOfAccounts, controlAcctsCode, vendors, customers, products, url, body
    }).then((res)=>{
        if(res?.ok){
            transSheetReset(TAB); 
            runDispatchClientDataCall()
            toastNotify('success', 'Posting successfull');
        }else{
        toastNotify('error', res?.error || "Error in updating user record");
        }
    });
}

async function updateTransDetails({transSheet, user, chartOfAccounts, controlAcctsCode, vendors, customers, products, insertedTrans,
    transListingPage, transSheetReset, runDispatchClientDataCall, toastNotify, router, TAB }){
     const doubleEntryId = generateUniqueDigits('string');
     const {url, body} = prepareQueryTransDetails({transSheet, chartOfAccounts, controlAcctsCode, user, vendors, customers, products, insertedTrans, doubleEntryId});
     postRequest(url, body)
     .then((res)=>{
        if(res?.ok){
            transSheetReset(TAB); 
            runDispatchClientDataCall()
            toastNotify('success', 'Posting successfull');
        }else{
        toastNotify('error', res?.error || "Error in updating user record");
        }
    }).then(()=> { 
        if(transListingPage){
            setTimeout(()=>router.push(transListingPage), 1000)
        }
    })
}


async function processUpdateSalesTrans({transSheet, user, chartOfAccounts, controlAcctsCode, vendors, customers, products, recordTransaction,
    transSheetReset, runDispatchClientDataCall, toastNotify, TAB, router}){
     //For Main Entry 
    const {url, body} = prepareQueryTrans({transSheet, user, chartOfAccounts, postingPlat:'PRODUCT-SAL'});
    
    if(recordTransaction?.editTran){
        const transListingPage = recordTransaction.transListingPage;
        const url = getLinkPostTrans().patch;
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
            const urlDelete = getLinkDeleteTran();
            const deleteRes = await patchRequest(urlDelete, deleteBody);

            if(deleteRes.ok){
                //Insert updated data in transactiondetails table
                //Dont use updateTransDetails Function to insert. It creates problem
                const insertedTrans = [{id:transId}];
                const doubleEntryId = generateUniqueDigits('string');
                const {url, body} = prepareQueryTransDetails({transSheet, chartOfAccounts, controlAcctsCode, user, vendors, customers, products, insertedTrans, doubleEntryId});
                await postRequest(url, body)
                .then((res)=>{
                     //For COS Entry
                    if(res?.ok){
                        const {
                            accountCodeProduct,
                            subCodeProduct,
                            quantityProduct,
                            amount,
                            accountCodeCOS
                        } = transSheet;

                        //Format params to align with prepareQuerySaleTransDetails function arguments
                        const transSheetFmt = {
                            amount,
                            accountCodeDr:accountCodeCOS,
                            subCodeDr:"",
                            quantityDr:'',
                            accountCodeCr:accountCodeProduct,
                            subCodeCr:subCodeProduct,
                            quantityCr:quantityProduct
                        }
                        let doubleEntryId = generateUniqueDigits('string', 10000000001);
                        const insertedTrans = [{id:res.data[0].transactionID}];
                        const {url, body} = prepareQueryTransDetails({transSheet:transSheetFmt, chartOfAccounts, controlAcctsCode, user, vendors, customers, products, insertedTrans, doubleEntryId});
                        
                            postRequest(url, body).then((result)=>{
                            if(result?.ok){
                                transSheetReset("TAB2"); 
                                runDispatchClientDataCall()
                                toastNotify('success', 'Posting successfull');
                            }else{
                                toastNotify('error', res?.error || "Error in posting transaction");
                            }   
                        });
                    }else{
                        toastNotify('error', res?.error || "Error in updating transaction");
                    }
                });
            }
        }
     }
       
}


async function processTransForPosting({
    transSheet, user, chartOfAccounts, controlAcctsCode, vendors, customers, products, recordTransaction,
    transSheetReset, runDispatchClientDataCall, toastNotify, TAB, router }){
    
    const {url, body} = prepareQueryTrans({transSheet, user, chartOfAccounts, postingPlat:TAB === "TAB1"? 'PRODUCT-PCH' : TAB === "TAB2"? 'PRODUCT-SAL' : 'PRODUCT-ADJ'});
    //return console.log(url, body)
    if(recordTransaction?.editTran){
        const transListingPage = recordTransaction.transListingPage;
        const url = getLinkPostTrans().patch;
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
            const urlDelete = getLinkDeleteTran();
            const deleteRes = await patchRequest(urlDelete, deleteBody);

            if(deleteRes.ok){
                //Insert updated data in transactiondetails table
                const insertedTrans = [{id:transId}];
                updateTransDetails({transSheet, user, chartOfAccounts, controlAcctsCode, vendors, customers, products, insertedTrans,
                    transListingPage, transSheetReset, runDispatchClientDataCall, toastNotify, router, TAB });
            }
        }
    }else{
        if(TAB === "TAB2"){
            return await postTrans({transSheet, user, chartOfAccounts, controlAcctsCode, vendors, customers, products, url, body})
        }else{
            postTransAndNotify({transSheet, user, chartOfAccounts, controlAcctsCode, vendors, customers, products, url, body,
                TAB, transSheetReset, runDispatchClientDataCall, toastNotify});
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