import { segmentBalancesToDrCr } from "./calculateBalances";
import { getGeneralLedgersAcct, getPersonalAccts, getPersonalAcctsList, getPersonalLedgersAccts, getTrialBalanceAcct } from "./getLedgers";
import { getStartAndEndDate } from "@/lib/dummyData/getStartAndEndDate";
import { createAndAppendOpeningBalAndRetEarnings } from "./createAndAppendOpeningBalAndRetEarnings";
import { MdMoreHoriz, MdMoreVert } from "react-icons/md";
import { getRecordedTransactionsCall} from "./getRecordedTransactionsCall";
import { setProductsOpeningQtyBalances } from "./setProductsOpeningQtyBalances";
import { getReceiptsAndPayment, getReceiptsAndPaymentsCall } from "./getReceiptsAndPaymentsCall";

//trans: transactions; transactions:transactionsDetails
export class LedgersManager {
    constructor({trans, transactions, chartOfAccounts, customers, vendors, products, controlAcctsCode, coaStructure, dateForm}) {
      this.trans = trans;
      this.transactions = transactions;
      this.chartOfAccounts = this.arrayToMap(chartOfAccounts, 'accountCode');
      this.customers = this.arrayToMap(customers, 'accountCode');
      this.vendors = this.arrayToMap(vendors, 'accountCode');
      this.products = this.arrayToMap(products, 'productCode');
      this.coaStructure = coaStructure,
      this.controlAcctsCode = controlAcctsCode,
      this.chartOfAccountsBase = chartOfAccounts,
      //this.coaStructureMapped = this.arrayToMap(coaStructure, 'code');
      this.genTransTotal = {debit:0, credit:0, net:0};
      this.cusTransTotal = {debit:0, credit:0, net:0};
      this.vedTransTotal = {debit:0, credit:0, net:0};
    }
    
    arrayToMap(array, key, keys) {
      return array?.reduce((map, item) => {
        map[item[key]] = keys?.length? keys?.reduce((result, ky) => {return {...result, [ky]:item[ky]}},{}) : item;
        return map;
      }, {});
    }
  
