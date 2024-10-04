

  export function sortArrayByDate(arrayOfObjects, key, order) {
    
    arrayOfObjects?.sort((a, b) => {
      const valueA = order === "ASC"? b[key] : a[key]; //a[key]
      const valueB = order === "ASC"? a[key] : b[key];
    
      return new Date(valueA) - new Date(valueB);
    });
  }