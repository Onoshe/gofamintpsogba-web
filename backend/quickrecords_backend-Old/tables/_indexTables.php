<?php

   // require_once './_indexTableNames.php';
   $newClientTables = [
    "COASTRUCTURE",
    "TRANSACTIONS",
    "TRANSACTIONSDETAILS",
    "SETTINGS",
    "PRODUCTS",
    "CUSTOMERS",
    "VENDORS",
    "CHARTOFACCOUNT",
    "USERSACCOUNT",
    "ACTIVITYLOG",
    "RECONCILIATION",
  ]; 
   
    $tableNames = [
        "COASTRUCTURE" => $domain."_coastructure",
        "CHARTOFACCOUNT" => $domain."_chartofaccount",
        "PRODUCTS" => $domain."_products",
        "CUSTOMERS" => $domain."_customers",
        "VENDORS" => $domain."_vendors",
        "TRANSACTIONS" => $domain."_transactions",
        "TRANSACTIONSDETAILS" => $domain."_transactionsdetails",
        "USERSACCOUNT" => $domain."_usersaccount",
        "ACTIVITYLOG" => $domain."_activitylog",
        "SETTINGS" => $domain."_settings",
        "RECONCILIATION" => $domain."_reconciliation",
    ];

    $tableRefs = [
        "CHARTOFACCOUNT" => $domain."_coastructure",
        "TRANSACTIONSDETAILS" => $domain."_transactions",
        "ACTIVITYLOG" => $domain."_usersaccount",
    ];
    $createQueries =[
        "COASTRUCTURE" => createCoaStructure($tableNames['COASTRUCTURE']),
        "CHARTOFACCOUNT" => createChartOfAccount($tableNames['CHARTOFACCOUNT'], $tableRefs['CHARTOFACCOUNT']),
        "PRODUCTS" => createProducts($tableNames['PRODUCTS']),
        "CUSTOMERS" => createCustomers($tableNames['CUSTOMERS']),
        "VENDORS" => createVendors($tableNames['VENDORS']),
        "TRANSACTIONS" => createTransactions($tableNames['TRANSACTIONS']),
        "TRANSACTIONSDETAILS" => createTransactionDetails($tableNames['TRANSACTIONSDETAILS'], $tableRefs['TRANSACTIONSDETAILS']),
        "ACTIVITYLOG" => createActivityLog($tableNames['ACTIVITYLOG'], $tableRefs['ACTIVITYLOG']),
        "USERSACCOUNT" => createUsersAccount($tableNames['USERSACCOUNT']),
        "SETTINGS" => createSettings($tableNames['SETTINGS']),
        "RECONCILIATION" => createReconciliation($tableNames['RECONCILIATION'])
    ];
    $insertQueries =[
        "COASTRUCTURE"  => insertDataCoaStructure($tableNames['COASTRUCTURE']),
        "CHARTOFACCOUNT" => insertDataToChartOfAccount($tableNames['CHARTOFACCOUNT']),
        "PRODUCTS" => insertDataToProducts($tableNames['PRODUCTS']),
        "CUSTOMERS" => insertDataToVendors($tableNames['CUSTOMERS']),
        "VENDORS" => insertDataToCustomers($tableNames['VENDORS'])
    ];
    