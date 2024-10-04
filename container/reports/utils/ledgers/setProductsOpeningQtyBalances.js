import { sortArrayByDate } from "@/lib/sort/sortArrayByDate";

/******************** PRODUCT LEDGER: SET OPENING PRODUCT QTY & UNIT COST ***********************
 * Opening product quanity and unit cost is set on each ledger opening balance
 * The two properties (qtyBalance and unitCost) are needed in product valuation
 */

export const setProductsOpeningQtyBalances = (productsLedger, beforeDateTransObj) => {
    for (const key in beforeDateTransObj) {
        const tranBeforeDateObj = beforeDateTransObj[key];
        const transBD = tranBeforeDateObj?.trans;

        if(transBD?.length){
            sortArrayByDate(transBD, 'transactionDate', 'DSC'); // Sort from earliest to latest: [01-09-2024, 03-09-2024, 05-09-2024]

            let totalQty = 0;
            let totalCost = 0;
            let avgCost = 0;

            for (let j = 0; j < transBD?.length; j++) {
                const tran = transBD[j];
                const { quantity, amount, entryType } = tran;

                const qty = parseFloat(quantity);
                const amnt = parseFloat(amount);
                let resultObj = {qty: 0, totalQty: 0, cost: 0, totalCost: 0, avgCost: 0 };

                if (entryType === "DR") {
                    // Amount = total Cost Price
                    totalCost += amnt;
                    totalQty += qty;
                    avgCost = totalCost / totalQty;

                    resultObj.cost = amnt;
                    resultObj.totalCost = totalCost;
                    resultObj.qty = qty;
                    resultObj.totalQty = totalQty;
                    resultObj.avgCost = avgCost;
                } else {
                    // Amount = total Sales Price
                    const cost = avgCost * qty;
                    totalCost += cost;
                    totalQty += qty;

                    resultObj.cost = cost;
                    resultObj.qty = qty;
                    resultObj.totalQty = totalQty;
                    resultObj.totalCost = totalCost;
                    resultObj.avgCost = avgCost;
                }

                //Get the ledger and attach the result to the tran                
                if(productsLedger[key]?.trans?.length && (productsLedger[key]?.trans[0]?.name?.toLowerCase()?.includes('opening balance') ||
                    productsLedger[key]?.trans[0]?.description?.toLowerCase()?.includes('opening balance') )){
                        productsLedger[key].trans[0]['qtyBalance'] = resultObj.totalQty;
                        productsLedger[key].trans[0]['unitCost'] = resultObj.avgCost;
                        productsLedger[key].trans[0]['totalCost'] = resultObj.totalCost;
                        productsLedger[key].trans[0]['quantity'] = resultObj.totalQty;
                        productsLedger[key].trans[0]['prodBal'] = resultObj;
                }
                
                beforeDateTransObj[key]['res'] = { ...resultObj }; // Shallow copy to prevent reference issues
            }
        }
    }
    //console.log(productsLedger)
    return productsLedger;
};
