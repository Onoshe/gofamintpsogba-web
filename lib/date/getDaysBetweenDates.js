export function getDaysBetweenDates(dt2, dt1) {
    // Convert dates to milliseconds
    const date2 = new Date(dt2);

    const date1 = dt1? new Date(dt1) : new Date();
    const date1Ms = date1.getTime();
    const date2Ms = date2.getTime();
    
    // Calculate the difference in milliseconds
    const differenceMs = Math.abs(date1Ms - date2Ms);

    // Convert the difference to days
    const differenceDays = Math.round(differenceMs / (1000 * 60 * 60 * 24));

    return differenceDays
}

// Example usage:
const date1 = '2024-09-01';
const date2 = '2024-08-20';
//console.log(getDaysBetweenDates(date2));  // Output: 9
//console.log(getDaysBetweenDates(date2, date1));  // Output: 9


export function getDaysDifference(start, end) {
    // Convert dates to milliseconds
    const startDate = new Date(start);

    const endDate = end? new Date(end) : new Date();
    const endDateMs = endDate.getTime();
    const startDateMs = startDate.getTime();
    
    // Calculate the difference in milliseconds
    const differenceMs = (startDateMs - endDateMs);

    // Convert the difference to days
    const differenceDays = Math.round(differenceMs / (1000 * 60 * 60 * 24));

    return differenceDays
}


export function addDaysToDate(startDate, add){
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
