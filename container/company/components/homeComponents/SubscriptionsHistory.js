'use client'
import React, {useState} from 'react';
import DashboardCard from '../reusableComponents/DashboardCard';
import ReportTable from '../reusableComponents/ReportTable';
import { sortArrayByDate } from '@/lib/sort/sortArrayByDate';
import { formatToCurrency } from '@/lib/currency';
import { addDaysToDate, getDaysBetweenDates, getDaysDifference } from '@/lib/date/getDaysBetweenDates';
import { addMonthsToDate } from '@/lib/date/addMonthsToDate';

const SubscriptionsHistory = ({subscriptions, client_Admin, clientData, generalSettings, quickRecordsLogo, 
    handleExportReceipt,currencySymbol, handleExportStatement}) => {

let subHistory = [...subscriptions];
sortArrayByDate(subHistory, 'subscriptionDate', 'ASC');
if(subHistory?.length){
    subHistory = subHistory.map((dt)=>{
        let expired = new Date(dt.expiredDate).getTime() < new Date().getTime();
        const today = new Date().toISOString().split("T")[0];
        let daysToDueDate = getDaysDifference(dt.expiredDate, today);
            daysToDueDate = daysToDueDate < 0? 0 : daysToDueDate;
        const  discountAmount ='-'+currencySymbol+formatToCurrency(parseInt(Math.abs(dt.discountAmount)));
        const  paidAmount = currencySymbol+formatToCurrency(parseInt(dt.subscriptionAmount) + parseInt(dt.discountAmount));

        return {...dt, daysToDueDate, discountAmount, paidAmount, subscriptionAmount:currencySymbol+formatToCurrency(parseInt(dt.subscriptionAmount)), status:expired? "Expired" : "Active", export:'Export', classNameTD:`${expired? 'text-red-800' : 'text-green-600'}`, exportClassName}
    })
}

//console.log(client_Admin, clientData)
//console.log(subscriptions)
const pdfData = {};
  if(clientData?.companyName && client_Admin?.companyName){
    pdfData.invoiceName = clientData.companyName;
    pdfData.address = clientData.address.split("|");
    pdfData.devName = client_Admin.companyName;
    pdfData.devAddress = client_Admin.address;
    pdfData.logoText ='... simplifying your financial records.';
    pdfData.itemAmount1 = " ";
    pdfData.itemVAT = " ";
    pdfData.itemCredit = " ";
    pdfData.bottomNote= [
        "Thank you for choosing our service","",
        "Invoice generated on "+new Date().toString(),
    ];
  }

  //console.log(subscriptions);
 const handleClickRowCell =(key, row, i)=>{
   if(key==="export"){
     const sub = subscriptions.find((dt)=> dt.id == row.id);
        //period covered
        let proformaInvDate = "";
        if(sub.periodCovered){
            proformaInvDate = sub.periodCovered;
        }else{
            const today = new Date().toISOString().split("T")[0];
            const startDate = addDaysToDate(today, 1);      
            const endDate = addMonthsToDate(today, 12);
            proformaInvDate = startDate+" to "+endDate;
        }

        pdfData.reportName = clientData?.companyDomain? clientData?.companyDomain.toUpperCase() +"_Subscription_Invoice" : "Subscription_Invoice";
        pdfData.invoiceNo = sub.invoiceNo;
        pdfData.paymentRef = sub.paymentRef;
        pdfData.date = proformaInvDate;
        pdfData.itemDesc1 = sub.subDescription1;
        pdfData.itemDesc2 = sub.subDescription2;
        pdfData.credit = sub.discount;
        pdfData.itemAmount2 = currencySymbol+formatToCurrency(parseFloat(sub.subscriptionAmount));
        pdfData.itemSubTotal = currencySymbol+formatToCurrency(parseFloat(sub.subscriptionAmount));
        pdfData.creditAmount = sub.discountAmount? '-'+currencySymbol+formatToCurrency(parseFloat(Math.abs(sub.discountAmount))) : 0;
        pdfData.itemVAT = sub.vatAmount? '-'+currencySymbol+formatToCurrency(parseFloat(Math.abs(sub.vatAmount))) : 0;
        const total = parseFloat(sub.subscriptionAmount? sub.subscriptionAmount : 0) + parseFloat(sub.discountAmount? sub.discountAmount : 0) + parseFloat(sub.vatAmount? sub.vatAmount : 0);
        pdfData.itemTotal = currencySymbol+formatToCurrency(total);
        //console.log(total, itemTotal, pdfData.creditAmount)
    handleExportReceipt({quickRecordsLogo, paid:sub.subPaymentStatus, pdfData});
   }
 }

  return (
     <>
        <br/><br/>
        <DashboardCard title={"Subscriptions and Billing History"} maxWidth="w-full">    
            <div className='flex flex-col self-start px-3 bg-white p-3 max-h-[60vh] overflow-auto'>
                {subHistory?.length? 
                <ReportTable
                    rowKeys={["subscriptionDate", "paymentRef", "subscriptionType", "description", "expiredDate", "daysToDueDate", "status", "subPaymentStatus", "subscriptionAmount", "discountAmount", "paidAmount",  "export"]}
                    header={headers}
                    rows={subHistory}
                    onClickRowCell={handleClickRowCell}
                />
                :<p className='text-red-700'>No subscription available!</p>
                }                   
            </div>
        </DashboardCard>
      </>
  )
}

export default SubscriptionsHistory;

var exportClassName = "shadow-lg active:bg-cyan-100 cursor-pointer bg-[#a3f8f6] hover:bg-[#6af9f6] p-1 px-2 rounded";
var headers = [{name:"subscriptionDate", title:"Subscription date"}, {name:"paymentRef", title:"Payment Ref"}, {name:"description", title:"Description"}, {name:"expiredDate", title:"Expiration date"},
    {name:"daysToDueDate", title:"Days Remaining"}, {name:"subscriptionAmount", title:"Price"}, {name:"subscriptionType", title:"Plan"}, {name:"export", title:"Export Pdf"}, {name:"status", title:"Status"},
    {name:"subPaymentStatus", title:"Payment"}, {name:"discountAmount", title:"Discount"}, {name:"paidAmount", title:"Amount Paid"},];

/********** SET EXPIRATION DATE
 * if(subHistory?.length){
      subHistory = subHistory?.map((dt, i)=> {
        const todayDate = new Date();
        const todayTime = todayDate.getTime();
        const subDate = new Date(dt.subscriptionDate);
        const subDateStr = subDate.toDateString();
        const subDueDate = new Date(dt.subscriptionDate);
            subDueDate.setDate(subDate.getDate() + 366);
        const subDueDateStr = new Date(subDueDate).toDateString();
        const subDueDateTime = subDueDate.getTime();
        const active = subDueDateTime > todayTime;
        if(i===0){subActive = active}
        return {...dt, subDateStr, subDueDateStr, active}
    });
}


ALTER TABLE _subscriptions ADD subDescription1 VARCHAR(255);
ALTER TABLE _subscriptions ADD subDescription2 VARCHAR(255);
ALTER TABLE _subscriptions ADD subStatus VARCHAR(255);
 */