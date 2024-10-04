function validateDate(dateString) {
  const result = { error: false, msg: '' };

  if (!dateString) {
    result.error = true;
    result.msg = 'Date string is empty or invalid';
    return result;
  }

  var dateRegexFmt1 = /^\d{4}-\d{2}-\d{2}$/; // Regular expression to match the date format "yyyy-mm-dd"
  var dateRegexFmt2 = /^\d{2}\/\d{2}\/\d{4}$/; // Regular expression to match the date format "dd/mm/yyyy"

  let dateStr = '';
  if (dateRegexFmt1.test(dateString)) {
    dateStr = dateString;
  } else if (dateRegexFmt2.test(dateString)) {
    const dateArr = dateString.split('/');
    dateStr = `${dateArr[2]}-${dateArr[1]}-${dateArr[0]}`;
  } else {
    result.error = true;
    result.msg = 'Invalid date format';
    return result;
  }

  const dateStrArr = dateStr.split('-');
  const year = dateStrArr[0];
  const month = dateStrArr[1] - 1;
  const day = dateStrArr[2];

  var date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    result.error = true;
    result.msg = 'Invalid date';
    return result;
  }

  result.error = !(date.getFullYear() === year && date.getMonth() === month && date.getDate() === day);
  if (result.error) {
    result.msg = 'Invalid date';
  }

  result.date = date.toISOString().split('T')[0];
  result.error = false;
  return result;
}


  function validateAndConvertDate(dateString) {
    // Valid date format: yyyy-mm-dd or dd/mm/yyyy.   The length must be 3 when split
    const formLen1 = dateString.split("-")?.length;
    const formLen2 = dateString.split("/")?.length;
    if (![formLen1, formLen2]?.includes(3)){
      return false;
    }


    //// Regular expression to match the date format: yyyy-mm-dd
    var dateRegexForValidDate = /^\d{4}-\d{2}-\d{2}$/; 

    //First Test. Return value if valid
    // Check if the date string matches the format and return the date string
    if (dateRegexForValidDate.test(dateString)) {
      return dateString;
    }

    // Regular expression to match the date format: dd/mm/yyyy
    const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  
    // Check if the date string matches the regex
    const match = dateString.match(dateRegex);
  
    //Secound Test: Return "" if invalid
    if (!match) {
      // If the format doesn't match, it's not a valid date
      return "";
    }
  
    // Extract day, month, and year from the matched groups
    const day = parseInt(match[1], 10);
    const month = parseInt(match[2], 10);
    const year = parseInt(match[3], 10);
  
    // Create a Date object using the extracted values
    const date = new Date(year, month - 1, day);
  
    // Check if the extracted values result in a valid date
    //Return converted value or ""
    if (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day
    ) {
      // If it's a valid date, convert to yyyy-mm-dd format
      const formattedDate = `${year}-${(month < 10 ? '0' : '') + month}-${(day < 10 ? '0' : '') + day}`;
      return formattedDate;
    } else {
      return "";
    }
  }
  
  // Example usage:
  //const dateToValidate = "25/12/2023";
  //const result = convertAndValidateDate(dateToValidate);
  //console.log(result); // Output: "2023-12-25" if valid, otherwise "Invalid date"
  


  export {validateAndConvertDate, validateDate}