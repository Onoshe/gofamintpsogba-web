import React from 'react';
import * as XLSX from 'xlsx-js-style';

const ExportExcel = ({docName}) => {
    const handleExport = () => {
        // Create a new workbook and a worksheet
        const wb = XLSX.utils.book_new();
        const ws_data = [
            ["A very long long header"],
            ["Name", "Age", "Location"],
            ["John Doe", 29, "New York"],
            ["Jane Smith", 32, "London"]
        ];

        const ws = XLSX.utils.aoa_to_sheet(ws_data);

        ws['!merges'] = [
            { s: { r: 0, c: 0 }, e: { r: 0, c: 6 } } // merge A1:B1
          ];

        
        // Apply styles to the first row and add borders
        const headerCellStyle = {
            font: { bold: true, color: { rgb: "FF0000" } },
            alignment: { vertical: 'middle', horizontal: 'center' },
            border: {
                top: { style: "thin", color: { rgb: "000000" } },
                bottom: { style: "thin", color: { rgb: "000000" } },
                left: { style: "thin", color: { rgb: "000000" } },
                right: { style: "thin", color: { rgb: "000000" } }
            }
        };

        const dataCellStyle = {
            border: {
                top: { style: "thin", color: { rgb: "000000" } },
                bottom: { style: "thin", color: { rgb: "000000" } },
                left: { style: "thin", color: { rgb: "000000" } },
                right: { style: "thin", color: { rgb: "000000" } }
            }
        };

        // Apply styles to the header cells
        ws['A1'].s = headerCellStyle;
        //ws['B1'].s = headerCellStyle;
        //ws['C1'].s = headerCellStyle;

        // Apply borders to data cells
        for (let i = 1; i < ws_data.length; i++) {
            ws[`A${i + 1}`].s = dataCellStyle;
            ws[`B${i + 1}`].s = dataCellStyle;
            ws[`C${i + 1}`].s = dataCellStyle;
        }

         // Auto fit column widths
         const maxLengths = ws_data[0].map((_, colIdx) => (
            Math.max(...ws_data.map(row => row[colIdx]?.toString().length || 0))
        ));

        ws['!cols'] = maxLengths.map(len => ({ wch: len + 2 }));


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
        link.download = docName || "report"+".xlsx";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <button onClick={handleExport}>
            Export to Excel
        </button>
    );
};

export default ExportExcel;
