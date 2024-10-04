function groupTransactionsByKey(arr, key) {
    return arr.reduce((acc, current) => {
      (acc[current[key]] = acc[current[key]] || []).push(current);
      return acc;
    }, {});
  }
  
export {groupTransactionsByKey}


/*
  const arr = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
    { id: 1, name: 'Joe' },
    { id: 2, name: 'Jill' }
  ];
  
  const grouped = groupBy(arr, 'id');
  
  console.log(grouped);
   Output:
   {
     "1": [
       { id: 1, name: "John" },
       { id: 1, name: "Joe" }
     ],
     "2": [
       { id: 2, name: "Jane" },
       { id: 2, name: "Jill" }
     ]
   }
*/