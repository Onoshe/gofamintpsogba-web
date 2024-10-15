import { formatToCurrency } from '@/lib/currency';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

/*
 reportRows = [{accountCode:11200, accountName:"Finance Bank", description:"Purchase of "}, {}, {}];
 reportHeader = [{name:"accountCode", title:"Account Code"}, {name:"description", title:"Description"}]
 pdfHeader = []
 pdfData = []
 const noFmtCols= pdfData?.noFmtCols || [7,8,9];
   const headerFSize = pdfData?.headerFSize || [14]; 
   const tableColsWch = pdfData?.tableColsWch || [20, 40, "", "", "", "", "", "", ""]; 
   const tableColsFSize = pdfData?.tableColsFSize || 8; 
   const tablePlain = pdfData?.tablePlain || [[text1],[text2],[text1]]
   const footerArr = pdfData?.footerArr || [footer1, footer2]
*/

export const handleExport2Pdf =({ reportRows, reportHeader, pdfHeader, pdfData, companyLogoFile, headerRowsColsArr})=>{
   const reportRowKeys = pdfData?.reportRowKeys; //["accountCode", "accountName", "description"]
   const noFmtCols= pdfData?.noFmtCols || []; 
   const headerFSize = pdfData?.headerFSize || []; 
   const tableColsWch = pdfData?.tableColsWch || []; 
   const tableColsFSize = pdfData?.tableColsFSize || 8; 
   const tablePlain = pdfData?.tablePlain || []
   const footerArr = pdfData?.footerArr || [];
   const tableHeaderFSize = pdfData?.tableHeaderFSize || 10;
   let reportName = pdfHeader[1][0] || "report";
   reportName = reportName.replaceAll(" ", "_");
  

    //const doc = new jsPDF();
    
    //console.log(doc);
    if(!reportRows?.length) return;

    let noOfColsDef = 2;
    let data = objectToArray(reportRows, reportRowKeys, noFmtCols, tableColsFSize);

    const {rowsHeader} = extractKeysFomObject(reportHeader, reportRowKeys, 'name');
    const noOfCols = rowsHeader?.length || noOfColsDef;
    const rowsHeaderStyled = styleRowsHeader(rowsHeader, tableHeaderFSize)
    const docHeaderStyled = styleHeaderRows(pdfHeader, noOfCols, headerFSize);

    const reportBody = [rowsHeaderStyled, ...data]; //[...docHeader, ...data];
    
    const doc = new jsPDF({
      orientation: noOfCols > 7? 'landscape' : 'portrait', //Deafult is 'portrait' Other is 'landscape',
      unit: 'mm', // Default is 'mm'
      format: 'a4' // Default is 'a4'
    });

    //Add non-repeated header
    autoTable(doc, {
        head: docHeaderStyled,
        margin: 10, //{ top: 10 }
        styles: getColumnsStyle(),
        headStyles: getColumnsStyle(), 
      });
      
    //Add body table as plain text
    if(tablePlain?.length){
      autoTable(doc, {
        margin: 10, 
        body: tablePlain
      });
    }

      // Add the image to the PDF
      if(companyLogoFile?.file){ // Parameters: image data, format, x, y, width, height
        doc.addImage(companyLogoFile.file, 'JPEG', 10, 5, 30, 30)
      }; 
      const pageSize = doc.internal.pageSize;
      const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();

      autoTable(doc, {
        body: reportBody,
        //startY: 30,
        //theme:'plain',
        margin: 10, //{ top: 10 }
        tableWidth: 'auto', // or 'wrap', or a specific value
        styles: getColumnsStyle(),
        bodyStyles: getColumnsStyle(),
        columnStyles: getColumnsStyle(tableColsWch, tableColsFSize),
        foot: footerArr?.length? footerArr.map((content)=> {return [{content,  colSpan:noOfCols, styles: {halign: 'center', fontSize:10, textColor:'white'}}]}) : [],
        showFoot:'lastPage',
        didDrawPage: function (data) {
          const pageCount = doc.internal.getNumberOfPages();
          const pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
          doc.setFontSize(10);
          doc.text(`Page ${data.pageNumber}`, 20, pageHeight - 5, { align: 'center' });
          doc.text(`Exported on ${new Date()}`, pageWidth - 10, pageHeight - 5, { align: 'right' });
        }, 
      });

      /************  Add Custom Footer ******************* 
        Note that a pseudo footer (white text color makes it invisible) was added above.
        The footer above comes immediately after table contents and not at the bottom of the page.
        It was added to manage cases where the contents gets to the bottom of the page. In that case, it will go to the next page
        and this custom footer will not overlap the contents but also goes to the next page.
        Note that startY property was used to place the footer at the bottom of the page.
      ***************************************************/
      if(footerArr?.length){
        autoTable(doc, {
          startY:pageHeight - (footerArr.length > 1? (footerArr.length * 10) +10 : 20),
          margin: 10, 
          foot: footerArr.map((content)=> {return [{content, styles: {halign: 'center', fontSize:10}}]}),
        });
      }

      doc.save(reportName+".pdf");
 };

 function objectToArray(arr, keys, noFmtCols, fontSize) {
  let agingOrder = ["OVER_DAYS_180", "DAYS_90_180", "DAYS_60_90", "DAYS_30_60", "LESS_DAYS_30", "stockin", "stockout", "stockopening", "stockclosing", "costPerUnit", "valuation", "unitcost", 'avgCost'];
  agingOrder = agingOrder.map((dt)=> dt.toLocaleLowerCase());
    const likelyCurrencyCol = [...agingOrder, "debit", "credit", "openingbal", "openingbalance", "closingbal", "closingbalance", "amount", "balance", "total"];
   
    return arr.map(obj => {
       return keys.map((key, colNo) =>{
            let content = obj[key] || "";
            if(likelyCurrencyCol.includes(key.toLowerCase()) && parseFloat(content)){
              content =  formatToCurrency(parseFloat(content))
            }
            const styles = fontSize? {fontStyle: obj?.classNameTD? 'bold' :'normal', fontSize} : {fontStyle: obj?.classNameTD? 'bold' :'normal'};
            return { content, styles}
            //return { content, styles: {fontStyle: obj?.classNameTD? 'bold' :'normal'} }
        })
    });
  }
  
 
