
import { sortArrayByDate } from "../sort/sortArrayByDate";
import { addDays, getRandomAmount, getRandomAmountInthousand, getRandomArrayValue, getRandomDate, generateEntry } from "./dummyTransHelpers1";
import { createSavings, postToExistingMemberLoan } from "./dummyTransHelpers2";
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October","November", "December"];


export const dummyTransGenerator =({chartOfAcctCodes, receivableAcctCodes, payableAcctCodes, noOfLoans, noOfExp})=>{
  let transactions = [];
  let startDateDef = "2022-05-01";
  let startDate = new Date(startDateDef);
  const startMonth = 5;
  const expStart = startMonth + 3;
  let startDateExp = new Date(2022, expStart, 1);
  
  const oscCode = 311000;
  const oscCapital = 300000000;
  const acquisition = [50000000, 40000000, 30000000];
  const opExpCode = 521;
  const deprExpCodes = [540000, 540050, 540100]; 
  const saleOfFormsAcctCode = 411000; //chartOfAcctCodes.find(dt => dt.accountCode == 411000).accountCode;
  const unrealisedInt = 231500;
  const intIncome = 412150; 
  const intOnSavings = 412155;   
  const bankCodes = [121000, 121500];
  const bankCodeFD = 121600;
  const bankCharges = 	530280;
  const assetsCodes = [111000, 112000, 113000]; //MV, OfficeEquip, F&F
  

  //Initial- Share capital and asset acquisition
  transactions.push(generateEntry({date:'2022-06-01', description:"Share capital", debitAccount:bankCodes[0], creditAccount:oscCode, debitSub:null, creditSub:null, reference:'Start up capital', dueDate:0, amount:oscCapital}));
  transactions.push(generateEntry({date:'2022-06-01', description:"Acquisition of Motor vehicles", debitAccount:assetsCodes[0], creditAccount:bankCodes[0], debitSub:null, creditSub:null, reference:'Asset acquisition', dueDate:0, amount:acquisition[0]}));
  transactions.push(generateEntry({date:'2022-06-01', description:"Acquisition of Office Equipment", debitAccount:assetsCodes[1], creditAccount:bankCodes[0], debitSub:null, creditSub:null, reference:'Asset acquisition', dueDate:0, amount:acquisition[1]}));
  transactions.push(generateEntry({date:'2022-06-01', description:"Acquisition of Furnitures & Fittings", debitAccount:assetsCodes[2], creditAccount:bankCodes[0], debitSub:null, creditSub:null, reference:'Asset acquisition', dueDate:0, amount:acquisition[2]}));

  //Invest 150m on fixed deposit
  const invAmount = 150000000;
  transactions.push(generateEntry({date:'2022-06-05', description:"Short term investment on TB", debitAccount:bankCodeFD, creditAccount:bankCodes[0], debitSub:null, creditSub:null, reference:'Investment', dueDate:0, amount:invAmount}));


  dummyTrans_Loans({chartOfAcctCodes, receivableAcctCodes, payableAcctCodes, transactions, noOfLoans, startDate,  saleOfFormsAcctCode, unrealisedInt, intIncome, bankCodes});
  dummyTrans_Exp({chartOfAcctCodes, noOfExp, transactions, startDate:startDateExp, opExpCode, deprExpCodes, bankCharges });

  
  sortArrayByDate(transactions, 'date', 'DSC');
  computeInterestOnBankAcct({transactions, bankCodes, generateEntry, intOnSavings, startDateDef, bankCharges, bankCodeFD})
  
  return transactions
}

