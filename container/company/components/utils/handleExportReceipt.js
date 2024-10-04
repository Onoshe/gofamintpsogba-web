import { formatToCurrency } from '@/lib/currency';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


export const handleExportReceipt =({quickRecordsLogo, paid='paid', pdfData})=>{
   const reportName = "Payment Receipt";

    const doc = new jsPDF({
      orientation: 'portrait', //Deafult is 'portrait' Other is 'landscape',
      unit: 'mm', // Default is 'mm'
      format: 'a4' // Default is 'a4'
    });
    const pageSize = doc.internal.pageSize;
    const pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
    const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();

    // Add the image to the PDF
    if(quickRecordsLogo){ // Parameters: image data, format, x, y, width, height
      doc.addImage(quickRecordsLogo, 'JPEG', 10, 10, 40, 40)
    }; 


   //Add PAID Watermark
   const fntSz = paid? 36 : 32;
   const fillColor = paid? "#7ee332" : "red";
   const textX = paid? 170 : 165;
   const textY = paid? 15 : 10;

   let context = doc.context2d;
    context.fillStyle = fillColor;
    context.translate(100, -75)
    context.rotate(Math.PI/4)
    context.rect(80, 0, 150, 20, "FD");
    context.stroke();
    context.fill();
    // Filled red square with black borders
    doc.setFont("helvetica", "bold");
    doc.setFontSize(fntSz);
    doc.setTextColor("white");
    doc.text(paid? "PAID" : "NOT PAID", textX, textY, null, -45);
    

    doc.setFont("normal", "italic");
    doc.setFontSize(11);
    doc.setTextColor("dodgerblue");
    doc.text(pdfData.logoText, 15, 54, null);

    doc.autoTable({
        theme: 'plain', // Removes all stripes and borders
        startY:55,
        head: [
            [{ content: pdfData.devName, styles: { halign: 'right', fontStyle:'bold', fontSize:14 } }],
            [{ content: pdfData.devAddress, styles: { halign: 'right' } },]
        ],    
    });

    doc.autoTable({
      theme: 'plain', 
      body: [
          [{ content: 'Invoice No: #'+pdfData.invoiceNo, styles: { halign: 'left', fillColor:'#ddd', fontStyle:'bold', cellPadding:2, fontSize:13  } }],
          [{ content: 'Invoice Date: '+pdfData.date, styles: { halign: 'left', fillColor:'#ddd', cellPadding:2} },],
          [{ content: 'Payment reference: '+pdfData.paymentRef, styles: { halign: 'left', fillColor:'#ddd', cellPadding:2} },]
      ],  
    });

      const invoiceToBody = [
        [{content: "Invoiced To", styles:{halign:"left", cellPadding:1, fontStyle:'bold'}}],
        [{content: pdfData.invoiceName, styles:{halign:"left", cellPadding:1}}],
        //[{content: "Plot 221, Ikeji Way", styles:{halign:"left", cellPadding:1}}],
        //[{content: "Alausa, Governor Road", styles:{halign:"left", cellPadding:1}}],
        //[{content: "CBD", styles:{halign:"left", cellPadding:1}}],
        //[{content: "Ikeja", styles:{halign:"left", cellPadding:1}}],
     ];
     const addressArr = pdfData.address;
     addressArr.forEach(addr => {
        invoiceToBody.push([{content: addr, styles:{halign:"left", cellPadding:1}}])
     });


    doc.autoTable({
      theme: 'plain',
      body: invoiceToBody
    });

    const headerStyle = {halign:"center", fillColor:'#eee', fontStyle:'bold', cellPadding:{top:4}};
    const alt1 = {halign:"left", fillColor:'#fcfcfc', cellPadding:{left:5, top:3}};
    const alt1b = {halign:"center", fillColor:'#fcfcfc', cellPadding:{left:5, top:3}};
    const alt2 = {halign:"right", fillColor:'#eee', fontStyle:'bold', cellPadding:{left:5, top:3}};
    const alt2b = {halign:"center", fillColor:'#eee', cellPadding:{left:5, top:3}};
    const alt2c = {halign:"center", fillColor:'#eee', fontStyle:"bold", cellPadding:{left:5, top:3, bottom:5}};
    const alt2d = {halign:"right", fillColor:'#eee', fontStyle:'bold', cellPadding:{left:5, top:3, bottom:5}};

    
    const itemDesc1 = pdfData.itemDesc1; // "Plot 221, Ikeji Way";
    const itemAmount1 = pdfData.itemAmount1; // "$2,980.45";
    const itemDesc2 = pdfData.itemDesc2; //"Choose the method that best fits your requirements, whether you need borders for the entire table, specific cells, or just parts like headers or body rows.";
    const itemAmount2 = pdfData.itemAmount2; //"$2,980.45";
    const itemSubTotal = pdfData.itemSubTotal; //"$2,980.45";
    const itemCredit = pdfData.itemCredit; //"$2,980.45";
    const itemVAT = pdfData.itemVAT; //"$2,980.45";
    const itemTotal = pdfData.itemTotal; //"$2,980.45";

    doc.autoTable({
      theme: 'plain',
      body: [
          [{content: "Description", colSpan:9, styles:headerStyle}, {content: "Total", styles:headerStyle}],
          [{content: itemDesc1, colSpan:9, styles:alt1}, {content: itemAmount1, styles:alt1b}],
          [{content: itemDesc2, colSpan:9, styles:alt1}, {content: itemAmount2, styles:alt1b}],
          [{content: "", styles:alt1}, {content: "", styles:alt1}],
          [{content: "Sub total:", colSpan:9, styles:alt2}, {content: itemSubTotal, styles:alt2b}],
          [{content: "Credit:", colSpan:9, styles:alt2}, {content: itemCredit, styles:alt2b}],
          [{content: "VAT:", colSpan:9, styles:alt2}, {content: itemVAT, styles:alt2b}],
          [{content: "Total:", colSpan:9, styles:alt2d}, {content: itemTotal, styles:alt2c}],
      ],
      tableLineWidth: 0.2,
      tableLineColor: [200, 200, 200],

    });

    const bStyle ={
      halign:"center",
      cellPadding:1
    };

    const bottomNote = [];
    pdfData.bottomNote.forEach(content => {
      bottomNote.push([{content, styles:bStyle}])
    });

    doc.autoTable({
      theme: 'plain',
      startY: pageHeight-50, 
      body: bottomNote  
    });
      doc.save(reportName+".pdf");
 };



