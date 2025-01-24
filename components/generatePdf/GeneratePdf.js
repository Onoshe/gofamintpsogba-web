'use client'
import { jsPDF } from "jspdf";
import React, { useRef, useState } from "react";
import PdfTemplate from "@/constants/PdfTemplate";
//https://dev.to/m3cv1no/how-to-use-jspdf-in-react-and-add-styling-to-it-36jc



const GeneratePdf = ({btnName}) => {
  const templateRef = useRef(null);
  const [showTemplate, setShowTemplate] = useState(false);
  const [reportData] = useState([]);


  const handleGeneratePdf =async () => {
    setShowTemplate(true);
    const doc = new jsPDF({
      format: "a4",
      unit: "px"
    });

   const templateRefCurrent = await templateRef.current;
  
   await doc.html(templateRefCurrent, {
      async callback(doc) {
         doc.save('Membership Form');
      }
    });
    //setTimeout(()=>setShowTemplate(false), 1000)
  };

 function prepareReportData(){
    //prepareReportDataCall()
      handleGeneratePdf();
  }

  return (
    <div >
      <button
        onClick={prepareReportData}
      >
        {btnName || 'Generate Pdf'}
      </button>
      <div ref={templateRef} style={{ position:'fixed',zIndex:0,}}
        className={`${showTemplate? '' : 'hidden'}`}>
        <PdfTemplate reportData={reportData} elevate={5}
        />
      </div>
    </div>
  );
};

export default GeneratePdf;
