import { split } from "postcss/lib/list";
import { sortArrayByKey } from "../sort/sortArrayByKey";


export function dummyTransactionsGenerator({chartOfAcctCodes, receivableAcctCodes, payableAcctCodes, numTransactions, }) {
  //const accountCodeControl = chartOfAcctCodes.find((el)=> el.typeCode == 142).accountCode;
    

    let transactions = [];
    let membersLoan = {};
    //let trans = [];
    let currentDate = new Date();
    let startDate = new Date(2022, 5, 1);
    let formFees = [];
    let existingLoanCount = 0;
  
    for (let i = 0; i < numTransactions; i++) {
      let coa = chartOfAcctCodes[Math.floor(Math.random() * chartOfAcctCodes.length)];
      let accountCode = coa.accountCode.toString();
      const bankAcctCode = getRandomArrayValue([121000, 121500]); 
      const saleOfFormsAcctCode = 411000; //chartOfAcctCodes.find(dt => dt.accountCode == 411000).accountCode;
      const unrealisedInt = 231500;
      const intIncome = 412150;

      let date = getRandomDate(startDate, currentDate);
      let amount = getRandomAmount(5000, 450000);
      const amountLoan =  getRandomAmountInthousand(500000, 1000000);
      let description = '';
      let dueDate = 30;
      let dueDateType = "REC";

      if (coa?.typeCode == 142) {
        //Receivable control: New Loan, Loan repayment
        let receivableAcct = receivableAcctCodes[Math.floor(Math.random() * receivableAcctCodes.length)];
        let accountCodeSub = receivableAcct.accountCode;
        const memberLoanObj = membersLoan[accountCodeSub];
        //console.log(membersLoan, accountCodeSub)
        if(memberLoanObj){
           //Member loan exist  
          membersLoan =   postToExistingMemberLoan({date, accountCode, accountCodeSub, membersLoan, description, transactions, dueDate, dueDateType,
            receivableAcct, generateEntry, intIncome, bankAcctCode, amountLoan, unrealisedInt, saleOfFormsAcctCode, existingLoanCount});
        }else{
              //Fresh Loan
              let loanDate = addDays('2022-07-01', 1);
              const freshLoanDateValid = new Date().getTime() > new Date(loanDate).getTime(); // New loan date must not be after today
              //console.log(freshLoanDateValid, loanDate);

             // if(!freshLoanDateValid) return
              description = "Fresh loan to "+(receivableAcct.firstname+' '+receivableAcct.lastname);
              const loanBal = amountLoan;
              transactions.push(generateEntry({date:loanDate, description, debitAccount:accountCode, creditAccount:bankAcctCode, debitSub:accountCodeSub, creditSub:null, reference:'Fresh Loan', dueDate:182, dueDateType, amount:amountLoan, loanBal, loanIndv:accountCodeSub}));

             //Loan Interest
             const desc = `Loan interest of 10% on loan of ${amountLoan}`;
             const loanInt = amountLoan * 0.1;
             transactions.push(generateEntry({date:loanDate, description:desc, debitAccount:accountCode, creditAccount:intIncome,  debitSub:accountCodeSub, creditSub:null, reference:'Loan interest', dueDate:182,dueDateType, amount:loanInt}));

            //Loan form
            const descForm = `Loan form fees paid by `+(receivableAcct.firstname+' '+receivableAcct.lastname);
            transactions.push(generateEntry({date:loanDate, description:descForm, debitAccount:bankAcctCode, creditAccount:saleOfFormsAcctCode, debitSub:null, creditSub:null, reference:'Loan Form', dueDate:null, amount:1000}));

             //Update Members loan- Add loan
             const loanTotal = amountLoan + loanInt;
             membersLoan ={...membersLoan, [accountCodeSub]:{t:6, bal:loanTotal, loan:loanTotal, loanInt, loanDate, count:0, arr:[loanTotal], dateArr:[loanDate]}};
             existingLoanCount +=1;
        }
          
      } else if (coa?.typeCode == 232) {
        //Payable control: Savings
        createSavings({date, accountCode, payableAcctCodes, transactions, bankAcctCode, dueDate, dueDateType:null, amount, formFees, generateEntry, saleOfFormsAcctCode});
      }else if (coa?.typeCode == 111) {
        description = "Purchase of "+coa.accountName;
        transactions.push(generateEntry({date, description, debitAccount:accountCode, creditAccount:bankAcctCode, debitSub:null, creditSub:null, reference:'Asset aqusition', dueDate:0, amount}));
      } else{
        //(coa?.typeCode == 521) Expenses: To reduce the frequency of expenses generated, it will shufle between loan repayment and expenses
        const randVal = getRandomArrayValue([1, 2]); 
        if(randVal == 1){
          description = "Payment for "+coa.accountName +" expenses";
          transactions.push(generateEntry({date, description, debitAccount:accountCode, creditAccount:bankAcctCode, debitSub:null, creditSub:null, reference:'Expenses', dueDate:0, amount}));
        }else{
          //Loan repayment: Get accountCodeSub from membersLoanCodes bucket
          const membersLoanCodes =  Object.keys(membersLoan);
          if(membersLoanCodes?.length){
            const randMemberCode = getRandomArrayValue(membersLoanCodes);
            let accountCodeSub = randMemberCode;
            const accountCodeControl = chartOfAcctCodes.find((el)=> el.typeCode == 142).accountCode;
            const receivableAcct = receivableAcctCodes.find((dt)=> dt.accountCode == accountCodeSub);
           membersLoan =  postToExistingMemberLoan({date, accountCode:accountCodeControl, accountCodeSub, membersLoan, description, transactions, dueDate, dueDateType,
              receivableAcct, generateEntry, intIncome, bankAcctCode, amountLoan, unrealisedInt, saleOfFormsAcctCode,  existingLoanCount}); 
          }else{
            description = "Payment for "+coa.accountName +" expenses";
            transactions.push(generateEntry({date, description, debitAccount:accountCode, creditAccount:bankAcctCode, debitSub:null, creditSub:null, reference:'Expenses', dueDate:0, amount}));
          }
        }
      }

      //Create savings every time
       const accountCodeForSavings = chartOfAcctCodes.find((dt)=> dt.typeCode == 232).accountCode;
       createSavings({date, accountCode:accountCodeForSavings, payableAcctCodes, transactions, bankAcctCode, dueDate, dueDateType:"PAY", amount, formFees, saleOfFormsAcctCode, generateEntry});
    }
     //transactions.sort((a, b) => new Date(a.date) - new Date(b.date));
     const loanIndvVoid = [];
     const loanIndvValid = [];
      for (let i = 0; i < transactions.length; i++) {
        const el = [...transactions][i];
        if(el.loanIndv){
          loanIndvValid.push(el)
        }else{loanIndvVoid.push(el)}  
      }
      const sorted = sortByInt(loanIndvValid);
      const result = [...sorted, ...loanIndvVoid];
      //console.log(membersLoan)
    return transactions;
  }
  
  //Helper functions
  function createSavings({date, accountCode, payableAcctCodes, transactions, bankAcctCode, dueDate, dueDateType, amount, formFees, generateEntry, saleOfFormsAcctCode}){
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

  function postToExistingMemberLoan({accountCode, accountCodeSub, membersLoan, description, transactions, dueDate, dueDateType,
      receivableAcct, generateEntry, intIncome,bankAcctCode, amountLoan, unrealisedInt, saleOfFormsAcctCode, existingLoanCount, }){
    let membersLoanRes = membersLoan;

    const memberLoanObj = membersLoan[accountCodeSub];
    let loanDate = addDays(memberLoanObj.loanDate, 15);
    const date = loanDate;
    const newLoanDateValid = new Date().getTime() > new Date(date).getTime(); // New loan date must not be after today

      if(parseInt(Math.abs(memberLoanObj?.bal))> 0){
        //Reduce or clear loan
      membersLoanRes  =   reduceOrClearLoan({date, accountCode, accountCodeSub, membersLoan, description, transactions, dueDate, dueDateType,
          receivableAcct, generateEntry, intIncome,bankAcctCode, existingLoanCount, unrealisedInt});
    }else{
        //console.log(!newLoanDateValid, (new Date().toISOString()).split("T")[0], loanDate);
        // if(date && !newLoanDateValid) return
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

      //Move interest to Income
      //const amountInt = memberLoanObj.loanInt;
      //transactions.push(generateEntry({date, description, debitAccount:unrealisedInt, creditAccount:intIncome, debitSub:null, creditSub:null, reference:'realised interest', dueDate, dueDateType, amount:amountInt}));
      
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
      membersLoanRes = {...membersLoan, [accountCodeSub]:{...memberLoanObj, bal:loanBal, t, loanDate:date, count:memberLoanObj.count +1, arr:[...memberLoanObj.arr, -repaidAmount],  dateArr:[...memberLoanObj.dateArr, date]}};

      if(membersLoanRes.bal> 0){  
        //Part repayment
        description = "Loan repayment by "+(receivableAcct.firstname+' '+receivableAcct.lastname);
        transactions.push(generateEntry({date, description, debitAccount:bankAcctCode, creditAccount:accountCode, debitSub:null, creditSub:accountCodeSub, reference:'Loan repayment', dueDate, dueDateType, amount:repaidAmount, loanBal, loanIndv:accountCodeSub}));
      }else{
        //There is still balance after removing payment
        
        //1. Clear outstanding
        description = "Loan fully repaid by "+(receivableAcct.firstname+' '+receivableAcct.lastname);
        //const amountRepaid = Math.abs(memberLoanObj.bal);
        //const loanBal = memberLoanObj.bal - amountRepaid;
        transactions.push(generateEntry({date, description, debitAccount:bankAcctCode, creditAccount:accountCode, debitSub:null, creditSub:accountCodeSub, reference:'Loan fully repaid', dueDate, dueDateType, amount:repaidAmount, loanBal, loanIndv:accountCodeSub}));
      }
        
    }
    return membersLoanRes
  };

  function getRandomDate(start, end) {
    let date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    date = date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    return date
  }

  function getRandomAmount(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  
  function getRandomAmountInthousand(min, max) {
    return Math.floor(Math.random() * (max/1000 - min/1000 + 1) + min/1000) * 1000;
  }

  function generateEntry({date, description, debitAccount, creditAccount, debitSub, creditSub, reference, dueDate, dueDateType, amount, loanBal, loanIndv}) {
    return {
      date, 
      description,
      debitAccount,
      creditAccount,
      debitSub:debitSub || null,
      creditSub:creditSub || null,
      reference,	
      dueDateType,
      dueDate:dueDate || null, 
      amount,
      loanBal:loanBal || null,
      loanIndv: loanIndv || null
     };
  }

  function getRandomArrayValue(arr) {
    // Check if the array is not empty
    if (arr.length === 0) {
      return null;
    }
  
    // Generate a random index
    const randomIndex = Math.floor(Math.random() * arr.length);
  
    // Return the value at the random index
    return arr[randomIndex];
  }

  function addDays(startDate, add) {
    // Parse the start date
    const startDateTime = new Date(startDate);
  
    // Add the days
    startDateTime.setDate(startDateTime.getDate() + add);
  
    // Format the new date
    const year = startDateTime.getFullYear();
    const month = String(startDateTime.getMonth() + 1).padStart(2, '0');
    const day = String(startDateTime.getDate()).padStart(2, '0');
    const newDate = `${year}-${month}-${day}`;
  
    return newDate;
  }

  function sortByInt(arr) {
    return arr.sort((a, b) => {
      const intA = parseInt(a.loanIndv.split('-')[1]);
      const intB = parseInt(b.loanIndv.split('-')[1]);
      return intA - intB;
    });
  }