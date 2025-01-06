import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';



  // Sample data for the table
  var dataDef = [];
  for (var i = 0; i < 1000; i++) {
      dataDef.push([i+1+'.', new Date().toLocaleDateString(), "Data display in row " + (i + 1), 1000 * i, 1000 * i, 1000 * i]);
  }

export const handleExportStatement = async ({imgObj, data=dataDef, pdfData= pdfDataDef, docMethod}) => {
    let lineHeight = 1.1; //Line height for wrap text
    //Initialize the jsPDF object inside the function so that the previous report data will not persist in the current report
    var doc = new jsPDF({
        orientation: "portrait", // should it be portrait or landscape?
        lineHeight: lineHeight,
        unit:"mm",
        format: [250, 340], // format can be string or array [x, y] in above units. Paper a4 is 210mm x 297mm
      });
         
    
   
    const reportName = pdfData.docName;
      var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
      var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
      
       //Add base64 converted image
        var imgX = 145;
        var imgY = 10;
        var imgW = 50;
        var imgH = 50;
        if(imgObj?.file || base64Img){
            var base64Img = imgObj?.file || base64Img;
            doc.addImage(base64Img, 'PNG', pageWidth -60, imgY, imgW, imgH);
        }


    doc.setProperties({
        title: pdfData.title, 
        subject: pdfData.subject, 		
        author: pdfData.author, 
        keywords: pdfData.keywords, 
        creator: 'MEE'
    });



    const address = "Lagos";
        let str1 = pdfData.accountType+` Account Statement`;
        let printDateText = "Printed date:"
        let magL = 10; 
        let str1Y = 20;
        
        doc.setTextColor('red');
        doc.setFontSize(20);
        doc.text(str1, magL, str1Y);
        doc.setTextColor(120, 20, 20);
        doc.setFontSize(20);
        
        let printDate = new Date().toUTCString();
        doc.setFontSize(14);
        doc.setTextColor('black');
        doc.text(printDateText, magL, 28);
        doc.setFontSize(12);
        doc.text(printDate, magL+30, 28);
        
        //Rectangle with rounded corners- Client details
        let tranW = 100; 
        let tranH = address?.length > 50? 40 : 38; 
        let tranRad = 5;
        doc.setDrawColor(255, 0, 0);
        doc.setFillColor('white');
        doc.roundedRect(magL, 40, tranW, tranH, tranRad, tranRad, "FD");

        
        let strName = pdfData.accountName;
        let strFmNo = `Form No: ${pdfData.formNo}`;
        let strAddr = pdfData.address;
        let tranPL = 15;
        doc.setFont("helvetica", "bold");
        doc.setTextColor('black');
        doc.setFontSize(16);
        doc.text(strName, tranPL, 50);
        
        doc.setFont("times", "normal");
        doc.text(strFmNo, tranPL, 58);
        const addrMaxLen = tranW -8;
        var splitAddr = doc.splitTextToSize(strAddr, addrMaxLen);
        splitAddr = strAddr? splitAddr : "Address:"
        doc.text(splitAddr, tranPL, 67);
        
        
    //Upper table Lines- uT and and string
        let utW = pageWidth - magL, utY = 103;
        doc.setLineWidth(0.5);
        doc.line(magL, utY, utW, utY);
        doc.setTextColor('red');
        doc.setFont("times", "bold");
        doc.text("Account details", magL, utY-3);
        doc.setFontSize(13);
        doc.setTextColor('black');
        doc.setFont("times", "normal");
        
        doc.autoTable({
            theme: 'plain',
            startY:105,
            margin:10,
            body: getAccountDetails(pdfData),        
          });

        //Upper table Lines- uT
        let l2Y = 135;
        doc.setLineWidth(0.5);
        doc.line(magL, l2Y, utW, l2Y);
        //Format for text
        doc.setFontSize(12);
        doc.setTextColor('red');
        doc.setFont("times", "bold");
        l2Y = l2Y+15;
        doc.text("Transactions", magL, l2Y);
        doc.text("Statement Period from "+new Date(pdfData?.startDate).toDateString(pdfData?.endDate)+" to "+new Date().toDateString(), pageWidth/2, l2Y);
        doc.setTextColor('black');
        doc.setFont("times", "normal");

        let headData = ["SN", "Date", "Transaction details", "Debit", "Credit", "Balance"];
        const headDatas = [
            {content:"SN", styles: {halign: 'left'}},
            {content:"Date", styles: {halign: 'left'}},
            {content:"Transaction details", styles: {halign: 'left'},  cellWidth: 100, overflow:'linebreak'},
            {content:"Debit", styles: {halign: 'right'},},
            {content:"Credit", styles: {halign: 'center'}},
            {content:"Balance", styles: {halign: 'left'}}
        ];
        headData.map((dt)=> {return {content:dt, halign:"left"}});
        doc.autoTable({
            //theme: 'plain',
            startY: l2Y +2,
            margin:9,
            head:[headDatas],   
          });

            data?.map((dt)=>{
                return {content:dt, styles: {halign: 'center'}}
            })
            
        let foot = [[{content:"   ", colSpan:5}, { content: "Confidential", styles: { halign: 'center', fontSize:9, fillColor:"red",} }], 
            [{ content: "Statement to: "+pdfData.email+" | "+pdfData.address, colSpan: 6, styles: { halign: 'center', fontSize:9 } }],
            [{ content: "For further enquiries, contact: "+pdfData.company, colSpan: 6, styles: { halign: 'center', fontSize:9 } }],
            [{ content: "For further enquiries, contact: "+pdfData.companyContact, colSpan: 6, styles: { halign: 'center', fontSize:9 } }]
            ];
            //foot = foot.map((dt)=> {return { content: dt, colSpan: 6, styles: { halign: 'center' } }})
            // Define autoTable
            doc.autoTable({
                //head: [['Column 1', 'Column 2', 'Column 3', 'Column 4']],
                //startY: l2Y - 10,
                margin:9,  //margin: { top: 10 },
                body: data,
                foot,
                
                //footStyles: {fillColor:'dodgerblue', textColor:'black'},
                didDrawPage: function (data) {
                    // Get the current page number
                    var pageNumber = doc.getCurrentPageInfo().pageNumber;
                    
                    // Set the font and size for the page number
                    doc.setFontSize(10);
                    
                    // Add page number at the bottom of the page
                    doc.text('Page ' + pageNumber, data.settings.margin.left, doc.internal.pageSize.height - 5);
                    }
            });
  
        //doc.save(reportName+".pdf");
        if(docMethod === "PRINT"){
            'use client'
            var blob = doc.output("blob");
            window.open(URL.createObjectURL(blob));
        }else if(docMethod === "STRING"){
            return doc.output("datauristring");  //arraybuffer for Email 
        }else if(docMethod === "ASFILE"){
            'use client'
            var blob = doc.output("blob");
            return blob;
        }else{
            doc.save(reportName+".pdf");
        }  
};
      

