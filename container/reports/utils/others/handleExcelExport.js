import { formatToCurrency } from '@/lib/currency';
import * as XLSX from 'xlsx-js-style';

 
 export   const handleExcelExport = ({docName, docHeader, data, styleRows, noFmtCols, col1WchInDigit}) => {
        if(!data?.length) return
        // Create a new workbook and a worksheet
        const wb = XLSX.utils.book_new();
        const dateRow = [`Exported on ${new Date()}`];
        const ws_data = docHeader?.length? [...docHeader, dateRow, ...data] : ws_dataDef;
        const rowsAfterHeader = 2; //empty row after docHeader and date row.
        const dataRowStarts = docHeader.length + 1 + 1; //1- dateRow, 1 - data header row
        //console.log(ws_data)
        const ws = XLSX.utils.aoa_to_sheet(ws_data);
        //console.log(styleRows)

        //let presummedLongestCol = data?.length - 2;
        //presummedLongestCol = data[presummedLongestCol];
        const presummedColsLen = data?.reduce((lg, l)=> {return Math.max(lg, l.length)},0); // presummedLongestCol.length;
        
    
        
        //ws['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 2 } },{ s: { r: 1, c: 0 }, e: { r: 1, c: 2 } }];
            

         // Apply styles to the first row and add borders
         const headerCellStyle = {
            font: { bold: true, color: { rgb: "333333" }, sz:14},
            //alignment: { vertical: 'middle', horizontal: 'center' },
        };

        const borderCellStyle = {
            border: {
                top: { style: "medium", color: { rgb: "555555" } },
                bottom: { style: "medium", color: { rgb: "555555" } },
                //left: { style: "thin", color: { rgb: "000000" } },
                //right: { style: "thin", color: { rgb: "000000" } }
            }
        };

        
        const columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
        // Apply style to headers
        for (let i = 1; i < docHeader.length; i++) {
            let row = i;
            var cols = Array(presummedColsLen).fill(0).map((_,k)=> columns[k]);
            //console.log(cols)
            for (let j = 0; j < cols?.length; j++) {
                const col = cols[j];
                const cell = `${col}${row}`;
                if(ws[cell]){
                    ws[cell].s = headerCellStyle;
                }
            }

        }


        //Apply border after header
        const rowToStyle = docHeader.length + rowsAfterHeader;
        if(rowToStyle < ws_data.length){
            var cols = Array(presummedColsLen).fill(0).map((_,k)=> columns[k]);
            for (let j = 0; j < cols?.length; j++) {
                const col = cols[j];
                const cell = `${col}${rowToStyle}`;
                if(ws[cell]){
                    ws[cell].s = borderCellStyle;
                }
            }
        }

        //Apply number format style to the specified columns. Header rows not inclusive
        
        /*if(noFmtCols?.length){
            //Get valid columns for styling. Valid columns are columns whose values are numbers
            for (let i = 0; i < noFmtCols?.length; i++) {
                const colNo = noFmtCols[i];
                const colNoIndexed = noFmtCols[i] - 1; 
                for (let j = 0; j < ws_data.length; j++) {
                    const row = ws_data[j];
                    const rowNo = row[colNoIndexed]? typeof row[colNoIndexed] === "number"? j : 'NAN': 'NAN';
                    if(rowNo !== "NAN"){
                        const colLabel = getExcelColumnLabel(colNo);
                        const cell = `${colLabel}${rowNo +1}`;
                        numFmtCells.push(cell);
                        if(ws[cell]){
                            ws[cell].s = currencyStyle;
                        }
                    }
                }
            }
        }*/

        //Format likely number columns to currency
        const numFmtCells = [];
        for (let i = dataRowStarts; i < ws_data?.length; i++) {
                const rowNo = i+1;
                const row = ws_data[i];
                const dataHeaderRow = data[0];
                for (let k = 0; k < dataHeaderRow.length; k++) {
                    const dataHeaderRowValue = dataHeaderRow[k];
                    const colNo = k +1;
                    const colValue = row[k];
                    //console.log(dataHeaderRowValue?.toString().toLowerCase())
                    if(['amount', 'balance', 'debit', 'credit', 'total'].some((dt)=>dataHeaderRowValue?.toString().toLowerCase().includes(dt))){
                        const colLabel = getExcelColumnLabel(colNo);
                        const cell = `${colLabel}${rowNo}`;
                        if(ws[cell] && !isNaN(colValue)){
                            numFmtCells.push(cell);
                            ws[cell].s = {
                                numFmt: '#,##0.00; (#,##0.00); "-"', //'#,##0.00; (#,##0.00); "-"' || '#,##0.00; (#,##0.00)'
                                alignment: {
                                    horizontal: 'right'
                                    }
                            };
                        }
                    }
                }
        }

        //Style specified rows; Styling is mainly applying bold font. But if row is already number formatted as in apply, it will be reformatted for number 
        if(styleRows?.length){
            for (let i = 0; i < styleRows?.length; i++) {
                const row = styleRows[i];
                var cols = Array(presummedColsLen).fill(0).map((_,k)=> columns[k]);
                for (let j = 0; j < cols.length; j++) {
                    const col = cols[j];
                    const cell = `${col}${row}`;
                    if(ws[cell]){
                        if(numFmtCells?.includes(cell) && typeof ws[cell].v === "number"){
                            //New format will over-ride the previous number formt, hence, need to reformat 
                            ws[cell].s = {
                                font: { bold: true, color: { rgb: "333333" }, sz:12}, 
                                 numFmt: '#,##0.00; (#,##0.00); "-"',
                                 alignment: { horizontal: 'right' }
                            };
                        }else{ws[cell].s = {font: { bold: true, color: { rgb: "333333" }, sz:12}};}
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
        const col1Width =  50;
        const colWidths = getMaxColumnWidths(data);
        const col1Wch = col1WchInDigit?  col1WchInDigit : Math.max(colWidths[0].wch, col1Width);
        ws['!cols'] = [{wch:col1Wch}, ...colWidths.slice(1)];

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
            Math.max(...data.map(row => (typeof row[colIdx] === "number"? row[colIdx]?.toString().length + 5 : row[colIdx]?.toString().length) || 0))
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