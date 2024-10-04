

/**************** 
*    1. CREATE AND APPEND OPENING BALANCES TO INDIVIDUAL LEDGERS TRANS ARRAY  
*    2. CREATE RETAINED EARNINGS LEDGER IF NOT EXIST, ADD BALANCES (OPENINGBAL, ETC) AND CREATE & APPEND OPENING BALANCE ON TRANS
*/

export function createAndAppendOpeningBalAndRetEarnings({coaStructure, chartOfAccounts, controlAcctsCode, ledgers, startDate, accountType}) {

    let incomeClassTypeCode = coaStructure?.find((dt)=> dt.name.toLocaleLowerCase() == "incomeclass")?.code;
    let retainedEarningsCode = chartOfAccounts?.find((dt)=> dt.typeCode == controlAcctsCode.retainedEarnings)?.accountCode;
    let retainedEarningsTypeCode = chartOfAccounts?.find((dt)=> dt.typeCode == controlAcctsCode.retainedEarnings)?.typeCode;
        incomeClassTypeCode = parseInt(incomeClassTypeCode);



    //Set retained earnings if not exist
    if (accountType === "GENLED" && !ledgers[retainedEarningsCode]) {
        ledgers[retainedEarningsCode] = {
            name: 'Retained Earnings',
            accountCode: retainedEarningsCode,
            debit: 0,
            credit:0,
            openingBal:0,
            closingBal:0,
            typeCode:retainedEarningsTypeCode,
            trans: []
        };
    }

    // Iterate through each ledger account
    for (let code in ledgers) {
        let ledger = ledgers[code];
        let openingBal = ledger.openingBal;

        // Check typeCode to determine how to handle the opening balance
        if (ledger.typeCode < incomeClassTypeCode || code.includes('C-') || code.includes('V-') || accountType === "PRODUCTS") { // For Balance sheet accounts and sub accounts
            if (openingBal !== 0) {
                // Create the opening balance transaction
                let isDebit = openingBal > 0;
                ledger?.trans?.unshift({
                    transactionDate:startDate,
                    accountCode: ledger.accountCode,
                    accountName:ledger.name,
                    [isDebit? 'debit' : 'credit']:openingBal,
                    entryType:isDebit? 'DR' : 'CR',
                    entryDimen: isDebit? 1 : -1,
                    amount:openingBal,
                    balance:openingBal,
                    description:'Opening balance',
                    debit:isDebit? openingBal : 0,
                    credit:isDebit? 0 : openingBal,
                    name:'Opening balance',
                    trans:[],
                    isOB:true, //Is opening balance
                    typeCode:ledger.typeCode
                });
            }
        } else {
            // Income or expenses: move opening balances to retained earnings
            ledgers[retainedEarningsCode].openingBal += openingBal;
            ledgers[retainedEarningsCode].closingBal += openingBal; // For the purpose of segmentBalancesToDrCr function

            //Reset opening and closing balances for Income & Expenses
            const periodNet = ledger.periodBalDr + ledger.periodBalCr;
            ledger.openingBal = 0;
            ledger.openingBalDr = 0;
            ledger.openingBalCr = 0;
            ledger.closingBal = periodNet;
            ledger.closingBalDr = periodNet > 0? periodNet : 0;
            ledger.closingBalCr = periodNet < 0? periodNet : 0;
            ledger.debit = periodNet > 0? periodNet : 0;
            ledger.credit = periodNet < 0? periodNet : 0;
            ledger.closing = periodNet > 0? "DR" : "CR";
        }    

        //Create transaction for retaine earnings
    }

    if(ledgers[retainedEarningsCode]?.name){
        const retainedEarningsLedger = ledgers[retainedEarningsCode]; 
        const openingBal = retainedEarningsLedger.openingBal;
        const openingBalDr = retainedEarningsLedger.openingBalDr;
        const openingBalCr = retainedEarningsLedger.openingBalCr;
        const openingDr = openingBal > 0;
        
        //Add openingBalDr, etc to RetEarnings
        ledgers[retainedEarningsCode] = {
            ...retainedEarningsLedger,
            openingBalDr: openingDr? openingBal : 0,
            openingBalCr: openingDr? 0 : openingBal,
            closingBal:openingBal,
            //debit:openingDr? openingBal : 0,
            //credit:openingDr? 0 : openingBal,
        }

        //Create Opening Retained Earnings balance on the trans array
        ledgers[retainedEarningsCode].trans = [ 
            {
                transactionDate:startDate,
                accountCode: retainedEarningsCode,
                accountName:"Retained Earnings",
                entryType:openingDr? 'DR' : 'CR',
                entryDimen: openingDr? 1 : -1,
                amount: openingDr? openingBal : -openingBal,
                balance: openingDr? openingBal : -openingBal,
                description:'Opening balance',
                debit:openingBalDr,
                credit:openingBalCr,
                name:'Opening balance',
                typeCode:retainedEarningsLedger.typeCode
            }, ...retainedEarningsLedger.trans];
    }
    
    
    
}
