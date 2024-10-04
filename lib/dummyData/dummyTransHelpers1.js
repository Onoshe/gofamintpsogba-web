//Helper functions


export function getRandomDate(start, end) {
    let date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    date = date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    return date
  }

 export function getRandomAmount(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  
export  function getRandomAmountInthousand(min, max) {
    return Math.floor(Math.random() * (max/1000 - min/1000 + 1) + min/1000) * 1000;
  }

  
export  function generateEntry({date, description, debitAccount, creditAccount, debitSub, creditSub, reference, dueDate, dueDateType, amount, loanBal, loanIndv}) {
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

 export function getRandomArrayValue(arr) {
    // Check if the array is not empty
    if (arr.length === 0) {
      return null;
    }
  
    // Generate a random index
    const randomIndex = Math.floor(Math.random() * arr.length);
  
    // Return the value at the random index
    return arr[randomIndex];
  }

export  function addDays(startDate, add) {
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

export  function sortByInt(arr) {
    return arr.sort((a, b) => {
      const intA = parseInt(a.loanIndv.split('-')[1]);
      const intB = parseInt(b.loanIndv.split('-')[1]);
      return intA - intB;
    });
  }