export function datesDiffGreaterThan365(date1String, date2String) {
    // Convert the date strings to Date objects
    const date1 = new Date(date1String);
    const date2 = new Date(date2String);
  
    // Check if the dates are valid
    if (isNaN(date1.getTime()) || isNaN(date2.getTime())) {
      return false; // Invalid date(s)
    }
  
    // Calculate the difference in time (milliseconds)
    const timeDifference = Math.abs(date2 - date1); // Use absolute value to avoid negative differences
  
    // Convert the difference from milliseconds to days
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24); // 1000 ms * 60 s * 60 m * 24 h
  
    // Return true if the difference is more than 365 days
    return daysDifference > 365;
  }

//console.log(datesDiffGreaterThan365("2022-09-15", "2023-09-16")); // true
//console.log(datesDiffGreaterThan365("2022-09-15", "2023-09-14")); 



export function monthsDiffMoreThan12(date1String, date2String) {
  // Convert the date strings to Date objects
  const date1 = new Date(date1String);
  const date2 = new Date(date2String);

  // Check if the dates are valid
  if (isNaN(date1.getTime()) || isNaN(date2.getTime())) {
    return false; // Invalid date(s)
  }

  // Extract year and month from each date
  const year1 = date1.getFullYear();
  const month1 = date1.getMonth(); // 0 for January, 11 for December

  const year2 = date2.getFullYear();
  const month2 = date2.getMonth();

  // Calculate the difference in years and months
  const yearDifference = year2 - year1;
  const monthDifference = month2 - month1;

  // Total months difference
  const totalMonthsDifference = (yearDifference * 12) + monthDifference;
//console.log(date1String, date2String, totalMonthsDifference)
  // Return true if the total difference is greater than 12 months
  return Math.abs(totalMonthsDifference) > 11;
}

// Example usage:
//console.log(areDatesMoreThan12MonthsApart("2022-09-15", "2023-10-16")); // true
//console.log(areDatesMoreThan12MonthsApart("2022-09-15", "2023-08-14")); // false
