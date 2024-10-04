

export const handleClickCellNav =({cell, reportName, companyId, router, transactions, dispatchSelectedTranFromList, setShowLedgers, customers, vendors, products})=>{

    if(reportName.includes("trial-balance")){
      if(cell.row.accountCode){ //cell.key === "name": TB Account. Navigate to Individual Ledger on click account
        dispatchSelectedTranFromList(cell);
        setShowLedgers(false);
        router.push(`/${companyId}/reports/gl?l=${cell.row.accountCode}`);
      }
    }else if(reportName.includes("general-ledger")){ //General Ledger. Nav to TransactionView Page on click transaction
      if(cell.key === 'description' || cell.key === 'transactionNo'){
        const tran = transactions.find((dt)=> dt.id == cell.row.transId);
        if(tran?.id){
          dispatchSelectedTranFromList({...cell, row:tran});
          router.push(`/${companyId}/reports/transaction-view?q=${cell.row.transId}`);
        }
      }
    }else if(reportName.includes("recorded-transactions") || reportName === "gl"){
      if(cell.row.transId){
        const tran = transactions.find((dt)=> dt.id == cell.row.transId);
        if(tran?.id){
          dispatchSelectedTranFromList({...cell, row:tran});
          router.push(`/${companyId}/reports/transaction-view?q=${cell.row.transId}`);
        }
      }
    }else if(reportName.includes("products-valuation")){
      if(cell.row.productCode){
        router.push(`/${companyId}/reports/products-valuation?q=${cell.row.productCode}`);
      }
    }else {
      //return console.log(cell, customers, products, reportName)
      const acctsBalances = ["personal-ledgers-customers-balances", "personal-ledgers-vendors-balances", "personal-ledgers-products-balances"];
      const accts = ["personal-ledgers-customers", "personal-ledgers-vendors", "personal-ledgers-products"];

        if(accts.includes(reportName) && (cell.key === 'description' || cell.key === 'transactionNo')){//Nav to TransactionView Page
          const tran = transactions.find((dt)=> dt.id == cell.row.transId);
          if(tran?.id){
            dispatchSelectedTranFromList({...cell, row:tran});
            router.push(`/${companyId}/reports/transaction-view?q=${tran.id}`);
          }
        }else if(acctsBalances.includes(reportName) && (cell.key === 'name' || cell.key === 'accountCode')){ //Nav to the Individual Ledger
          const ledgerCode = cell.row.accountCode;
          const route = `/${companyId}/reports/${cell.row.accountType.toLocaleLowerCase()}?l=${ledgerCode}`;
          router.push(route);
        }else{
          //For every other ones
          const tran = transactions.find((dt)=> dt.id == cell.row.transId);
          if(tran?.id){
            dispatchSelectedTranFromList({...cell, row:tran});
            router.push(`/${companyId}/reports/transaction-view?q=${tran.id}`);
          }
        }
    }
}