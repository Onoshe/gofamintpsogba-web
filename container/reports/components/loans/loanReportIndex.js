import { getHeadersTitle } from "@/container/reports/utils/ledgers/getHeaders"; 
import { sortTableData } from "@/container/reports/utils/others/sortTableData";
import { addMonthsToDate } from "@/lib/date/addMonthsToDate";
import { getDaysDifference } from "@/lib/date/getDaysBetweenDates";
import { getStartAndEndDate } from "@/lib/dummyData/getStartAndEndDate";
import { sortArrayByKey } from "@/lib/sort/sortArrayByKey";

////recordedTransArr

const keysRecordTrans = ["date", "account", "accountSub","description",  "transactionNo","voucher",  "reference", "debit", "credit", "balance"];



 export const loanReportIndex =({dateForm, reportName,  transProcessor, clickedHeader})=>{
    const dateFormFmt = dateForm?.defaultDate? getStartAndEndDate("THIS-MONTH") : dateForm;
    const res = transProcessor.getRecordedTransactions(dateFormFmt);
    let rowsRes = res.recordedTransArr.filter((dt)=> dt?.voucher?.toLowerCase() === "journal");
   // console.log(res)
    const customersLedgers = transProcessor.processTransactions('2022-01-01', dateForm?.endDate).customersLedger;
    const customersLedgersArr = Object.values(customersLedgers);
    //console.log(customersLedgersArr)

    const startDateFmt = new Date(dateFormFmt?.startDate).toDateString();
    const endDateFmt = new Date(dateFormFmt?.endDate).toDateString();
    const date = 'Loan summary report from '+startDateFmt+" to "+endDateFmt;

    //return {}
    let result = {};
    const pdfDataFullData = {
        reportRowKeys:keysRecordTrans,
        noFmtCols:[8,9], // Number format columns 1234567 => 1,234,567
        headerFSize:[13],
        tableColsWch:[15, 35, "", "", "", "", "", "", "", ""], //Empty is auto
        tableColsFSize:6,
        tablePlain:[],
        footerArr:[],
        tableHeaderFSize:11,
    }
    const pdfData =  pdfDataFullData;
    let rowKeysShow = keysRecordTrans; 
    sortArrayByKey(rowsRes, 'transId', 'ASC');
    const rows = rowsRes.reduce((rowsFmt, row, i) => {
        const prevRow = rowsRes[i - 1];
        
        if (i > 0 && prevRow.transId !== row.transId) {
          // Add a separator (empty object) and the current row
          rowsFmt = [...rowsFmt, {}, row];
        } else {
          // Just add the current row
          rowsFmt = [...rowsFmt, row];
        }
        return rowsFmt; // Return the updated array
      }, []);   
    //  console.log(rows)
    let rowsDt = customersLedgersArr[0]?.trans; //clickedHeader.name? sortTableData([...rows], clickedHeader.name) : rows;
    let bal = 0;
    rowsDt = rowsDt?.map((dt)=> {
      bal += parseFloat(dt.amount); 
      return {...dt, balance: bal}
    })
    const loanDetails = getLoanDetailsFunction(customersLedgersArr);
    const loanRows = Object.values(loanDetails);
    result =  {date, name:reportName, title:"Loan Summary Report", clickables:"", rowKeysShow:loanKeys, rowHeaders:getHeadersTitle(loanKeys), rows:loanRows, pdfData}

return result
}

var loanKeys = ["accountCode", "accountName", "totalLoanPrin", "totalInterest", "loanCounts", 
  "runningLoanPrin", "runningLoanInt", "runningLoanPrinAndInt", "runningLoanTotalRepaid", "loanBalance",
  "runningLoanStatus", "runningLoanLastRepaymentAmount", "runningLoanLastRepaymentDate", "runningLoanStartDate",
  "runningLoanDueDate", "runningLoanDaysToDue", "runningLoanDaysPastDue", "lastLoanPrin", "lastLoanInt"];
