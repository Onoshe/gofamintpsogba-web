const { sortArrayByKey } = require("../sort/sortArrayByKey");
const { groupTransactionsByKey } = require("./groupTransactionsByKey");


const mapChartOfAccount =(chartOfAccounts, coaStructure)=>{
    const chartOfAccountMapped = [{id:'', accountCode:'', accountName:'--Select--', typeCode:'', typeName:'', selectable:true}];
    const chartOfAccountGrouped =  groupTransactionsByKey(chartOfAccounts, 'typeCode');
    const typeCodes = Object.keys(chartOfAccountGrouped);
    typeCodes.forEach((typeCode, i) => {
      const accounts = chartOfAccountGrouped[typeCode];
      sortArrayByKey(accounts, 'accountCode');
      const accountStructure = coaStructure?.find(dt => parseInt(dt.code) === parseInt(typeCode));
      const accountStructureMapped = {...accountStructure, accountName:accountStructure?.title || "", accountCode:accountStructure?.code || "", selectable:false}
      chartOfAccountMapped.push(accountStructureMapped);
      accounts.map((coa)=>{
        const {edit, ...coaWithoutEdit} = coa;
        chartOfAccountMapped.push({...coaWithoutEdit, selectable:true})
      });
    });
    return chartOfAccountMapped
  }

export {mapChartOfAccount}