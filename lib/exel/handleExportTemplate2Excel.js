import * as XLSX from 'xlsx-js-style';



 export   const handleExportTemplate2Excel = ({docName, dataTemp, dataGuide, dataTypeCodes, col1MaxW,}) => {
        if(!dataTemp?.length || !dataGuide?.length) return
        // Create a new workbook and a worksheet
        const wb = XLSX.utils.book_new();
        const wsTemp_data = dataTemp;
        const wsGuide_data = dataGuide;
        //const wsTypeCodes_data = dataTypeCodes || [];

        const wsTemp = XLSX.utils.aoa_to_sheet(wsTemp_data);
        const wsGuide = XLSX.utils.aoa_to_sheet(wsGuide_data);
        


        // Auto fit column widths
        const col1Width = 50;
        const colWidths = getMaxColumnWidths(dataTemp);
        const col1MaxWidth = [{wch:Math.max(colWidths[0].wch, col1Width)}, ...colWidths.slice(1)];
        wsTemp['!cols'] = col1MaxW? col1MaxWidth : colWidths;

        

        // Add the worksheet to the workbook
        XLSX.utils.book_append_sheet(wb, wsTemp, "Sample_File");
        XLSX.utils.book_append_sheet(wb, wsGuide, "Guide");

        if(dataTypeCodes?.length){
            const wsTypeCodes = XLSX.utils.aoa_to_sheet(dataTypeCodes);

            // Auto fit column widths
            const colWidthsTC = getMaxColumnWidths(dataTypeCodes);
            const col1MaxWidthTC = [{wch:Math.max(colWidthsTC[0].wch, 50)}, ...colWidthsTC.slice(1)];
            wsTypeCodes['!cols'] = col1MaxW? col1MaxWidthTC : colWidthsTC;

            // Add the worksheet to the workbook
            XLSX.utils.book_append_sheet(wb, wsTypeCodes, "TypeCodes");
        }
        
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

    
    function getMaxColumnWidths(data) {
        // Calculate the maximum length of each column in the header row: data[0] is the header row
        const maxLengths = data[0].map((_, colIdx) => (
            Math.max(...data.map(row => row[colIdx]?.toString().length || 0))
        ));
    
        // Convert the maxLengths array to the desired format
        return maxLengths.map(len => ({ wch: len + 1 }));
    }