import { sortArrayByKey } from "@/lib/sort/sortArrayByKey";

export const getReceiptsAndPaymentsCall =(transactions, dateForm, coaStructure)=>{

  
    //return
    const transWithinDate = [];
    const cashAndBankReceipts = {bank:[], cash:[], paymentCl:[]};
    const cashAndBankPayments = {bank:[], cash:[], paymentCl:[]};
    let cashAndBankEntriesTotal = {receipts:{cash:0, bank:0, paymentCl:0}, payments:{cash:0, bank:0, paymentCl:0}};
    let netDoubleEntry = 0;

    let paymentsAndReceipts = {summary:[], all:[]};
    const startDate = dateForm.startDate;
    const endDate = dateForm.endDate;
    const bankCode = coaStructure?.find((dt)=> dt.name === "bank")?.code;
    const cashCode = coaStructure?.find((dt)=> dt.name === "cash")?.code;
    const paymentClCode = coaStructure?.find((dt)=> dt.name === "paymentClearing")?.code;
    let startDateVal = new Date(startDate).getTime();
    let endDateVal = new Date(endDate).getTime();
    sortArrayByKey(transWithinDate, 'transactionDate');

    for (const tran of transactions) {
         const {transactionDate} = tran;
         const tranDate = new Date(transactionDate).getTime();
         if(tranDate >= startDateVal && tranDate <= endDateVal){
            transWithinDate.push(tran)
         }
    }
   // console.log(transWithinDate);
    
   for (const tran of transWithinDate) {
    const {transactionDate, typeCode, reference, documentNo, description, accountCode, voucher, transactionNo, 
      accountName, accountCodeSub, accountCodeSubName, transId,  amount, entryType, updatedAt, updatedBy} = tran;
      const doubleEntries = transactions.filter((dt)=> dt.transId == transId && (dt.documentNo != documentNo));
      let amountAbs = parseFloat(Math.abs(amount)) || 0;
      //console.log(amountAbs)
      let drEntryType = entryType === "DR";
      
      if(typeCode == bankCode){
         doubleEntries?.forEach(el => {
           const prepEntry =  prepareEntry(el, 'credit');
           if(drEntryType){
             cashAndBankReceipts.bank.push(prepEntry); 
             cashAndBankEntriesTotal.receipts.bank += amountAbs;
             netDoubleEntry += parseFloat(prepEntry.credit) || 0;
           }else{
            const prepEntry =  prepareEntry(el);
            cashAndBankPayments.bank.push(prepEntry); 
            cashAndBankEntriesTotal.payments.bank += amountAbs;
            netDoubleEntry -= parseFloat(prepEntry.debit) || 0;}
         });  
      }else if(typeCode == cashCode){
        doubleEntries?.forEach(el => {
          const prepEntry =  prepareEntry(el, 'credit');
          if(drEntryType){
            cashAndBankReceipts.cash.push(prepEntry); 
            cashAndBankEntriesTotal.receipts.cash += amountAbs;
            netDoubleEntry += parseFloat(prepEntry.credit) || 0;
          }else{
            const prepEntry =  prepareEntry(el);
            cashAndBankPayments.cash.push(prepEntry); 
            cashAndBankEntriesTotal.payments.cash += amountAbs;
            netDoubleEntry -= parseFloat(prepEntry.debit) || 0;}
        });
      }else if(typeCode == paymentClCode){
        doubleEntries?.forEach(el => {
          const prepEntry =  prepareEntry(el, 'credit');
          if(drEntryType){
            cashAndBankReceipts.paymentCl.push(prepEntry); 
            cashAndBankEntriesTotal.receipts.paymentCl += amountAbs;
            netDoubleEntry += parseFloat(prepEntry.credit) || 0;
          }else{
            const prepEntry =  prepareEntry(el);
            cashAndBankPayments.paymentCl.push(prepEntry); 
            cashAndBankEntriesTotal.payments.paymentCl += amountAbs;
            netDoubleEntry -= parseFloat(prepEntry.debit) || 0;}
        });
      }
   }

   //Push to paymentsAndReceipts array
   paymentsAndReceipts.all.push(getClassRow("RECEIPTS", ""));
   paymentsAndReceipts.all.push({}); 
   paymentsAndReceipts.all.push(getClassRow("Receipts in Bank", ""));
   cashAndBankReceipts?.bank?.forEach(el => {
    paymentsAndReceipts.all.push(el);
   });
  
   //paymentsAndReceipts.all.push({}); 
   paymentsAndReceipts.all.push(getClassRow("Cash Receipts", ""));
   cashAndBankReceipts?.cash?.forEach(el => {
    paymentsAndReceipts.all.push(el);
   });

   //paymentsAndReceipts.all.push({}); 
   paymentsAndReceipts.all.push(getClassRow("Other Receipts", ""));
   cashAndBankReceipts?.paymentCl?.forEach(el => {
    paymentsAndReceipts.paymentCl.push(el);
   });
   const totalReceiptsAmt = cashAndBankEntriesTotal.receipts.bank + cashAndBankEntriesTotal.receipts.cash + cashAndBankEntriesTotal.receipts.paymentCl;
   const totalReceipts = {
    date:"Total Receipts",
    account:"",  
    titleRow:true,
    credit:totalReceiptsAmt,
    classNameTD:"font-bold",
  };
  paymentsAndReceipts.all.push(totalReceipts);


   //paymentsAndReceipts.all.push({}); 
   paymentsAndReceipts.all.push(getClassRow("PAYMENTS", ""));
   paymentsAndReceipts.all.push({}); 
   [...cashAndBankPayments.bank, ...cashAndBankPayments.cash, ...cashAndBankPayments.paymentCl].forEach(el => {
    paymentsAndReceipts.all.push(el);
   });
   const totalPaymentsAmt = cashAndBankEntriesTotal.payments.bank + cashAndBankEntriesTotal.payments.cash + cashAndBankEntriesTotal.payments.paymentCl;
   const totalPayments = {
    date:"Total Payments",
    account:"",  
    titleRow:true,
    credit:totalPaymentsAmt,
    debit:totalPaymentsAmt,
    classNameTD:"font-bold",
  };
  paymentsAndReceipts.all.push(totalPayments);

  const netAmount = {
    date:"Net Amount",
    account:"",  
    titleRow:true,
    credit: totalReceiptsAmt - totalPaymentsAmt,
    classNameTD:"font-bold",
  };
  paymentsAndReceipts.all.push(netAmount);

   //console.log(netDoubleEntry)
  
    return {paymentsAndReceipts}
  } 
  //_______________________

  function getClassRow(dateTitle, classTitle){
    const classRow = {
      date:dateTitle,
      account:classTitle,  
      titleRow:true,
      classNameTD:"font-bold",
    };
    return classRow
  }

  function prepareEntry(tran, type){
      const {transactionDate, typeCode, reference, documentNo, description, accountCode, voucher, transactionNo, 
        accountName, accountCodeSub, accountCodeSubName, transId,  amount, entryType, updatedAt, updatedBy} = tran;
      const amountFmt = parseFloat(Math.abs(amount));
      const accountSubName = accountCodeSub? accountCodeSub+" "+accountCodeSubName : "";
      const account =accountCode + " "+accountName; 
      const accountSub = accountSubName;
      const  recordedTran = {
          date:transactionDate,  
          accountCode,
          accountCodeSub,
          account, 
          accountSub,
          transactionNo,
          entryNo:documentNo, 
          description, 
          voucher,
          reference,
          debit: type?  0 : amountFmt,
          credit: type?  amountFmt : 0,
          entryType,
          typeCode,
          transId,
          postedBy:updatedBy,
          postedDate:updatedAt,
          classNameTD:"hover:text-[blue] active:text-blue-400 cursor-pointer",
          //clickables:"ALL"
      };
   return recordedTran
  }