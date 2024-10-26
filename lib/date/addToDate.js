
export  function addDaysToDate(startDate, add) {
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