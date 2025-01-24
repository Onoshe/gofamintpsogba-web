// Example array of objects
const dataDef = [
    { name: "Alice", age: 25, city: "New York" },
    { name: "Bob", age: 30, city: "Los Angeles" },
    { name: "Charlie", age: 35, city: "Chicago" },
  ];
  
  // Function to convert JSON to CSV
 export function exportToCSV(dataArr, filename = 'data.csv') {
    const data = dataArr?.length? dataArr : dataDef;
    // Step 1: Extract headers
    const headers = Object.keys(data[0]).join(',');
  
    // Step 2: Map data to CSV format
    const rows = data.map(obj => 
      Object.values(obj).map(value => `"${value}"`).join(',')
    );
  
    // Step 3: Combine headers and rows
    const csvContent = [headers, ...rows].join('\n');
  
    // Step 4: Create a Blob and URL
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
  
    // Step 5: Create a download link and trigger download
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
  
    // Step 6: Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
  
  // Call the function
  //exportToCSV(data);
  