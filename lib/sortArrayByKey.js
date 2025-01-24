
function sortArrayByKey(arrayOfObjects, key, order) {
  if(arrayOfObjects?.length){
      arrayOfObjects.sort((a, b) => {
        const valueA = order === "ASC"? b[key] : a[key]; //a[key]
        const valueB = order === "ASC"? a[key] : b[key];
    
        if (typeof valueA === 'number' && typeof valueB === 'number') {
          return (Math.abs(valueB) - Math.abs(valueA)); // Default is Descending order
        } else if (typeof valueA === 'string' && typeof valueB === 'string') {
          return valueA.trim().localeCompare(valueB.trim());
        } else if (isDate(valueA) && isDate(valueB)) {
          return new Date(valueA) - new Date(valueB);
        } else {
          return 0;
        }
      });
    }
  }
  
  function isDate(dateString) {
    // Check if the input string matches the format 'YYYY-MM-DD'
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    return datePattern.test(dateString);
  }

  
  function sortArrayByProperty(arr, key) {
    return arr.sort((a, b) => {
        const propA = a[key].toUpperCase();
        const propB = b[key].toUpperCase();

        if (propA < propB) {
            return -1;
        } else if (propA > propB) {
            return 1;
        } else {
            return 0;
        }
    });
}




export {sortArrayByKey}



  // Example usage:
  const arrayOfObjects = [
    { name: 'John', age: 30, date: '1990-01-15' },
    { name: 'Alice', age: 25, date: '1995-04-20' },
    { name: 'Bob', age: 25, date: '1992-09-10' }
  ];
  
  // Sort by 'name' (string)
  // sortByKey(arrayOfObjects, 'name');
  
  // Sort by 'age' (number)
  // sortByKey(arrayOfObjects, 'age');
  
  // Sort by 'date' (date in 'YYYY-MM-DD' format)
  //sortByKey(arrayOfObjects, 'date');
  
  //console.log(arrayOfObjects);
  

  