function  getLoanDetailsFunction(customersLedgersArr){
      //const loanDetails = [];
      const loanDetails = {};
      const today = new Date().toISOString().split("T")[0];
      for (let i = 0; i < customersLedgersArr.length; i++) {
          const customer = customersLedgersArr[i];
          const customerTrans = customer.trans;
          if(!loanDetails[customer.accountCodeSub]){ //Initialize
            loanDetails[customer.accountCodeSub] = {
              accountCodeSub:customer.accountCodeSub,
              accountName:customer.name,
              accountGroup:customer.group,
              totalLoanPrin:0,     //Total loan principal collected
              totalInterest:0,
              totalLoanPrinAndInt:0,
              loanCounts:0,    //No of times loan collected
              runningLoanPrin:0,
              runningLoanInt:0,
              runningLoanPrinAndInt:0,
              runningLoanTotalRepaid:0,
              runningLoanLastRepaymentAmount:0,
              runningLoanLastRepaymentDate:"",
              runningLoanStatus:"",
              runningLoanStartDate:"",
              runningLoanDueDate:"",
              runningLoanDaysToDue:"",
              runningLoanDaysPastDue:"",
              loanBalance:0,
              lastLoanPrin:0,
              lastLoanInt:0,
              lastLoanPrinAndInt:0
            };
          };
          let runningLoanPrin = 0;
          let runningLoanStartDate = "";
          let runningLoanDueDate = "";
          let runningLoanDaysToDue = "";
          let runningLoanDaysPastDue = "";
          let runningLoanInt = 0;
          let runningLoanPrinAndInt = 0;
          let loanBalance = 0;
          let totalLoanPrinAndInt = 0;

          for (let j = 0; j < customerTrans.length; j++) {
            const tran = customerTrans[j];
            const {description, transactionDate} = tran;
            const isDr = tran.entryType === "DR";
            const amount = parseFloat(tran.amount);
            const amountAbs = parseFloat(Math.abs(tran.amount));
            loanBalance += amount;

            if(isDr){
              const isLoan = tran.offsetAccountTypeCode == 131;   //Bank code: Tran from bank             
              const isReclass = tran.offsetAccountTypeCode == 232; //PayableControl code
              if(isLoan){
                  loanDetails[customer.accountCodeSub]['totalLoanPrin'] += amount;
                  loanDetails[customer.accountCodeSub]['loanCounts'] += 1;
                  runningLoanPrin = amount;
                  runningLoanStartDate = transactionDate;
                  runningLoanInt = amount * 0.05;
                  totalLoanPrinAndInt += amount;
                  runningLoanPrinAndInt = runningLoanPrin + runningLoanInt; 
              }else if(isReclass){
                  //
              }else{
                loanDetails[customer.accountCodeSub]['totalInterest'] += amount;
                totalLoanPrinAndInt += amount;
              }
            }else{
                //runningLoanTotalRepaid calculation
                if(runningLoanPrin){
                  if(loanBalance <= 0){
                    //reset
                    loanDetails[customer.accountCodeSub]['runningLoanTotalRepaid'] = 0;
                    loanDetails[customer.accountCodeSub]['runningLoanLastRepaymentAmount'] = 0;
                    loanDetails[customer.accountCodeSub]['runningLoanLastRepaymentDate'] = "";
                  }else{
                    loanDetails[customer.accountCodeSub]['runningLoanTotalRepaid'] += amount;
                    loanDetails[customer.accountCodeSub]['runningLoanLastRepaymentAmount'] = amount;
                    loanDetails[customer.accountCodeSub]['runningLoanLastRepaymentDate'] = transactionDate;
                  }
                }
              
            }
            if(loanBalance <=0){
              loanDetails[customer.accountCodeSub]['runningLoanStatus'] = "PAID";
            }else{
              loanDetails[customer.accountCodeSub]['runningLoanStatus'] = "UNPAID";
            }
          }

            runningLoanDueDate = addMonthsToDate(runningLoanStartDate, 6);
            const daysDiff = getDaysDifference(runningLoanDueDate, today);

            runningLoanDaysToDue = daysDiff < 0? 0 : daysDiff;
            runningLoanDaysPastDue = daysDiff < 0? daysDiff : 0;

            loanDetails[customer.accountCodeSub].totalLoanPrinAndInt = totalLoanPrinAndInt;
            loanDetails[customer.accountCodeSub].lastLoanPrin = runningLoanPrin;
            loanDetails[customer.accountCodeSub].lastLoanInt = runningLoanInt;
            if(loanBalance > 0){
              loanDetails[customer.accountCodeSub].runningLoanPrin = runningLoanPrin;
              loanDetails[customer.accountCodeSub].runningLoanStartDate = runningLoanStartDate;
              loanDetails[customer.accountCodeSub].runningLoanDueDate = runningLoanDueDate;
              loanDetails[customer.accountCodeSub].runningLoanDaysToDue = runningLoanDaysToDue;
              loanDetails[customer.accountCodeSub].runningLoanDaysPastDue = runningLoanDaysPastDue;
              loanDetails[customer.accountCodeSub].runningLoanInt = runningLoanInt;  
              loanDetails[customer.accountCodeSub].loanBalance = loanBalance;
              loanDetails[customer.accountCodeSub].runningLoanPrinAndInt = runningLoanPrinAndInt;
            }
                       
    }
    return loanDetails
}