function computeInterestOnBankAcct({transactions, bankCodes, generateEntry, intOnSavings, startDateDef, bankCharges, bankCodeFD}){
    //Interest on balance balance
  let bankBalance = {
    "121000":{date:startDateDef, bal:0, int:''},
    "121500":{date:startDateDef, bal:0, int:''},
  }

  const intr = 0.002;
  transactions.forEach((tran, i) => {
      //Bank 1
      if(tran.debitAccount === bankCodes[0] || tran.creditAccount === bankCodes[0]){
        const prevMonth = new Date(bankBalance["121000"].date).getMonth();
        const cuMonth = new Date(tran.date).getMonth(); 
        const yr = new Date(bankBalance["121000"].date).getFullYear();
        const description = "Interest earned on savings for the month of "+months[prevMonth]+" "+yr;
        const amount = bankBalance["121000"].bal > 0? bankBalance["121000"].bal * intr : 0;
        const bkCharges = amount> 0? amount * 0.1 : 5000;
        

        if(prevMonth != cuMonth){ // New month. Compute interest & bank charges
           transactions.push(generateEntry({date:`${yr}-${(prevMonth+1) < 10? '0'+(prevMonth+1): prevMonth+1}-01`, 
            description, debitAccount:bankCodes[0], creditAccount:intOnSavings, debitSub:null, creditSub:null, reference:'Earned Interest', dueDate:0, amount}));
          
            transactions.push(generateEntry({date:`${yr}-${(prevMonth+1) < 10? '0'+(prevMonth+1): prevMonth+1}-01`, 
            description:"Bank charges for the month of "+months[prevMonth]+" "+yr, debitAccount:bankCharges, creditAccount:bankCodes[0], debitSub:null, creditSub:null, reference:'Bank Charges', dueDate:0, amount:bkCharges}));
         }

          //Compute bal
          bankBalance["121000"].date = tran.date;
          if(tran.debitAccount === bankCodes[0]){
            bankBalance["121000"].bal += tran.amount;
          }else{
            bankBalance["121000"].bal -= tran.amount;
          }
      }

      //Bank 2
      if(tran.debitAccount === bankCodes[1] || tran.creditAccount === bankCodes[1]){
        const prevMonth = new Date(bankBalance["121500"].date).getMonth();
        const cuMonth = new Date(tran.date).getMonth(); 
        const yr = new Date(bankBalance["121500"].date).getFullYear();
        const description = "Interest earned on savings for the month of "+months[prevMonth]+" "+yr;
        const amount = bankBalance["121500"].bal > 0? bankBalance["121500"].bal * intr : 0;
        const bkCharges = amount> 0? amount * 0.1 : 5000;

        if(prevMonth != cuMonth){ // New month. Compute interest
           transactions.push(generateEntry({date:`${yr}-${(prevMonth+1) < 10? '0'+(prevMonth+1): prevMonth+1}-01`, 
            description, debitAccount:bankCodes[1], creditAccount:intOnSavings, debitSub:null, creditSub:null, reference:'Earned Interest', dueDate:0, amount}));
            
            transactions.push(generateEntry({date:`${yr}-${(prevMonth+1) < 10? '0'+(prevMonth+1): prevMonth+1}-01`, 
            description:"Bank charges for the month of "+months[prevMonth]+" "+yr, debitAccount:bankCharges, creditAccount:bankCodes[1], debitSub:null, creditSub:null, reference:'Bank Charges', dueDate:0, amount:bkCharges}));
         }

          //Compute bal
          bankBalance["121500"].date = tran.date;
          if(tran.debitAccount === bankCodes[1]){
            bankBalance["121500"].bal += tran.amount;
          }else{
            bankBalance["121500"].bal -= tran.amount;
          }
      }
  });

   //Interest on Investment
   const fdAcct ={
    p:150000000,
    int:0,
    total:150000000,
    "startDate":"2022-05-01",
    endDate:new Date().toISOString().split("T")[0],
    "dueMonths":[],
  }  

    let startDate = fdAcct.startDate;
    //let startDateNo = 0;
    const todayVal = new Date().getTime(); 
    for (let i = 0; i < 50; i++) {
      const dueMonth = addDays(startDate, 91);
      const dueMonthVal = new Date(dueMonth).getTime();
      if(todayVal >= dueMonthVal){
        fdAcct.dueMonths.push(dueMonth);
        startDate = dueMonth;
      }      
    }

    fdAcct.dueMonths.forEach((mn, i) => {
      const intOnFD = ((fdAcct.total * 0.2)/365)*91;
      fdAcct.total += intOnFD; fdAcct.int = intOnFD; 
      
      let description = "";
      const yr = new Date(mn).getFullYear();
      const mnth = new Date(mn).getMonth();
      
      if(i !== 0){
        let lstQtrMn = new Date(fdAcct.dueMonths[i-1]).getMonth();
        description ="Interest of 20% on fixed deposit for last quarter beginning "+months[lstQtrMn]+" "+yr
      }else{
        description ="Interest of 20% on fixed deposit for last quarter"
      }
      transactions.push(generateEntry({date:`${yr}-${(mnth+1) < 10? '0'+(mnth+1): mnth+1}-01`, 
      description, debitAccount:bankCodeFD, creditAccount:intOnSavings, debitSub:null, creditSub:null, reference:'Investment Income', dueDate:0, amount:intOnFD}));  
    });

}

