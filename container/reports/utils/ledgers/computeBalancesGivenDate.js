


function calculateBalGivenDate({coaStructure, chartOfAccounts, controlAcctsCode, ledgers, startDate, endDate, accountType}) {

    let incomeClassTypeCode = coaStructure.find((dt)=> dt.name.toLocaleLowerCase() == "incomeclass")?.code;
    let retainedEarningsCode = chartOfAccounts.find((dt)=> dt.typeCode == controlAcctsCode.retainedEarnings)?.accountCode;
        incomeClassTypeCode = parseInt(incomeClassTypeCode);


    const start = new Date(startDate);
    const end = new Date(endDate);

    //Set retained earnings if not exist
    //if (type !== "INCOME" && !ledgers[retainedEarningsCode]) {
    if (accountType === "GENLED" && !ledgers[retainedEarningsCode]) {
        ledgers[retainedEarningsCode] = {
            name: 'Retained Earnings',
            accountCode: retainedEarningsCode,
            debit: 0,
            credit:0,
            openingBal:0,
            closingBal:0,
            typeCode:retainedEarningsCode,
            trans: []
        };
    }

    // Iterate through each ledger account
    for (let code in ledgers) {
        let ledger = ledgers[code];
        let openingBal = 0;
        let closingBal = 0;
        let transactionsWithinDate = [];

        // Process each transaction
        ledger.trans.forEach(trans => {
            const transDate = new Date(trans.transactionDate);

            // Sum transactions before the start date for opening balance
            if (transDate < start) {
                openingBal += parseFloat(trans.amount);
            }

            // Include transactions within the date range for closing balance
            if (transDate >= start && transDate <= end) {
                transactionsWithinDate.push(trans);
                closingBal += parseFloat(trans.amount);
            }
        });

        // Check typeCode to determine how to handle the opening balance
        if (ledger.typeCode < incomeClassTypeCode || code.includes('C-') || code.includes('V-')) { // For Balance sheet accounts and sub accounts
            if (openingBal !== 0) {
                // Create the opening balance transaction
                let isDebit = openingBal > 0;
                transactionsWithinDate.unshift({
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
                    typeCode:ledger.typeCode
                });
            }
            ledger.openingBal = openingBal;
            ledger.trans = transactionsWithinDate;
        } else {
            // Income or expenses, add opening balance to retained earnings
            ledgers[retainedEarningsCode].openingBal += openingBal;
            const retEearningsBal = ledgers[retainedEarningsCode].openingBal;
            const isDr = retEearningsBal >= 0;
            ledgers[retainedEarningsCode].debit = isDr?  0: retEearningsBal;
            ledgers[retainedEarningsCode].credit = isDr? -retEearningsBal : 0;
            ledgers[retainedEarningsCode].net = retEearningsBal;
            ledgers[retainedEarningsCode].closingBal = isDr? -retEearningsBal : retEearningsBal;

            //For income and expenses
            ledger.trans = transactionsWithinDate;
        }    
        ledger.closingBal = closingBal;
        //Create transaction for retaine earnings
    }
    if(ledgers[retainedEarningsCode]){
        //console.log(ledgers[retainedEarningsCode]);
        //return
        const retainedEarningsLedger = ledgers[retainedEarningsCode]; 
        const debitVal = ledgers[retainedEarningsCode].debit;
        const creditVal = ledgers[retainedEarningsCode].credit;
        const isDebit = debitVal > creditVal;
        //retainedEarningsLedger.debit = 0; //Testing TB balance
        ledgers[retainedEarningsCode].debit = 0;
        ledgers[retainedEarningsCode].trans = [ 
            {
                transactionDate:startDate,
                accountCode: retainedEarningsCode,
                accountName:"Retained Earnings",
                entryType:isDebit? 'DR' : 'CR',
                entryDimen: isDebit? 1 : -1,
                amount: isDebit? debitVal : -creditVal,
                balance:isDebit? debitVal : -creditVal,
                description:'Opening balance',
                debit:debitVal,
                credit:creditVal,
                name:'Opening balance',
                trans:[],
                typeCode:retainedEarningsLedger.typeCode
            }, ...retainedEarningsLedger.trans];
    }
    //Delete Retained Earnings obejct from personal account ledgers
    const ledgersAcctCodes = Object.keys(ledgers);
    if(ledgersAcctCodes.includes("C-") || ledgersAcctCodes.includes("V-")){
      // delete ledgers[retainedEarningsCode];
    }
   // return ledgers;
}

/*
accountCode: ledger.accountCode,
    closingBal:0,
    openingBal,
    debit:isCredit? 0 : openingBal,
    credit:isCredit? openingBal : 0,
    name:'Opening balance',
    trans:[],
    typeCode:ledger.typeCode
*/