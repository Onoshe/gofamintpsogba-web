import { sortArrayByKey } from "@/lib/sort/sortArrayByKey";
import { getObjects } from "./generatePAndLChartData";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
// Function to generate Profit and Loss chart data
export function generateBSData(transProcessor, coaStructure, dateFormQuery) {
  let chartData = {cashTotal:0, bankTotal:0, revTotal:0, payTotal:0, prodTotal:0, paySumData:[], paySumLabel:[], recSumData:[], recSumLabel:[], prodSumData:[], prodSumLabel:[],
        topBanks:{data:[], label:[],}, cusGroup:[], vedGroup:[], groupObj:{cus:{groups:[]}, ved:{groups:[]}},
        groupData:{cus:{}, ved:{}}
  };
    
  const ledgersObj = transProcessor.getSectionLedgers(dateFormQuery);
  const balanceSheetObj = ledgersObj.balanceSheet;

  const customersObj = transProcessor.getPersonalAccounts("customersLedger");
  const vendorsObj = transProcessor.getPersonalAccounts("vendorsLedger");
  const productsObj = transProcessor.getPersonalAccounts("productsLedger");
  const customersLedgers = Object.values(customersObj);
  const vendorsLedgers = Object.values(vendorsObj);
  const productsLedgers = Object.values(productsObj);

  const cashCode = coaStructure.find(d=> d.name.toLowerCase() === "cash")?.code;
  const bankCode = coaStructure.find(d=> d.name.toLowerCase() === "bank")?.code;
  const recCode = coaStructure.find(d=> d.name.toLowerCase() === "accountreceivable")?.code;
  const recControlCode = coaStructure.find(d=> d.name.toLowerCase() === "accountreceivablecontrol")?.code;
  const payCode = coaStructure.find(d=> d.name.toLowerCase() === "accountpayable")?.code;
  const payControlCode = coaStructure.find(d=> d.name.toLowerCase() === "accountpayablecontrol")?.code;
  const prodCode = coaStructure.find(d=> d.name.toLowerCase() === "inventory")?.code;
  const prodControlCode = coaStructure.find(d=> d.name.toLowerCase() === "inventorycontrol")?.code;
  const prodAdjCode = coaStructure.find(d=> d.name.toLowerCase() === "inventoryadjustment")?.code;
  
  //console.log(productsObj)

  for (const code in balanceSheetObj) {
        const lg = balanceSheetObj[code];
        if(lg.typeCode == cashCode){
            chartData.cashTotal += lg.closingBal 
        }
        if(lg.typeCode == bankCode){
            chartData.bankTotal += lg.closingBal;
            chartData.topBanks.data.push(lg.closingBal);
            chartData.topBanks.label.push(lg.name);
        }
        if(lg.typeCode == recCode || lg.typeCode == recControlCode){
            chartData.revTotal += lg.closingBal 
        }
        if(lg.typeCode == payCode || lg.typeCode == payControlCode){
            chartData.payTotal += lg.closingBal 
        }
        if(lg.typeCode == prodCode || lg.typeCode == prodControlCode || lg.typeCode == prodAdjCode){
          chartData.prodTotal += lg.closingBal 
      }

  }

  //Customers - Vendors
  sortArrayByKey(vendorsLedgers, "closingBal", "DSC");
  sortArrayByKey(customersLedgers, "closingBal", "DSC");
  sortArrayByKey(productsLedgers, "closingBal", "DSC");
  

  //Products
  const highest7Prods =  getObjects(productsLedgers, 7);
  highest7Prods.forEach(prod => {
    chartData.prodSumData.push(prod.closingBal);
    const nameFmt =  prod.name?.split(" ")[0]+"- "+(prod.closingBal/1000000)?.toFixed(3)+"m"
    chartData.prodSumLabel.push(nameFmt);
  });

  const customersGroup = {};
  const vendorsGroup = {};
  customersLedgers?.forEach(cus => {
    const group = cus.group;
    // Check if the group key exists in customersGroup, if not, initialize it as an empty array
    if (!customersGroup[group]) {
        customersGroup[group] = [];
        //chartData.groupObj.cus.groups.push(group)
      }
    // Push the customer into the appropriate group
    customersGroup[group].push(cus);
    
    //Compute total Sum
    if(!chartData.groupObj.cus[group]){
      chartData.groupObj.cus[group] = 0;
    }
    chartData.groupObj.cus[group] += cus.closingBal;
  });

  vendorsLedgers?.forEach(ved => {
    const group = ved.group;
    if (!vendorsGroup[group]) {
        vendorsGroup[group] = [];
        //chartData.groupObj.ved.groups.push(group)
      }
    vendorsGroup[group].push(ved);
    
    if(!chartData.groupObj.ved[group]){
      chartData.groupObj.ved[group] = 0;
    }
    chartData.groupObj.ved[group] += ved.closingBal;
  });

  const customersGroupArrs = Object.values(customersGroup);
  const vendorsGroupArrs = Object.values(vendorsGroup);
  customersGroupArrs?.sort((a, b)=> a.length - b.length);
  vendorsGroupArrs?.sort((a, b)=> b.length - a.length);
  
  //Select 4 groups
  const select4GroupCus = getObjects(customersGroupArrs, 4);
  const select4GroupVed = getObjects(vendorsGroupArrs, 4);
  
  //console.log(select4GroupVed);


  select4GroupCus?.forEach(group => {
    sortArrayByKey(group, "closingBal", "DSC");
    chartData.cusGroup.push(getObjects(group, 7));
    chartData.groupObj.cus.groups.push(group[0]?.group);
  });
  select4GroupVed?.forEach(group => {
    sortArrayByKey(group, "closingBal", "DSC");
    chartData.vedGroup.push(getObjects(group, 7));
    chartData.groupObj.ved.groups.push(group[0]?.group);
  });

  //Select 7 highest in each group
  const highestPay = getObjects(vendorsLedgers, 7);
  const highestRec = getObjects(customersLedgers, 7);
  
  //Get the name and closingBal from each group for chart
  chartData.cusGroup?.forEach((groupArr)=>{
    const groupName = groupArr[0].group;
    chartData.groupData.cus[groupName] = {data:[], label:[]}; //Initialize
    groupArr?.forEach(el => {
      const {name, closingBal} = el;
      const nameFmt =  name?.split(" ")[0]+"- "+(closingBal/1000000)?.toFixed(3)+"m"
      chartData.groupData.cus[groupName]['data'].push(closingBal);
      chartData.groupData.cus[groupName]['label'].push(nameFmt);
    });
  });

    //Get the name and closingBal from each group for chart
    chartData.vedGroup?.forEach((groupArr)=>{
      const groupName = groupArr[0].group;
      sortArrayByKey(groupArr, "closingBal", "DSC");
      chartData.groupData.ved[groupName] = {data:[], label:[]}; //Initialize
      groupArr?.forEach(el => {
        const {name, closingBal} = el;
        const nameFmt =  name?.split(" ")[0]+" "+(closingBal/1000000)?.toFixed(3)+"m"
        chartData.groupData.ved[groupName]['data'].push(closingBal);
        chartData.groupData.ved[groupName]['label'].push(nameFmt);
      });
    });
  

 return chartData

}



