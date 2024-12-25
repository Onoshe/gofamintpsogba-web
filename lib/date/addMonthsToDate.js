

export function addMonthsToDate(stDate, addMns) {
  if (!stDate || typeof addMns !== 'number') {
    throw new Error("Invalid input: stDate must be a string in 'YYYY-MM-DD' format and addMns must be a number.");
  }

  // Parse the input date
  const dateArr = stDate.split("-");
  if (dateArr.length !== 3) {
    throw new Error("Invalid date format. Expected 'YYYY-MM-DD'.");
  }

  const yr = parseInt(dateArr[0], 10);
  const mn = parseInt(dateArr[1], 10) - 1; // JavaScript months are 0-based
  const day = parseInt(dateArr[2], 10);

  // Create a valid date object
  const startDate = new Date(yr, mn, day);
  if (isNaN(startDate.getTime())) {
    throw new Error("Invalid date provided.");
  }

  // Add months
  startDate.setMonth(startDate.getMonth() + addMns);

  // Format the new date
  const year = startDate.getFullYear();
  const month = String(startDate.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const newDay = String(startDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${newDay}`;
}

//console.log(addMonthsToDate('2024-10-15', 2));
//console.log(addMonthsToDate('2024-10-15', 14));
