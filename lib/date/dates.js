function sortByDate(arrayOfObjects, datePropertyName) {

    //console.log(arrayOfObjects, datePropertyName)
    arrayOfObjects?.sort((a, b) => {
      const dateA = new Date(a[datePropertyName]);
      const dateB = new Date(b[datePropertyName]);
      
      if (dateA < dateB) {
        return -1;
      } else if (dateA > dateB) {
        return 1;
      } else {
        return 0;
      }
    });
  }


  export  {sortByDate}