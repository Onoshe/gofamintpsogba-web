function updateAging(aging, daysDiff, amountVal) {
 
    if (daysDiff < 30) {
        aging.LESS_DAYS_30 += amountVal;
    } else if (daysDiff >= 30 && daysDiff < 60) {
        aging.DAYS_30_60 += amountVal;
    } else if (daysDiff >= 60 && daysDiff < 90) {
        aging.DAYS_60_90 += amountVal;
    } else if (daysDiff >= 90 && daysDiff < 180) {
        aging.DAYS_90_180 += amountVal;
    } else {
        aging.OVER_DAYS_180 += amountVal;
    }
    aging.TOTAL  += amountVal;
    return aging
}

function reduceAgingBalance(aging, amountVal, agingOrder) {

    for (let key of agingOrder) {
        if (aging[key] > 0) {
            const reduction = Math.min(aging[key], amountVal);
            aging[key] -= reduction;
            aging.TOTAL  -= reduction;
            amountVal -= reduction;
            if (amountVal === 0) {
                break;
            }
        }
    }
    
    return aging;
}

export {updateAging, reduceAgingBalance}

// Example usage:
let aging = {
    "LESS_DAYS_30": 50000,
    "DAYS_30_60": 30000,
    "DAYS_60_90": 30000,
    "DAYS_90_180": 10000,
    "OVER_DAYS_180": 20000,
};

//const amount = 40000;
//console.log(reduceAgingBalance(aging, amount));
//console.log(reduceAgingBalance(aging, 35000));