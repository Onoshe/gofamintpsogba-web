<?php

    function insertNewClientAndCreateTables($table, $tableNames, $conn, $insertQueries, $createQueries, $domain){
        //Check for invalid table Name
        
        //echo json_encode(['ok' => false, 'table' => $table, 'tables' => array_values($tableNames), 'queries' => $insertQueries, 'create'=> $createQueries]);
        //return;
        $errorMsg = ['ok' => true];
        $tablesUpperCase =  array_keys($tableNames); //$tableNames = ["COASTRUCTURE" => $domain."_coastructure", ...]
        $tableNamesLowercase =  array_values($tableNames);

        $createdTables = "";
        $createdTablesError = "";
        $existTables = "";
        $deletedTables = "";
        $dataInsertedTables = "";
        $clientInserted = false;
        
        //1 or ""
        $deletedExistTable = ""; //Turn it to 1 and turn $createTableIfNoExist to "" to deleted existed tables. Reverse is the case for insert
        $createTableIfNoExist = 1;


        if(isset($table)){
            //Insert client data
            $insertClRes =  getInsertClientQuery($conn);
            if($deletedExistTable){$insertClRes['ok'] = true; }
            
            if($insertClRes['ok']){
                foreach ($tablesUpperCase as $tab) {
                    $createQuery = $createQueries[$tab];
                    $tableNm = $tableNames[$tab];
        
                    $sql = "SHOW TABLES LIKE '$tableNm'";
                    $result = $conn->query($sql);
                        if ($result->num_rows > 0){ //Table exist
                                if($deletedExistTable){
                                    $deleteQuery = "DROP TABLE IF EXISTS $tableNm"; 
                                    if ($conn->query($deleteQuery) !== TRUE){
                                        $deletedTables =  "$deletedTables, $tableNm";
                                    }else{$createdTablesError =  "$createdTablesError, $tableNm -$conn->error";}
                                }else{
                                    $existTables =  "$existTables, $tableNm";
                                }
                                
                        }else{ //Table does not exist, then create
                            if($createTableIfNoExist){
                                if($conn->query($createQuery) === TRUE) {
                                    $resetAutoIncrementQuery = "ALTER TABLE $tableNm AUTO_INCREMENT = 1"; //Reset auto number
                                    $conn->query($resetAutoIncrementQuery);
                                    $createdTables =  "$createdTables, $tableNm";       
                                } else {
                                    $createdTablesError =  "$createdTablesError, $tableNm -$conn->error";
                                }
                            }
                            //Insert coastructure table data to all clients and other data if domain is demo
                            if(isset($insertQueries[$tab])){
                                $insertQuery = $insertQueries[$tab];
                                if($tab === "COASTRUCTURE" || strtolower($domain) === "demo"){
                                    if($conn->query($insertQuery) === TRUE) {
                                        $dataInsertedTables =  "$dataInsertedTables, $tableNm";
                                    }
                              }
                            }
                        }
              }//_______________ Interation end
                
            }else{
                $errorMsg['ok'] = false;
                $errorMsg['msg'] = "Error inserting client data";    
            }
        
        }else{
            $errorMsg['ok'] = false;
            $errorMsg['msg'] = "No insert table";     
        }

        

        if($errorMsg['ok']){
          $errorMsg['CreatedTables']  ="Created tables- $createdTables.";
          $errorMsg['DeletedTables']  ="Deleted Tables- $deletedTables.";
          $errorMsg['ExistTables']  ="Exist Tables- $existTables.";
          $errorMsg['ErrorTables']  ="ErrorTables- $createdTablesError";
          $errorMsg['DataInsertedTables']  ="ErrorTables- $dataInsertedTables";
          $errorMsg['msg']  ="Created tables- $createdTables. Deleted Tables- $deletedTables. Exist Tables- $existTables. ErrorTables- $createdTablesError. ErrorTables- $dataInsertedTables";
        }
        echo json_encode($errorMsg); 
}


