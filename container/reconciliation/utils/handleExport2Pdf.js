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

export const handleExport2Pdf =({ reportRows, reportHeader, pdfHeader, pdfData, companyLogoFile, docMethod})=>{
   const reportRowKeys = pdfData?.reportRowKeys; //["accountCode", "accountName", "description"]
   const noFmtCols= pdfData?.noFmtCols || []; 
   const headerFSize = pdfData?.headerFSize || []; 
   const tableColsWch = pdfData?.tableColsWch || []; 
   const tableColsFSize = pdfData?.tableColsFSize || 8; 
   const tablePlain = pdfData?.tablePlain || []
   const footerArr = pdfData?.footerArr || [];
   const tableHeaderFSize = pdfData?.tableHeaderFSize || 10;
   const reportRowsStyle = pdfData?.reportRowsStyle || [];
   let reportName = pdfHeader[1][0] || "report";
   reportName = reportName.replaceAll(" ", "_");
  

    //const doc = new jsPDF();
    
    //console.log(doc);
    if(!reportRows?.length) return;

    let noOfColsDef = 2;
    let data = formatCurrencyCols(reportRows, reportRowKeys, reportRowsStyle);

    const rowsHeader = reportHeader;  //["Account Name", "Account Code", "Amount"]
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

      //doc.save(reportName+".pdf");
      if(docMethod === "PRINT"){
          'use client'
          var blob = doc.output("blob");
          window.open(URL.createObjectURL(blob));
        }else if(docMethod === "STRING"){
          return doc.output("datauristring");  //arraybuffer for Email 
        }else{
          doc.save(reportName+".pdf");
      }
 };

 function formatCurrencyCols(arrs, keys, styleRows) {
    const likelyCurrencyCol = ["debit", "credit", "openingbal", "openingbalance", "closingbal", "closingbalance", "amount", "balance", "total"];
   
    const result = arrs.map((arr, id) => {
       return arr.map((val, i) =>{
          //let content = val;
          const key = keys[i];
          if(styleRows?.length){
            let content = {content:val};
            if(likelyCurrencyCol.includes(key.toLowerCase()) && parseFloat(val)){
              const currency =  formatToCurrency(parseFloat(val));
              content = {content:currency};
            }
            if(styleRows.includes(id)){
              const val = content.content;
              content = {content:val, styles: {fontStyle:'bold'}}
            }  
            return content;
  
          }else{
            if(likelyCurrencyCol.includes(key.toLowerCase()) && parseFloat(content)){
              content =  formatToCurrency(parseFloat(content))
            }  
            return content
  
          }          
        })
    });
    return result
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