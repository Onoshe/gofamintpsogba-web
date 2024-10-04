import { handleExcelExport } from '@/container/reports/utils/others/handleExcelExport';
import { dummyTransGenerator } from '@/lib/dummyData/dummyTrans';
import React from 'react'



const GenerateFDummyData = ({chartOfAccounts, vendors, customers}) => {
  const docName = "" 
  const docHeader =""; 
  //const = data;
  //col1WchInDigit

  const handleGenerateData=()=>{
     const receivableAcctCodes = customers.filter((dt)=> dt.accountGroup === "MEMBERS");
     const payableAcctCodes = vendors.filter((dt)=> dt.accountGroup === "MEMBERS");

    const params = {chartOfAcctCodes:chartOfAccounts, receivableAcctCodes, payableAcctCodes, 
        noOfLoans:500, noOfExp:250};
    const res = dummyTransGenerator(params); 
    //const reportRows = res;
    const reportHeader = [['date',	'description',	'debitAccount',	'creditAccount',	'debitSub',	'creditSub',	'reference',	'dueDate',	'amount', 'loanBal', 'loanIndv']];
    const pdfHeader = [['Dummy Transactions']];

    function objectToArray(arr, keys) {
      return arr.map(obj => {
         return keys.map((key, colNo) =>{
              return obj[key] || "";
          })
      });
    }
    //sortArrayByKey(res, 'date');
    //return console.log(res)
    if(res?.length){
      const data = objectToArray(res, reportHeader[0]);

      handleExcelExport({docName:'Dummy Transactions', docHeader:reportHeader, data})
      //console.log(params)
     
       //console.log(res)
    }
    
      
  }
  return (
    <div className='px-5'>
        <button className='btn btn-accent' onClick={handleGenerateData}>Generate Data</button>
    </div>
  )
}

export default GenerateFDummyData