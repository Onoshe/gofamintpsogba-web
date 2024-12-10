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
import ReChart from './components/charts/recharts/ReChart';
import ReChart_Line from './components/charts/recharts/ReChart_Line';
import useContainerDimension from '@/lib/hooks/useContainerDimension';



const DashboardIndex = ({ssUser}) => {
  const reportDate = getStartAndEndDate();
  const router = useRouter();
  const incomeExpRef = useRef(null);
  const reportDateAnalDef = new Date().toISOString().split("T")[0];
  
  const {coaStructure, transactions, currencySymbol, transactionsDetails,controlAcctsCode, chartOfAccounts, customers, vendors, products, runDispatchClientDataCall, clientAccount,  dispatchReportDate} = useStoreTransactions((state) => state);
  let transProcessor = new LedgersManager({trans:transactions, transactions:transactionsDetails, chartOfAccounts, customers, vendors, products, controlAcctsCode, coaStructure, dateForm:reportDate});
  const { session, user, userRendering, status} = useAuthCustom(ssUser);
  //const user = session?.user;
  const [listOfAccounts, setListOfAccounts] = useState(false);
  const [reportDateAnal, setReportDateAnal] = useState(reportDateAnalDef);
  const [loadingReportPage, setLoadingReportPage] = useState(false);
  const [mounted, setMounted] = useState(false);
  const contRef = React.useRef();
  const contDimen = useContainerDimension(contRef);


  //const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const {showNotificationBar,settings,expiration, expirationMsg, dispatchShowNotificationBar} = useStoreHeader((state) => state);
  const { expired} = expirationMsg;
  const startDate = `${new Date(reportDateAnal)?.getFullYear()}-01-01`;
  const endDate = new Date(reportDateAnal)?.toISOString()?.split('T')[0];
   // console.log({startDate, endDate});

  const reportDateForm = reportDateAnal? {startDate, endDate} : "";
  const {incomeData, expensesData, dataLabel, incomeSumData, incomeSumLabel, expensesSumData, expensesSumLabel, totalExp, totalIn} = generatePandLChartData(transProcessor, coaStructure, reportDateForm);
  const {cashTotal, bankTotal, revTotal, payTotal, paySumLabel, paySumData, recSumLabel, recSumData, topBanks,
            cusGroup, vedGroup, prodTotal, groupObj, groupData, prodSumData, prodSumLabel} = generateBSData(transProcessor, coaStructure,  reportDateForm);
  const periodEndInit = new Date(reportDateAnal).toDateString().split(" ");
  const periodEnd = `${periodEndInit[2]} ${periodEndInit[1]} ${periodEndInit[3]}`
  const cu = currencySymbol;

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

  React.useEffect(()=>{
    //To prevent hydration error
    setMounted(true)
  },[]);


 // console.log(groupObj, groupData)

  return (
    <div className={`text-gray-600 ${showNotificationBar? '' : ''}`}>
        <div className='fixed w-full lg:w-[calc(100%_-_200px)] z-10'>
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
                loadingReportPage={loadingReportPage}
                setLoadingReportPage={setLoadingReportPage}
                expired={expired}
            />
        </div>
        {/*<br/><br/><br/> */}
        <div className="smc:pt-[50px]">
            <div className='mt-20 hidden'>
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
               
                    <div className='flex flex-row justify-around flex-wrap gap-4' ref={contRef}>
                        {/*mounted && <ReChart dataArr={expensesSumData} lebelArr={expensesSumLabel}/>*/}
                        <Card3  
                                title="Income & Expenses Total for the Period"
                                title1="Income Total"
                                amount1={totalIn}
                                title2="Expenses Total"
                                amount2={totalExp}
                                cu={cu}
                            />
                        <ChartProfit
                            hideChart
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
                            cu={cu}
                            />
                         {mounted && 
                            <ReChart_Line 
                                titleChart={"Monthly Income & Expenses Trends"}
                                titleChartSub={""}
                                dataArr={expensesSumData} 
                                lebelArr={expensesSumLabel}
                                incomeData={incomeData}
                                expensesData={expensesData}
                                label={dataLabel}
                                contDimen={contDimen}
                                cu={cu}
                          />} 
                    </div>
                </div>
                
                <div className='flex flex-row justify-around flex-wrap gap-5 p-3 mt-3'>
                    <DoughnutChart
                        hideChart
                        name="INCOME"
                        dataArr={incomeSumData}
                        titleChart="Income summary for the Period"
                        titleTotal={"Total Income: "}
                        titleAmount={cu+formatToCurrency(totalIn)}
                        lebelArr={incomeSumLabel}
                        cu={cu}
                    />
                    {mounted && 
                        <ReChart 
                            name="INCOME"
                            dataArr={incomeSumData}
                            lebelArr={incomeSumLabel}
                            titleChart="Income summary for the Period"
                            titleTotal={"Total Income: "}
                            //titleAmount={cu+formatToCurrency(totalIn)}
                            titleAmount={totalIn<1? `-`+cu+formatToCurrency(Math.abs(totalIn)) : cu+formatToCurrency(Math.abs(totalIn))}
                            contDimen={contDimen}
                            cu={cu}
                        />
                    }
                    {mounted && 
                        <ReChart 
                            name="EXPENSES"
                            dataArr={expensesSumData} 
                            lebelArr={expensesSumLabel}
                            titleChart="Expenses summary for the Period"
                            titleTotal={"Total Expenses: "}
                            //titleAmount={cu+formatToCurrency(totalExp)}
                            titleAmount={totalExp<1? `-`+cu+formatToCurrency(Math.abs(totalExp)) : cu+formatToCurrency(Math.abs(totalExp))}
                            contDimen={contDimen}
                            cu={cu}
                        />
                    }
                    <DoughnutChart
                        hideChart
                        name="EXPENSES"
                        dataArr={expensesSumData} 
                        titleChart="Expenses summary for the Period"
                        titleTotal={"Total Expenses: "}
                        titleAmount={cu+formatToCurrency(totalExp)}
                        lebelArr={expensesSumLabel}
                        cu={cu}
                    />
                </div>
                
                <div className='flex flex-row justify-around flex-wrap gap-5 p-3 mt-5'>
                    <p className='text-teal-800 font-bold text-center'>Balance Sheet Summary Report as at {periodEnd}</p>
                </div>
                <div className='flex flex-row justify-around flex-wrap gap-5 p-3 mt-3'>
                    <Card1
                        title1="Cash Account Total"
                        amount1={cu+formatToCurrency(cashTotal)}
                        title2="Bank Account Total"
                        amount2={cu+formatToCurrency(bankTotal)}
                        cu={cu}
                    />
                    <Card2
                        title1="Bank balances"
                        title2={`Top Banks`}
                        subTitle1={topBanks.label[0] || "Bank"}
                        subTitle2={topBanks.label[2] || "Bank"}
                        subTitle3={topBanks?.label[1] || "Bank"}
                        subTitle4={topBanks?.label[3] || "Bank"}
                        amount1={cu+formatToCurrency(topBanks?.data[0] || 0)|| cu+"0.00"}
                        amount2={cu+formatToCurrency(topBanks?.data[2] || 0)|| cu+"0.00"}
                        amount3={cu+formatToCurrency(topBanks?.data[1] || 0)|| cu+"0.00"}
                        amount4={cu+formatToCurrency(topBanks?.data[3] || 0)|| cu+"0.00"}
                        cu={cu}
                    />
              </div>
              <div className='flex flex-row justify-around flex-wrap gap-5 p-3 mt-3'>
                    <Card2
                        title1="Receivables total-"
                        title2={cu+formatToCurrency(revTotal)}
                        subTitle1={groupObj.cus.groups[0]? `(${groupObj.cus.groups[0]}) Total` : "Group Total"}
                        subTitle2={groupObj.cus.groups[1]? `(${groupObj.cus.groups[1]}) Total` : "Group Total"}
                        subTitle3={groupObj.cus.groups[2]? `(${groupObj.cus.groups[2]}) Total` : "Group Total"}
                        subTitle4={groupObj.cus.groups[3]? `(${groupObj.cus.groups[3]}) Total` : "Group Total"}
                        amount1={groupObj.cus.groups[0]? cu+formatToCurrency(groupObj.cus[groupObj.cus.groups[0]]) : cu+" 0.00"}
                        amount2={groupObj.cus.groups[1]? cu+formatToCurrency(groupObj.cus[groupObj.cus.groups[1]]) : cu+" 0.00"}
                        amount3={groupObj.cus.groups[2]? cu+formatToCurrency(groupObj.cus[groupObj.cus.groups[2]]) : cu+" 0.00"}
                        amount4={groupObj.cus.groups[3]? cu+formatToCurrency(groupObj.cus[groupObj.cus.groups[3]]) : cu+" 0.00"}
                        cu={cu}
                    />
                    <Card2
                        title1="Payables total-"
                        title2={cu+formatToCurrency(payTotal)}
                        subTitle1={groupObj.ved.groups[0]? `(${groupObj.ved.groups[0]}) Total` : "Group Total"}
                        subTitle2={groupObj.ved.groups[1]? `(${groupObj.ved.groups[1]}) Total` : "Group Total"}
                        subTitle3={groupObj.ved.groups[2]? `(${groupObj.ved.groups[2]}) Total` : "Group Total"}
                        subTitle4={groupObj.ved.groups[3]? `(${groupObj.ved.groups[3]}) Total` : "Group Total"}
                        amount1={groupObj.ved.groups[0]? cu+formatToCurrency(groupObj.ved[groupObj.ved.groups[0]]) : cu+" 0.00"}
                        amount2={groupObj.ved.groups[1]? cu+formatToCurrency(groupObj.ved[groupObj.ved.groups[1]]) : cu+" 0.00"}
                        amount3={groupObj.ved.groups[2]? cu+formatToCurrency(groupObj.ved[groupObj.ved.groups[2]]) : cu+" 0.00"}
                        amount4={groupObj.ved.groups[3]? cu+formatToCurrency(groupObj.ved[groupObj.ved.groups[3]]) : cu+" 0.00"}
                        cu={cu}
                    />
                </div>
                <div className='flex flex-row justify-around flex-wrap gap-5 p-3 mt-3'>
                        {/*groupObj.cus.groups?.map((grp, i)=>{
                        const {data, label} = groupData?.cus[grp]
                        return(
                            <DoughnutChart key={`${i}key`}
                                hideChart
                                name="RECEIVABLES"
                                dataArr={data}
                                titleChart={`Top Receivables (${grp})`}
                                titleTotal={"Total: "}
                                titleAmount={cu+formatToCurrency(groupObj.cus[grp])}
                                lebelArr={label}
                            />
                        )
                        })*/}
                        {mounted && groupObj.cus.groups?.map((grp, i)=>{
                            const {data, label} = groupData?.cus[grp]
                            return(
                                
                                <ReChart  key={`${i}key`}
                                    name="RECEIVABLES"
                                    dataArr={data}
                                    titleChart={`Top Receivables (${grp})`}
                                    lebelArr={label}
                                    titleTotal={"Total: "}
                                    //titleAmount={cu+formatToCurrency(groupObj.cus[grp])}
                                    titleAmount={groupObj.cus[grp]<1? `-`+cu+formatToCurrency(Math.abs(groupObj.cus[grp])) : cu+formatToCurrency(Math.abs(groupObj.cus[grp]))}
                                    contDimen={contDimen}
                                    cu={cu}
                                />
                                )
                            })}
                        
                </div>
                <div className='flex flex-row justify-around flex-wrap gap-5 p-3 mt-3'>
                 {/*groupObj.ved.groups?.map((grp, i)=>{
                        const {data, label} = groupData?.ved[grp]
                        return(
                            <DoughnutChart key={`${i}key`}
                                hideChart
                                name="PAYABLES"
                                dataArr={data}
                                titleChart={`Top Payables (${grp})`}
                                titleTotal={"Total: "}
                                titleAmount={cu+formatToCurrency(groupObj.ved[grp])}
                                lebelArr={label}
                            />
                        )
                    })*/}
                    {mounted && groupObj.ved.groups?.map((grp, i)=>{
                        const {data, label} = groupData?.ved[grp]
                        return(
                            
                            <ReChart  key={`${i}key`}
                                name="PAYABLES"
                                dataArr={data}
                                titleChart={`Top Payables (${grp})`}
                                lebelArr={label}
                                titleTotal={"Total: "}
                                titleAmount={groupObj.ved[grp]<1? `-`+cu+formatToCurrency(Math.abs(groupObj.ved[grp])) : cu+formatToCurrency(Math.abs(groupObj.ved[grp]))}
                                contDimen={contDimen}
                                cu={cu}
                            />
                            )
                        })}
                </div>
                <div className='flex flex-row justify-around flex-wrap gap-5 p-3 mt-3'>
                 {prodSumData?.length?
                    <DoughnutChart 
                        hideChart
                        name="PRODUCTS"
                        dataArr={prodSumData}
                        titleChart={`Products balance`}
                        titleTotal={"Total: "}
                        //titleAmount={cu+formatToCurrency(prodTotal)}
                        titleAmount={prodTotal<1? `-`+cu+formatToCurrency(Math.abs(prodTotal)) : cu+formatToCurrency(Math.abs(prodTotal))}
                        lebelArr={prodSumLabel}
                        cu={cu}
                    />: <></>
                 }
                 {mounted && prodSumData?.length?
                            
                    <ReChart 
                        name="PRODUCTS"
                        dataArr={prodSumData}
                        titleChart={`Products balance`}
                        lebelArr={prodSumLabel}
                        titleTotal={"Total: "}
                        //titleAmount={cu+formatToCurrency(prodTotal)}
                        titleAmount={prodTotal<1? `-`+cu+formatToCurrency(Math.abs(prodTotal)) : cu+formatToCurrency(Math.abs(prodTotal))}
                        contDimen={contDimen}
                        cu={cu}
                    />: <></>
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default DashboardIndex