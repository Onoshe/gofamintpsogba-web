import { sortArrayByKey } from "@/lib/sort/sortArrayByKey";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
// Function to generate Profit and Loss chart data
export function generatePandLChartData(transProcessor, coaStructure, dateFormQuery) {

    
  const ledgersObj = transProcessor.getSectionLedgers(dateFormQuery);
  const pAndLLedgersObj = ledgersObj.incomeExpenses;
  const pAndLLedgers = Object.values(pAndLLedgersObj);
  const {endDate} = ledgersObj?.dateForm;
  const endMnIndx =  new Date(endDate)?.getMonth() + 1;

  //Populate the income and expenses chart label with months from Jan to current month.
  const label = new Array(endMnIndx).fill().map((_,i)=>months[i]);
  const incomeData = new Array(endMnIndx).fill(0);
  const expensesData = new Array(endMnIndx).fill(0);
  const chartData = {dataLabel:label, incomeData, expensesData, totalExp:0, totalIn:0, incomeSumData:[], incomeSumLabel:[], expensesSumData:[], expensesSumLabel:[]};
  
  const incomeClassCode = coaStructure.find(d=> d.name.toLowerCase() === "incomeclass")?.code;
  const expensesClassCode = coaStructure.find(d=> d.name.toLowerCase() === "expensesclass")?.code;

  const incomeLedgersObj = {};
  const expensesLedgersObj = {};
   pAndLLedgers.forEach(lg => {
      if(parseInt(lg.typeCode) >= parseInt(expensesClassCode)){
        expensesLedgersObj[lg.accountCode] = lg;
      }else{incomeLedgersObj[lg.accountCode] = lg}
   }); 


  //Get income and expenses chart data
  for (let i = 0; i < pAndLLedgers.length; i++) {
    const ledger = pAndLLedgers[i];
    const accountCode = ledger.accountCode;
    if(ledger?.trans?.length){ //Check if ledger has transactions
        for (let j = 0; j < ledger.trans.length; j++) {
            const transaction = ledger.trans[j];
            const {debit, credit, entryType, amount, transactionDate} = transaction;
            const mnNo = new Date(transactionDate).getMonth();
                const mnthIndx = mnNo;
                //Beginning from the month of transaction, add amount to each month total till the current month
                for(let k = mnthIndx; k < label.length; k++) {
                    if(expensesLedgersObj[accountCode]){ //Expenses
                        chartData.expensesData[k] += parseFloat(amount);
                        if(k == mnthIndx){chartData.totalExp += parseFloat(amount);}  //Add once
                    }else{ //Income
                        chartData.incomeData[k] += -parseFloat(amount);
                        if(k == mnthIndx){chartData.totalIn += -parseFloat(amount);}  //Add once
                    } 
            }
        }
    }
  }

  //Income summary data
    const noOfItems = 7;
    const incomeLedgers = Object.values(incomeLedgersObj);
    sortArrayByKey(incomeLedgers, 'closingBal');
    const expensesLedgers = Object.values(expensesLedgersObj);
    sortArrayByKey(expensesLedgers, 'closingBal');

    const highestIn = getObjects(incomeLedgers, noOfItems);
    const highestExp = getObjects(expensesLedgers, noOfItems);
    //console.log(incomeLedgers, expensesLedgers)
    highestIn.forEach(el => {
        const {name, closingBal} = el;
        chartData.incomeSumData.push(-closingBal);
        chartData.incomeSumLabel.push(name);
    });
    highestExp.forEach(el => {
        const {name, closingBal} = el;
        chartData.expensesSumData.push(closingBal);
        chartData.expensesSumLabel.push(name);
    });

    return chartData;
}


export function getObjects(arr, n) {
    // If the array length is less than or equal to n, return the whole array
    if (arr.length <= n) {
        return arr;
    }
    // Otherwise, return the first n objects
    return arr.slice(0, n);
}