//import ExcelJS from 'exceljs';


async function handler(req, res) {
  // Create a new workbook and add a worksheet
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Sheet1');

  // Add header row and apply styling
  const headerRow = worksheet.addRow(['Name', 'Age', 'City']);
  headerRow.eachCell((cell, colNumber) => {
    cell.font = { bold: true };
    cell.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
  });

  // Sample data to be exported
  const data = [
    { Name: 'John Doe', Age: 28, City: 'New York' },
    { Name: 'Anna Smith', Age: 24, City: 'London' },
    { Name: 'Peter Jones', Age: 35, City: 'Paris' }
  ];

  // Add data rows and apply border styling
  data.forEach(rowData => {
    const row = worksheet.addRow(Object.values(rowData));
    row.eachCell((cell) => {
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });
  });

  // Auto-fit column widths
  worksheet.columns.forEach(column => {
    let maxLength = 0;
    column.eachCell({ includeEmpty: true }, cell => {
      const columnLength = cell.value ? cell.value.toString().length : 10;
      if (columnLength > maxLength) {
        maxLength = columnLength;
      }
    });
    column.width = maxLength + 2; // Add some padding
  });

  // Generate the Excel file as a buffer
  const buffer = await workbook.xlsx.writeBuffer();

  // Set the response headers to indicate a file attachment
  res.setHeader('Content-Disposition', 'attachment; filename=report.xlsx');
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  
  // Send the buffer as the response
  res.status(200).end(Buffer.from(buffer));
}
