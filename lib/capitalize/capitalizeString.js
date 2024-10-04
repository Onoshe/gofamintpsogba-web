function capitalizeFirstChar(str) {
    if (typeof str !== 'string' || str.length === 0) {
      return str; // Return the input unchanged if it's not a string or an empty string.
    }
    const lowerCaseStr = str.toLocaleLowerCase();
    return lowerCaseStr.charAt(0).toUpperCase() + lowerCaseStr.slice(1);
  }



  function capitalizeFirstCharOnly(str) {
    if (typeof str !== 'string' || str.length === 0) {
      return str; // Return the input unchanged if it's not a string or an empty string.
    }
  
    return str.charAt(0).toUpperCase() + str.slice(1);
  }



  export function convertToTitleCase(str) {
    // Split the string at each uppercase letter and lowercase the rest
    const words = str.split(/(?=[A-Z])/).map(word => word.toLowerCase());

    // Capitalize the first letter of each word
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));

    // Join the words with a space
    return capitalizedWords.join(' ');
}

// Examples
//console.log(convertToTitleCase("account")); // "Account"
//console.log(convertToTitleCase("currentAccount")); // "Current Account"
//console.log(convertToTitleCase("nonCurrentAccount")); // "Non Current Account"


  export {capitalizeFirstChar, capitalizeFirstCharOnly}