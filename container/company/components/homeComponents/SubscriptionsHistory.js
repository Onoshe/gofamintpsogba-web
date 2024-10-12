'use client'
import React, {useState} from 'react';
import DashboardCard from '../reusableComponents/DashboardCard';
import ReportTable from '../reusableComponents/ReportTable';
import { sortArrayByDate } from '@/lib/sort/sortArrayByDate';
import { formatToCurrency } from '@/lib/currency';

const SubscriptionsHistory = ({subscriptions, client_Admin, clientData, generalSettings, quickRecordsLogo, handleExportReceipt, handleExportStatement}) => {


let subHistory = [...subscriptions];
sortArrayByDate(subHistory, 'subscriptionDate', 'ASC');
if(subHistory?.length){
    subHistory = subHistory.map((dt)=>{
        let expired = new Date(dt.expiredDate).getTime() < new Date().getTime();
        return {...dt, status:expired? "Expired" : "Active", export:'Export', classNameTD:`${expired? 'text-red-800' : 'text-green-600'}`, exportClassName}
    })
}

//console.log(client_Admin)
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
 const handleClickRowCell =(key, row, i)=>{
   if(key==="export"){
     const sub = subscriptions.find((dt)=> dt.id == row.id);
        pdfData.invoiceNo = sub.invoiceNo;
        pdfData.paymentRef = sub.paymentRef;
        pdfData.date = sub.subscriptionDate;
        pdfData.itemDesc1 = sub.subDescription1;
        pdfData.itemDesc2 = sub.subDescription2;
        pdfData.itemAmount2 = "N"+formatToCurrency(parseFloat(sub.subscriptionAmount));
        pdfData.itemSubTotal = "N"+formatToCurrency(parseFloat(sub.subscriptionAmount));
        pdfData.itemTotal = "N"+formatToCurrency(parseFloat(sub.subscriptionAmount));

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
                    rowKeys={["subscriptionDate", "paymentRef", "subscriptionType", "description", "expiredDate", "status", "subPaymentStatus", "subscriptionAmount",  "export"]}
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
var headers = [{name:"subscriptionDate", title:"Date"}, {name:"paymentRef", title:"Payment Ref"}, {name:"description", title:"Description"}, {name:"expiredDate", title:"Expiration date"},
    {name:"subscriptionAmount", title:"Amount"}, {name:"subscriptionType", title:"Plan"}, {name:"export", title:"Export Pdf"}, {name:"status", title:"Status"},
    {name:"subPaymentStatus", title:"Payment"}];

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