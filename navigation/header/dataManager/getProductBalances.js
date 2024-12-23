import { sortArrayByDate } from "@/lib/sort/sortArrayByDate";
import { sortArrayByKey } from "@/lib/sort/sortArrayByKey";


export const getProductBalances = (productsLedgerObj, objName) => {
    //console.log(productsLedgerObj)
    for (const key in productsLedgerObj) {
        const productLedger = productsLedgerObj[key];
        const { trans } = productLedger;
        
        //sortArrayByKey(trans, 'documentNo'); //If documentNo is a string: [1, 2, 3, 4, 5]
        sortArrayByDate(trans, 'transactionDate', 'DSC'); // Sort from earliest to latest: [01-09-2024, 03-09-2024, 05-09-2024]

        let totalQty = 0;
        let totalCost = 0;
        let totalSalesAmount = 0;
        let avgCost = 0;

        for (let j = 0; j < trans?.length; j++) {
            const tran = trans[j];
            const { quantity, amount, entryType, postingPlat } = tran;

            const qty = parseFloat(quantity);
            const amnt = parseFloat(amount);
            let resultObj = { bal: 0, salesAmount: 0, totalSalesAmount: 0, qty: 0, totalQty: 0, cost: 0, totalCost: 0, avgCost: 0 };

            if(postingPlat !== "PRODUCT-ADJ"){
                if(postingPlat === "PRODUCT-PCH" || postingPlat === "PRODUCT-PCH-RT") { //Product Purchase
                    // Amount = total Cost Price
                    totalCost += amnt;
                    totalQty += qty;
                    avgCost = totalCost / totalQty;

                    resultObj.cost = amnt;
                    resultObj.totalCost = totalCost;
                    resultObj.qty = qty;
                    resultObj.totalQty = totalQty;
                    resultObj.avgCost = avgCost;
                }else if(postingPlat === "PRODUCT-SAL"){ //For Inventory Credit Entry being reduction in total Inventory
                   //Amount in this case is total Sales Price (which is irrelevant)
                   const cost = avgCost * qty;
                   totalCost += cost;
                   totalQty += qty;
                   
                   resultObj.cost = cost;
                   resultObj.qty = qty;
                   resultObj.totalQty = totalQty;
                   resultObj.totalCost = totalCost;
                   resultObj.avgCost = avgCost;
                }else{ //For PRODUCT-SAL-RT
                    const originSalEntry = trans.find((dt)=> {
                        return parseInt(dt.transId) == parseInt(tran.tranNoRef) && dt.documentNo !== tran.documentNo;
                    });
                    //console.log(tran, trans);
                    let avgCostMd = avgCost;
                    let cost = avgCostMd * qty;
                    if(originSalEntry){  //Use average cost of the original entry to value
                        //avgCostMd = originSalEntry.prodBal.avgCost;
                        cost = originSalEntry.prodBal.avgCost * qty;
                    }
                        
                        totalCost += cost;
                        totalQty += qty;
                        avgCost = totalCost/totalQty; //Added
                    resultObj.cost = cost;
                    resultObj.qty = qty;
                    resultObj.totalQty = totalQty;
                    resultObj.totalCost = totalCost;
                    resultObj.avgCost = avgCost;
                 }
            }else{  //For PROD-ADJ
                    //entryType === "CR": For Inventory Credit Entry being reduction in total Inventory

                        //PROD-ADJ == BYCOST || BYQTY. If BYQTY, absolute qty will be > 0 and amount will be 0.00
                        //Hence, less the amount from totalCost and recompute the avgCost
                        // *** Awaiting implementation
                        const qtyAbs = parseInt(Math.abs(tran.quantity));
                        if(qtyAbs > 0){ //BYQTY
                            //console.log(avgCost+'-byQTY');
                            const cost = avgCost * qty;
                            totalCost += cost;
                            totalQty += qty;
                            
                            resultObj.cost = cost;
                            resultObj.qty = qty;
                            resultObj.totalQty = totalQty;
                            resultObj.totalCost = totalCost;
                            
                            //Updated AvgCost
                            resultObj.avgCost = totalCost / totalQty;

                            //For adj by Qty, amount or cost was not set during transaction recording, hence, it should be set
                        }else{ //BYCOST
                            const cost = amnt;
                            const derivedQty = totalCost / avgCost;
                            totalCost += cost;
                            totalQty += 0; // totalQty += derivedQty;     
                            avgCost = totalCost / totalQty; // *** Update avgCost

                            resultObj.cost = cost;
                            resultObj.qty = 0;  //*** resultObj.qty = derivedQty;   
                            resultObj.totalQty = totalQty;
                            resultObj.totalCost = totalCost;
                            resultObj.avgCost = avgCost;

                    }
            }
            // Attach the result object to the transaction
            tran[objName || 'productBal'] = { ...resultObj }; // Shallow copy to prevent reference issues
        }
    }
    //console.log(productsLedgerObj)
    return productsLedgerObj;
};