function extractKeysFomObject(arr, keys, key) {
    const rowsHeader = [];
    for (let i = 0; i < keys.length; i++) {
      const ky = keys[i];
      const row = arr.find(dt => dt.name == ky);
       if(row?.title){
          rowsHeader.push(row.title);
       }else{
        rowsHeader.push("");
       }
    }
    return {rowsHeader}
  }


function styleHeaderRows(arr, colSpan, fSizeArr){
    //colSpan mostly is 1 which make the header to have a single column. 
    //headerRowsCol is then used to control the no of columns in each header row
    const styledRows = [];
    for (let i = 0; i < arr.length; i++) {
      const col = arr[i];
      const content = col[0] || "";
      const fontSize = fSizeArr?.length? fSizeArr[i] || 10 : 10;
      let colFmt = content? {content,  colSpan, styles: {fontStyle:'bold', halign: 'center', fontSize}} : {content, colSpan}
       
      /*if(headerRowsCol?.length){
         //headerRowsCol = ["", "", "", 1] will apply colSpan 1 to the forth row. 
        const cols = headerRowsCol[i];
        if(parseInt(cols)){
          colFmt.colSpan = cols;
        }
      }*/
      styledRows.push([colFmt]);
    }
    return styledRows
  }

function styleRowsHeader(arr, fSize){
   //colSpan: []
    const styledRows = [];
    for (let i = 0; i < arr.length; i++) {
      const content = arr[i] || "";
      const fontSize = fSize || 10;
      let colFmt = {content, styles: {fontStyle:'bold', fontSize}}
       styledRows.push(colFmt);
    }
    return styledRows
  }


function getColumnsStyle(colsWchArr, fSize){
    let colStyles = {};

    if(colsWchArr?.length){
        for (let i = 0; i < colsWchArr?.length; i++) {
            const cellWidth = colsWchArr[i] || 'auto';
            const colNo = i.toString();
            const fontSize = fSize || 8;
            colStyles[colNo] = {cellWidth, fontSize};  
        }
    }else{
        colStyles = {
            fillColor: null,      // Disable cell fill color
            textColor: null,      // Disable text color
            fontStyle: 'normal',  // Set font style to normal
          }
    }
    return colStyles
 }
const startYArr = [20, 30, 35, 40];

var base64Img = "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAXdJREFUOI1jYKAFEBMTa9DR0fmPjLW1tX/y8/NH4tXIzs6uDVKsrq7+EMhWQ5bj4eFxAxryByj/D8hlxNDMysqqANIM1KiBzxIpKamZIHUYEiBBDg4OfRgf5AqY84G2u2hpaX1UUFDYC5LT1NR8KyoqWgvXLCAgEAsUfI9smLKy8mkolxFmEC8vrx/Uq5oorgAFEDc3tx2ILS8vvwXdiXx8fMHoYih8ZA6ILSwsXIismIuLywpZDRMTExdeA5iZmYWRDZCVlV0ODIPPML6cnNwGRUXFfTgNAHrHCd254uLi7SA2CwuLGFQ9Iio1NDReioiIlIPYSkpKh0EKgM7kYWNjU4QFIDD6pgATWD2IzcnJaYpsAShUNZBdAQzIbdAE9RRkk5qa2n0QH2jRC5DBIDXAaKxAMURFReUS0J9fGIgAQIOfAKP9NYYE0ObtIJuA9CZgypRFlmNkZGSTlJScAE0jp/BZwCwjI7MQPTOBMCjkQVFIjCuJBgDajnP5sPj7AwAAAABJRU5ErkJggg==";
 var text1 = `The only thing required is either the html or body option. If you want more control over the columns you can specify the columns property. If columns are not set they will be automatically computed based on the content of the html content or head, body and foot.`;
 var text2 = `ColumnDef: string|{header?: string, dataKey: string} The header property is optional and the values of any content in head will be used if not set. Normally it's easier to use the html or head/body/foot style of initiating a table, but columns can be useful if your body content comes directly from an api or if you would like to specify a dataKey on each column to make it more readable to style specific columns in the hooks or columnStyles.`;

 var footer1 = "The only thing required is either the html or body option. If you want more control over the columns"; 
 var footer2 = "If columns are not set they will be automatically computed based on the content of the html content.";
 var footer3 = "The only thing required is either the html or body option.";
