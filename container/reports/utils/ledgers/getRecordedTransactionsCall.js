import { sortArrayByKey } from "@/lib/sort/sortArrayByKey";


export const getRecordedTransactionsCall =(transactions, dateForm, coaStructure)=>{

  //getReceiptsAndPayment(transactions, dateForm, coaStructure);
  //console.log(transactions)
    //return
    const transWithinDate = [];
    let recordedTransObj = {};
    let recordedTransArr = [];
    const startDate = dateForm.startDate;
    const endDate = dateForm.endDate;
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
    
    if (transWithinDate?.length) {
    for (const tran of transWithinDate) {
    
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
            debit: entryType==="DR"? amountFmt : 0,
            credit: entryType==="CR"? amountFmt : 0,
            entryType,
            typeCode,
            transId,
            postedBy:updatedBy,
            postedDate:updatedAt,
            classNameTD:"hover:text-[blue] active:text-blue-400 cursor-pointer",
            //clickables:"ALL"
        };
        recordedTransArr.push(recordedTran);
      }
    }
    const recordedTransSummary = [];
    let classTotal = {debit:0, credit:0, debitTotal:0, creditTotal:0};
    sortArrayByKey(recordedTransArr,'accountCode');

    for (let i=0; i < recordedTransArr.length; i++) {  
       const currentTran = recordedTransArr[i];
        const prevTran = recordedTransArr[i===0? i : i-1];
        const nextTran = recordedTransArr[i+1];
        const {typeCode, debit, credit} = currentTran;
       const classObj = coaStructure.find((dt)=> dt.code == typeCode);
       const classTitle = classObj.title;
       const  recordedTranTitle = {
          date:'Account:',
          account:classTitle,  
          titleRow:true,
          classNameTD:"font-bold",
        };
       if(!recordedTransSummary.length){
          recordedTransSummary.push(recordedTranTitle);
        } 
       if(currentTran.typeCode != prevTran.typeCode){ 
            const  recordedTranTotal = {
                account:"Sub Total",  
                totalRow:true,
                debit:classTotal.debit,
                credit:classTotal.credit,
                classNameTD:"font-bold",
              };
          recordedTransSummary.push(recordedTranTotal);
          classTotal = {...classTotal, debit:0, credit:0};
          recordedTransSummary.push(recordedTranTitle);
       }
      recordedTransSummary.push(currentTran);
      classTotal.debit += debit;
      classTotal.credit += credit; 
      classTotal.debitTotal += debit; 
      classTotal.creditTotal += credit; 
    }
    const  recordedTranGTotal = {
      account:"Total recorded transactions",  
      totalRow:true,
      debit:classTotal.debitTotal,
      credit:classTotal.creditTotal,
      classNameTD:"font-bold",
    };

    recordedTransSummary.push(recordedTranGTotal);
    recordedTransArr.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
   //console.log(transactions, coaStructure, dateForm);

    return {recordedTransSummary, recordedTransArr}
  } 