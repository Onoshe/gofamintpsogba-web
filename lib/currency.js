function formatToCurrency(number, decimalPlaces) {
    const options = {
      minimumFractionDigits: decimalPlaces || 0,
      maximumFractionDigits: decimalPlaces || 2,
    };
  
    return number?.toLocaleString(undefined, options);
  }


  
export {formatToCurrency}