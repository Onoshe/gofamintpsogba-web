var XLSX = require("xlsx");


async function readSpreadSheetFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        const rABS = !!reader?.readAsBinaryString;
        reader.onload = async (e) => {
            try {
                /* Parse data */
                const bstr = e.target.result;
                const wb = XLSX.read(bstr, { type: rABS ? "binary" : "array" });
                /* Get first worksheet */
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                /* Convert array of arrays */
                const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
                resolve(data);
            } catch (error) {
                reject(error);
            }
        };
        reader.onerror = error => {
            reject(error);
        };
        if (rABS) {
            reader.readAsBinaryString(file);
        } else {
            reader.readAsArrayBuffer(file);
        }
    });
}

export {readSpreadSheetFile}

function readSpreedSheetFile99(file,) {
    let data = [];
    const reader = new FileReader();
      const rABS = !!reader?.readAsBinaryString;
      reader.onload = e => {
        /* Parse data */
        const bstr = e.target.result;
        const wb = XLSX.read(bstr, { type: rABS ? "binary" : "array" });
        /* Get first worksheet */
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        /* Convert array of arrays */
         data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      
          //uploadMsg = "File upload successful";
          //console.log(data)
          //setUploadedData(data);
      };
      if(rABS){
        reader.readAsBinaryString(file);
        }else {
            reader.readAsArrayBuffer(file);
        }
     return data;
  }


