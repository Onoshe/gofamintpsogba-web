<?php

$transQuery = "SELECT 
    td.id,
    t.transactionDate,
    t.description,
    t.reference,
    td.transactionID,
    td.entryDimen,
    ca.accountCode,
    ca.accountName,
    td.accountCodeSub,
    td.accountCodeSubAcct,
    td.amount * td.entryDimen AS adjustedAmount,
    LPAD(t.id, 7, '0') AS transactionNo,
    LPAD(td.id, 7, '0') AS documentNo
FROM 
    demo_transactionsdetails td
LEFT JOIN 
    demo_transactions t ON td.transactionID = t.id
LEFT JOIN 
    demo_chartofaccount ca ON td.accountCode = ca.id";