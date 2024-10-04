

const INCOMESTATEMENT_CODES = [41, 42, 51, 52];
const RETAINED_EARNINGS_ACCOUNT_CODE = 32; //There should be ONLY One Retained Earnings Code. Retained Earnings should not be among Chart of Account creation


function getTransactionsByDate(transactions, chartOfAccount, startDate = newDate().toISOString().split('T')[0], endDate = "") {
  const startDateObject = new Date(startDate);
  const endDateObject = endDate? new Date(endDate) : '';
  const result = [];
  const openingBalances = {};
  const retEarningsId = transactions.find(t => t.typeCode === RETAINED_EARNINGS_ACCOUNT_CODE)?.id;

  // Get the current year
  const currentYear = new Date(startDate).getFullYear();

  // Filter transactions by date and code
  transactions.forEach((transaction) => {
    const transactionDate = new Date(transaction.date);
    const transactionYear = transactionDate.getFullYear();
    const dateRange = endDate? transactionDate >= startDateObject && transactionDate <= endDateObject : transactionDate >= startDateObject;
    if (dateRange) {
      if (INCOMESTATEMENT_CODES.includes(transaction.typeCode)) { 
         // Only consider income and expenses codes
        if (transactionYear === currentYear) {
         // Add current year income and expenses to result
          result.push(transaction); 
        } else {
          // Add previous years income and expenses to Retained earnings opening balances
          if (openingBalances[retEarningsId]) {
            openingBalances[retEarningsId] += transaction.amount * transaction.dimen;
          } else {
            openingBalances[retEarningsId] = transaction.amount * transaction.dimen;
          }
        }
      } else {
        // Consider other transactions that are not Income and Expenses
        result.push(transaction);
      }
    }
  });

  // Calculate opening balances for transactions before startDate
  transactions.forEach((transaction) => {
    const transactionDate = new Date(transaction.date);

    if (transactionDate < startDateObject) {
      const typeCode = transaction.typeCode;
      const acctId = transaction.id;
      const amount = transaction.amount * transaction.dimen;

      if (INCOMESTATEMENT_CODES.includes(typeCode)) {
        // Income and Expenses transactions opening balances added to retained earnings opening balance
        if (openingBalances[retEarningsId]) {
          openingBalances[retEarningsId] += amount;
        } else {
          openingBalances[retEarningsId] = amount;
        }
      } else {
        // Other transactions that are not Income and Expenses
        if (openingBalances[acctId]) {
          openingBalances[acctId] += amount;
        } else {
          openingBalances[acctId] = amount;
        }
      }
    }
  });

  // Add opening balances to result
  Object.keys(openingBalances).forEach((id) => {
    const {accountCode, accountName, typeCode} = chartOfAccount.find((acct)=> acct.id === id);
    result.push({
      id,
      openingBalance:1,
      accountCode,
      accountName,
      entryType: '',
      typeCode,
      amount: openingBalances[id],
      dimen: 1,
      date: startDate,
    });
  });

  return result;
}