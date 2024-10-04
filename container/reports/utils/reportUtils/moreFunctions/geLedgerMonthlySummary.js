const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October","November", "December"];

export function getLedgerMonthlySummary(rows, dateForm) {
    const initialRow = {
        month: "",
        debit: 0,
        credit: 0,
        balance: 0
    };
    const startMonth = new Date(dateForm.startDate).getMonth();
    const endMonth = new Date(dateForm.endDate).getMonth();
    const startYear = new Date(dateForm.startDate).getFullYear();
    const endYear = new Date(dateForm.endDate).getFullYear();
    //const relevantMns = months?.reduce((mns, mn, i)=> {return i <= endMonth? [...mns, mn] : mns},[])
    const relevantMns = getMonthsInRange(startMonth, endMonth);
    
    // Initialize the summary object with default rows for each month
    const monthlySummary = months.reduce((acc, month) => {
        acc[month] = { ...initialRow, month };
        return acc;
    }, {});

    //console.log(startYear, endYear)
    // Find opening balance row, if it exists
    const openingRow = rows.find(row => row?.description?.toLowerCase()?.includes("opening balance"));
    const balanceStart = openingRow ? openingRow.balance : 0;

    //console.log(relevantMns)
    //if(!description.includes("opening balance")){
    // Accumulate debit and credit for each month
    rows.forEach(row => {
        const { transactionDate, description, debit = 0, credit = 0 } = row;
        const monthIndex = new Date(transactionDate).getMonth();
        const month = months[monthIndex];

      if(!description?.toLowerCase()?.includes("opening balance")){ 
        if (monthlySummary[month]) {
            monthlySummary[month].debit += debit;
            monthlySummary[month].credit += credit;
        }
      }
        
    });

    // Compute running balance and construct result array
    let runningBalance = balanceStart;
    let runningDebit = 0;
    let runningCredit = 0;
    const result = [];

    if (openingRow) {
        result.push({ month: "Opening balance", debit: '', credit: '', balance: balanceStart });
    }

    relevantMns.forEach(month => {
        const { debit, credit, } = monthlySummary[month];
        runningBalance += debit - credit;
        runningDebit += debit;
        runningCredit += credit;
        monthlySummary[month].balance = runningBalance;
        result.push(monthlySummary[month]);
    });

    //Add the Total row
    result.push({month:"Total", debit:runningDebit, credit:runningCredit, classNameTD:'font-bold'});
    
    return result;
}



function getMonthsInRange(startIndex, endIndex) {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
  
    if (startIndex <= endIndex) {
      // Return the slice of months from startIndex to endIndex (inclusive)
      return months.slice(startIndex, endIndex + 1);
    } else {
      // Wrap around the year if startIndex > endIndex
      return months.slice(startIndex).concat(months.slice(0, endIndex + 1));
    }
  }
  