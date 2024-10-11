'use client'
import useStoreHeader from '@/context/storeHeader';
import React, { useRef, useState } from 'react'
import { DChart, DoughnutChart } from './components/charts/ChartCard';
import { Card2 } from './components/cards/Card2';
import { Card1 } from './components/cards/Card1';
import { ChartProfit } from './components/charts/ChartProfit';
import HeaderBar from './components/headerBar/HeaderBar';
import GenerateFDummyData from './components/dataGenerator/GenerateFDummyData';
import useStoreTransactions from '@/context/storeTransactions';
import { LedgersManager } from '../reports/utils/ledgers/ledgersManger';
import { getStartAndEndDate } from '@/lib/dummyData/getStartAndEndDate';
import { generatePandLChartData } from './utils/generatePAndLChartData';
import { formatToCurrency } from '@/lib/currency';
import { generateBSData } from './utils/generateBSData';
import { Card3 } from './components/cards/Card3';
import { handleExportStatement } from '../company/components/utils/handleExportStatement';
import { handleExportReceipt } from '../company/components/utils/handleExportReceipt';
import { useRouter } from 'next/navigation';
import { useAuthCustom } from '@/lib/hooks/useAuthCustom';



const DashboardIndex = ({ssUser}) => {
  const reportDate = getStartAndEndDate();
  const router = useRouter();
  const incomeExpRef = useRef(null);
  const reportDateAnalDef = new Date().toISOString().split("T")[0];

  const {coaStructure, transactions, transactionsDetails,controlAcctsCode, chartOfAccounts, customers, vendors, products, runDispatchClientDataCall, clientAccount,  dispatchReportDate} = useStoreTransactions((state) => state);
  let transProcessor = new LedgersManager({trans:transactions, transactions:transactionsDetails, chartOfAccounts, customers, vendors, products, controlAcctsCode, coaStructure, dateForm:reportDate});
  //let ledgers = transProcessor.processTransactions(reportDate?.startDate, reportDate?.endDate);
  //const {processedLedgers, customersLedger, vendorsLedger, productsLedger} = ledgers;
  //const { data: session, status } = useSession(); //{user:{companyId:'', email:''}}; 
  const { session, user, userRendering, status} = useAuthCustom(ssUser);
  //const user = session?.user;
  const [listOfAccounts, setListOfAccounts] = useState(false);
  const [reportDateAnal, setReportDateAnal] = useState(reportDateAnalDef);

  //const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const {showNotificationBar,settings, dispatchShowNotificationBar} = useStoreHeader((state) => state);
   
  const startDate = `${new Date(reportDateAnal)?.getFullYear()}-01-01`;
  const endDate = new Date(reportDateAnal)?.toISOString()?.split('T')[0];
   // console.log({startDate, endDate});

  const reportDateForm = reportDateAnal? {startDate, endDate} : "";
  const {incomeData, expensesData, dataLabel, incomeSumData, incomeSumLabel, expensesSumData, expensesSumLabel, totalExp, totalIn} = generatePandLChartData(transProcessor, coaStructure, reportDateForm);
  const {cashTotal, bankTotal, revTotal, payTotal, paySumLabel, paySumData, recSumLabel, recSumData, topBanks,
            cusGroup, vedGroup, prodTotal, groupObj, groupData, prodSumData, prodSumLabel} = generateBSData(transProcessor, coaStructure,  reportDateForm);
  const periodEndInit = new Date(reportDateAnal).toDateString().split(" ");
  const periodEnd = `${periodEndInit[2]} ${periodEndInit[1]} ${periodEndInit[3]}`
  
  let coyLogo = "";
    if(settings?.data?.length){
        const coyLogoFound = settings.data.find((dt)=> dt.slug === "company-logo");
        if(coyLogoFound?.largeText){coyLogo = {type:'base64', file:coyLogoFound.largeText}}
    }

 //const dateFormQuery = {startDate:'2024-01-01', endDate:'2024-05-30'}
 
  const handleSelAccount =(acct)=>{
    //console.log(acct);
    //setListOfAccounts(false)
  }
  //'#638484', '#c4ae23', '#3380f5', '#8f4c86','#538257',   '#26cece','#8a7b1a','#405d87','#440c3d','#105516'
  const onChangeReportDateAnal =(e)=>{
    setReportDateAnal(e.target.value)
  }


  const handlePrint =(i)=>{
    if(i == 1){
        handleExportReceipt({coyLogo});
    }else{
        handleExportStatement({imgObj:coyLogo});
    }    
  }
  const handleRefreshData =()=>{
    runDispatchClientDataCall();
    if (incomeExpRef.current) {
        incomeExpRef.current.update({
            duration: 1000, // 1000ms animation duration
            easing: 'easeInOutBounce', // Easing function for smooth animation
          });
      }
  }
  return (
    <div className={`text-gray-600 ${showNotificationBar? 'mt-10' : ''}`}>
        <div className='fixed w-full lg:w-[calc(100%_-_250px)]'>
            <HeaderBar
                chartOfAccounts={chartOfAccounts}
                handleSelAccount={handleSelAccount}
                listOfAccounts={listOfAccounts}
                setListOfAccounts={setListOfAccounts}
                companyId={user?.companyId}
                router={router}
                handleRefreshData={handleRefreshData}
                reportDate={reportDateAnal}
                onChangeReportDate={onChangeReportDateAnal}
                user={user}
                customers={customers}
                vendors={vendors}
                products={products}
            />
        </div>
        {/*<br/><br/><br/> */}
        <div className="smc:pt-[50px]">
            <div className='mt-20'>
                <GenerateFDummyData chartOfAccounts={chartOfAccounts} customers={customers} vendors={vendors}/>
                <div className='flex flex-row flex-wrap gap-3 p-3'>
                    <button className='btn btn-accent btn-sm' onClick={()=>handlePrint(1)}>Print Receipt</button>
                    <button className='btn btn-accent btn-sm' onClick={()=>handlePrint(2)}>Print Statement</button>
                </div>
            </div>
            <div className='w-full'>
                <div className='flex flex-col mt-3 gap-5 p-3'>
                <div className='flex flex-row justify-around flex-wrap gap-5 p-3 mt-5 pt-[30px]'>
                    <p className='text-teal-800 font-bold text-center'>Profit or Loss Summary Report for the period ending {periodEnd}</p>
                </div>
                    <div className='flex flex-row justify-around flex-wrap gap-4'>
                        <Card3  
                                title="Income & Expenses Total for the Period"
                                title1="Income Total"
                                amount1={totalIn}
                                title2="Expenses Total"
                                amount2={totalExp}
                            />
                        <ChartProfit
                            name="Net Profit" 
                            titleChart={"Income & Expense movement for the Period"}
                            titleChartSub={""}
                            titleTotal="Income - Expense movement in 6 months period"
                            incomeData={incomeData}
                            expensesData={expensesData}
                            label={dataLabel}
                            total1={totalIn}
                            total2={totalExp}
                            incomeExpRef={incomeExpRef}
                            /> 
                    </div>
                </div>
                
                <div className='flex flex-row justify-around flex-wrap gap-5 p-3 mt-3'>
                    <DoughnutChart
                        name="INCOME"
                        dataArr={incomeSumData}
                        titleChart="Income summary for the Period"
                        titleTotal={"Total Income: "}
                        titleAmount={`$`+formatToCurrency(totalIn)}
                        lebelArr={incomeSumLabel}
                    />
                    <DoughnutChart
                        name="EXPENSES"
                        dataArr={expensesSumData}
                        titleChart="Expenses summary for the Period"
                        titleTotal={"Total Expenses: "}
                        titleAmount={`$`+formatToCurrency(totalExp)}
                        lebelArr={expensesSumLabel}
                    />
                </div>
                
                <div className='flex flex-row justify-around flex-wrap gap-5 p-3 mt-5'>
                    <p className='text-teal-800 font-bold text-center'>Balance Sheet Summary Report as at {periodEnd}</p>
                </div>
                <div className='flex flex-row justify-around flex-wrap gap-5 p-3 mt-3'>
                    <Card1
                        title1="Cash Account"
                        amount1={`$`+formatToCurrency(cashTotal)}
                        title2="Bank Account"
                        amount2={`$`+formatToCurrency(bankTotal)}
                    />
                    <Card2
                        title1="Bank balances"
                        title2={`Top Banks`}
                        subTitle1={topBanks.label[0] || "Bank"}
                        subTitle2={topBanks.label[2] || "Bank"}
                        subTitle3={topBanks?.label[1] || "Bank"}
                        subTitle4={topBanks?.label[3] || "Bank"}
                        amount1={`$`+formatToCurrency(topBanks?.data[0] || 0)|| "$0.00"}
                        amount2={`$`+formatToCurrency(topBanks?.data[2] || 0)|| "$0.00"}
                        amount3={`$`+formatToCurrency(topBanks?.data[1] || 0)|| "$0.00"}
                        amount4={`$`+formatToCurrency(topBanks?.data[3] || 0)|| "$0.00"}
                    />
              </div>
              <div className='flex flex-row justify-around flex-wrap gap-5 p-3 mt-3'>
                    <Card2
                        title1="Receivables total-"
                        title2={`$`+formatToCurrency(revTotal)}
                        subTitle1={groupObj.cus.groups[0]? `(${groupObj.cus.groups[0]}) Total` : "Group Total"}
                        subTitle2={groupObj.cus.groups[1]? `(${groupObj.cus.groups[1]}) Total` : "Group Total"}
                        subTitle3={groupObj.cus.groups[2]? `(${groupObj.cus.groups[2]}) Total` : "Group Total"}
                        subTitle4={groupObj.cus.groups[3]? `(${groupObj.cus.groups[3]}) Total` : "Group Total"}
                        amount1={groupObj.cus.groups[0]? `$`+formatToCurrency(groupObj.cus[groupObj.cus.groups[0]]) : "$ 0.00"}
                        amount2={groupObj.cus.groups[1]? `$`+formatToCurrency(groupObj.cus[groupObj.cus.groups[1]]) : "$ 0.00"}
                        amount3={groupObj.cus.groups[2]? `$`+formatToCurrency(groupObj.cus[groupObj.cus.groups[2]]) : "$ 0.00"}
                        amount4={groupObj.cus.groups[3]? `$`+formatToCurrency(groupObj.cus[groupObj.cus.groups[3]]) : "$ 0.00"}
                    />
                    <Card2
                        title1="Payables total-"
                        title2={`$`+formatToCurrency(payTotal)}
                        subTitle1={groupObj.ved.groups[0]? `(${groupObj.ved.groups[0]}) Total` : "Group Total"}
                        subTitle2={groupObj.ved.groups[1]? `(${groupObj.ved.groups[1]}) Total` : "Group Total"}
                        subTitle3={groupObj.ved.groups[2]? `(${groupObj.ved.groups[2]}) Total` : "Group Total"}
                        subTitle4={groupObj.ved.groups[3]? `(${groupObj.ved.groups[3]}) Total` : "Group Total"}
                        amount1={groupObj.ved.groups[0]? `$`+formatToCurrency(groupObj.ved[groupObj.ved.groups[0]]) : "$ 0.00"}
                        amount2={groupObj.ved.groups[1]? `$`+formatToCurrency(groupObj.ved[groupObj.ved.groups[1]]) : "$ 0.00"}
                        amount3={groupObj.ved.groups[2]? `$`+formatToCurrency(groupObj.ved[groupObj.ved.groups[2]]) : "$ 0.00"}
                        amount4={groupObj.ved.groups[3]? `$`+formatToCurrency(groupObj.ved[groupObj.ved.groups[3]]) : "$ 0.00"}
                    />
                </div>
                <div className='flex flex-row justify-around flex-wrap gap-5 p-3 mt-3'>
                    {groupObj.cus.groups?.map((grp, i)=>{
                        const {data, label} = groupData?.cus[grp]
                        return(
                            <DoughnutChart key={`${i}key`}
                                name="RECEIVABLES"
                                dataArr={data}
                                titleChart={`Top Receivables (${grp})`}
                                titleTotal={"Total: "}
                                titleAmount={`$`+formatToCurrency(groupObj.cus[grp])}
                                lebelArr={label}
                            />
                        )
                    })}
                </div>
                <div className='flex flex-row justify-around flex-wrap gap-5 p-3 mt-3'>
                 {groupObj.ved.groups?.map((grp, i)=>{
                        const {data, label} = groupData?.ved[grp]
                        return(
                            <DoughnutChart key={`${i}key`}
                                name="PAYABLES"
                                dataArr={data}
                                titleChart={`Top Payables (${grp})`}
                                titleTotal={"Total: "}
                                titleAmount={`$`+formatToCurrency(groupObj.ved[grp])}
                                lebelArr={label}
                            />
                        )
                    })}
                </div>
                <div className='flex flex-row justify-around flex-wrap gap-5 p-3 mt-3'>
                 {prodSumData?.length?
                    <DoughnutChart 
                        name="PRODUCTS"
                        dataArr={prodSumData}
                        titleChart={`Products balance`}
                        titleTotal={"Total: "}
                        titleAmount={`$`+formatToCurrency(prodTotal)}
                        lebelArr={prodSumLabel}
                    />: <></>
                 }
                </div>
            </div>
        </div>
    </div>
  )
}

export default DashboardIndex