var pdfDataDef = {
    docName:"Sample Statement",
    accountName:"James Ademola",
    formNo:"00034",
    address:"Benson Drive, 234 layout, Ikeja, Lagos",
    accountNo: "C-0001213",
    accountType:"Savings",
    currency:"NGN",
    openingBalance:"$234,267,908.12",
    totalDebits:"$345,789.00",
    totalCredits:"$390,119.00",
    closingBalance:"$134,167,108.12",
    period:`From ${new Date("2024-03-31").toString()} to ${new Date().toString()}`,
    email:"james.ademola@gmail.com",
    company:"Ozitech Studio technology",
    companyEmail:"ozitechstudio@ymail.com",
    companyContact:"From: Ozitech Studio technology | No 234 Oluyole Street, Alausa, Ikeja, Lagos | ozitechstudio@ymail.com",
    genDate:new Date("2024-03-31").toString(),
    title:'The Profitable Way (Kosofe) Cooperative Multipurpose Society Limited',
    subject:'The Profitable Way Cooperative (Kosofe) Statement',
    startDate:'2024-01-01',
    endDate:'2024-12-12',
    author:'Ozitech Studio Technology',
    keywords:'ozitech, studio, technology, statement, account, pdf',
  };

  function getAccountDetails(pdfData){
    const style1 = {halign:"left", cellPadding:{bottom:2, left:2}, fontStyle:'bold', fontSize:12};
    const style2 = {halign:"left", cellPadding:{bottom:2, left:2}, fontSize:12};
    const styleBlank = {halign:'center', textColor:'white', cellPadding:{bottom:2, left:2}};

    return [
        [{content: "Account Name:", styles:style1}, {content: pdfData.accountName, styles:style2},
         {content: "James1", styles:styleBlank},{content: "Ali 1", styles:styleBlank},
         {content: "James1", styles:styleBlank},{content: "Ali 1", styles:styleBlank},
         {content: "Opening balance:", styles:style1}, {content: pdfData.openingBalance, styles:style2},
        ],
        [{content: "Account Number:", styles:style1}, {content: pdfData.accountNo, styles:style2},
            {content: "James1", styles:styleBlank},{content: "Ali 1", styles:styleBlank},
             {content: "James1", styles:styleBlank},{content: "Ali 1", styles:styleBlank},
            {content: "Total debits:", styles:style1}, {content: pdfData.totalDebits, styles:style2},
        ],
        [{content: "Account Type:", styles:style1}, {content: "Savings", styles:style2},
            {content: "James1", styles:styleBlank},{content: "Ali 1", styles:styleBlank},
            {content: "James1", styles:styleBlank},{content: "Ali 1", styles:styleBlank},
            {content: "Total credits:", styles:style1}, {content: pdfData.totalCredits, styles:style2},
        ],
        [{content: "Currency:", styles:style1}, {content: pdfData.currency, styles:style2},
            {content: "James1", styles:styleBlank},{content: "Ali 1", styles:styleBlank},
            {content: "James1", styles:styleBlank},{content: "Ali 1", styles:styleBlank},
            {content: "Closing balance:", styles:style1}, {content: pdfData.closingBalance, styles:style2},
        ],
    ]
  }