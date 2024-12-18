import { formatToCurrency } from "@/lib/currency";


const getDataLedger =(ledgers, allAccountCodes)=>{
   
   const ledgerCodes = Object.keys(ledgers);
      const ledgerAccts = ledgerCodes?.reduce((accum, ledgerCode, index)=>{
         const ledger = ledgers[ledgerCode]
         const {transactions, creditAccount, debitAccount, } = ledger;
         const ledgerName = ledger.accountName;
         //const ledgerBalance = ledger.balance;
         //const isSubAcctMain = ledger.isSubAcct;
         
         let ledgerTransactions = [];
         
         if(transactions?.length){
            let balance = 0;
            ledgerTransactions = transactions.reduce((res, trans, i)=>{
               const {date, description, accountCode, accountName, accountCodeSub, transactionNo, amount, type} = trans;
               const valueFmt = formatToCurrency(Math.abs(amount), 2);
               let debit = 0; let credit = 0; 
                  debit = type === 'DR'? valueFmt : '-';
                  credit = type === 'CR'? valueFmt : '-';
                  balance = balance + parseFloat(amount);
               const offsetAcctCode = type === 'DR'? trans?.creditAccount : trans?.debitAccount;
               const offsetAcctName = allAccountCodes[offsetAcctCode]?.accountName;    
               return [
                     ...res,
                     {
                        date,
                        description,
                        accountCodeSub,
                        accountCode,
                        accountName,
                        transactionNo,
                        debit,
                        credit,
                        offsetAcctCode,
                        offsetAcctName,
                        balance:formatToCurrency(balance),
                     }      
                  ]
            },[]);
         }
      
      return [
            ...accum,
            {},
            {
               date:ledgerCode,
               description:'',
               //accountCodeSub:"",
               accountCode:ledgerName,
               accountName:"",
               transactionNo:"",
               debit:"",
               credit:"",
               balance:"",
            },
            ...ledgerTransactions,      
         ]

      },[]);   
   return ledgerAccts
 }



 
const getDataPersonalLedger =(personalLedger, allAccountCodes)=>{
         const {transactions, creditAccount, debitAccount, } = personalLedger;
         const ledgerName = personalLedger.accountName;
         const ledgerCode = personalLedger.accountCode;
         
         let ledgerTransactions = [];
         
         if(transactions?.length){
            let balance = 0;
            ledgerTransactions = transactions.reduce((res, trans, i)=>{
               const {date, description, accountCode, accountName, accountCodeSub, transactionNo, amount, type} = trans;
               const valueFmt = formatToCurrency(Math.abs(amount), 2);
               let debit = 0; let credit = 0; 
                  debit = type === 'DR'? valueFmt : '-';
                  credit = type === 'CR'? valueFmt : '-';
                  balance = balance + parseFloat(amount);
               const offsetAcctCode = type === 'DR'? trans?.creditAccount : trans?.debitAccount;
               const offsetAcctName = allAccountCodes[offsetAcctCode]?.accountName;    
               return [
                     ...res,
                     {
                        date,
                        description,
                        accountCodeSub,
                        accountCode,
                        accountName,
                        transactionNo,
                        debit,
                        credit,
                        offsetAcctCode,
                        offsetAcctName,
                        balance:formatToCurrency(balance),
                     }      
                  ]
            },[]);
         }
      
      return [
            {
               date:ledgerCode,
               description:'',
               //accountCodeSub:"",
               accountCode:ledgerName,
               accountName:"",
               transactionNo:"",
               debit:"",
               credit:"",
               balance:"",
            },
            ...ledgerTransactions,      
         ]   
 }


 export { getDataLedger, getDataPersonalLedger}