var base64Img = "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAXdJREFUOI1jYKAFEBMTa9DR0fmPjLW1tX/y8/NH4tXIzs6uDVKsrq7+EMhWQ5bj4eFxAxryByj/D8hlxNDMysqqANIM1KiBzxIpKamZIHUYEiBBDg4OfRgf5AqY84G2u2hpaX1UUFDYC5LT1NR8KyoqWgvXLCAgEAsUfI9smLKy8mkolxFmEC8vrx/Uq5oorgAFEDc3tx2ILS8vvwXdiXx8fMHoYih8ZA6ILSwsXIismIuLywpZDRMTExdeA5iZmYWRDZCVlV0ODIPPML6cnNwGRUXFfTgNAHrHCd254uLi7SA2CwuLGFQ9Iio1NDReioiIlIPYSkpKh0EKgM7kYWNjU4QFIDD6pgATWD2IzcnJaYpsAShUNZBdAQzIbdAE9RRkk5qa2n0QH2jRC5DBIDXAaKxAMURFReUS0J9fGIgAQIOfAKP9NYYE0ObtIJuA9CZgypRFlmNkZGSTlJScAE0jp/BZwCwjI7MQPTOBMCjkQVFIjCuJBgDajnP5sPj7AwAAAABJRU5ErkJggg==";
 var text1 = `The only thing required is either the html or body option. If you want more control over the columns you can specify the columns property. If columns are not set they will be automatically computed based on the content of the html content or head, body and foot.`;
 var text2 = `ColumnDef: string|{header?: string, dataKey: string} The header property is optional and the values of any content in head will be used if not set. Normally it's easier to use the html or head/body/foot style of initiating a table, but columns can be useful if your body content comes directly from an api or if you would like to specify a dataKey on each column to make it more readable to style specific columns in the hooks or columnStyles.`;

 var footer1 = "The only thing required is either the html or body option. If you want more control over the columns"; 
 var footer2 = "If columns are not set they will be automatically computed based on the content of the html content.";
 var footer3 = "The only thing required is either the html or body option.";
/*
[
    [{content:'Invoice No: #12345-'+pageHeight, styles:bStyle}],
    [{content:'PDF generated date: '+new Date().toLocaleDateString(), styles:bStyle}],
],
*/