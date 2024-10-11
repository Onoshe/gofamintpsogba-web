<?php
    //http://localhost/app/server.php/api/transactions/fetch?d=demo
    $domain = isset($_GET['d']) ? htmlspecialchars($_GET['d'], ENT_QUOTES) : '';

    require_once __DIR__ . '../../../../tables/_indexTableNames.php';
    
    $tableNamesOnly = [];
    foreach ($tableNames as $key => $value){
      array_push($tableNamesOnly, $value);   
    }

    function getTableData($conn, $tableName) {
        $data = [];
        $domain = "demo";
        $basicQuery = "SELECT * FROM `$tableName` WHERE deleted IS NULL OR deleted = 0";

        $transDetailsQuery = "SELECT 
            t.id AS transId,
            t.transactionDate,
            t.description,
            t.reference,
            t.entriesCount,
            t.inactive,
            t.postingPlat,
            td.accountCode AS accountCodeId,
            td.accountCodeSub AS accountCodeSubId,
            td.id AS transDetailsId,
            
            CASE 
                WHEN td.accountCodeSubAcct = 'CUSTOMERS' THEN c.accountCode
                WHEN td.accountCodeSubAcct = 'VENDORS' THEN v.accountCode
                WHEN td.accountCodeSubAcct = 'PRODUCTS' THEN p.productCode
                ELSE NULL
            END AS accountCodeSub,

            CASE 
                WHEN td.accountCodeSubAcct = 'CUSTOMERS' THEN CONCAT(c.lastname, ' ', c.firstname)
                WHEN td.accountCodeSubAcct = 'VENDORS' THEN CONCAT(v.lastname, ' ', v.firstname)
                WHEN td.accountCodeSubAcct = 'PRODUCTS' THEN p.productName
                ELSE NULL
            END AS accountCodeSubName,

            p.category AS accountCodeSubCategory,
            td.accountCodeSubAcct,
            td.transactionID,
            td.entryType,
            td.entryDimen,
            td.doubleEntryId,
            td.quantity * td.entryDimen AS quantity,
            td.unitPrice,
            td.dueDate,
            td.voucher,
            td.inactive,
            ca.accountCode,
            ca.accountName,
            ca.accountType,
            ca.typeCode,
            td.amount * td.entryDimen AS amount,
            LPAD(t.id, 7, '0') AS transactionNo,
            LPAD(td.id, 7, '0') AS documentNo,
            t.createdBy,
            t.createdAt,
            t.updatedBy,
            t.updatedAt,

            -- Calculate offsetAccountId based on entryType
            CASE 
                WHEN td.entryType = 'CR' THEN t.accountDr
                WHEN td.entryType = 'DR' THEN t.accountCr
                ELSE NULL
            END AS offsetAccountId,

            -- Join to get offsetAccountCode and offsetAccountName based on offsetAccountId
            coaOffset.accountCode AS offsetAccountCode,
            coaOffset.accountName AS offsetAccountName

            FROM 
                {$domain}_transactionsdetails td
            LEFT JOIN 
                {$domain}_transactions t ON td.transactionID = t.id
            LEFT JOIN 
                {$domain}_chartofaccount ca ON td.accountCode = ca.id

            LEFT JOIN 
                {$domain}_customers c ON td.accountCodeSubAcct = 'CUSTOMERS' AND td.accountCodeSub = c.id
            LEFT JOIN 
                {$domain}_vendors v ON td.accountCodeSubAcct = 'VENDORS' AND td.accountCodeSub = v.id
            LEFT JOIN 
                {$domain}_products p ON td.accountCodeSubAcct = 'PRODUCTS' AND td.accountCodeSub = p.id

            -- Join with chartofaccount to get offsetAccountCode and offsetAccountName
            LEFT JOIN 
                {$domain}_chartofaccount coaOffset ON 
                (CASE 
                    WHEN td.entryType = 'CR' THEN t.accountDr
                    WHEN td.entryType = 'DR' THEN t.accountCr
                    ELSE NULL
                END) = coaOffset.id

            WHERE 
                t.deleted IS NULL OR t.deleted = 0
            ORDER BY t.transactionDate ASC;";


        $transQuery = "SELECT DISTINCT t.*, 
                caDr.accountCode AS accountCodeDr, 
                caDr.accountName AS accountNameDr,
                caCr.accountCode AS accountCodeCr, 
                caCr.accountName AS accountNameCr,
                td.voucher
            FROM 
                {$domain}_transactions t 
            INNER JOIN 
                {$domain}_transactionsdetails td ON t.id = td.transactionId
            LEFT JOIN 
                {$domain}_chartofaccount caDr ON t.accountDr = caDr.id AND t.accountDr > 0
            LEFT JOIN 
                {$domain}_chartofaccount caCr ON t.accountCr = caCr.id AND t.accountCr > 0
            WHERE 
                t.deleted IS NULL OR t.deleted = 0
             ORDER BY t.transactionDate ASC;";

        //$query = strpos($tableName, "transactionsdetails") !== false? $transDetailsQuery : $basicQuery;
        $query = (strpos($tableName, "transactionsdetails") !== false) ? $transDetailsQuery 
                : ((strpos($tableName, "transactions") !== false) ? $transQuery 
                : $basicQuery);

        $result = $conn->query($query);
        if ($result && $result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;  // Append each row to the $data array
            }
        }
        return $data;
    }
    
    //Add coastructure table if not exist
    if (!isset($tableNamesOnly[$domain."_coastructure"])) {
        array_push($tableNamesOnly, $domain."_coastructure");
    };

    // Fetch data for each table and format the response
    $response = [];
    foreach ($tableNamesOnly as $table) {
       $response['tables'][] = $table;
       $res = getTableData($conn, $table);
       $response[$table] = $res;
    }
    
    echo json_encode(['ok' => true, 'data' => $response]);
    
   // $transQuery = "SELECT DISTINCT t.* FROM {$domain}_transactions t
   //         INNER JOIN {$domain}_transactionsdetails td ON t.id = td.transactionId
   //         WHERE t.deleted IS NULL OR t.deleted = 0";

