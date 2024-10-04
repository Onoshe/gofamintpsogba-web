export function isValidDate(dateString) {
    // Check if the format is correct using a regular expression (yyyy-mm-dd)
    const regex = /^\d{4}-\d{2}-\d{2}$/;
  
    if (!regex.test(dateString)) {
      return false; // Invalid format
    }
  
    // Parse the date
    const date = new Date(dateString);
  
    // Check if the date is valid
    const timestamp = date.getTime();
    if (isNaN(timestamp)) {
      return false; // Invalid date
    }
  
    // Check if the parsed date matches the input (handles invalid days, months, etc.)
    const [year, month, day] = dateString.split('-').map(Number);
    return date.getUTCFullYear() === year && date.getUTCMonth() + 1 === month && date.getUTCDate() === day;
  }
  
// Example usage:
//console.log(isValidDate("2023-09-15")); // true
//console.log(isValidDate("2023-02-29")); // false (2023 is not a leap year)
//console.log(isValidDate("invalid-date")); // false