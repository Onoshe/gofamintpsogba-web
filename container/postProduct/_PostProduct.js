'use client'
import React, { useState } from 'react';
import PostContainerMultiEntry from './components/multiEntries/PostContainerMultiEntry';
import useStoreTransactions from '@/context/storeTransactions';
import { mapChartOfAccount } from '@/lib/transactionsManager/mapChartOfAccount';
import { mapPersonalAccounts } from '@/lib/transactionsManager/mapPersonalAccounts';
import { mapProducts } from '@/lib/transactionsManager/mapProducts';
import { LedgersManager } from '../reports/utils/ledgers/ledgersManger';
import useStoreRecordTransaction from '@/context/storeRecordTransaction';
import { handleDeleteTransaction } from '../postTransaction/components/utils/handleDeleteTransaction';
import ConfirmAlert from '@/components/confirmAlert/ConfirmAlert';
import PostingGuide from '@/components/guide/PostingGuide';
import { getStartAndEndDate } from '@/lib/dummyData/getStartAndEndDate';
import { useRouter } from 'next/navigation';
import CashAndBankBalances from '../postTransaction/components/balancesComponent/CashAndbankBalances';
import { useAuthCustom } from '@/lib/hooks/useAuthCustom';



const IndexPostProduct = ({ssUser}) => {
  const { session, user,  status} = useAuthCustom(ssUser);
  const router = useRouter();
  const dateForm = getStartAndEndDate();
  const {coaStructure,customers, vendors, chartOfAccounts, controlAcctsCode, products, transactions, transactionsDetails, runDispatchClientDataCall} = useStoreTransactions((state) => state);
  const {recordTransaction, tranSheetProducts, dispatchTranSheetProducts, productPageActiveTab, dispatchProductPageActiveTab, 
     dispatchTranSheetProductsReset} = useStoreRecordTransaction((state) => state);  
  let transProcessor = new LedgersManager({trans:transactions, transactions:transactionsDetails, chartOfAccounts, customers, vendors, products, controlAcctsCode, coaStructure, dateForm});
  let ledgersAcct = transProcessor.processTransactions();
  const processedLedgers = ledgersAcct.processedLedgers;

  const personalAccts =  mapPersonalAccounts(customers, vendors);
  const chartOfAccountSelection = (mapChartOfAccount(chartOfAccounts, coaStructure));
  const productsList = mapProducts(products);
  const transSheet = tranSheetProducts;
  const setTransSheet = dispatchTranSheetProducts;
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [showBankBalances, setShowBankBalances] = React.useState(false);
  
  

  //const [activeTab, setActiveTab] = useState("TAB1");
  //const [transSheet, setTransSheet] = useState({date:"", description:'', reference:'', amount:'', accountCodeDr:'', subCodeDr:'', quantityDr:'',unitsDr:'',accountCodeCr:'', subCodeCr:'', quantityCr:'',unitsCr:'',accountCodeProduct:'', subCodeProduct:'', quantityProduct:'',unitsProduct:'', accountCodeCOS:'', quantityBal:''});
  let productBalance = {bal:0, price:0};
  //console.log(ledgersAcct, processedLedgers)

  if(transSheet?.subCodeProduct && ledgersAcct?.productsLedger[transSheet?.subCodeProduct]?.trans.length){
   productBalance = ledgersAcct?.productsLedger[transSheet?.subCodeProduct].trans.reduce((cum, dt, i, arr)=>{
      cum.bal = cum.bal + parseFloat(dt.quantity);
      let price = dt.prodBal.avgCost; 
      if(i == (arr.length -1)){price = dt.prodBal.avgCost;}
      cum.price = price;
      return cum
    },{bal:0, price:0});
  }

  
  //console.log(transSheet,ledgersAcct?.productsLedger[transSheet?.subCodeProduct])
  //console.log(ledgersAcct.productsLedger.RDW0001.trans);
  //console.log(transSheet);
  

  const transSheetReset =(tab)=>{
    const purchaseFlds = ({date:"", description:'', reference:'', amount:'', accountCodeDr:'', subCodeDr:'', quantityDr:'',unitsDr:'',accountCodeCr:'', subCodeCr:'', quantityCr:'',unitsCr:''});
    const salseFlds = ({date:"", description:'', reference:'', amount:'', accountCodeDr:'', subCodeDr:'', quantityDr:'',unitsDr:'',accountCodeCr:'', subCodeCr:'', quantityCr:'',unitsCr:'',accountCodeProduct:'', subCodeProduct:'', quantityProduct:'',unitsProduct:'', accountCodeCOS:'', quantityBal:''});
    if(tab==="TAB1" || tab==="TAB3"){
      setTransSheet(purchaseFlds);
    }else if(tab==="TAB2"){
      setTransSheet(salseFlds);
    }
    dispatchTranSheetProductsReset();
  }

  const handleDeleteTran =()=>{
    setShowConfirm(true)
  }

  const handleCancelTran =()=>{
      //dispatchTranSheetTwoEntryReset();
      transSheetReset();
      //const transListingPage = recordTransaction.transListingPage;
      //router.push(transListingPage);
  }
  
  const handleConfirm = (act)=>{
      if(act === "CANCEL"){setShowConfirm(false); }
      if(act === "CONTINUE"){
        handleDeleteTransaction({ recordTransaction,  user, setShowConfirm, notify, runDispatchClientDataCall, router})
      }
  }

  return (
    <div className={`text-sm relative`}>
            <div className={`w-full pt-10 justify-center items-center ${showBankBalances? 'flex absolute' : 'hidden'}`}>
              <CashAndBankBalances 
                processedLedgers={processedLedgers}
                chartOfAccounts={chartOfAccounts}
                coaStructure={coaStructure}
                handleCloseBankBal={()=>setShowBankBalances(!showBankBalances)}
              />
            </div>  
            <div className=''>
              <PostContainerMultiEntry
                  chartOfAccounts={chartOfAccounts}
                  chartOfAccountSelection={chartOfAccountSelection}
                  personalAccts={personalAccts}
                  personalAcctsList = {{customersList:customers, vendorsList:vendors,}}
                  productsList={productsList}
                  controlAcctsCode={controlAcctsCode}
                  personalAccounts={{customers, vendors, products}}
                  user={user}
                  runDispatchClientDataCall={runDispatchClientDataCall}
                  transactionsDetails={transactionsDetails}
                  transSheet={transSheet}
                  setTransSheet={setTransSheet}
                  transSheetReset={transSheetReset}
                  productBalance={productBalance}
                  activeTab={productPageActiveTab}
                  setActiveTab={dispatchProductPageActiveTab}
                  recordTransaction={recordTransaction}
                  handleDeleteTran={handleDeleteTran}
                  coaStructure={coaStructure}
                  processedLedgers={processedLedgers}
                  handleCancelTran={handleCancelTran}
                  showBankBalances={showBankBalances}
                  setShowBankBalances={setShowBankBalances}
                />
            </div>
            
            <ConfirmAlert 
                showBlind={showConfirm}
                title={"Do you really want to delete transaction "+recordTransaction?.editDetails?.transactionNo+" ?"}
                msg="Please note that all entries associated with this transaction will also be deleted."
                handleCancel={()=>handleConfirm("CANCEL")}
                handleContinue={()=>handleConfirm("CONTINUE")}
              />
            
      </div>
  )
}

export default IndexPostProduct;