    processTransactions(startDateParam, endDateParam) {
      const dateDef = getStartAndEndDate();
      const startDate= startDateParam? startDateParam : dateDef.startDate; 
      const startDateTime = new Date(startDate).getTime();
      const endDate = endDateParam? endDateParam : dateDef.endDate;
      const endDateTime = new Date(endDate).getTime();
      //console.log(dateDef, this.transactions)
      
      let processedLedgers = {};
      let customersLedger = {};
      let vendorsLedger = {};
      let productsLedger = {};
      let beforeDateProdTrans = {};
      
      /********************************************************************************************
       * This creates a kind of structure for each ledger: processedLedgers (GL) & personal ledgers
       * The ledger is an object for GL: {1120010:{name:'', accountCode:'', typeCode:'',openingBal:'', closingBal:'', trans:[{},{}] etc}}
       * and same for personal ledgers.
       * The trans array are the current period transactions entries.
       * Note that the transactions in the trans do not have opening balances at this state. This is set be the function- createAndAppendOpeningBalAndRetEarnings()
       * The createAndAppendOpeningBalAndRetEarnings function uses the openingBal that is here to create openingBal row on the trans array
       */
  
      for (let transaction of this.transactions) { //......... start of transactions interation..........
        let accountCode = transaction.accountCode;
        let accountCodeSub = transaction.accountCodeSub;
        let accountCodeSubAcct = transaction.accountCodeSubAcct;
        const transDate = transaction.transactionDate;
        const transDateTime = new Date(transDate).getTime();
        const entryType = transaction.entryType;
        //let retainedEarningsCode = this.chartOfAccounts?.find((dt)=> dt.typeCode == controlAcctsCode.retainedEarnings)?.accountCode;

        // Process General Ledgers
        if (!processedLedgers[accountCode]) {
          processedLedgers[accountCode] = {
            name: this.chartOfAccounts[accountCode]?.accountName || 'Unknown Account',
            openingBal:0,
            closingBal:0,
            openingBalDr: 0,
            openingBalCr: 0,
            periodBalDr: 0,
            periodBalCr: 0,
            closingBalDr: 0,
            closingBalCr: 0,
            debit:0,
            credit:0,
            accountCode:this.chartOfAccounts[accountCode]?.accountCode,
            typeCode:this.chartOfAccounts[accountCode]?.typeCode,
            accountType:'GENLED', //To differentiate it from personal accounts
            trans: []
          };
        }
      
          // Sum transactions before the start date for opening balance
          if (transDateTime < startDateTime) {
              processedLedgers[accountCode].openingBal += parseFloat(transaction.amount);
              processedLedgers[accountCode].closingBal += parseFloat(transaction.amount); //Closing will be opening + closing for Balance Sheet items

              if(entryType ===  "DR"){
                processedLedgers[accountCode].openingBalDr += parseFloat(transaction.amount);
                processedLedgers[accountCode].closingBalDr += parseFloat(transaction.amount);
              }else{
                processedLedgers[accountCode].openingBalCr += parseFloat(transaction.amount);
                processedLedgers[accountCode].closingBalCr += parseFloat(transaction.amount);
              }
          }
          
          // Include transactions within the date range in trans array
          if (transDateTime >= startDateTime && transDateTime <= endDateTime) {
            processedLedgers[accountCode].trans.push(transaction);
            processedLedgers[accountCode].closingBal += parseFloat(transaction.amount);

            if(entryType ===  "DR"){
              processedLedgers[accountCode].periodBalDr += parseFloat(transaction.amount);
              processedLedgers[accountCode].closingBalDr += parseFloat(transaction.amount);
            }else{
              processedLedgers[accountCode].periodBalCr += parseFloat(transaction.amount);
              processedLedgers[accountCode].closingBalCr += parseFloat(transaction.amount);
            }
          }
        
        // Process Specific Ledgers
        let subLedger;
        let subLedgerMap;
        let accountName;
        let group;
        
        //console.log(this.customers, this.vendors, accountCodeSub)
        switch (accountCodeSubAcct) {
          case 'CUSTOMERS':
            subLedger = customersLedger;
            subLedgerMap = this.customers;
            accountName = subLedgerMap[accountCodeSub]? subLedgerMap[accountCodeSub].lastname +' '+subLedgerMap[accountCodeSub].firstname : 'Unknown Customer';
            group = subLedgerMap[accountCodeSub]?.accountGroup? subLedgerMap[accountCodeSub].accountGroup : 'Unknown Group';
            break;
          case 'VENDORS':
            subLedger = vendorsLedger;
            subLedgerMap = this.vendors;
            accountName = subLedgerMap[accountCodeSub]? subLedgerMap[accountCodeSub].lastname +' '+subLedgerMap[accountCodeSub].firstname : 'Unknown Vendor';
            group = subLedgerMap[accountCodeSub]?.accountGroup? subLedgerMap[accountCodeSub].accountGroup : 'Unknown Group';
            break;
          case 'PRODUCTS':
            subLedger = productsLedger;
            subLedgerMap = this.products;
            accountName = subLedgerMap[accountCodeSub]?.productName || 'Unknown Product';
            group = subLedgerMap[accountCodeSub]?.category? subLedgerMap[accountCodeSub].category : 'Unknown Group';
            break;
          default:
            continue;
        }
        
        if (!subLedger[accountCodeSub]) {
            subLedger[accountCodeSub] = {
              name: accountName,
              group,
              openingBal: 0,
              closingBal: 0,
              openingBalDr: 0,
              openingBalCr: 0,
              periodBalDr: 0,
              periodBalCr: 0,
              closingBalDr: 0,
              closingBalCr: 0,
              debit:0,
              credit:0,
              accountType: ["CUSTOMERS", "VENDORS", "PRODUCTS"].includes(accountCodeSubAcct)? accountCodeSubAcct : "",
              trans: []
            };
        };
        
        //Sum transactions before the start date for opening balance
        if (transDateTime < startDateTime) {
          subLedger[accountCodeSub].openingBal += parseFloat(transaction.amount);
          subLedger[accountCodeSub].closingBal += parseFloat(transaction.amount);

          if(entryType ===  "DR"){
            subLedger[accountCodeSub].openingBalDr += parseFloat(transaction.amount);
            subLedger[accountCodeSub].closingBalDr += parseFloat(transaction.amount);
          }else{
            subLedger[accountCodeSub].openingBalCr += parseFloat(transaction.amount);
            subLedger[accountCodeSub].closingBalCr += parseFloat(transaction.amount);
          }
        }

        //Specially for products personal account
        if(accountCodeSubAcct === "PRODUCTS"){
          //Set default quantity as 0 for products personal account 
          subLedger[accountCodeSub]['quantity'] = 0;

          //Accummulate transactions before start date for products in beforeDateProdTrans. This will be used to calculate the opening quanity and avgCost
          if (transDateTime < startDateTime) {
            if(!beforeDateProdTrans[accountCodeSub]) {
                beforeDateProdTrans[accountCodeSub] = {trans:[]};
            }
              beforeDateProdTrans[accountCodeSub].trans.push(transaction);
          }
        }

        // Include transactions within the date range for closing balance
        if (transDateTime >= startDateTime && transDateTime <= endDateTime) {
          subLedger[accountCodeSub].trans.push(transaction);
          subLedger[accountCodeSub].closingBal += parseFloat(transaction.amount);

          if(entryType ===  "DR"){
            subLedger[accountCodeSub].periodBalDr += parseFloat(transaction.amount);
            subLedger[accountCodeSub].closingBalDr += parseFloat(transaction.amount);
          }else{
            subLedger[accountCodeSub].periodBalCr += parseFloat(transaction.amount);
            subLedger[accountCodeSub].closingBalCr += parseFloat(transaction.amount);
          }
        }
        
      }//......................end of transactions interation...................
     

      //createAndAppendOpeningBalAndRetEarnings({coaStructure, chartOfAccounts, controlAcctsCode, ledgers, startDate, accountType});
        createAndAppendOpeningBalAndRetEarnings({ledgers:processedLedgers, coaStructure:this.coaStructure, chartOfAccounts:this.chartOfAccountsBase, controlAcctsCode:this.controlAcctsCode, startDate,  accountType:"GENLED"});
        createAndAppendOpeningBalAndRetEarnings({ledgers:customersLedger, coaStructure:this.coaStructure, chartOfAccounts:this.chartOfAccountsBase, controlAcctsCode:this.controlAcctsCode, startDate,  accountType:"CUSTOMERS"});
        createAndAppendOpeningBalAndRetEarnings({ledgers:vendorsLedger, coaStructure:this.coaStructure, chartOfAccounts:this.chartOfAccountsBase, controlAcctsCode:this.controlAcctsCode, startDate,  accountType:"VENDORS" });
        createAndAppendOpeningBalAndRetEarnings({ledgers:productsLedger, coaStructure:this.coaStructure, chartOfAccounts:this.chartOfAccountsBase, controlAcctsCode:this.controlAcctsCode, startDate,  accountType:"PRODUCTS" });

        setProductsOpeningQtyBalances(productsLedger, beforeDateProdTrans);
      //Segment Closing balances to debit or credit and calculate balances
      segmentBalancesToDrCr(processedLedgers, 'closingBal', this.genTransTotal); //For TB
      segmentBalancesToDrCr(processedLedgers, 'amount', {debit:0, credit:0}, 'trans') //For trans array

       
        //Append sum totals
          let totalDr = 0; let totalCr = 0;
          for (let code in processedLedgers) {
              let ledger = processedLedgers[code];
              totalDr += ledger?.debit;
              totalCr += ledger?.credit;
          }
          processedLedgers['TOTAL'] = {
              name: 'Total',
              openingBalDr: "",
              closingBal: "",
              debit:totalDr,
              credit:totalCr,
              net: totalDr + totalCr,
              trans: [],
              classNameTD:'font-bold'
         };
    

      return {
        processedLedgers,
        customersLedger,
        vendorsLedger,
        productsLedger
      };
    }
    getTransactions(){
      return this.transactions
    }
    getSectionLedgers(dateForm){
      const dateFormNew = dateForm? dateForm : getStartAndEndDate();
      let sectionLedgers = {incomeExpenses:{}, balanceSheet:{}, dateForm:dateFormNew};
      const incomeClassCode = this.coaStructure.find(d=> d.name.toLowerCase() === "incomeclass")?.code;
      const  {processedLedgers} = this.processTransactions(dateFormNew?.startDate, dateFormNew?.endDate);
      for (let ledgerCode in processedLedgers) {
         const ledger = processedLedgers[ledgerCode];
         if(parseInt(ledger.typeCode) > parseInt(incomeClassCode)){
           sectionLedgers.incomeExpenses[ledgerCode] = ledger
         }else{sectionLedgers.balanceSheet[ledgerCode] = ledger}
      }
      return sectionLedgers
    }
    getReceiptsAndPayment(dateForm){
      const dateFormNew = dateForm? dateForm : getStartAndEndDate();
      return getReceiptsAndPaymentsCall(this.transactions, dateFormNew, this.coaStructure);
    }
    getRecordedTransactions(dateForm){
      const dateFormNew = dateForm? dateForm : getStartAndEndDate();
      return getRecordedTransactionsCall(this.transactions, dateFormNew, this.coaStructure);
    }
    getCOAStructureMapped(){
      return this.arrayToMap(this.coaStructure, 'code', ['id', 'class', 'subClass', 'code', 'name', 'title']); 
    }
    getTrialBalance(dateForm){
      const  {processedLedgers} = this.processTransactions(dateForm?.startDate, dateForm?.endDate);
      return getTrialBalanceAcct(processedLedgers)
    }
    getGeneralLedgers(dateForm){
      const  {processedLedgers} = this.processTransactions(dateForm?.startDate, dateForm?.endDate);
      return getGeneralLedgersAcct(processedLedgers)
    }
    getPersonalLedgers(ledgerName, dateForm, ledgerCode){
      //console.log(ledgerName, dateForm, ledgerCode)
      const  prosLedgers = this.processTransactions(dateForm?.startDate, dateForm?.endDate);
      return getPersonalLedgersAccts(ledgerName, prosLedgers, ledgerCode)
    }

    getPersonalAccounts(ledgerName, dateForm){
      const  prosLedgers = this.processTransactions(dateForm?.startDate, dateForm?.endDate);
      return getPersonalAcctsList(ledgerName, prosLedgers);
    }
    getTransactionsListing(){
      //['transactionDate', 'description', 'transactionNo', 'reference', 'postingPlat', 'amount'];
      //const edit = <BiEditAlt size={22} className='text-blue-700 cursor-pointer hover:text-[blue]'/>;
      const view = <MdMoreHoriz size={22} className='text-blue-700 cursor-pointer hover:text-[blue]'/>;
      return this.trans.map((dt)=> { return {...dt, transactionNo:dt.id.toString().padStart(7, '0'), view}});
    }
  }
  