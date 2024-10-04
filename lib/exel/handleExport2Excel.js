import { formatToCurrency } from '@/lib/currency';
import * as XLSX from 'xlsx-js-style';
 
/********************************
 docHeader, data = Excel data in array of arrays: [[r1c1, r1c2, r1c3], [r2c1, r2c2, r2c3]]    
 styleCells = Array of cells to style. Cell can be in rowCol, eg cell A1 = r1c1, cell E4 is r4c5.
            E.g: [{cell:A2, style:{font: { bold: true, color: { rgb: "333333" }, sz:12}}}, {cell:C3, style:{font: { bold: true, color: { rgb: "333333" }, sz:12}}}]
            This will apply the style to the specified cells

 styleRows = Array of rows to style. Eg [{rows:[2,3,4], style:{font: { bold: true, color: { rgb: "333333" }, sz:12}}}]
            This will aply the specified styles to rows 2,3,4
*/
 
 export   const handleExport2Excel = ({docName, docHeader, data, styleRows, col1MaxW, styleCells}) => {
        if(!data?.length) return
        // Create a new workbook and a worksheet
        const wb = XLSX.utils.book_new();
        const ws_data = docHeader?.length? [...docHeader, ...data] : ws_dataDef;

        const ws = XLSX.utils.aoa_to_sheet(ws_data);

        //presummedColsLen = Maximum number of columns
        const presummedColsLen = data?.reduce((lg, l)=> {return Math.max(lg, l.length)},0);        
    
        
        //ws['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 2 } },{ s: { r: 1, c: 0 }, e: { r: 1, c: 2 } }];
            

         // Apply styles to the first row and add borders
         const headerCellStyle = {
            font: { bold: true, color: { rgb: "333333" }, sz:14},
            //alignment: { vertical: 'middle', horizontal: 'center' },
        };

        const borderCellStyle = {
            font: { bold: true, color: { rgb: "333333" }},
            border: {
                top: { style: "medium", color: { rgb: "555555" } },
                bottom: { style: "medium", color: { rgb: "555555" } },
                //left: { style: "thin", color: { rgb: "000000" } },
                //right: { style: "thin", color: { rgb: "000000" } }
            }
        };
        
        const columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
        // Apply style to headers cell
        for (let i = 1; i < docHeader.length; i++) {
            let row = i;
            var cols = Array(presummedColsLen).fill(0).map((_,k)=> k);
            //console.log(cols)
            for (let j = 0; j < cols?.length; j++) {
                const col = getExcelColumnLabel(j +1);
                const cell = `${col}${row}`;
                if(ws[cell]){
                    ws[cell].s = headerCellStyle;
                }
            }

        }
        //Apply border after header
        const rowToStyle = docHeader.length + 1;
        if (rowToStyle < ws_data.length) {
            var cols = Array(presummedColsLen).fill(0).map((_, k) => k);
            for (let j = 0; j < cols.length; j++) {
                const col = getExcelColumnLabel(j + 1);
                const cell = `${col}${rowToStyle}`;
                if (ws[cell]) {
                    // Clone the existing cell object to make it extensible
                    ws[cell] = { ...ws[cell], s: borderCellStyle };
                } else {
                    // Create a new cell object if it doesn't exist
                    ws[cell] = { v: '', s: borderCellStyle };
                }
            }
        }

        //Style specified rows; styleRows is an array of rows to style, eg [2,4, 7]
        if(styleRows?.length){
            for (let i = 0; i < styleRows?.length; i++) {
                const row = styleRows[i];
                var cols = Array(presummedColsLen).fill(0).map((_,k)=> k);
                for (let j = 0; j < cols.length; j++) {
                    const col = getExcelColumnLabel(j +1);
                    const cell =  `${col}${row}`;
                    if(ws[cell]){
                        ws[cell].s = {font: { bold: true, color: { rgb: "333333" }, sz:12}};
                    }
                }
            }   
        }

        //Merge header rows
        /*if(docHeader?.length){
            const mergedRows = [];
            for (let index = 0; index < docHeader.length; index++) {
                //const header = docHeader[index];
               const row = { s: { r: index, c: 0 }, e: { r: index, c: presummedColsLen-1 } } // eg, { s: { r: 0, c: 0 }, e: { r: 0, c: 3 } } = merge A1:C1. 
               mergedRows.push(row);   
            }
            ws['!merges'] = [...mergedRows];
        }*/

        // Apply styles to the header cells
        //ws['A1'].s = headerCellStyle;
        //ws['B1'].s = headerCellStyle;
        //ws['C1'].s = headerCellStyle;

        // Apply borders to data cells
        /*for (let i = 1; i < ws_data.length; i++) {
            ws[`A${i + 1}`].s = dataCellStyle;
            ws[`B${i + 1}`].s = dataCellStyle;
            ws[`C${i + 1}`].s = dataCellStyle;
        }*/

        // Auto fit column widths
        const col1Width = 50;
        const colWidths = getMaxColumnWidths(data);
        const col1MaxWidth = [{wch:Math.max(colWidths[0].wch, col1Width)}, ...colWidths.slice(1)];
        ws['!cols'] = col1MaxW? col1MaxWidth : colWidths;

        // Add the worksheet to the workbook
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

        // Generate a binary string
        const wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });

        // Convert binary string to ArrayBuffer
        const buf = new ArrayBuffer(wbout.length);
        const view = new Uint8Array(buf);
        for (let i = 0; i < wbout.length; ++i) {
            view[i] = wbout.charCodeAt(i) & 0xFF;
        }

        // Create a Blob from the ArrayBuffer
        const blob = new Blob([buf], { type: "application/octet-stream" });

        // Create a link element
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${docName || 'Report'}.xlsx`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    function formatToNumber(arrs, colIdx){
        //Takes array of array and format number like to number
        const array = [];
        for (let i = 0; i < arrs.length; i++) {
            const arr = arrs[i];
            const arrFmt = arr.map((dt, j)=> {
                return colIdx.includes(j) && !isNaN(dt) && parseFloat(dt)? formatToCurrency(dt, 2) :  dt
            });
            array.push(arrFmt);
        }
        return array
    }

    function getMaxColumnWidths(data) {
        // Calculate the maximum length of each column in the header row: data[0] is the header row
        const maxLengths = data[0].map((_, colIdx) => (
            Math.max(...data.map(row => row[colIdx]?.toString().length || 0))
        ));
    
        // Convert the maxLengths array to the desired format
        return maxLengths.map(len => ({ wch: len + 1 }));
    }

    function getExcelColumnLabel(columnNumber) {
        let label = '';
        let remainder;
        
        while (columnNumber > 0) {
            remainder = (columnNumber - 1) % 26;
            label = String.fromCharCode(65 + remainder) + label;
            columnNumber = Math.floor((columnNumber - 1) / 26);
        }
        
        return label;
    }

    var ws_dataDef = [
        ["A very long long header"],
        ["Name", "Age", "Location"],
        ["John Doe", 29, "New York"],
        ["Jane Smith", 32, "London"]
    ];