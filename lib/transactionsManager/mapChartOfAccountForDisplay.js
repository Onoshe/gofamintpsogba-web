const { sortArrayByKey } = require("../sort/sortArrayByKey");
const { groupTransactionsByKey } = require("./groupTransactionsByKey");


const mapChartOfAccountForDisplay =(chartOfAccounts, coaStructure)=>{
  //console.log(chartOfAccounts,coaStructure)
  const chartOfAccountMapped = [];
  const coaDefault = {id:'', accountCode:'', accountName:'', typeCode:'', typeName:''};
  const chartOfAccountGrouped =  groupTransactionsByKey(chartOfAccounts, 'typeCode');
  const typeCodes = Object.keys(chartOfAccountGrouped);
  typeCodes.forEach((typeCode, i) => {
    const accounts = chartOfAccountGrouped[typeCode];
    sortArrayByKey(accounts, 'accountCode');
    const accountStructure = coaStructure?.find(dt => parseInt(dt.code) === parseInt(typeCode));
    const accountStructureMapped = {...coaDefault, accountCode:accountStructure?.title || "", classNameTD:'font-bold text-blue-900',}
    chartOfAccountMapped.push(accountStructureMapped);
    accounts.map((coa)=>{
      const {edit, ...coaWithoutEdit} = coa;
      chartOfAccountMapped.push({...coa})
    });
  });
  return chartOfAccountMapped
}


export {mapChartOfAccountForDisplay}