import { addDays } from "./dummyTransHelpers1";


  //Helper functions
  export function createSavings({date, accountCode, payableAcctCodes, transactions, bankAcctCode, dueDate, dueDateType, amount, formFees, generateEntry, saleOfFormsAcctCode}){
    //Payable control
    let payableAcct = payableAcctCodes[Math.floor(Math.random() * payableAcctCodes.length)];
    let accountCodeSub = payableAcct.accountCode;
    const description = "Savings by "+(payableAcct.firstname+' '+payableAcct.lastname);
    transactions.push(generateEntry({date, description, debitAccount:bankAcctCode, creditAccount:accountCode, debitSub:null, creditSub:accountCodeSub, reference:'Savings', dueDate, dueDateType:"PAY", amount}));
    
    //Membership form
    if(!formFees.includes(accountCodeSub)){
     formFees.push(accountCodeSub);
     const descForm = "Entrance fees paid by " +(payableAcct.firstname+' '+payableAcct.lastname);
     transactions.push(generateEntry({date, description:descForm, debitAccount:bankAcctCode, creditAccount:saleOfFormsAcctCode, debitSub:null, creditSub:null, reference:'Entrance fees', dueDate:null, amount:1000}));
   }
  }

 export function postToExistingMemberLoan({accountCode, accountCodeSub, membersLoan, description, transactions, dueDate, dueDateType,
      receivableAcct, generateEntry, intIncome,bankAcctCode, amountLoan, unrealisedInt, saleOfFormsAcctCode, existingLoanCount, }){
    let membersLoanRes = membersLoan;

    const memberLoanObj = membersLoan[accountCodeSub];
    let loanDate = addDays(memberLoanObj.loanDate, 15);
    const date = loanDate;
    const newLoanDateValid = new Date().getTime() > new Date(date).getTime(); // New loan date must not be after today
      
    if(newLoanDateValid){    
      if(parseInt(Math.abs(memberLoanObj?.bal))> 0){
          //Reduce or clear loan
            membersLoanRes  =   reduceOrClearLoan({date, accountCode, accountCodeSub, membersLoan, description, transactions, dueDate, dueDateType,
            receivableAcct, generateEntry, intIncome,bankAcctCode, existingLoanCount, unrealisedInt});
      }else{
          
          //New Loan
          description = "Another loan to "+(receivableAcct.firstname+' '+receivableAcct.lastname);
          transactions.push(generateEntry({date, description, debitAccount:accountCode, creditAccount:bankAcctCode, debitSub:accountCodeSub, creditSub:null, reference:'New Loan', dueDate:182, dueDateType, amount:amountLoan, loanBal:amountLoan, loanIndv:accountCodeSub}));
          
          //Loan Interest
          const descIn = `Loan interest of 10% on loan of ${amountLoan}`;
          const loanInt = amountLoan * 0.1;
          transactions.push(generateEntry({date, description:descIn, debitAccount:accountCode, creditAccount:intIncome,  debitSub:accountCodeSub, creditSub:null, reference:"Loan Interest", dueDate:null, amount:loanInt}));
  
          //Loan form
          const descForm = `Loan form fees paid by `+(receivableAcct.firstname+' '+receivableAcct.lastname);
          transactions.push(generateEntry({date, description:descForm, debitAccount:bankAcctCode, creditAccount:saleOfFormsAcctCode, debitSub:null, creditSub:null, reference:'Loan form', dueDate:null, amount:1000}));
  
          //Update Members loan- Add loan
          membersLoanRes = {...membersLoan, [accountCodeSub]:{...memberLoanObj, t:6, bal:amountLoan + loanInt, loan:amountLoan + loanInt, loanInt, loanDate:date, count:memberLoanObj.count +1, arr:[...memberLoanObj.arr, amountLoan], dateArr:[...memberLoanObj.dateArr, date]}}
    
      }
    }
    return membersLoanRes  
}

  //Loan with non zero balance
  function reduceOrClearLoan({date, accountCode, accountCodeSub, membersLoan, description, transactions, dueDate, dueDateType,
    receivableAcct, generateEntry, intIncome,bankAcctCode, unrealisedInt}){
      let membersLoanRes = membersLoan
      const memberLoanObj = membersLoan[accountCodeSub];
    if(memberLoanObj?.bal <= 20000){
      //Clear outstanding
      description = "Loan fully repaid by "+(receivableAcct.firstname+' '+receivableAcct.lastname);
      const amountRepaid = Math.abs(memberLoanObj.bal);
      const loanBal = memberLoanObj.bal - amountRepaid;
      transactions.push(generateEntry({date, description, debitAccount:bankAcctCode, creditAccount:accountCode, debitSub:null, creditSub:accountCodeSub, reference:'Loan fully repaid', dueDate, dueDateType, amount:amountRepaid, loanBal, loanIndv:accountCodeSub}));

      
      //Update membersLoan- clear
      membersLoanRes = {...membersLoan, [accountCodeSub]:{...memberLoanObj, bal:loanBal, t:0, loan:0, loanInt:0, loanDate:date, count:memberLoanObj.count +1, arr:[...memberLoanObj.arr, -amountRepaid],  dateArr:[...memberLoanObj.dateArr, date]}};
      //existingLoanCount -=1;
    }else{                
      //Update membersLoan- reduce
      const amountOutstanding = memberLoanObj.bal;
      const t = memberLoanObj.t -1;
      let amountPart = amountOutstanding / t;
      let repaidAmount = 0;
      if(amountOutstanding > amountPart){
        repaidAmount = amountPart;
      }else{
        repaidAmount = amountOutstanding;
      }
      const loanBal = amountOutstanding - repaidAmount;
      const fullPayment = loanBal <=0;
      membersLoanRes = {...membersLoan, [accountCodeSub]:{...memberLoanObj, bal:loanBal, t, loanDate:date, count:memberLoanObj.count +1, arr:[...memberLoanObj.arr, -repaidAmount],  dateArr:[...memberLoanObj.dateArr, date]}};
     // membersLoanRes = {...membersLoan, [accountCodeSub]:{...memberLoanObj, t:6, bal:amountLoan + loanInt, loan:amountLoan + loanInt, loanInt, loanDate:date, count:memberLoanObj.count +1, arr:[...memberLoanObj.arr, amountLoan], dateArr:[...memberLoanObj.dateArr, date]}}

      description = fullPayment? "Loan principal and interest of "+memberLoanObj.loan+" fully reapid by "+(receivableAcct.firstname+' '+receivableAcct.lastname): 
                    "Loan repayment by "+(receivableAcct.firstname+' '+receivableAcct.lastname);
        transactions.push(generateEntry({date, description, debitAccount:bankAcctCode, creditAccount:accountCode, debitSub:null, creditSub:accountCodeSub, reference:'Loan repayment', dueDate, dueDateType, amount:repaidAmount, loanBal, loanIndv:accountCodeSub}));
    }
    return membersLoanRes
  };