function dummyTrans_Loans({chartOfAcctCodes, receivableAcctCodes, payableAcctCodes, transactions, noOfLoans, startDate,
    saleOfFormsAcctCode, unrealisedInt, intIncome,bankCodes,
}) {
    let membersLoan = {};
    //let trans = [];
    let currentDate = new Date();
    let formFees = [];
    let existingLoanCount = 0;
  
    for (let i = 0; i < noOfLoans; i++) {
      const bankAcctCode = getRandomArrayValue(bankCodes); 
      

      let date = getRandomDate(startDate, currentDate);
      let amount = getRandomAmount(20000, 800000);
      const amountLoan =  getRandomAmountInthousand(500000, 1000000);
      let description = '';
      let dueDate = 30;
      let dueDateType = "REC";

      const rcbChartOfAcct  = chartOfAcctCodes.find((dt)=> dt.typeCode == 142); 
      let accountCode = rcbChartOfAcct.accountCode.toString();


        let receivableAcct = receivableAcctCodes[Math.floor(Math.random() * receivableAcctCodes.length)];
        let accountCodeSub = receivableAcct.accountCode;
        const memberLoanObj = membersLoan[accountCodeSub];
  
        if(memberLoanObj){
           //Member loan exist  
          membersLoan =   postToExistingMemberLoan({date, accountCode, accountCodeSub, membersLoan, description, transactions, dueDate, dueDateType,
            receivableAcct, generateEntry, intIncome, bankAcctCode, amountLoan, unrealisedInt, saleOfFormsAcctCode, existingLoanCount});
        }else{
              //Fresh Loan
              let loanDate = addDays('2022-07-01', 1);
              
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
    
      //Create savings every time
       const accountCodeForSavings = chartOfAcctCodes.find((dt)=> dt.typeCode == 232).accountCode;
       createSavings({date, accountCode:accountCodeForSavings, payableAcctCodes, transactions, bankAcctCode, dueDate, dueDateType:"PAY", amount, formFees, saleOfFormsAcctCode, generateEntry});
     }
  }
  


function dummyTrans_Exp({chartOfAcctCodes, noOfExp, transactions, startDate, opExpCode, deprExpCodes, bankCharges }) {
      let currentDate = new Date();
      const excludeAcct = [...deprExpCodes, bankCharges];

      let chartOfAcctCodesExp = chartOfAcctCodes.filter((dt)=> dt.typeCode == opExpCode);   //Only Expenses chartOfAcct
      chartOfAcctCodesExp = chartOfAcctCodesExp.filter((dt)=> !excludeAcct.includes(parseInt(dt.accountCode))) // Filter out depreciationExpenses


      for (let i = 0; i < noOfExp; i++) {
        let coa = chartOfAcctCodesExp[Math.floor(Math.random() * chartOfAcctCodesExp.length)];
        let accountCode = coa.accountCode.toString();
        const bankAcctCode = getRandomArrayValue([121000, 121500]); 
        
        let date = getRandomDate(startDate, currentDate);
        let amount = getRandomAmount(20000, 400000);
        let description = '';
  
        description = "Payment for "+coa.accountName +" expenses";
        transactions.push(generateEntry({date, description, debitAccount:accountCode, creditAccount:bankAcctCode, debitSub:null, creditSub:null, reference:'Expenses', dueDate:0, amount}));
      }
  }
    
  
  

