import { sortArrayByDate } from "@/lib/sort/sortArrayByDate";


export const getProductBalances = (productsLedgerObj, objName) => {
    for (const key in productsLedgerObj) {
        const productLedger = productsLedgerObj[key];
        const { trans } = productLedger;
        
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
                if (entryType === "DR") { //
                    // Amount = total Cost Price
                    totalCost += amnt;
                    totalQty += qty;
                    avgCost = totalCost / totalQty;

                    resultObj.cost = amnt;
                    resultObj.totalCost = totalCost;
                    resultObj.qty = qty;
                    resultObj.totalQty = totalQty;
                    resultObj.avgCost = avgCost;

                } else { //For Inventory Credit Entry being reduction in total Inventory
                   //Amount in this case is total Sales Price (which is irrelevant)
                   const cost = avgCost * qty;
                   totalCost += cost;
                   totalQty += qty;
                   
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
                        const qtyAbs = parseInt(Math.abs(tran.quantity));
                        if(qtyAbs > 0){ //BYQTY
                            const cost = avgCost * qty;
                            totalCost += cost;
                            totalQty += qty;
                            
                            resultObj.cost = cost;
                            resultObj.qty = qty;
                            resultObj.totalQty = totalQty;
                            resultObj.totalCost = totalCost;
                            
                            //Updated AvgCost
                            resultObj.avgCost = totalCost / totalQty;
                        }else{ //BYCOST
                            const cost = amnt;
                            totalCost += cost;
                            totalQty += 0;
                            avgCost = totalCost / totalQty;
                            
                            resultObj.cost = cost;
                            resultObj.qty = 0;
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
