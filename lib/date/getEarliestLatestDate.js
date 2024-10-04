//Latest means the most recent: 
//think of it htis way: Earliest => Latest

export function getEarliestLatestDate(arr, dateProperty, type) {
    return arr.reduce((latest, current) => {
      const latestDate = new Date(latest[dateProperty]);
      const currentDate = new Date(current[dateProperty]);
      const earliesttDateRes = latestDate < currentDate ? latest : current;
      const latestDateRes = latestDate > currentDate ? latest : current;
      return type === "EARLIEST"? earliesttDateRes : latestDateRes;
    });
  }

  const objects = [
    { id: 1, date: '2024-08-23T19:36:53.473Z' },
    { id: 2, date: '2022-01-01T00:00:00.000Z' },
    { id: 3, date: '2023-06-15T12:00:00.000Z' },
    { id: 4, date: '2022-09-20T23:59:59.999Z' },
  ];
  

//const latestObject = getLatestDate(objects, 'date', 'LATEST');
//console.log(latestObject); // Output: { id: 1, date: "2024-08-23T19:36:53.473Z" }

 //const latestObject = getLatestDate(objects, 'date', 'EARLIEST');
 //console.log(latestObject); // Output: { id: 2, date: '2022-01-01T00:00:00.000Z' },