function createAndInsertNewClientData($conn, $tableNm, $createQuery, $tab,$dataInsertedTables, $existTables, $insertQueries, $deletedExistTable,  $deletedTables, $createTableIfNoExist,
    $createdTables, $createdTablesError){
    //Check if tabe exist. Table exist if $result->num_rows > 0 (is greater than 0)
    $sql = "SHOW TABLES LIKE '$tableNm'";
    $result = $conn->query($sql);
        if ($result->num_rows > 0){ //Table exist
                if($deletedExistTable){
                    $deleteQuery = "DROP TABLE IF EXISTS $tableNm"; 
                    if ($conn->query($deleteQuery) !== TRUE){
                        $deletedTables =  "$deletedTables, $tableNm";
                    }else{$createdTablesError =  "$createdTablesError, $tableNm -$conn->error";}
                }else{
                    $existTables =  "$existTables, $tableNm";
                }
                
        }else{ //Table does not exist
            if($createTableIfNoExist){
                if($conn->query($createQuery) === TRUE) {
                     $resetAutoIncrementQuery = "ALTER TABLE $tableNm AUTO_INCREMENT = 1"; //Reset auto number
                     $conn->query($resetAutoIncrementQuery);
                    $createdTables =  "$createdTables, $tableNm";       
                } else {
                    $createdTablesError =  "$createdTablesError, $tableNm -$conn->error";
                }
            }
            //Insert
            if(isset($insertQueries[$tab])){
                $insertQuery = $insertQueries[$tab];
                if($conn->query($insertQuery) === TRUE) {
                    $dataInsertedTables =  "$dataInsertedTables, $tableNm";       
               }
            }
        }
    }
    

    function getInsertClientQuery($conn){
        $result = ['ok' => false];

        if($_SERVER['REQUEST_METHOD'] === 'POST' || $_SERVER['REQUEST_METHOD'] === 'PATCH') {
            // Read the JSON data from the POST request
            $postData = file_get_contents('php://input');
            $requestBody = json_decode($postData, true);
             
            // Check if decoding was successful
            if(isset($requestBody['table'])  && isset($requestBody['act'])){

                // Extract the table, fields, values, types, and act from the request body
                $table = htmlspecialchars($requestBody['table'], ENT_QUOTES);
                $act = htmlspecialchars($requestBody['act'], ENT_QUOTES);

                // Type casting
                $table = (string) $table;
                $act = (string) $act;

                
                if($act === "INSERT_NEW_CLIENT" && isset($requestBody['fields']) && 
                    isset($requestBody['values']) && isset($requestBody['types'])){
                    // Extract the table, fields, values, types, and act from the request body
                    $fields = array_map('htmlspecialchars', $requestBody['fields'], array_fill(0, count($requestBody['fields']), ENT_QUOTES));
                    $values = $requestBody['values'];
                    $types = $requestBody['types'];

                    // Type casting
                    $fields = array_map('strval', $fields);


                    $fieldPlaceholders = implode(', ', array_fill(0, count($fields), '?'));
                    $query = "INSERT INTO $table (" . implode(', ', $fields) . ") VALUES (" . $fieldPlaceholders . ")";
                

                // Prepare the statement
                if ($stmt = $conn->prepare($query)) {
                    //foreach ($values as $row) {
                        $row = $values[0];
                        $params = [];
                        $paramTypes = '';
                        foreach ($fields as $field_index => $field) {
                            $value = $row[$field_index];
                            $type = $types[$field_index];
                            switch ($type) {
                                case 'VARCHAR':
                                    $paramTypes .= 's';
                                    $params[] = (string) $value;
                                    break;
                                case 'INT':
                                    $paramTypes .= 'i';
                                    $params[] = (int) $value;
                                    break;
                                // Add more types as needed
                                default:
                                    $paramTypes .= 's'; // default to string
                                    $params[] = $value;
                                    break;
                            }
                        }

                        $stmt->bind_param($paramTypes, ...$params);
                        if (!$stmt->execute()) {
                            $result['ok'] = false;
                            $result['msg'] = "Error in posting data: " . $stmt->error;
                        }else{
                            $result['ok'] = true;
                            $result['msg'] = "Client data inserted successfully";
                        }
                   /// }
    
                }
             }
                //________________________________*/ 
          }
        }

        return $result;
    }