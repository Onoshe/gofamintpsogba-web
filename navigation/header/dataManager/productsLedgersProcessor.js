import { getProductBalances } from "./getProductBalances";

/******************* COST OF SALE REPLACEMENT **********************
    Cost of Sale should be computed upon report generation. It should not be computed and be posted on the database
    when transaction occur. This method would allow for the continous update of cost of sale especially when affected
    transaction is updated or deleted
 
    Limitation?
    It has not been tested on cases when multiple control account is created. Eg, when we have multiple
    inventory control account

    This function is called at getClientData (where data is initially fetched)
*/
export const productsLedgerProcessor =({coaStructure, transactionsDetails,  products})=> {
    //console.log(transactionsDetails)
    const invContTypeCode = coaStructure.find((dt)=> dt.name.toLowerCase() === "inventorycontrol")?.code;

    //Use the invControlTypeCode to get transId for all Inventory related transactions from transactionsDetails: All transactionsDetails having invControlTypeCode
    //Our goal is to get all inventory entries or trans. All inventory entries include Purchase of inventory (two entries), sales (4 entries) 
    const invtRelatedTransId = [];
    for (const tran of transactionsDetails) {
       if(tran.typeCode == invContTypeCode){
        invtRelatedTransId.push(tran.transId);
       } 
    }
    const inventoryTrans = []; //All inventory related transactions together with the double entry
    for (let i = 0; i < transactionsDetails.length; i++) {
      const tran = transactionsDetails[i];
      if(invtRelatedTransId.includes(tran.transId)){
        inventoryTrans.push(tran)
      }
    }

    //Generate a productsLedger schema from products list
    function arrayToMap(array, key, keys) {
      return array?.reduce((map, item) => {
        map[item[key]] = keys?.length? keys?.reduce((result, ky) => {return {...result, [ky]:item[ky]}},{}) : item;
        return map;
      }, {});
    }
    const productsLedgerSchema = arrayToMap(products, 'productCode');

    const productsLedgers = {};
    for (const code in productsLedgerSchema) {
        const ledgerSch = productsLedgerSchema[code];
        const ledgerTrans = inventoryTrans.filter((dt)=> dt.accountCodeSub == code);
        if(ledgerTrans?.length){
          productsLedgers[code] = {...ledgerSch, typeCode:ledgerTrans[0].typeCode, trans:ledgerTrans};
        }
      }
      const productsLedgersWithBalances = getProductBalances(productsLedgers, "prodBal");
      //console.log(inventoryTrans, productsLedgersWithBalances);

      //Credit on Inventory is a reduction majorly arising from sale.
      //Hence, get all the products with credit entries
      
      const creditProductsTransEntry = []; 
      if(productsLedgersWithBalances){
        const ledgersArr = Object.values(productsLedgersWithBalances);
        for(let i = 0; i < ledgersArr.length; i++) {
          const {trans} = ledgersArr[i]; 
          for (let j = 0; j < trans?.length; j++) {
            const tran = trans[j];
            if(tran.postingPlat !== "PRODUCT-ADJ"){
              if(tran.entryType === "CR"){
                creditProductsTransEntry.push(tran)
              }
            }else{
              //Note that when product adjustment is done by quantity, the cost of the product is 0 at the time of being posted, and as such, should dynamically be set at this point
              if(Math.abs(tran.quantity)> 0){ //Adjustment by quantity
                tran['productAdj'] = "BYQTY";
                creditProductsTransEntry.push(tran)
              }else{
                tran['productAdj'] = "BYCOST";
              }
            }
          }
        }
      }
      //console.log(creditProductsTransEntry)
      //Now replace amount on costOfSale and product entries (being double entry) with the actual cost of sale. The default amount was the sales value
      const updatedTransDetails = transactionsDetails?.map(tran => {
        let returnVal = tran;  
          for (let i = 0; i < creditProductsTransEntry.length; i++) {
              const productEntry = creditProductsTransEntry[i];
              let costOfSaleDr = Math.abs(productEntry.prodBal.cost).toString();
              let costOfSaleCr = "-"+costOfSaleDr;
              if(productEntry.doubleEntryId == tran.doubleEntryId && productEntry.transId == tran.transId){
                returnVal = {...tran, amount:tran.entryType==="DR"? costOfSaleDr : costOfSaleCr}
              }
          }
          return returnVal
        });
        //console.log(productsLedgers)
     return updatedTransDetails?.length? updatedTransDetails : transactionsDetails 
  }
  

  /*
  1. Get inventoryControl typeCode and use it to filter transactions that affect inventory
  2. Loop through the transactions to get the transactionIds. The transId will then filter all transactions that relate to inventory
  */