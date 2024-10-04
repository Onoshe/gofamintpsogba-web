var XLSX = require("xlsx");

  function objectToArray(arr, keys) {
    return arr.map(obj => keys.map(key => obj[key]));
  }


export const handleExportToExcel = async (rows)=>{
    const header = ['name', 'openingBal', 'debit', 'credit', 'closingBal'];
    const exportRows = objectToArray(rows, header); //filterObjectKeys(data, ['name', 'openingBal', 'debit', 'credit', 'closingBal']);
    const data = [["Trial Balance"], header, ...exportRows];
    //return console.log(exportRows)
    const worksheet = XLSX.utils.aoa_to_sheet(data);

    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    /*/ Set column widths (optional)
    worksheet['!cols'] = [
      { wch: 20 },  // Width of 'Name' column
      { wch: 10 },  // Width of 'Age' column
      { wch: 15 }   // Width of 'City' column
    ];*/
    // Merge cells (e.g., merge A1 and B1)
    worksheet['!merges'] = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: 4 } } // merge A1:C1
    ];
   
    // Calculate column widths for auto-fitting
  const columnWidths = data.reduce((widths, row) => {
    Object.keys(row).forEach((key, index) => {
      const value = row[key].toString();
      widths[index] = Math.max(widths[index] || 10, value.length);
    });
    return widths;
  }, []);

  // Set column widths
  worksheet['!cols'] = columnWidths.map(width => ({ wch: width }));
  //worksheet['A1'].s = { font: { bold: true }, fill: { fgColor: { rgb: "FFFFAA00" } }, alignment: { horizontal: "center" } }; // Format header cell
  const cell = worksheet.getCell('A1');
  cell.style.font.bold = true;
  cell.style.font.size = 18;
  
  XLSX.writeFile(workbook, 'report.xlsx');
  };